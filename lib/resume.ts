import { allResumes } from 'content-collections';

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
    });
}
