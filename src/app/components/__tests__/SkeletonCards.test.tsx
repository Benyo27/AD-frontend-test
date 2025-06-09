import { render, screen } from '@testing-library/react';
import SkeletonCards from '../SkeletonCards';

describe('SkeletonCards', () => {
  it('renders default number of skeletons', () => {
    render(<SkeletonCards />);
    expect(screen.getAllByRole('presentation').length).toBe(6);
  });

  it('renders specified number of skeletons', () => {
    render(<SkeletonCards count={3} />);
    expect(screen.getAllByRole('presentation').length).toBe(3);
  });
});
