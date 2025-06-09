import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CatalogPage from '../CatalogPage';
import { useSearchParams, useRouter } from 'next/navigation';
import { getGames } from '@/services/games';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('../components/GenreFilter', () => {
  const MockComponent = (props: any) => (
    <div data-testid="genre-filter">{JSON.stringify(props.filters)}</div>
  );
  MockComponent.displayName = 'MockGenreFilter';
  return MockComponent;
});

jest.mock('../components/GameCard', () => {
  const MockComponent = (props: any) => (
    <div data-testid="game-card">{props.game?.title}</div>
  );
  MockComponent.displayName = 'MockGameCard';
  return MockComponent;
});

jest.mock('../components/SkeletonCards', () => {
  const MockComponent = (props: any) => (
    <div data-testid="skeleton-cards">{props.count}</div>
  );
  MockComponent.displayName = 'MockSkeletonCards';
  return MockComponent;
});

jest.mock('@/services/games', () => ({
  getGames: jest.fn(),
}));


describe('CatalogPage', () => {
  const pushMock = jest.fn();
  const setSearchParams = (params: Record<string, string>) => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => params[key] || null,
      toString: () =>
        Object.entries(params)
          .map(([k, v]) => `${k}=${v}`)
          .join('&'),
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it('renders title and GenreFilter', async () => {
    setSearchParams({ genre: '' });
    (getGames as jest.Mock).mockResolvedValue({
      availableFilters: ['Action', 'RPG'],
      games: [],
    });

    render(<CatalogPage />);
    expect(screen.getByText('Top Sellers')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByTestId('genre-filter')).toHaveTextContent('Action')
    );
  });

  it('renders GameCards when games are loaded', async () => {
    setSearchParams({ page: '1', genre: '' });
    (getGames as jest.Mock).mockResolvedValue({
      availableFilters: [],
      games: [
        { id: 1, title: 'Game 1' },
        { id: 2, title: 'Game 2' },
      ],
    });

    render(<CatalogPage />);
    await waitFor(() => {
      expect(screen.getAllByTestId('game-card')).toHaveLength(2);
      expect(screen.getByText('Game 1')).toBeInTheDocument();
      expect(screen.getByText('Game 2')).toBeInTheDocument();
    });
  });

  it('shows SkeletonCards while loading', async () => {
    setSearchParams({ page: '1', genre: '' });
    let resolveGames: any;
    (getGames as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveGames = resolve;
        })
    );

    render(<CatalogPage />);
    expect(screen.getByTestId('skeleton-cards')).toBeInTheDocument();
    resolveGames({ availableFilters: [], games: [] });
    await waitFor(() =>
      expect(screen.queryByTestId('skeleton-cards')).not.toBeInTheDocument()
    );
  });

  it('calls router.push with incremented page on SEE MORE click', async () => {
    setSearchParams({ page: '1', genre: '' });
    (getGames as jest.Mock).mockResolvedValue({
      availableFilters: [],
      games: [],
    });

    render(<CatalogPage />);
    await waitFor(() => expect(getGames).toHaveBeenCalled());
    const button = screen.getByRole('button', { name: /see more/i });
    fireEvent.click(button);
    expect(pushMock).toHaveBeenCalledWith('/?page=2&genre=', { scroll: false });
  });

  it('disables SEE MORE button while loading', async () => {
    setSearchParams({ page: '1', genre: '' });
    let resolveGames: any;
    (getGames as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveGames = resolve;
        })
    );

    render(<CatalogPage />);
    const button = screen.getByRole('button', { name: /see more/i });
    expect(button).toBeDisabled();
    resolveGames({ availableFilters: [], games: [] });
    await waitFor(() => expect(button).not.toBeDisabled());
  });

  it('appends games on next page', async () => {
    setSearchParams({ page: '1', genre: '' });
    (getGames as jest.Mock)
      .mockResolvedValueOnce({
        availableFilters: [],
        games: [{ id: 1, title: 'Game 1' }],
      })
      .mockResolvedValueOnce({
        availableFilters: [],
        games: [{ id: 2, title: 'Game 2' }],
      });

    const { rerender } = render(<CatalogPage />);
    await waitFor(() => expect(screen.getByText('Game 1')).toBeInTheDocument());

    setSearchParams({ page: '2', genre: '' });
    fireEvent.click(screen.getByRole('button', { name: /see more/i }));

    rerender(<CatalogPage />);

    await waitFor(() => expect(screen.getByText('Game 2')).toBeInTheDocument());
  });

  it('handles empty response from getGames (undefined)', async () => {
    setSearchParams({ page: '1', genre: '' });
    (getGames as jest.Mock).mockResolvedValue(undefined);

    render(<CatalogPage />);
    await waitFor(() => {
      expect(screen.getByTestId('genre-filter')).toHaveTextContent('[]');
      expect(screen.queryByTestId('game-card')).not.toBeInTheDocument();
    });
  });

  it('handles response with undefined arrays from getGames', async () => {
    setSearchParams({ page: '1', genre: '' });
    (getGames as jest.Mock).mockResolvedValue({
      availableFilters: undefined,
      games: undefined,
    });

    render(<CatalogPage />);
    await waitFor(() => {
      expect(screen.getByTestId('genre-filter')).toHaveTextContent('[]');
      expect(screen.queryByTestId('game-card')).not.toBeInTheDocument();
    });
  });

  it('handles response with empty arrays from getGames', async () => {
    setSearchParams({ page: '1', genre: '' });
    (getGames as jest.Mock).mockResolvedValue({
      availableFilters: [],
      games: [],
    });

    render(<CatalogPage />);
    await waitFor(() => {
      expect(screen.getByTestId('genre-filter')).toHaveTextContent('[]');
      expect(screen.queryByTestId('game-card')).not.toBeInTheDocument();
    });
  });
});
