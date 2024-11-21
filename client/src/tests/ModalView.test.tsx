import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ModalView from '../components/ModalView'; // Update the path to your component
// import axios from 'axios';

jest.mock('axios'); // Automatically use the axios mock

// const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ModalView Component', () => {
    const mockProps = {
        title: 'Test Modal Title',
        file_name: 'test.pdf',
        file_content: 'Extracted content from the file.',
        onClose: jest.fn(),
        closeModal: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks(); // Reset mock calls before each test
    });

    it('renders ModalView with correct props', () => {
        render(<ModalView {...mockProps} />);

        // Verify modal title is displayed
        expect(screen.getByText('SUBMIT FEEDBACK - PLEASE REVIEW CAREFULLY')).toBeInTheDocument();

        // Verify file content is displayed
        expect(screen.getByText('Extracted content from the file.')).toBeInTheDocument();

        // Verify the buttons are displayed
        expect(screen.getByText('Good')).toBeInTheDocument();
        expect(screen.getByText('Not Good')).toBeInTheDocument();
    });

    it('handles thumbs up feedback submission', async () => {
        const axios = require('axios');
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: 'Submitted feedback successfully',
        });

        render(<ModalView {...mockProps} />);

        const thumbsUpButton = screen.getByText('Good');
        fireEvent.click(thumbsUpButton);



        // Verify the closeModal function is called
        expect(mockProps.closeModal).toHaveBeenCalled();
    });

    it('handles thumbs down feedback submission', async () => {
        const axios = require('axios');
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: 'Submitted feedback successfully',
        });

        render(<ModalView {...mockProps} />);

        const thumbsDownButton = screen.getByText('Not Good');
        fireEvent.click(thumbsDownButton);


        // Verify the closeModal function is called
        expect(mockProps.closeModal).toHaveBeenCalled();
    });

    it('calls onClose when close button is clicked', () => {
        render(<ModalView {...mockProps} />);

        const closeButton = screen.getByText('×'); // Find the close button
        fireEvent.click(closeButton);

        // Verify the onClose function is called
        expect(mockProps.onClose).toHaveBeenCalled();
    });
});
