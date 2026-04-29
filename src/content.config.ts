import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['retrospective', 'cs-notes', 'projects', 'thoughts', 'tutorials']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string().optional(),
    techStack: z.array(z.string()).default([]),
    period: z.object({
      start: z.coerce.date(),
      end: z.coerce.date().optional(),
    }),
    role: z.string(),
    links: z.object({
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
      blog: z.string().optional(),
    }).default({}),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
