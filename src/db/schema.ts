import { z } from "zod";

export const idSchema = z.string().uuid();

const entity = z.object({
  id: idSchema,
  type: z.string().min(1),
});

const permanentSchedule = z.object({
  type: z.literal("permanentSchedule"),
});

const temporarySchedule = z.object({
  type: z.literal("temporarySchedule"),
  start: z.date(),
  end: z.date(),
});

const cronSchedule = z.object({
  type: z.literal("cronSchedule"),
  cron: z.string().min(1),
  timezone: z.string().min(1),
});

const schedule = z
  .discriminatedUnion('type', [permanentSchedule, temporarySchedule, cronSchedule])
  .default({ type: "permanentSchedule" })
  .optional();

const withSchedule = z.object({
  schedule,
});

const withVisibility = z.object({
  visibility: z
    .union([z.literal("public"), z.literal("private")])
    .default("private")
    .optional(),
});

const promo = entity
  .extend({
    type: z.literal("promo"),

    title: z.string().min(1),
  })
  .merge(withSchedule)
  .merge(withVisibility);

const showcase = entity
  .extend({
    type: z.literal("showcase"),

    title: z.string().min(1),
    category: z.string().min(1),
  })
  .merge(withSchedule)
  .merge(withVisibility);

const content = z.discriminatedUnion('type', [promo, showcase]);

const contentStack = entity.extend({
  type: z.literal("contentStack"),
  content: z.array(content),
});

export const contentGroup = entity.extend({
  type: z.literal("contentGroup"),
  content: z.array(contentStack),
});

const landingMatcher = z.object({
  type: z.literal("landing"),

  slug: z.string().min(1),
});

const listingMatcher = z.object({
  type: z.literal("listing"),

  category: z.string().min(1),
});

export const pageMatcher = z
  .discriminatedUnion('type', [landingMatcher, listingMatcher]);

export const page = entity.extend({
  type: z.literal("page"),
  title: z.string().min(1),

  matcher: pageMatcher,
  contentRows: z.array(contentGroup),
});

export type Page = z.infer<typeof page>;
export type Content = z.infer<typeof content>;
export type ContentGroup = z.infer<typeof contentGroup>;
