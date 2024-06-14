import Heading from '@/components/Heading';
import Link from 'next/link';

export default function ReviewsPage() {
  return (
    <>
      <Heading>Reviews</Heading>
      <p>List of reviews</p>
      <ul>
        <li>
          <Link href={'/reviews/stardew-valley'}>Stardew Valley</Link>
        </li>
        <li>
          <Link href={'/reviews/hollow-knight'}>Hollow Knight</Link>
        </li>
      </ul>
    </>
  );
}
