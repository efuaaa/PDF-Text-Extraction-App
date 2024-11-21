import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import axios from 'axios';

jest.mock('axios'); // Mock axios globally

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
        // Mock API response
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: {
                'File1.pdf': {
                    filename: 'File1.pdf',
                    file_content: 'Extracted content from File1.pdf',
                    feedback_rating: 'thumbs up',
                    date_uploaded: '2024-11-21T10:00:00',
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
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/getfiles/');
        });

        // Find the table by its role and check its contents
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();

        // Verify that the file name is present in the table
        const rows = screen.getAllByRole('row');
        const fileRow = rows.find((row) => row.textContent?.includes('File1.pdf'));
        expect(fileRow).toBeTruthy();
    });
});
