import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

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

export async function getReviews() {
  const slugs = await getSlugs();
  const reviews: Review[] = [];
  for (const slug of slugs) {
    const review = await getReview(slug)
    reviews.push(review)
  }
  //sort by most recent
  reviews.sort((a, b) => b.date.localeCompare(a.date));
  return reviews
}

export async function getSlugs() {
  const files = await readdir('./content/reviews')
  const slugs = files.filter((file) => file.endsWith('md')).map((file) => file.slice(0, -'.md'.length))
  return slugs;
}


