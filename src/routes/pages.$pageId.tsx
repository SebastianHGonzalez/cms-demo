import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { HorizontalBoxPlot } from "~/components/HorizontalBoxPlot/HorizontalBoxPlot";
import { Loader } from "~/components/Loader";
import { pageQueries } from "~/queries";

export const Route = createFileRoute("/pages/$pageId")({
  component: Home,
  pendingComponent: () => <Loader />,
  loader: async ({ params, context: { queryClient } }) => {
    // await queryClient.ensureQueryData(pageQueries.describe(params.pageId))
  },
});

const DAY = 24 * 60 * 60 * 1000;
function Home() {
  const { pageId } = Route.useParams();

  const page = useSuspenseQuery(pageQueries.describe(pageId));

  return (
    <div>
      <div>
        {pageId} - {page.data?.title}
      </div>

      <HorizontalBoxPlot
        gaugeProps={{
          value: 1745511770555,
        }}
        axisProps={{
          renderValue: renderDate,
        }}
        items={[
          [
            {
              id: "asd",
              color: "red",
              label: "Label 1",
              value: 1745511770555 - (200 * DAY),
              width: 10 * DAY,
            },
            {
              id: "asd2",
              color: "blue",
              label: "Label 2",
              value: 1745511770555 - (30 * DAY),
              width: 200 * DAY,
            },
            {
              id: "asd2",
              color: "purple",
              label: "Label 2",
              value: 1745511770555 - (50 * DAY),
              width: 250 * DAY,
            },
          ],
          [{
            id: "asd3",
            color: "green",
            label: "Label 3",
            value: 1745511770555 - (50 * DAY),
            width: 100 * DAY,
          },{
            id: "asd3",
            color: "green",
            label: "Label 3",
            value: 1745511770555 - (100 * DAY),
            width: 250 * DAY,
          },],
          {
            id: "asd4",
            color: "yellow",
            label: "Label 4",
            value: 1745511770555 - (40 * DAY),
            width: 150 * DAY,
          },
        ]}
      />
    </div>
  );
}

function renderDate(value: number) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}