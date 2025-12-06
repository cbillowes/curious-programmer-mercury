import { allResumes } from 'content-collections';

export function getResume() {
  return allResumes.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

export function getResumeBySlug(slug: string) {
  return allResumes.find((resume) => resume.slug === slug);
}
