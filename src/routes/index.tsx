import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Loader } from '~/components/Loader'
import { itemQueries } from '~/queries'

export const Route = createFileRoute('/')({
  component: Home,
  pendingComponent: () => <Loader />,
})

function Home() {
  const itemsQuery = useSuspenseQuery(itemQueries.list())

  return (
    <div className="p-8 space-y-2">
      <h1 className="text-2xl font-black">Items</h1>
      <ul className="flex flex-wrap list-disc">
        {itemsQuery.data.map((item) => (
          <li key={item.id} className="ml-4">
            <Link
              to="/items/$itemId"
              params={{
                itemId: item.id,
              }}
              className="font-bold text-blue-500"
            >
              {item.id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
