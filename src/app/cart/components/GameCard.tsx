'use client';

import Image from 'next/image';
import { Game } from '@/utils/endpoint';
import NewLabel from '@/components/NewLabel';

type GameCardProps = {
  game: Game;
  onRemove: (gameId: string) => void;
};

export default function GameCard({ game, onRemove }: GameCardProps) {
  const handleClick = () => {
    onRemove(game.id);
  };

  return (
    <div className="flex flex-col sm:flex-row p-4 relative gap-6">
      <div className="relative w-11/12 sm:w-72 h-48">
        {game.isNew && <NewLabel />}
        <Image
          src={game.image}
          alt={game.name}
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between pr-12">
        <div>
          <h1 className="text-base font-semibold text-gray-neutral uppercase mt-3">{game.genre}</h1>
          <h2 className="text-lg font-bold text-gray-primary">{game.name}</h2>
          <p className='text-base text-gray-neutral'>{game.description}</p>
        </div>
        <div className="flex flex-col items-end mt-8 sm:mt-0">
          <span className="text-lg font-bold text-gray-primary">${game.price}</span>
        </div>
      </div>
      <Image
        src="/icons/cross.png"
        alt="Remove from cart"
        width={12}
        height={12}
        onClick={handleClick}
        className="z-10 absolute top-5 right-5 cursor-pointer hover:opacity-80 transition-opacity duration-200"
      />
    </div>
  );
}
