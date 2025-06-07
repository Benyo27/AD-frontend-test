import { Game } from "@/utils/endpoint";

type OrderSummaryProps = {
  games: Pick<Game, 'name' | 'price'>[];
};

export default function OrderSummary({ games }: OrderSummaryProps) {
  const total = games.reduce((sum, game) => sum + game.price, 0);

  return (
    <div className="border border-gray-lightest text-gray-primary rounded-xl p-6 h-fit">
      <h2 className="text-xl font-bold  mb-3">Order Summary</h2>
      <h2 className="text-lg  mb-12">{games.length} {games.length === 1 ? 'item' : 'items'}</h2>
      <ul className="space-y-2">
        {games.map((game, index) => (
          <li key={index} className="flex justify-between">
            <span className="">{game.name}</span>
            <span className="">$ {game.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <hr className="my-5" />
      <div className="flex justify-between font-bold text-xl ">
        <span className="mb-8">Order Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
