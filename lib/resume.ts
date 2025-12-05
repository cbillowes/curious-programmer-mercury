import { allResumes } from 'content-collections';

export function getResume() {
  return allResumes;
}

export function getResumeBySlug(slug: string) {
  return allResumes.find((resume) => resume.slug === slug);
}
