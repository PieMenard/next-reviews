import Heading from '@/components/Heading';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <Heading>Indie Game Fans</Heading>
      <p className="pb-3">You page for all your niche game reviews!</p>
      <div className="bg-white/70 border rounded shadow w-80 sm:w-full hover:shadow-xl">
        <Link
          href={'/reviews/stardew-valley'}
          className="flex flex-col sm:flex-row"
        >
          <img
            src="/images/stardew-valley.jpg"
            alt=""
            width="320"
            height="180"
            className="rounded-t sm:rounded-l sm:rounded-r-none"
          />
          <h2 className="font-orbitron font-bold py-1 text-center sm:px-2">
            Stardew Valley
          </h2>
        </Link>
      </div>
    </div>
  );
}
