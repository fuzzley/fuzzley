#!/usr/bin/env node
/**
 * Force stops every dev or preview server running from this checkout.
 *
 *   yarn force-stop
 *   yarn force-stop --dry-run
 *
 * A server is a process running this checkout's own `astro dev` or
 * `astro preview`, or its own Vite (older branches served the site with Vite
 * directly). The yarn and shell processes that launched it, and everything it
 * spawned, go with it. A server from another project is left alone, even one on
 * the same port. `astro build` and `astro check` are not servers and are never
 * stopped.
 *
 * Ported from fuzzley/fSolitaire's tools/stop-dev-servers.mjs.
 */
import { execFileSync } from "node:child_process";
import { readdir, readFile, readlink } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const USAGE = `Usage: yarn force-stop [--dry-run]

Force stops every dev or preview server running from this checkout.

  -n, --dry-run  List the processes it would stop, and stop none
  -h, --help     Show this message`;

/** How long killed processes have to exit before they are reported. */
const EXIT_TIMEOUT_MS = 2000;

/** How often to check whether killed processes have exited. */
const EXIT_POLL_MS = 50;

/** The most output a process listing may run to. */
const MAX_LISTING_BYTES = 64 * 1024 * 1024;

/**
 * A running process; `started`, in milliseconds since the epoch, is only
 * known on Windows, and its working directory `cwd` only on Linux.
 *
 * @typedef {{pid: number, ppid: number, name: string, cmdline: string, started?: number, cwd?: string}} ProcessInfo
 */

/**
 * Normalizes a path or command line for matching: forward slashes, lower case.
 *
 * @param {string} text
 * @returns {string}
 */
function normalize(text) {
  return text.replaceAll("\\", "/").toLowerCase();
}

/**
 * Escapes text for use as a literal in a regular expression.
 *
 * @param {string} text
 * @returns {string}
 */
function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** The frontend folder, which holds this checkout's node_modules. */
const ROOT = normalize(join(dirname(fileURLToPath(import.meta.url)), ".."));

/**
 * The end of a command line that serves the site: Astro's `dev` or `preview`
 * command, run as `node_modules/astro/bin/astro.mjs` or
 * `node_modules/.bin/astro`, or Vite run as `node_modules/vite/bin/vite.js` or
 * `node_modules/.bin/vite`, but not Vitest.
 */
const SERVER_BIN = String.raw`node_modules/(?:(?:astro/bin/astro\.mjs|\.bin/astro(?![\w.-]))["']?\s+["']?(?:dev|preview)(?=["'\s]|$)|vite/|\.bin/vite(?![\w-]))`;

/** Matches a command line that runs this checkout's server by its full path. */
const PROJECT_SERVER = new RegExp(`${escapeRegExp(ROOT)}/${SERVER_BIN}`);

/**
 * Matches a command line that runs the server by a relative path, as
 * `./node_modules/.bin/astro dev` does, which only the working directory
 * places.
 */
const RELATIVE_SERVER = new RegExp(String.raw`(?:^|\s)(?:\./)?${SERVER_BIN}`);

