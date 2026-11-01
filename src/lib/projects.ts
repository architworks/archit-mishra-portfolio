import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
// Compile MDX only when needed to keep homepage lightweight in dev
import { mdxComponents } from '@/components/mdx-components';
import type { Pluggable } from 'unified';

export type ProjectMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  summary?: string;
  tags?: string[];
  cover?: string;
  repo?: string;
  demoUrl?: string;
  linkOut?: string;
  featured?: boolean;
  hidden?: boolean;
  order?: number;
  date: string; // ISO string
};

export type ProjectContent = ProjectMeta & {
  content: React.ReactElement;
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'projects');

export async function listProjectFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files.filter((f) => f.endsWith('.mdx') && f !== 'TEMPLATE.mdx');
  } catch {
    return [];
  }
}

export async function getAllProjectsMeta(): Promise<ProjectMeta[]> {
  const files = await listProjectFiles();
  const items: ProjectMeta[] = [];

  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    const raw = await fs.readFile(full, 'utf8');
    const { data } = matter(raw);
    const slug = path.basename(file, '.mdx');
    const fm = data as Partial<ProjectMeta> & { date?: string | Date };
    if (fm.hidden) continue;
    const d = ((): Date => {
      if (typeof fm.date === 'string') return new Date(fm.date);
      const maybeDate = fm.date as unknown;
      if (maybeDate && maybeDate instanceof Date) return maybeDate as Date;
      return new Date();
    })();
    const item: ProjectMeta = {
      slug,
      title: fm.title || slug,
      subtitle: fm.subtitle,
      summary: fm.summary,
      tags: fm.tags || [],
      cover: fm.cover,
      repo: fm.repo,
      demoUrl: fm.demoUrl,
      linkOut: fm.linkOut,
      featured: fm.featured !== false,
      order: typeof fm.order === 'number' ? fm.order : undefined,
      date: d.toISOString(),
    };
    items.push(item);
  }

  // Sort: order desc, then date desc
  items.sort((a, b) => (b.order ?? -Infinity) - (a.order ?? -Infinity) || new Date(b.date).getTime() - new Date(a.date).getTime());
  return items;
}

export async function getFeaturedProjects(): Promise<ProjectMeta[]> {
  const all = await getAllProjectsMeta();
  return all.filter((p) => p.featured !== false);
}

export async function getProjectBySlug(slugParam: string): Promise<ProjectContent | null> {
  const files = await listProjectFiles();
  const file = files.find((f) => path.basename(f, '.mdx') === slugParam);
  if (!file) return null;
  const full = path.join(CONTENT_DIR, file);
  const source = await fs.readFile(full, 'utf8');

  const { compileMDX } = await import('next-mdx-remote/rsc');
  const remarkGfm = (await import('remark-gfm')).default as unknown as Pluggable;
  const rehypeSlug = (await import('rehype-slug')).default as unknown as Pluggable;

  const { content, frontmatter } = await compileMDX<ProjectMeta>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
    },
    components: mdxComponents as unknown as Record<string, React.ComponentType<unknown>>,
  });

  if (frontmatter.hidden) return null;

  const meta: ProjectMeta = {
    slug: slugParam,
    title: frontmatter.title,
    subtitle: frontmatter.subtitle,
    summary: frontmatter.summary,
    tags: frontmatter.tags || [],
    cover: frontmatter.cover,
    repo: frontmatter.repo,
    demoUrl: frontmatter.demoUrl,
    linkOut: frontmatter.linkOut,
    featured: frontmatter.featured !== false,
    order: frontmatter.order,
    date: frontmatter.date,
  };

  return { ...meta, content };
}
