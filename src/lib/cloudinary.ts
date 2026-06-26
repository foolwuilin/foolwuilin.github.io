// Insert Cloudinary transformations into a delivery URL.
// Works on any ".../upload/...." Cloudinary URL by injecting params after /upload/.
// Defaults give auto format (WebP/AVIF) + auto quality for top Core Web Vitals.
export function cld(url: string, opts: { w?: number; h?: number; extra?: string } = {}): string {
  if (!url || !url.includes('/upload/')) return url;
  const parts = [`f_auto`, `q_auto`];
  if (opts.w) parts.push(`w_${opts.w}`);
  if (opts.h) parts.push(`h_${opts.h}`);
  if (opts.extra) parts.push(opts.extra);
  const t = parts.join(',');
  // Avoid double-inserting if a transform is already present right after /upload/
  return url.replace('/upload/', `/upload/${t}/`);
}
