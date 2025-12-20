import { getTags } from '@/lib/tags';

const tags = [
  {
    name: 'Self',
    category: 'Soft Skills',
    description:
      'How you think, feel, and show up as a human doing complex work.',
    tags: [
      'Mindset',
      'Values',
      'Mental Health',
      'Comfort Zone',
      'Personal Growth',
      'Personal Development',
    ],
  },
  {
    name: 'Craft',
    category: 'Soft Skills',
    description: 'How you improve, learn, and deliver better work over time.',
    tags: [
      'Skills',
      'Continuous Learning',
      'Continuous Improvement',
      'Lean',
      'Lean Six Sigma',
      'Performance',
      'Process',
      'Continuous Delivery',
    ],
  },
  {
    name: 'Work',
    category: 'Soft Skills',
    description:
      'How you execute day-to-day in the real world of deadlines, teams, and trade-offs.',
    tags: [
      'Productivity',
      'Time Management',
      'Communication',
      'Collaboration',
      'Accountability',
    ],
  },
  {
    name: 'Career',
    category: 'Soft Skills',
    description:
      'How you grow influence, direction, and opportunity beyond your current role.',
    tags: [
      'Leadership',
      'Management',
      'Culture',
      'Relationships',
      'Networking',
      'Personal Brand',
      'Career',
    ],
  },
  {
    name: 'Foundations',
    category: 'Software Engineering',
    description:
      'Core concepts and thinking skills that underpin good software engineering, regardless of language or framework.',
    tags: [
      'Technical',
      'Problem Solving',
      'Algorithms',
      'Systems Thinking',
      'Arrays',
      'Coding Challenges',
      'Interviews',
    ],
  },
  {
    name: 'Data and Analytics',
    category: 'Software Engineering',
    description:
      'Working with data, from storage and querying to analysis, observability, and insight generation.',
    tags: [
      'Database',
      'Analytics',
      'Data Science',
      'Datomic',
      'Astra DB',
      'Elasticsearch',
      'MongoDB',
      'Neon',
      'Solr',
      'TSQL',
      'Metabase',
      'Graylog',
      'Kibana',
    ],
  },
  {
    name: 'Web and Application Development',
    category: 'Software Engineering',
    description:
      'Building user-facing applications, APIs, and web platforms across modern stacks.',
    tags: [
      'Web Development',
      'JavaScript',
      'Node',
      'React',
      'Next.js',
      'Gatsby',
      'Jamstack',
      'Router',
      'Image Optimization',
      'Tailwind CSS',
      'Flowbite',
      'Storybook',
      'WordPress',
      'Static Site Generator',
      'Jekyll',
    ],
  },
  {
    name: 'Languages and Runtimes',
    category: 'Software Engineering',
    description:
      'Programming languages and ecosystems used to build and run software.',
    tags: [
      'Clojure',
      'ClojureScript',
      'Java',
      'npm',
      'Webpack',
      'deps.edn',
      'Reagent',
    ],
  },
  {
    name: 'Tooling and Developer Experience',
    category: 'Engineering Toolkit',
    description:
      'Tools that improve productivity, debugging, feedback loops, and everyday developer workflows.',
    tags: [
      'Tools',
      'DevTools',
      'Chrome DevTools',
      'VS Code',
      'IntelliJ',
      'Extensions',
      'Cheat Sheet',
      'Documentation',
      'Logging',
      'Testing',
      'Image Editing',
    ],
  },
  {
    name: 'Infrastructure and Platforms',
    category: 'Software Engineering',
    description:
      'Hosting, deployment, networking, and platform services that software runs on.',
    tags: [
      'GCP',
      'Google Firebase',
      'Google Firebase Auth',
      'Netlify',
      'Nginx',
      "Let's Encrypt",
      'Stack Auth',
      'Content Collections',
    ],
  },
  {
    name: 'Operating Systems and Environments',
    category: 'Software Engineering',
    description:
      'Operating systems and environments developers work within day-to-day.',
    tags: [
      'Linux',
      'Fedora',
      'MacOS',
      'Terminal',
      'CLI',
      'Clojure CLI',
      'Telnet',
      'Hardware',
    ],
  },
  {
    name: 'Version Control and Collaboration',
    category: 'Engineering Toolkit',
    description:
      'Managing code history, collaboration, and safe change over time.',
    tags: ['Git'],
  },
  {
    name: 'Security',
    category: 'Software Engineering',
    description:
      'Protecting systems, data, and users through secure design and tooling.',
    tags: ['Security', 'Cisco'],
  },
  {
    name: 'Browsers and Frontend Tools',
    category: 'Engineering Toolkit',
    description:
      'Browser platforms and tools used to build, debug, and test frontend applications.',
    tags: ['Chrome', 'Photopea'],
  },
  {
    name: 'Miscellaneous',
    category: 'General',
    description: 'Various topics that don’t fit neatly into other categories.',
    tags: ['Tip', 'Tutorial', 'Boot Camp', 'dev.to', 'Le Wagon'],
  },
  {
    name: 'Levels',
    category: 'General',
    description: 'Experience levels for content.',
    tags: ['Hack', 'Beginner', 'Intermediate', 'Advanced'],
  },
];

export function getCategories() {
  return Array.from(new Set(tags.map((tag) => tag.category)));
}

export function getSubCategories(category: string) {
  return tags.filter((tag) => tag.category === category);
}

export function getTagsBySubCategory(subCategory: string) {
  const found = tags.find((tag) => tag.name === subCategory);
  return getTags()
    .filter((tag) => found?.tags.includes(tag.tag))
    .sort((a, b) => b.count - a.count);
}
