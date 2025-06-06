import Image from 'next/image';
import { Game } from '@/utils/endpoint';
import NewLabel from '@/components/NewLabel';

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="border border-gray-light rounded-xl p-4">
      <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
        {game.isNew && <NewLabel />}
        <Image
          src={game.image}
          alt={game.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl z-0"
          priority={true}
        />
      </div>

      <p className="text-sm font-semibold text-gray-neutral uppercase mt-3">{game.genre}</p>

      <div className="flex justify-between items-center mt-1 gap-10">
        <h2 className="text-lg font-bold text-gray-primary">{game.name}</h2>
        <span className="text-lg font-bold text-gray-primary">${game.price}</span>
      </div>

      <button className="mt-4 w-full border border-black text-gray-dark font-semibold py-2 rounded hover:bg-gray-light">
        ADD TO CART
      </button>
    </div>
  );
}

