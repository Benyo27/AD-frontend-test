import { CART_KEY } from "@/config/constants";
import { Game } from "./endpoint";

export function getCart(): Game[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

export function addToCart(game: Game) {
  const items = getCart();
  const exists = items.some(item => item.id === game.id);
  if (!exists) {
    localStorage.setItem(CART_KEY, JSON.stringify([...items, game]));
  }
}

export function removeFromCart(id: string) {
  const items = getCart().filter(item => item.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function isInCart(id: string): boolean {
  return getCart().some(item => item.id === id);
}
