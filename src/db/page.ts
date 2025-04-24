import { createServerFn } from "@tanstack/react-start";
import { idSchema, page, Page } from "./schema";
import { invariant } from "@tanstack/react-router";
import { z } from "zod";

const pages: Array<Page> = [
    {
        id: '7884a866-4ae1-4945-9fba-b2b8d2b7c5a9',
        type: "page",
        title: "Home",
        matcher: {
            type: "landing",
            slug: "home",
        },
        contentRows: [
            {
                id: '7884a866-4ae1-4945-9fba-b2b8d2b7c5a9',
                type: "contentGroup",
                content: [
                    {
                        id: '7884a866-4ae1-4945-9fba-b2b8d2b7c5a9',
                        type: "contentStack",
                        content: [
                            {
                                id: '7884a866-4ae1-4945-9fba-b2b8d2b7c5a9',

                                type: "promo",
                                schedule: {
                                    type: 'temporarySchedule',
                                    end: new Date('2023-12-31'),
                                    start: new Date('2023-01-01'),
                                },
                                visibility: 'private',
                                title: "Promo 1",
                            },
                        ],
                    },
                ],
            },
        ],
    },
]

const DELAY = 1000
const delay = (ms: number = DELAY) =>
    new Promise((resolve) => setTimeout(resolve, ms))

const listPagesOutput = z.object({
    count: z.number(),
    pages: z.array(page.pick({
        id: true,
        title: true,
        matcher: true,
    })),
})
export const listPages = createServerFn({ method: 'GET' })
    .handler(async () => {
        await delay(DELAY)

        return listPagesOutput.parse({
            count: pages.length,
            pages
        });
    });

export const describePage = createServerFn({ method: 'GET' })
    .validator(idSchema)
    .handler(async ({ data: id }) => {
        await delay(DELAY)
        const page = pages.find((b) => b.id === id)
        invariant(page, 'missing page')
        return page
    });
