'use client';

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SearchableReview } from '@/lib/reviews';

type SearchBoxProps = {
  reviews: SearchableReview[];
};

export default function SearchBox({ reviews }: SearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filteredReviews = reviews
    .filter((review) =>
      review.title.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);

  const handleChange = (review: SearchableReview) => {
    if (review) {
      router.push(`/reviews/${review.slug}`);
    }
  };

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <ComboboxInput
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <ComboboxOptions className="absolute bg-white py-1 w-full">
          {filteredReviews.map((review) => (
            <ComboboxOption value={review} key={review.slug}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full ${
                    active ? 'bg-blue-100' : ''
                  }`}
                >
                  {review.title}
                </span>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
