import { getCollection } from 'astro:content';

export type TaggedPost = {
  collection: 'scratch-the-world' | 'tutorials' | 'gear';
  sectionLabel: string;
  slug: string;
  url: string;
  title: string;
  summary: string;
  coverImage: string;
  coverAlt: string;
  date: Date;
  tags: string[];
};

const COLLS = [
  { name: 'scratch-the-world', label: 'Scratch the World' },
  { name: 'tutorials', label: 'Tutorial' },
  { name: 'gear', label: 'Gear' },
] as const;

// Turn a human tag ("Times Square") into a URL-safe slug ("times-square").
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

export async function getAllTaggedPosts(): Promise<TaggedPost[]> {
  const out: TaggedPost[] = [];
  for (const c of COLLS) {
    const entries = (await getCollection(c.name as any)).filter((e: any) => !e.data.draft);
    for (const e of entries as any[]) {
      out.push({
        collection: c.name as TaggedPost['collection'],
        sectionLabel: c.label,
        slug: e.slug,
        url: `/${c.name}/${e.slug}`,
        title: e.data.title,
        summary: e.data.summary,
        coverImage: e.data.coverImage,
        coverAlt: e.data.coverAlt,
        date: e.data.date,
        tags: e.data.tags ?? [],
      });
    }
  }
  return out.sort((a, b) => +b.date - +a.date);
}

export type TagInfo = { tag: string; slug: string; count: number };

export async function getAllTags(): Promise<TagInfo[]> {
  const posts = await getAllTaggedPosts();
  const map = new Map<string, { tag: string; count: number }>();
  for (const p of posts) {
    for (const t of p.tags) {
      const s = tagSlug(t);
      if (!s) continue;
      if (!map.has(s)) map.set(s, { tag: t, count: 0 });
      map.get(s)!.count++;
    }
  }
  return [...map.entries()]
    .map(([slug, v]) => ({ slug, tag: v.tag, count: v.count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export async function getPostsByTagSlug(slug: string): Promise<TaggedPost[]> {
  const posts = await getAllTaggedPosts();
  return posts.filter((p) => p.tags.some((t) => tagSlug(t) === slug));
}
