import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useAppForm } from "@/components/ui/form";
import { Header } from "@/components/ui/header";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { EditableText } from "~/components/EditableText";
import { HorizontalBoxPlot } from "~/components/HorizontalBoxPlot/HorizontalBoxPlot";
import { Loader } from "~/components/Loader";
import { pageQueries } from "~/queries";
import { pageMatcher } from "../db/schema";

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

  const pageMatcherForm = useAppForm({
    defaultValues: page.data.matcher,
    validators: {
      onChange: pageMatcher,
    },
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
  });

  return (
    <>
      <Breadcrumbs
        items={[
          { to: "/", label: "Home" },
          { to: "/pages", label: "Pages" },
          { label: page.data.title },
        ]}
      />

      <Header variant="h1">
        <EditableText
          value={page.data.title}
          fieldName="name"
          buttonLabel={`Edit board "${page.data.title}" name`}
          inputLabel="Edit board name"
          onChange={(value) => {
            // updateTitleMutation.mutate({
            //   data
            // })
          }}
        />
      </Header>

      <Container
        header="Matcher"
        description="Define when this page should be rendered"
        footer={
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </div>
        }
      >
        <pageMatcherForm.AppField
          name="type"
          children={(field) => (
            <field.FormField label="Type" description="Determine this page's type">
              <field.Input />
            </field.FormField>
          )}
        />

        <pageMatcherForm.Subscribe
          selector={(state) => state.values.type}
          children={(matcherType) =>
            matcherType === "landing" && (
              <pageMatcherForm.AppField
                name="slug"
                children={(field) => (
                  <field.FormField label="Slug" description="Landing page slug">
                    <field.Input />
                  </field.FormField>
                )}
              />
            )
          }
        />

        <pageMatcherForm.Subscribe
          selector={(state) => state.values.type}
          children={(matcherType) =>
            matcherType === "listing" && (
              <pageMatcherForm.AppField
                name="category"
                children={(field) => (
                  <field.FormField label="category">
                    <field.Input />
                  </field.FormField>
                )}
              />
            )
          }
        />
      </Container>

      <Container header="Timeline">
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
                value: 1745511770555 - 200 * DAY,
                width: 10 * DAY,
              },
              {
                id: "asd2",
                color: "blue",
                label: "Label 2",
                value: 1745511770555 - 30 * DAY,
                width: 200 * DAY,
              },
              {
                id: "asd2",
                color: "purple",
                label: "Label 2",
                value: 1745511770555 - 50 * DAY,
                width: 250 * DAY,
              },
            ],
            [
              {
                id: "asd3",
                color: "green",
                label: "Label 3",
                value: 1745511770555 - 50 * DAY,
                width: 100 * DAY,
              },
              {
                id: "asd3",
                color: "green",
                label: "Label 3",
                value: 1745511770555 - 100 * DAY,
                width: 250 * DAY,
              },
            ],
            {
              id: "asd4",
              color: "yellow",
              label: "Label 4",
              value: 1745511770555 - 40 * DAY,
              width: 150 * DAY,
            },
          ]}
        />
      </Container>
    </>
  );
}

function renderDate(value: number) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
