import { defineCollection, z } from 'astro:content';

// Define the schema for the projects collection
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    technologies: z.array(z.string()),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    publishDate: z.date(),
  }),
});

// Export the collections
export const collections = {
  'projects': projectsCollection,
};