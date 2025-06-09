import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../page';
import { getCart, removeFromCart } from '@/utils/cart';

jest.mock('@/utils/cart', () => ({
  getCart: jest.fn(),
  removeFromCart: jest.fn(),
}));

jest.mock('../components/GameCard', () => (props: any) => (
  <div data-testid="game-card">
    {props.game.name}
    <img
      src="/icons/cross.png"
      alt="Remove from cart"
      onClick={() => props.onRemove(props.game.id)}
      data-testid={`remove-${props.game.id}`}
    />
    {props.game.isNew && <span>New</span>}
  </div>
));

jest.mock('../components/OrderSummary', () => (props: any) => (
  <div data-testid="order-summary">{props.games.length} items</div>
));

const mockCart = [
  { id: '1', name: 'Game One', price: 10, isNew: true },
  { id: '2', name: 'Game Two', price: 20 },
];

describe('CartPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders headings and back link', async () => {
    (getCart as jest.Mock).mockReturnValue([]);

    render(<CartPage />);

    expect(await screen.findByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByText('Back to Catalog')).toBeInTheDocument();
  });

  it('renders games from the cart', async () => {
    (getCart as jest.Mock).mockReturnValue(mockCart);

    render(<CartPage />);

    expect(screen.getByText(/Game One/i)).toBeInTheDocument();
    expect(screen.getAllByText('Game Two').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2 items').length).toBeGreaterThan(0);
  });

  it('removes a game from the cart when remove button is clicked', async () => {
    (getCart as jest.Mock).mockReturnValue(mockCart);

    render(<CartPage />);

    const removeIcons = await screen.findAllByAltText('Remove from cart');
    fireEvent.click(removeIcons[0]);

    expect(removeFromCart).toHaveBeenCalledWith('1');
  });

  it('shows checkout button only when cart has items', async () => {
    (getCart as jest.Mock).mockReturnValue(mockCart);

    render(<CartPage />);

    expect(await screen.findByText('Checkout')).toBeInTheDocument();
  });

  it('does not show checkout button when cart is empty', async () => {
    (getCart as jest.Mock).mockReturnValue([]);

    render(<CartPage />);

    expect(screen.queryByText('Checkout')).not.toBeInTheDocument();
  });

  it('shows NewLabel for new games', async () => {
    (getCart as jest.Mock).mockReturnValue(mockCart);

    render(<CartPage />);

    expect(await screen.findByText('New')).toBeInTheDocument();
  });
});
