import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from '~/components/Loader'
import { pageQueries } from '~/queries'

export const Route = createFileRoute('/pages/$pageId')({
  component: Home,
  pendingComponent: () => <Loader />,
  loader: async ({ params, context: { queryClient } }) => {
    // await queryClient.ensureQueryData(pageQueries.describe(params.pageId))
  },
})

function Home() {
  const { pageId } = Route.useParams();

  const page = useSuspenseQuery(pageQueries.describe(pageId));

  return <div>{pageId} - {page.data?.title}</div>
}
