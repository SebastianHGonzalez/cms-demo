import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Loader } from "~/components/Loader";
import { pageQueries } from "~/queries";

export const Route = createFileRoute("/pages/")({
  component: Home,
  pendingComponent: () => <Loader />,
});

function Home() {
  const pagesQuery = useSuspenseQuery(pageQueries.list());

  return (
    <>
      <Breadcrumbs
        items={[
          { to: "/", label: "Home" },
          { to: "/pages", label: "Pages" },
        ]}
      />

      <div className="space-y-2 p-8">
        <h1 className="text-2xl font-black">Pages</h1>
        <ul className="flex list-disc flex-wrap">
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
    </>
  );
}
