import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../components/Dashboard';

jest.mock('axios');
const mockedAxios = require('axios');

// Mock MutationObserver to prevent the error
global.MutationObserver = class {
    constructor(callback: any) { }
    disconnect() { }
    observe() { }
    takeRecords() { return []; }
};

describe('Dashboard Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test to avoid state leaks
    });

    it('fetches and displays uploaded files in the table', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                'File1.pdf': {
                    filename: 'File1.pdf',
                    file_content: 'Extracted content',
                    feedback_rating: 'thumbs up',
                    date_uploaded: '2024-11-21T10:00:00',
                },
                'File2.pdf': {
                    filename: 'File2.pdf',
                    file_content: 'Other content',
                    feedback_rating: 'thumbs down',
                    date_uploaded: '2024-11-20T15:30:00',
                },
            },
        });

        render(<Dashboard />);
        // Wait for the table to render
        await waitFor(() => {
            console.log(screen.debug()); // Inspect the rendered DOM
        });

        // Wait for the data to load and check the table rows
        await waitFor(() => {
            // Verify the API call
            expect(mockedAxios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/getfiles/');
        });

        // Find the table by its role and check its contents
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();

        const headers = screen.getAllByRole('columnheader');
        expect(headers.length).toEqual(3);
    });
});
