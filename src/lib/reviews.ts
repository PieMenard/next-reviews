import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import qs from 'qs';

const CMS_URL = 'http://localhost:1337'

type Review = {
  slug: string;
  title: string;
  date: string;
  image: string;
  body: string;
}

//get featured review most recent
export async function getFeaturedReview(): Promise<Review> {
  const reviews = await getReviews();
  return reviews[0];
}

export async function getReview(slug: string): Promise<Review> {
  const text = await readFile(`./content/reviews/${slug}.md`, 'utf8');
  const {
    content,
    data: { title, date, image },
  } = matter(text);
  const body = marked(content) as string;
  return { slug, title, date, image, body };
}

export async function getReviews(): Promise<Review[]> {
  const url = `${CMS_URL}/api/reviews?` + qs.stringify({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 6 },
  }, { encodeValuesOnly: true });
  const response = await fetch(url);
  const { data } = await response.json();
  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: CMS_URL + attributes.image.data.attributes.url,
  }))
}

export async function getSlugs() {
  const files = await readdir('./content/reviews')
  const slugs = files.filter((file) => file.endsWith('md')).map((file) => file.slice(0, -'.md'.length))
  return slugs;
}


