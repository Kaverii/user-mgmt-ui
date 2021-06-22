import { render, screen } from '@testing-library/react';
import HomeScreen from './';

test('renders learn react link', () => {
  render(<HomeScreen />);
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});
