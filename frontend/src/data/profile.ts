// Everything about the person that isn't a project or a job.

export const profile = {
  name: "Andrey Gavel",
  role: "Staff software engineer and manager at Google",
  lede: "Staff software engineer and manager at Google. I build browser card games on the side.",
  email: "andrey.gavel@gmail.com",
  // The longer story, for /cv. Present first, then how I got here.
  bio: [
    "I'm a staff software engineer and manager at Google. I joined in 2017 to work on internal tools and infrastructure, and later moved into managing a team of software engineers working on developer relations projects.",
    "Before Google, I built IVR systems and web portals at Swampfox Technologies, and spent five years at Design Information Technology moving Silverlight and WPF applications to the web and training new developers. I studied computer science at the University of South Carolina, where I also taught Java and Linux labs.",
    "In my own time I make games that run in the browser, mostly card games.",
  ],
} as const;

export const links = [
  { label: "GitHub", href: "https://github.com/fuzzley" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andrey-gavel-3b25b757",
  },
  {
    label: "Google Developer",
    href: "https://me.developers.google.com/u/111756247306367074343",
  },
] as const;

export const education = {
  school: "University of South Carolina",
  degrees: [
    "Master of Engineering, Computer Science",
    "Bachelor of Science, Computer Science",
  ],
} as const;

export const sourceRepo = "https://github.com/fuzzley/fuzzley";
