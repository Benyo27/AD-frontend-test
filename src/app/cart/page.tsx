'use client';

import Link from "next/link"
import Image from "next/image"
import { Fragment, useEffect, useState } from "react";
import { getCart, removeFromCart } from "@/utils/cart"
import { Game } from "@/utils/endpoint";
import GameCard from "./components/GameCard";
import OrderSummary from "./components/OrderSummary";

export default function CartPage() {
  const [cart, setCart] = useState<Game[]>([]);

  const handleRemoveFromCart = (gameId: string) => {
    removeFromCart(gameId);
    setCart(prevCart => prevCart.filter(game => game.id !== gameId));
  };

  useEffect(() => {
    setCart(getCart());
  }, []);

  return (
    <div>
      <Link href="/" className="flex items-center text-gray-primary font-medium text-sm relative mb-16">
        <Image
          src="/icons/back-arrow.png"
          alt="Cart Icon"
          width={14}
          height={14}
          className="mr-2"
        />
        <p className="text-lg text-gray-primary">Back to Catalog</p>
      </Link>
      <h1 className="text-4xl my-4 font-bold text-gray-primary">Your Cart</h1>
      <h2 className="text-xl text-gray-primary">{cart.length} {cart.length === 1 ? 'item' : 'items'}</h2>
      {cart.length > 0 && (
        <div className='flex flex-col sm:flex-row gap-20 mt-12 w-full'>
          <div className="flex flex-col gap-2 w-full sm:w-8/12">
            {cart.map((game, index) => (
              <Fragment key={game.id}>
                <GameCard game={game} onRemove={handleRemoveFromCart} />
                {index !== cart.length - 1 && <hr />}
              </Fragment>
            ))}
          </div>
          <div className="flex flex-col w-full sm:w-5/12">
            <OrderSummary games={cart.map(({ name, price }) => ({ name, price }))} />
            <button className="w-full mt-8 px-5 py-4 text-sm font-semibold bg-gray-dark text-white rounded-lg">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}