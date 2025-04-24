import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from './db/item.js'

export const itemQueries = {
  list: () =>
    queryOptions({ queryKey: ['items', 'list'], queryFn: () => getItems() }),
  detail: (id: string) =>
    queryOptions({
      queryKey: ['items', 'detail', id],
      queryFn: () => getItem({ data: id }),
    }),
}

export function useCreateItemMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createItem,
    onMutate: async (variables) => {
      await queryClient.cancelQueries()
    },
  })
}

export function useDeleteItemMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteItem,
    onMutate: async (variables) => {
      await queryClient.cancelQueries()
    },
  })
}

export function useUpdateItemMutation() {
  return useMutation({
    mutationFn: updateItem,
  })
}
