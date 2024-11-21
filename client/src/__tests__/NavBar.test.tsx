import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';

// Mock the NavBarTabs component
jest.mock('../components/NavBarTabs', () => () => <div data-testid="nav-bar-tabs">Mocked NavBarTabs</div>);

// Mock the logo image
jest.mock('../assets/images/text.png', () => 'mock-logo.png');

describe('NavBar Component', () => {
    it('renders the navbar container', () => {
        render(<NavBar />);

        // Check that the navbar container is rendered
        const navbarContainer = screen.getByRole('navigation');
        expect(navbarContainer).toBeInTheDocument();
    });

    it('renders the logo with the correct alt text', () => {
        render(<NavBar />);

        // Check that the logo image is rendered
        const logo = screen.getByAltText('logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', 'mock-logo.png');
    });

    it('renders the extExtract logo text', () => {
        render(<NavBar />);

        // Check that the navbar logo text is rendered
        expect(screen.getByText('extExtract')).toBeInTheDocument();
    });

    it('renders the NavBarTabs component', () => {
        render(<NavBar />);

        // Check that the mocked NavBarTabs component is rendered
        expect(screen.getByTestId('nav-bar-tabs')).toBeInTheDocument();
    });
});
