export async function getGames(genre: string = '', page: number = 1) {
  const params = new URLSearchParams();
  if (genre && genre !== 'All') params.append('genre', genre);
  params.append('page', page.toString());

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games?${params.toString()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error fetching games');
  return res.json();
}
