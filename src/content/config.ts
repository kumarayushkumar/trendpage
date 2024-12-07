import { defineCollection, z } from 'astro:content'

const blogs = defineCollection({
  schema: z.object({
    title: z.string(),
    keywords: z.string(),
    description: z.string(),
    date: z.string(),
    image: z.string(),
    content: z.string()
  })
})

export const collections = {
  blogs
}
