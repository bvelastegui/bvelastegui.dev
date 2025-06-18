import { defineCollection, z } from 'astro:content';
import { file } from "astro/loaders";

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

const experiencesCollection = defineCollection({
  loader: file('src/data/experiences.json'),
  schema: z.object({
    startDate: z.string(),
    endDate: z.string().optional(),
    company: z.string(),
    position: z.string(),
    description: z.string(),
  }),
});

// Export the collections
export const collections = {
  'projects': projectsCollection,
  'experiences': experiencesCollection,
};