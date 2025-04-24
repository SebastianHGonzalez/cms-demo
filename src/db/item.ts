import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { invariant } from '@tanstack/react-router'
import {
  deleteItemSchema,
  itemSchema
} from './schema'
import type { Item } from './schema'

const DELAY = 1000

const items: Array<Item> = [
  {
    id: '1234',
  },
  {
    id: '1231234',
  },
]

const delay = (ms: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const getItems = createServerFn({ method: 'GET' }).handler(async () => {
  await delay(DELAY)
  return items
})

export const getItem = createServerFn({ method: 'GET' })
  .validator(z.string())
  .handler(async ({ data }) => {
    await delay(DELAY)
    const item = items.find((b) => b.id === data)
    invariant(item, 'missing item')
    return item
  })

export const createItem = createServerFn()
  .validator(itemSchema)
  .handler(async ({ data }) => {
    await delay(DELAY);
    return data;
  })

export const deleteItem = createServerFn({ method: 'GET' })
  .validator(deleteItemSchema)
  .handler(async ({ data }) => {
    await delay(DELAY)
    return data;
  })

export const updateItem = createServerFn()
  .validator(itemSchema)
  .handler(async ({ data }) => {
    await delay(DELAY)
    return data;
  })
