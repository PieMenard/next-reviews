'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  children: React.ReactNode;
  href: string;
  prefetch: boolean;
};

export default function NavLink({ children, href, prefetch }: NavLinkProps) {
  const pathname = usePathname();
  if (href === pathname) {
    return <span className="text-orange-800">{children}</span>;
  }

  return (
    <Link
      className="text-orange-800 hover:underline"
      href={href}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
}
