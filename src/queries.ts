import {
  queryOptions
} from '@tanstack/react-query'
import { describePage, listPages } from './db/page.js'

export const pageQueries = {
  list: () => queryOptions({ queryKey: ['pages', 'list'], queryFn: () => listPages() }),
  describe: (id: string) => queryOptions({ queryKey: ['pages', 'describe', id], queryFn: () => describePage({ data: id }), }),
}

// export function useCreateItemMutation() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: createItem,
//     onMutate: async () => {
//       await queryClient.cancelQueries()
//     },
//   })
// }

// export function useDeleteItemMutation() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: deleteItem,
//     onMutate: async () => {
//       await queryClient.cancelQueries()
//     },
//   })
// }

// export function useUpdateItemMutation() {
//   return useMutation({
//     mutationFn: updateItem,
//   })
// }
