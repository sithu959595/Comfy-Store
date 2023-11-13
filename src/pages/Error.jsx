import { useRouteError, Link } from "react-router-dom";
export default function Error() {
  const error = useRouteError();
  let content = "Error!";
  console.log(error);
  if (error.status === 404) {
    content = "Page not Found";
  }
  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <div className="text-center">
        <p className="text-9xl font-semibold text-primary">{error.status}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          {content}
        </h1>
        <div className="mt-10">
          <Link to="/" className="btn btn-secondary">
            Go Back Home
          </Link>
        </div>
      </div>
      {/* <div>{error.data}</div> */}
    </main>
  );
}
