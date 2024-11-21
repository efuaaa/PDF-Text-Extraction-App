import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import NavBar from './components/NavBar';

// Mock the NavBar component
jest.mock('./components/NavBar', () => () => <nav data-testid="navbar">Mocked NavBar</nav>);

describe('App Component', () => {
  it('renders the NavBar component', () => {
    render(<App />);

    // Check that the NavBar is rendered
    const navBarElement = screen.getByTestId('navbar');
    expect(navBarElement).toBeInTheDocument();

    // Optionally check the mock content
    expect(navBarElement).toHaveTextContent('Mocked NavBar');
  });
});
