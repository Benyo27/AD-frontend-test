
import { render, screen, fireEvent } from '@testing-library/react';
import GameCard from '../GameCard';
import * as cartUtils from '@/utils/cart';

const mockGame = {
  id: '1',
  name: 'Game One',
  genre: 'Action',
  description: 'Exciting game',
  price: 15,
  image: '/game-one.png',
  isNew: true,
};

jest.mock('@/utils/cart', () => ({
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  isInCart: jest.fn(),
}));

describe('GameCard with cart logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders game info and NewLabel if isNew', () => {
    (cartUtils.isInCart as jest.Mock).mockReturnValue(false);
    render(<GameCard game={mockGame} />);

    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Game One')).toBeInTheDocument();
    expect(screen.getByText('$15')).toBeInTheDocument();
    expect(screen.getByText('ADD TO CART')).toBeInTheDocument();
    expect(screen.getByAltText('Game One')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('shows REMOVE if game is already in cart', () => {
    (cartUtils.isInCart as jest.Mock).mockReturnValue(true);
    render(<GameCard game={mockGame} />);

    expect(screen.getByText('REMOVE')).toBeInTheDocument();
  });

  it('calls addToCart and updates button on clicking ADD TO CART', () => {
    (cartUtils.isInCart as jest.Mock).mockReturnValue(false);
    render(<GameCard game={mockGame} />);

    const button = screen.getByRole('button', { name: 'ADD TO CART' });
    fireEvent.click(button);

    expect(cartUtils.addToCart).toHaveBeenCalledWith(mockGame);
    expect(screen.getByText('REMOVE')).toBeInTheDocument();
  });

  it('calls removeFromCart and updates button on clicking REMOVE', () => {
    (cartUtils.isInCart as jest.Mock).mockReturnValue(true);
    render(<GameCard game={mockGame} />);

    const button = screen.getByRole('button', { name: 'REMOVE' });
    fireEvent.click(button);

    expect(cartUtils.removeFromCart).toHaveBeenCalledWith(mockGame.id);
    expect(screen.getByText('ADD TO CART')).toBeInTheDocument();
  });
});

