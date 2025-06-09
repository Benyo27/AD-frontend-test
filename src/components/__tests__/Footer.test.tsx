import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders Apply Digital logo with correct alt text', () => {
    render(<Footer />);

    const logo = screen.getByAltText('Apply Digital Logo');
    expect(logo).toBeInTheDocument();
    expect(logo.getAttribute('src')).toContain('apply-digital-logo');
  });
});
