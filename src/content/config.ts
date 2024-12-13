import { defineCollection, z } from 'astro:content'

const blogs = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      image: image(),
      content: z.string()
    })
})

export const collections = {
  blogs
}
