import { getGames } from '../games';

global.fetch = jest.fn();

describe('getGames', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches games without genre', async () => {
    const mockResponse = { data: ['game1', 'game2'] };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await getGames();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/games?page=1'));
    expect(result).toEqual(mockResponse);
  });

  it('fetches games with genre', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    await getGames('Action', 2);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('genre=Action'));
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('page=2'));
  });

  it('throws error if response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(getGames()).rejects.toThrow('Error fetching games');
  });
});
