import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

type Review = {
  title: string;
  date: string;
  image: string;
  body: string;
}

export async function getReview(slug: string) {
  const text = await readFile(`./content/reviews/${slug}.md`, 'utf8');
  const {
    content,
    data: { title, date, image },
  } = matter(text);
  const body = marked(content);
  return { title, date, image, body };
}
