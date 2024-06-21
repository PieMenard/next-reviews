import { revalidateTag } from 'next/cache';
import { CACHE_TAG_REVIEWS } from '@/lib/reviews';

export async function POST(request) {
  const payload = await request.json();
  if (payload.model === 'review') {
    revalidateTag();
    console.log(`Revalidated ${CACHE_TAG_REVIEWS}`);
  }
  return new Response(null, { status: 204 });
}
