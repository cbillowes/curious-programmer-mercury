import { allResumes } from 'content-collections';

export type Resume = {
  slug: string;
  share: string;
  resume: {
    name?: string;
    description?: string;
    start: string;
    logo?: string;
    category?: string;
    company?: string;
    jobTitle?: string;
    type?: string;
    arrangement?: string;
    location?: string;
    end?: string;
    os?: string;
    tech?: string[];
    summary?: string;
  };
  content: string;
  _meta: {
    filePath: string;
    fileName: string;
    directory: string;
    path: string;
    extension: string;
  };
};

export function getResume() {
  return allResumes
    .sort(
      (a, b) =>
        new Date(a.resume.start).getTime() - new Date(b.resume.start).getTime(),
    )
    .map((resume) => {
      return {
        ...resume,
        slug: `/resume/${resume.slug}`,
      };
    })
    .sort((a, b) => {
      return (
        new Date(b.resume.start).getTime() - new Date(a.resume.start).getTime()
      );
    });
}
