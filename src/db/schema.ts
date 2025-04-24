import { z } from 'zod'

export const itemSchema = z.object({
  id: z.string(),
});

export const deleteItemSchema = itemSchema.pick({ id: true })

export type Item = z.infer<typeof itemSchema>
