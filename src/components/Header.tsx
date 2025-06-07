'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gray-surface sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <Link href="/" className="text-3xl font-medium text-gray-dark">
          GamerShop
        </Link>
        <Link href="/cart" className="relative">
          <Image
            src="/icons/cart.png"
            alt="Cart"
            width={20}
            height={20}
          />
        </Link>
      </div>
    </header>
  );
}