/** Matches the command lines of the processes that launch a server. */
const LAUNCHERS = [
  // yarn dev, yarn start, npm run preview, and the like.
  /\b(?:yarn|npm)\S*\s+(?:run\s+)?(?:start|dev|preview)(?=["'\s]|$)/,
  // cmd /c astro dev or sh -c vite, the shell a package manager runs a script in.
  /\b(?:cmd\.exe\b.*\/c|sh\s+-c)\s+"?(?:astro|vite)\b/,
];

/**
 * Returns whether a process is running this checkout's server, by its full
 * path or by a relative one from the frontend folder.
 *
 * @param {ProcessInfo} p
 * @returns {boolean}
 */
function isServer(p) {
  const cmdline = normalize(p.cmdline);
  if (PROJECT_SERVER.test(cmdline)) return true;
  const inRoot = p.cwd !== undefined && normalize(p.cwd) === ROOT;
  return inRoot && RELATIVE_SERVER.test(cmdline);
}

/**
 * Returns whether a process is one that launches a server.
 *
 * @param {ProcessInfo} p
 * @returns {boolean}
 */
function isLauncher(p) {
  const cmdline = normalize(p.cmdline);
  return LAUNCHERS.some((launcher) => launcher.test(cmdline));
}

/**
 * A process as `listWindowsProcesses` reads it from PowerShell.
 *
 * @typedef {{ProcessId: number, ParentProcessId: number, Name: string | null, CommandLine: string | null, Started: number | null}} Win32Process
 */

/**
 * Lists the running processes on Windows, with when each started, because a
 * parent ID outlives its process there and can be handed to a newer one.
 *
 * @returns {ProcessInfo[]}
 */
function listWindowsProcesses() {
  // UTF-8 keeps a non-ASCII path intact whatever the console's code page.
  const script = `
    [Console]::OutputEncoding = New-Object Text.UTF8Encoding
    $started = @{
      Name = 'Started'
      Expression = { if ($_.CreationDate) { ([DateTimeOffset]$_.CreationDate).ToUnixTimeMilliseconds() } }
    }
    Get-CimInstance Win32_Process |
      Select-Object ProcessId, ParentProcessId, Name, CommandLine, $started |
      ConvertTo-Json -Compress`;
  const stdout = execFileSync(
    "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-Command", script],
    { encoding: "utf8", maxBuffer: MAX_LISTING_BYTES },
  );
  /** @type {Win32Process[]} */
  const listed = JSON.parse(stdout);
  return listed.map((p) => ({
    pid: p.ProcessId,
    ppid: p.ParentProcessId,
    name: p.Name ?? "",
    cmdline: p.CommandLine ?? "",
    started: p.Started ?? undefined,
  }));
}

/**
 * Lists the running processes on Linux.
 *
 * @returns {Promise<ProcessInfo[]>}
 */
async function listLinuxProcesses() {
  const pids = (await readdir("/proc")).filter((entry) => /^\d+$/.test(entry));
  const procs = await Promise.all(pids.map(readLinuxProcess));
  return procs.filter((p) => p !== undefined);
}

/**
 * Reads a process from `/proc`, or returns undefined if it has since exited.
 *
 * @param {string} pid
 * @returns {Promise<ProcessInfo | undefined>}
 */
async function readLinuxProcess(pid) {
  try {
    const [stat, cmdline, cwd] = await Promise.all([
      readFile(`/proc/${pid}/stat`, "utf8"),
      readFile(`/proc/${pid}/cmdline`, "utf8"),
      // Another user's process keeps its working directory to itself.
      readlink(`/proc/${pid}/cwd`).catch(() => undefined),
    ]);
    const argv = cmdline.split("\0").filter(Boolean);
    // stat reads "pid (name) state ppid ...", where the name may itself hold
    // spaces or parentheses.
    const nameEnd = stat.lastIndexOf(")");
    const [, ppid] = stat.slice(nameEnd + 2).split(" ");
    return {
      pid: Number(pid),
      ppid: Number(ppid),
      // stat's name is the main thread's, which Node renames MainThread, so it
      // stands in only for a kernel thread, which has no command line.
      name: argv[0]
        ? basename(argv[0].split(" ")[0])
        : stat.slice(stat.indexOf("(") + 1, nameEnd),
      cmdline: argv.join(" "),
      cwd,
    };
  } catch {
    return undefined;
  }
}

/**
 * Lists the running processes with `ps`, for a system without `/proc`.
 *
 * @returns {ProcessInfo[]}
 */
function listPsProcesses() {
  const stdout = execFileSync("ps", ["-eo", "pid=,ppid=,args="], {
    encoding: "utf8",
    maxBuffer: MAX_LISTING_BYTES,
  });
  return stdout.split("\n").flatMap((line) => {
    const match = /^\s*(\d+)\s+(\d+)\s+(.*)$/.exec(line);
    if (!match) return [];
    const [, pid, ppid, cmdline] = match;
    const name = basename(cmdline.split(" ")[0]);
    return [{ pid: Number(pid), ppid: Number(ppid), name, cmdline }];
  });
}

/**
 * Lists the running processes.
 *
 * @returns {Promise<ProcessInfo[]>}
 */
async function listProcesses() {
  if (process.platform === "win32") return listWindowsProcesses();
  if (process.platform === "linux") return listLinuxProcesses();
  return listPsProcesses();
}

/** Links running processes to their parents and children. */
class ProcessTree {
  /** @type {Map<number, ProcessInfo>} */
  #byPid;

  /** @type {Map<ProcessInfo | undefined, ProcessInfo[]>} */
  #children;

  /** @param {ProcessInfo[]} procs */
  constructor(procs) {
    this.#byPid = new Map(procs.map((p) => [p.pid, p]));
    this.#children = Map.groupBy(procs, (p) => this.parentOf(p));
  }

  /**
   * Returns the process with an ID.
   *
   * @param {number} pid
   * @returns {ProcessInfo | undefined}
   */
  get(pid) {
    return this.#byPid.get(pid);
  }

  /**
   * Returns a process's parent, or undefined once the parent has exited, even
   * if a newer process has been given its ID.
   *
   * @param {ProcessInfo} p
   * @returns {ProcessInfo | undefined}
   */
  parentOf(p) {
    const parent = this.#byPid.get(p.ppid);
    if (!parent || parent === p) return undefined;
    const startedLater = (parent.started ?? 0) > (p.started ?? 0);
    return startedLater ? undefined : parent;
  }

  /**
   * Yields a process's ancestors, nearest first.
   *
   * @param {ProcessInfo} p
   * @returns {Generator<ProcessInfo>}
   */
  *ancestorsOf(p) {
    for (
      let parent = this.parentOf(p);
      parent;
      parent = this.parentOf(parent)
    ) {
      yield parent;
    }
  }

  /**
   * Yields a process and everything under it, parents first, each with its
   * depth below the first.
   *
   * @param {ProcessInfo} p
   * @param {number} [depth]
   * @returns {Generator<[ProcessInfo, number]>}
   */
  *walk(p, depth = 0) {
    yield [p, depth];
    for (const child of this.#children.get(p) ?? []) {
      yield* this.walk(child, depth + 1);
    }
  }
}

/**
 * Returns the processes to stop, each server from its outermost launcher
 * down, parents before their children, and each with its depth in that tree.
 *
 * @param {ProcessInfo[]} procs
 * @returns {(ProcessInfo & {depth: number})[]}
 */
function findServers(procs) {
  const tree = new ProcessTree(procs);
  const self = tree.get(process.pid);
  // This script, and whatever started it, are never stopped.
  const spared = new Set(self ? [self, ...tree.ancestorsOf(self)] : []);

  /** @type {Set<ProcessInfo>} */
  const roots = new Set();
  for (const server of procs.filter(isServer)) {
    let root = server;
    for (const ancestor of tree.ancestorsOf(server)) {
      if (spared.has(ancestor) || !isLauncher(ancestor)) break;
      root = ancestor;
    }
    roots.add(root);
  }

  // A process under two roots is kept once, at the depth it was first found.
  /** @type {Map<ProcessInfo, number>} */
  const depths = new Map();
  for (const root of roots) {
    for (const [p, depth] of tree.walk(root)) {
      if (!spared.has(p) && !depths.has(p)) depths.set(p, depth);
    }
  }
  return [...depths].map(([p, depth]) => ({ ...p, depth }));
}

/**
 * Returns whether a process is still running.
 *
 * @param {number} pid
 * @returns {boolean}
 */
function isRunning(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    // EPERM: it is running, but under another user.
    return /** @type {NodeJS.ErrnoException} */ (error).code === "EPERM";
  }
}

