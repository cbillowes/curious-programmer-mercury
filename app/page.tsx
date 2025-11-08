import { getArticles } from '@/lib/articles';
import { getCourses } from '@/lib/courses';
import { getResume } from '@/lib/resume';
import { getScribbles } from '@/lib/scribbles';

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ul>
        {getScribbles().map((scribble) => {
          return (
            <li key={scribble.slug}>
              <a href={scribble.slug}>
                <h3>
                  {scribble.number} - {scribble.title}
                </h3>
              </a>
            </li>
          );
        })}
      </ul>
      <hr />
      <ul>
        {getCourses().map((course) => {
          return (
            <li key={course.slug}>
              <a href={course.slug}>
                <h3>
                  {course.number} - {course.title} - {course.pages.length}
                </h3>
                {course.pages.map((page) => (
                  <div key={page.slug} style={{ marginLeft: '20px' }}>
                    <a href={page.slug}>{page.title}</a>
                  </div>
                ))}
              </a>
            </li>
          );
        })}
      </ul>
      <hr />
      <ul>
        {getArticles().map((article) => {
          return (
            <li key={article.slug}>
              <a href={article.slug}>
                <h3>
                  {article.number} - {article.title}
                </h3>
              </a>
            </li>
          );
        })}
      </ul>
      <hr />
      <ul>
        {getResume().map(({ slug, resume }) => {
          return (
            <li key={slug}>
              <a href={slug}>
                <h3>
                  {resume.company} - {resume.jobTitle}
                </h3>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
