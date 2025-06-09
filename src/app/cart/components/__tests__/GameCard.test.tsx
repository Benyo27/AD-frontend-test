import { render, screen, fireEvent } from '@testing-library/react';
import GameCard from '../GameCard';

const mockGame = {
  id: '1',
  name: 'Game One',
  genre: 'Action',
  description: 'Exciting game',
  price: 15,
  image: '/game-one.png',
  isNew: true,
};

describe('GameCard', () => {
  it('renders game info correctly', () => {
    render(<GameCard game={mockGame} onRemove={jest.fn()} />);
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Game One')).toBeInTheDocument();
    expect(screen.getByText('Exciting game')).toBeInTheDocument();
    expect(screen.getByText('$15')).toBeInTheDocument();
    expect(screen.getByAltText('Game One')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('calls onRemove when remove icon is clicked', () => {
    const onRemoveMock = jest.fn();
    render(<GameCard game={mockGame} onRemove={onRemoveMock} />);
    const removeIcon = screen.getByAltText('Remove from cart');
    fireEvent.click(removeIcon);
    expect(onRemoveMock).toHaveBeenCalledWith('1');
  });

  it('does not render NewLabel if isNew is false', () => {
    const gameNotNew = { ...mockGame, isNew: false };
    render(<GameCard game={gameNotNew} onRemove={jest.fn()} />);
    expect(screen.queryByText('New')).not.toBeInTheDocument();
  });
});
