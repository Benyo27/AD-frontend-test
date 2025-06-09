import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Header', () => {
  it('renders site title and cart icon', () => {
    render(<Header />);

    expect(screen.getByText('GamerShop')).toBeInTheDocument();
    const cartImg = screen.getByAltText('Cart');
    expect(cartImg).toBeInTheDocument();
    expect(cartImg.getAttribute('src')).toContain('cart');
  });
});
