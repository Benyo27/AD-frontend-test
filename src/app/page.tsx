'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GenreFilter from './components/GenreFilter';
import GameCard from './components/GameCard';
import SkeletonCards from './components/SkeletonCards';
import { Game } from '@/utils/endpoint';
import { getGames } from '@/services/games';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const genre = searchParams.get('genre') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);

      if (page === 1) setGames([]);

      const response = await getGames(genre, page);
      const newGames = response?.games || response || [];

      setGames(prev => page === 1 ? newGames : [...prev, ...newGames]);
      setIsLoading(false);
    };

    fetchGames();
  }, [genre, page]);


  const handleSeeMore = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', (page + 1).toString());
    router.push(`/?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div>
      <h1 className="text-4xl my-4 font-bold text-gray-primary">Top Sellers</h1>
      <div className="flex flex-col sm:items-end">
        <GenreFilter />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 mt-6">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}

        {isLoading && <SkeletonCards count={6} />}
      </div>

      <button
        onClick={handleSeeMore}
        className="w-full sm:w-auto mt-12 px-5 py-3 text-sm font-medium bg-gray-dark text-white rounded"
        disabled={isLoading}
      >
        SEE MORE
      </button>
    </div>
  );
}
