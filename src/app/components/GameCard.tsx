'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Game } from '@/utils/endpoint';
import NewLabel from '@/components/NewLabel';
import {
  addToCart,
  removeFromCart,
  isInCart
} from '@/utils/cart';

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(isInCart(game.id));
  }, [game.id]);

  const handleClick = () => {
    if (inCart) {
      removeFromCart(game.id);
      setInCart(false);
    } else {
      addToCart(game);
      setInCart(true);
    }
  };

  return (
    <div className="border border-gray-lightest rounded-xl p-5 h-fit">
      <div className="relative w-full h-64 rounded-t-xl overflow-hidden">
        {game.isNew && <NewLabel />}
        <Image
          src={game.image}
          alt={game.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl z-0"
        />
      </div>

      <p className="text-sm font-semibold text-gray-neutral uppercase mt-4">{game.genre}</p>

      <div className="flex justify-between items-center my-2 gap-10">
        <h2 className="text-lg font-bold text-gray-primary">{game.name}</h2>
        <span className="text-lg font-bold text-gray-primary">${game.price}</span>
      </div>

      <button
        onClick={handleClick}
        className={`py-3 mt-4 w-full border rounded text-base font-semibold ${inCart ? 'border-red-primary text-red-primary hover:bg-red-light' : 'border-black text-gray-dark hover:bg-gray-light'}`}
      >
        {inCart ? 'REMOVE' : 'ADD TO CART'}
      </button>
    </div>
  );
}
