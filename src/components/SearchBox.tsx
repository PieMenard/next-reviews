'use client';

import ReviewsPage from '@/app/reviews/page';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';

export default function SearchBox() {
  const reviews = [
    { slug: 'hades-2018', title: 'Hades' },
    { slug: 'fall-guys', title: 'Fall Guys: Ultimate Knockout' },
    { slug: 'black-mesa', title: 'Black Mesa' },
    { slug: 'disco-elysium', title: 'Disco Elysium' },
    { slug: 'dead-cells', title: 'Dead Cells' },
  ];
  return (
    <div className="relative w-48">
      <Combobox>
        <ComboboxInput
          placeholder="Search..."
          className="border px-2 py-1 rounded w-full"
        />
        <ComboboxOptions className="absolute bg-white py-1 w-full">
          {reviews.map((review) => (
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
