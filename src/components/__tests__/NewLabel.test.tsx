import { render, screen } from '@testing-library/react';
import NewLabel from '../NewLabel';

describe('NewLabel', () => {
  it('renders label with text "New"', () => {
    render(<NewLabel />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });
});
