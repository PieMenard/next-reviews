import Link from 'next/link';
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

type PaginationBarProps = {
  href: string;
  page: number;
  pageCount: number;
};

type PaginationLinkProps = {
  children: React.ReactNode;
  enabled: boolean;
  href: string;
};

export default function PaginationBar({
  href,
  page,
  pageCount,
}: PaginationBarProps) {
  return (
    <div className="flex gap-2 pb-3">
      <PaginationLink href={`${href}?page=${page - 1}`} enabled={page > 1}>
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="sr-only">Previous Page</span>
      </PaginationLink>
      <span>
        Page {page} of {pageCount}
      </span>
      <PaginationLink
        href={`${href}?page=${page + 1}`}
        enabled={page < pageCount}
      >
        <ChevronRightIcon className="h-5 w-5" />
        <span className="sr-only">Next Page</span>
      </PaginationLink>
    </div>
  );
}

function PaginationLink({ children, enabled, href }: PaginationLinkProps) {
  if (!enabled) {
    return (
      <span className="border cursor-not-allowwed rounded text-slate-300 text-sm">
        {children}
      </span>
    );
  } else
    return (
      <Link
        href={href}
        className="border rounded text-slate-500 text-sm hover:bg-blue-100 hover:text-slate-700"
      >
        {children}
      </Link>
    );
}
