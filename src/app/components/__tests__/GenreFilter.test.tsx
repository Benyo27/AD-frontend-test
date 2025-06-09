import { render, screen, fireEvent } from '@testing-library/react';
import GenreFilter from '../GenreFilter';
import { useSearchParams, useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

describe('GenreFilter', () => {
  const pushMock = jest.fn();
  const getMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useSearchParams as jest.Mock).mockReturnValue({
      get: getMock,
      toString: () => 'genre=Action&page=2',
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  it('renders options with filters and selects genre from URL', () => {
    getMock.mockReturnValue('Action');

    render(<GenreFilter filters={['Action', 'Adventure']} />);

    expect(screen.getByDisplayValue('Action')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
  });

  it('defaults to "All" when no genre param', () => {
    getMock.mockReturnValue(null);

    render(<GenreFilter filters={['Action']} />);

    expect(screen.getByDisplayValue('All')).toBeInTheDocument();
  });

  it('calls router.push with updated params on change', () => {
    getMock.mockReturnValue('Action');

    render(<GenreFilter filters={['Action', 'Adventure']} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Adventure' } });

    expect(pushMock).toHaveBeenCalledWith('/?genre=Adventure&page=1');
  });

  it('removes genre param when "All" is selected', () => {
    getMock.mockReturnValue('Adventure');

    render(<GenreFilter filters={['Adventure']} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'All' } });

    expect(pushMock).toHaveBeenCalledWith('/?page=1');
  });
});
