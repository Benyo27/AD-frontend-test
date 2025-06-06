import Link from "next/link"
import Image from "next/image"

export default async function Home() {
  return (
    <div>
      <Link href="/" className="flex items-center text-gray-primary font-medium text-sm relative mb-16">
        <Image
          src="/icons/back-arrow.png"
          alt="Cart Icon"
          width={12}
          height={12}
          className="mr-2"
        />
        <p>Back to Catalog</p>
      </Link>
      <h1 className="text-4xl my-4 font-bold text-gray-primary">Your Cart</h1>
      
    </div>
  )
}