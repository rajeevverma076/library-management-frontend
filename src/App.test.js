// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders the landing page', () => {
//   render(<App />);
// });


import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders welcome message', () => {
  render(<App />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
});