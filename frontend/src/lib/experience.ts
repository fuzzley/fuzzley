import { getCollection, type CollectionEntry } from "astro:content";

export type Job = CollectionEntry<"experience">;

const PLACEHOLDER = /^TODO\b/;

/** Newest first. */
export async function getJobs(): Promise<Job[]> {
  const jobs = await getCollection("experience");
  return jobs.sort((a, b) => b.data.start.localeCompare(a.data.start));
}

export const isPlaceholder = (text: string) => PLACEHOLDER.test(text);

/**
 * The highlights to render. `yarn dev` keeps placeholders so they stay visible
 * until written; production builds drop them.
 */
export const visibleHighlights = (job: Job) =>
  import.meta.env.DEV
    ? job.data.highlights
    : job.data.highlights.filter((text) => !isPlaceholder(text));

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const month = (value: string) => {
  const [year, m] = value.split("-");
  return `${monthNames[Number(m) - 1]} ${year}`;
};

/** "January 2017". */
export function longMonth(value: string) {
  const [year, m] = value.split("-");
  const name = new Date(Date.UTC(Number(year), Number(m) - 1)).toLocaleString(
    "en-US",
    { month: "long", timeZone: "UTC" },
  );
  return `${name} ${year}`;
}

/** "Developer relations, data insights and internal infrastructure" as a list. */
export const focusAreas = (job: Job) =>
  job.data.focus
    .split(/,\s*|\s+and\s+/)
    .map((area) => area.charAt(0).toUpperCase() + area.slice(1));

/** "2017 to now", "2011 to 2016", or "2011" when it starts and ends that year. */
export function yearRange(job: Job) {
  const start = job.data.start.slice(0, 4);
  if (!job.data.end) return `${start} to now`;
  const end = job.data.end.slice(0, 4);
  return start === end ? start : `${start} to ${end}`;
}

/** "Jan 2017 to now", "Aug 2011 to Jan 2016". */
export function monthRange(job: Job) {
  return `${month(job.data.start)} to ${job.data.end ? month(job.data.end) : "now"}`;
}
