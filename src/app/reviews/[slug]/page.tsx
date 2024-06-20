import Heading from '@/components/Heading';
import ShareLinkButton from '@/components/ShareLinkButton';
import { getReview, getSlugs } from '@/lib/reviews';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type ReviewPageParams = {
  slug: string;
};

type ReviewPageProps = {
  params: { slug: string };
};

//returns all possible paths that next.js will render
// export async function generateStaticParams(): Promise<ReviewPageParams[]> {
//   const slugs = await getSlugs();
//   return slugs.map((slug) => ({ slug }));
// }

export async function generateMetadata({ params: { slug } }: ReviewPageProps) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title,
  };
}

export default async function ReviewPage({
  params: { slug },
}: ReviewPageProps) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return (
    <>
      <Heading>{review.title} Review</Heading>
      <p className="font-semibold pb-3">{review.subtitle}</p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton />
      </div>
      <Image
        src={review.image}
        alt=""
        priority
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="max-w-screen-sm prose prose-slate"
      />
    </>
  );
}
