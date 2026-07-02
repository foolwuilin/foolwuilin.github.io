import { defineCollection, z } from 'astro:content';

// A Cloudinary delivery URL (full https URL) OR a root-relative local path like /images/foo.jpg.
// Transformations are added at render time (Cloudinary URLs only; local paths pass through).
const cloudinaryImage = z
  .string()
  .refine((v) => v.startsWith('http') || v.startsWith('/'), {
    message: 'coverImage must be a full URL or a root-relative path starting with /',
  });

// An optional URL that tolerates the empty string the CMS writes for blank fields.
// Treats '' (or null) as "not set" so leaving the field blank never breaks the build.
const optionalUrl = z.preprocess(
  (v) => (v === '' || v == null ? undefined : v),
  z.string().url().optional(),
);

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
    instagram: optionalUrl, // Instagram post/reel URL (blank allowed)
    gear: z.string().optional(),
    tags: z.array(z.string()).default([]),
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
    instagram: optionalUrl, // Instagram post/reel URL (blank allowed)
    steps: z.array(z.string()).optional(),
    tags: z.array(z.string()).default([]),
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
    instagram: optionalUrl, // Instagram post/reel URL (blank allowed)
    tags: z.array(z.string()).default([]),
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

// Traditional-Chinese (zh-TW) translations. One flat collection; each entry
// links back to its English page via `section` + `enSlug` for hreflang.
const zh = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    section: z.enum(['scratch-the-world', 'tutorials', 'gear']), // English section this belongs to
    enSlug: z.string(),                                          // matching English entry slug
    location: z.string().optional(),
    coverImage: cloudinaryImage,
    coverAlt: z.string(),
    youtube: z.string().optional(),
    instagram: optionalUrl, // Instagram post/reel URL (blank allowed)
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { 'scratch-the-world': scratchTheWorld, tutorials, gear, qa, zh };
