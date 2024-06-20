import { marked } from 'marked';
import qs from 'qs';

const CMS_URL = 'http://localhost:1337'

type CmsItem = {
  id: number;
  attributes: any;
}

type Review = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  body: string;
}

type FullReview = Review & {
  body: string;
}

export async function getReview(slug: string): Promise<FullReview | null> {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 1, withCount: false },
  })

  if (data.length === 0) {
    return null;
  }

  const item = data[0];
  return {
    ...toReview(item),
    body: marked(item.attributes.body) as string
  }

}

export async function getReviews(pageSize: number): Promise<Review[]> {
  const { data } = await fetchReviews({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize },
  })
  return data.map(toReview)
}

export async function getSlugs(): Promise<string[]> {
  const { data } = await fetchReviews({
    fields: ['slug'],
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 100 },
  })
  return data.map((item: CmsItem) => item.attributes.slug)
}

export async function fetchReviews(parameters: any) {
  const url = `${CMS_URL}/api/reviews?` + qs.stringify(parameters, { encodeValuesOnly: true });
  const response = await fetch(url, {
    next: {
      revalidate: 30 //seconds
    }
  });
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}

function toReview(item: CmsItem) {
  const { attributes } = item
  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: CMS_URL + attributes.image.data.attributes.url,
  }
}

