import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Loader } from "~/components/Loader";
import { pageQueries } from "~/queries";

export const Route = createFileRoute("/")({
  component: Home,
  pendingComponent: () => <Loader />,
});

function Home() {
  const pagesQuery = useSuspenseQuery(pageQueries.list());

  return (
    <div className="p-8 space-y-2">
      <h1 className="text-2xl font-black">Pages</h1>
      <ul className="flex flex-wrap list-disc">
        {pagesQuery.data.pages.map((page) => (
          <li key={page.id} className="ml-4">
            <Link
              to="/pages/$pageId"
              params={{
                pageId: page.id,
              }}
              className="font-bold text-blue-500"
            >
              {page.title}
              <i>({page.id})</i>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
