// Links to GitHub and fuzzley.games open in a new tab, so this site stays
// open behind them. Every other link opens in the same tab.

const NEW_TAB_HOSTS = new Set(["github.com", "fuzzley.games"]);

const opensNewTab = (href: string) =>
  NEW_TAB_HOSTS.has(new URL(href, "https://fuzzley.info").hostname);

/** The attributes to spread on a link, which open it in a new tab if it should. */
export const newTab = (href: string) =>
  opensNewTab(href) ? { target: "_blank", rel: "noopener" } : {};

/** A link's accessible name, which says so when the link opens a new tab. */
export const linkName = (name: string, href: string) =>
  opensNewTab(href) ? `${name} (opens in a new tab)` : name;
