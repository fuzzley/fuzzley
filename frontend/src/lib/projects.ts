import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** The project's page on this site. */
export const projectPath = (project: Project) => `/projects/${project.id}/`;

/** The game itself, copied in from the project's own repository. */
export const playPath = (project: Project) => `/projects/${project.id}/play/`;

/** One word for the play button on small tiles. */
export const playShort = (project: Project) =>
  project.data.kind === "prototype" ? "Open" : "Play";

/** "2018 to now" for a project still in development, otherwise its start year. */
export const projectYears = (project: Project) =>
  project.data.status === "active"
    ? `${project.data.started} to now`
    : `${project.data.started}`;

/**
 * Names the image's view transition, so a project's picture morphs into the
 * same picture on the next page. Each name may appear once per page.
 */
export const coverTransition = (project: Project) =>
  `view-transition-name: cover-${project.id}`;
