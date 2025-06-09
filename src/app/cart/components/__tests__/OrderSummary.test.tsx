import { render, screen } from '@testing-library/react';
import OrderSummary from '../OrderSummary';

const mockGames = [
  { name: 'Game One', price: 10 },
  { name: 'Game Two', price: 20.5 },
];

describe('OrderSummary', () => {
  it('renders correct items count and total price', () => {
    render(<OrderSummary games={mockGames} />);
    expect(screen.getByText('2 items')).toBeInTheDocument();
    expect(screen.getByText('Game One')).toBeInTheDocument();
    expect(screen.getByText('$ 10.00')).toBeInTheDocument();
    expect(screen.getByText('Game Two')).toBeInTheDocument();
    expect(screen.getByText('$ 20.50')).toBeInTheDocument();
    expect(screen.getByText('Order Total')).toBeInTheDocument();
    expect(screen.getByText('$30.50')).toBeInTheDocument();
  });

  it('displays singular "item" when only one game', () => {
    render(<OrderSummary games={[{ name: 'Single Game', price: 5 }]} />);
    expect(screen.getByText('1 item')).toBeInTheDocument();
    expect(screen.getByText('$ 5.00')).toBeInTheDocument();
  });

  it('renders zero items correctly', () => {
    render(<OrderSummary games={[]} />);
    expect(screen.getByText('0 items')).toBeInTheDocument();
    expect(screen.getByText('Order Total')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });
});