/**
 * Force-kills processes, skipping any that have already exited.
 *
 * @param {number[]} pids
 */
function killAll(pids) {
  for (const pid of pids) {
    try {
      process.kill(pid, "SIGKILL");
    } catch {
      // Gone already, or not ours to kill, which waitForExit reports.
    }
  }
}

/**
 * Waits for processes to exit, and returns those still running when time runs
 * out.
 *
 * @param {number[]} pids
 * @returns {Promise<number[]>}
 */
async function waitForExit(pids) {
  const deadline = Date.now() + EXIT_TIMEOUT_MS;
  let running = pids.filter(isRunning);
  while (running.length > 0 && Date.now() < deadline) {
    await sleep(EXIT_POLL_MS);
    running = running.filter(isRunning);
  }
  return running;
}

/**
 * Prints a line, cut to the terminal's width when there is one.
 *
 * @param {string} line
 */
function printLine(line) {
  const width = process.stdout.columns ?? Infinity;
  console.log(line.length > width ? `${line.slice(0, width - 1)}…` : line);
}

async function main() {
  const { values } = parseArgs({
    options: {
      "dry-run": { type: "boolean", short: "n" },
      help: { type: "boolean", short: "h" },
    },
  });
  if (values.help) {
    console.log(USAGE);
    return;
  }

  const targets = findServers(await listProcesses());
  if (targets.length === 0) {
    console.log("No dev or preview server is running.");
    return;
  }

  const dryRun = values["dry-run"] ?? false;
  console.log(
    `${dryRun ? "Would stop" : "Stopping"} ${targets.length} processes:`,
  );
  for (const { pid, name, cmdline, depth } of targets) {
    printLine(`${"  ".repeat(depth + 1)}${pid} ${name}  ${cmdline}`);
  }
  if (dryRun) return;

  const pids = targets.map((p) => p.pid);
  killAll(pids);
  const survivors = await waitForExit(pids);
  if (survivors.length > 0) {
    console.error(`Could not stop ${survivors.join(", ")}.`);
    process.exitCode = 1;
    return;
  }
  console.log("Stopped.");
}

await main();
