import Link from 'next/link';

export default function ReviewsPage() {
  return (
    <>
      <h1>Reviews</h1>
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
