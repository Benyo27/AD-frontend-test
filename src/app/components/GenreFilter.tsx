'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getGames } from '@/services/games';

export default function GenreFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedGenre = searchParams.get('genre') || 'All';
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    const loadFilters = async () => {
      const data = await getGames();
      setFilters(data.availableFilters || []);
    }
    loadFilters();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const value = event.target.value;
    value === 'All' ? params.delete('genre') : params.set('genre', value);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center text-gray-primary font-medium text-sm relative">
      <select
        value={selectedGenre}
        onChange={handleChange}
        className="w-full appearance-none bg-transparent pr-16 focus:outline-none"
      >
        <option value="All">All</option>
        {filters.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
      <Image
        src="/icons/down-arrow.png"
        alt="Arrow down icon"
        width={12}
        height={12}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
}
