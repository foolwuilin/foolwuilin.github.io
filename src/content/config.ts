import { defineCollection, z } from 'astro:content';

// A Cloudinary delivery URL (full https URL). Transformations are added at render time.
const cloudinaryImage = z.string().url();

const scratchTheWorld = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),            // AEO TL;DR — the answer-first line
    date: z.coerce.date(),
    location: z.string(),           // e.g. "Times Square, New York City"
    country: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    coverImage: cloudinaryImage,
    coverAlt: z.string(),
    youtube: z.string().optional(), // YouTube video ID
    gear: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const tutorials = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    order: z.number().default(0),
    coverImage: cloudinaryImage,
    coverAlt: z.string(),
    youtube: z.string().optional(),
    steps: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const gear = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    order: z.number().default(0),
    coverImage: cloudinaryImage,
    coverAlt: z.string(),
    draft: z.boolean().default(false),
  }),
});

const qa = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().default('General'),
    order: z.number().default(0),
  }),
});

export const collections = { 'scratch-the-world': scratchTheWorld, tutorials, gear, qa };
