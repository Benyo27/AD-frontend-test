import {
  getCart,
  addToCart,
  removeFromCart,
  isInCart,
} from '../cart';
import { CART_KEY } from '@/config/constants';
import { Game } from '../endpoint';

const mockGame: Game = {
  id: '1',
  name: 'Test Game',
  price: 10,
  image: '',
  genre: 'Action',
  description: '',
  isNew: false,
};

describe('cart utils', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('returns empty array if window is undefined', () => {
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;
    expect(getCart()).toEqual([]);
    global.window = originalWindow;
  });

  it('adds a game to cart', () => {
    addToCart(mockGame);
    const cart = JSON.parse(localStorage.getItem(CART_KEY)!);
    expect(cart).toHaveLength(1);
    expect(cart[0].id).toBe(mockGame.id);
  });

  it('does not add duplicate game', () => {
    addToCart(mockGame);
    addToCart(mockGame);
    const cart = JSON.parse(localStorage.getItem(CART_KEY)!);
    expect(cart).toHaveLength(1);
  });

  it('removes a game from cart', () => {
    addToCart(mockGame);
    removeFromCart(mockGame.id);
    const cart = JSON.parse(localStorage.getItem(CART_KEY)!);
    expect(cart).toHaveLength(0);
  });

  it('checks if game is in cart', () => {
    addToCart(mockGame);
    expect(isInCart(mockGame.id)).toBe(true);
    expect(isInCart('non-existent')).toBe(false);
  });
});
