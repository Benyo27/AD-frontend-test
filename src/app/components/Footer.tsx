'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex justify-center items-center p-12 border-t mt-8 bg-gray-footer">
      <Link href="/">
        <Image
          src="/apply-digital-logo.png"
          alt="Apply Digital Logo"
          width={140}
          height={40}
        />
      </Link>
    </footer>
  );
}
