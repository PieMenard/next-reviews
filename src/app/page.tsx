import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';
import Image from 'next/image';
import Link from 'next/link';

export default async function HomePage() {
  const { reviews } = await getReviews(3, 0);
  return (
    <div>
      <Heading>Indie Game Fans</Heading>
      <p className="pb-3">You page for all your niche game reviews!</p>
      <ul className="flex flex-col gap-3">
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className="bg-white/70 border rounded shadow w-80 sm:w-full hover:shadow-xl"
          >
            <Link
              href={`/reviews/${review.slug}`}
              className="flex flex-col sm:flex-row"
            >
              <Image
                src={review.image}
                alt=""
                priority={index === 0}
                width="320"
                height="180"
                className="rounded-t sm:rounded-l sm:rounded-r-none"
              />
              <div className="px-2 py-1 text-center sm:text-left">
                <h2 className="font-orbitron font-bold py-1">{review.title}</h2>
                <p className="hidden pt-2 sm:block">{review.subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="bg-white/70 border rounded shadow w-80 sm:w-full hover:shadow-xl"></div>
    </div>
  );
}
