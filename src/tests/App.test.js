import React from 'react';
import { render } from '@testing-library/react';
import App from '../containers/App';

it('renders Deaths Card', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
