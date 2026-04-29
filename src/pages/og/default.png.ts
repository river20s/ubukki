import type { APIRoute } from 'astro';
import { generateOgImage } from '../../lib/og-image';
import { SITE_DESCRIPTION } from '../../consts';

export const GET: APIRoute = async () => {
  const png = await generateOgImage({
    title: SITE_DESCRIPTION,
    type: 'site',
  });

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
