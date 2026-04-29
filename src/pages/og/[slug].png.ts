import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../../lib/og-image';
import type { CategoryId } from '../../consts';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, category: post.data.category },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImage({
    title: props.title,
    category: props.category as CategoryId,
    type: 'post',
  });

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
