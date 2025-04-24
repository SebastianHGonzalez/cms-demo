import { createFileRoute } from '@tanstack/react-router'
import { Loader } from '~/components/Loader'
import { itemQueries } from '~/queries'

export const Route = createFileRoute('/items/$itemId')({
  component: Home,
  pendingComponent: () => <Loader />,
  loader: async ({ params, context: { queryClient } }) => {
    await queryClient.ensureQueryData(itemQueries.detail(params.itemId))
  },
})

function Home() {
  const { itemId } = Route.useParams()

  return <div>{itemId}</div>
}
