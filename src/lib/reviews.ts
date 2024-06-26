import 'server-only';

import { marked } from 'marked';
import qs from 'qs';

export const CACHE_TAG_REVIEWS = 'reviews';

const CMS_URL = process.env.CMS_URL;

export type CmsItem = {
  id: number;
  attributes: any;
};

export type Review = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  body: string;
};

export type FullReview = Review & {
  body: string;
};

export type PaginatedReviews = {
  pageCount: number;
  reviews: Review[];
};


export type SearchableReview = Pick<Review, 'slug' | 'title'>;

type FetchReviewsResponse = {
  data: {
    attributes: SearchableReview;
  }[];
}
export async function getReview(slug: string): Promise<FullReview | null> {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 1, withCount: false },
  });

  if (data.length === 0) {
    return null;
  }

  const item = data[0];
  return {
    ...toReview(item),
    body: marked(item.attributes.body) as string,
  };
}

export async function getReviews(
  pageSize: number,
  page: number
): Promise<PaginatedReviews> {
  const { data, meta } = await fetchReviews({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize, page },
  });
  return {
    pageCount: meta.pagination.pageCount,
    reviews: data.map(toReview),
  };
}

export async function getSlugs(): Promise<string[]> {
  const { data } = await fetchReviews({
    fields: ['slug'],
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 100 },
  });
  return data.map((item: CmsItem) => item.attributes.slug);
}

export async function searchReviews(
  query: string | null
): Promise<SearchableReview[]> {
  const { data }: FetchReviewsResponse = await fetchReviews({
    filters: { title: { $contains: query } },
    fields: ['slug', 'title'],
    sort: ['title'],
    pagination: { pageSize: 5 },
  });
  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}

export async function fetchReviews(parameters: any) {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(parameters, { encodeValuesOnly: true });
  const response = await fetch(url, {
    next: {
      tags: [CACHE_TAG_REVIEWS],
    },
  });
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}

function toReview(item: CmsItem) {
  const { attributes } = item;
  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: new URL(attributes.image.data.attributes.url, CMS_URL).href
  };
}
