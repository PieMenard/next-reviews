import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
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
  date: string;
  image: string;
  body: string;
}

type FullReview = Review & {
  body: string;
}

//get featured review most recent
export async function getFeaturedReview(): Promise<Review> {
  const reviews = await getReviews();
  return reviews[0];
}

export async function getReview(slug: string): Promise<FullReview> {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 1, withCount: false },
  })
  const item = data[0];
  return {
    ...toReview(item),
    body: marked(item.attributes.body) as string
  }

}

export async function getReviews(): Promise<Review[]> {
  const { data } = await fetchReviews({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 6 },
  })
  return data.map(toReview)
}

export async function getSlugs() {
  const files = await readdir('./content/reviews')
  const slugs = files.filter((file) => file.endsWith('md')).map((file) => file.slice(0, -'.md'.length))
  return slugs;
}

export async function fetchReviews(parameters: any) {
  const url = `${CMS_URL}/api/reviews?` + qs.stringify(parameters, { encodeValuesOnly: true });
  const response = await fetch(url);
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
    date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: CMS_URL + attributes.image.data.attributes.url,
  }
}

