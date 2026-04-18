import { Spinner } from "flowbite-react";

export default function Loading() {
  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner size="xl" aria-label="Loading..." />
      <div data-beacon="loading" />
    </div>
  );
}
