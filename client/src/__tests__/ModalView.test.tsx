import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalView from '../components/ModalView';


jest.mock('axios');
const mockedAxios = require('axios');

// Mock MutationObserver to prevent the error
global.MutationObserver = class {
    constructor(callback: any) { }
    disconnect() { }
    observe() { }
    takeRecords() { return []; }
};

// Mock assets (images)
jest.mock('../assets/images/thumbs_up.png', () => 'thumbsUp.png');
jest.mock('../assets/images/thumbs_down.png', () => 'thumbsDown.png');


// Mock props
const mockOnClose = jest.fn();
const mockHandleSubmitFeedback = jest.fn();
const mockFileContent = 'This is the extracted text.';
const mockFileName = 'example.pdf';

describe('ModalView Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test to avoid state leaks
    });

    it('renders the modal with all elements', () => {
        render(
            <ModalView
                file_name={mockFileName}
                file_content={mockFileContent}
                onClose={mockOnClose}
                handleSubmitFeedback={mockHandleSubmitFeedback}
            />
        );

        // Check header and text
        expect(screen.getByText(/SUBMIT FEEDBACK - PLEASE REVIEW CAREFULLY/i)).toBeInTheDocument();
        expect(screen.getByText(mockFileContent)).toBeInTheDocument();

        // Check buttons
        expect(screen.getByRole('button', { name: /×/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Good/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Bad/i })).toBeInTheDocument();

        // Check images
        expect(screen.getByAltText('thumbsUp')).toBeInTheDocument();
        expect(screen.getByAltText('thumbsDown')).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', () => {
        render(
            <ModalView
                file_name={mockFileName}
                file_content={mockFileContent}
                onClose={mockOnClose}
                handleSubmitFeedback={mockHandleSubmitFeedback}
            />
        );

        // Click the close button
        fireEvent.click(screen.getByRole('button', { name: /×/i }));

        // Verify onClose was called
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('handles axios error gracefully when feedback submission fails', async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));

        render(
            <ModalView
                file_name={mockFileName}
                file_content={mockFileContent}
                onClose={mockOnClose}
                handleSubmitFeedback={mockHandleSubmitFeedback}
            />
        );

        // Click the Good button
        fireEvent.click(screen.getByRole('button', { name: /Good/i }));

        // Verify axios.post was called
        expect(mockedAxios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/submit/feedback/', {
            file_name: mockFileName,
            feedback: 'thumbs up',
        });

        // Ensure handleSubmitFeedback is not called on error
        expect(mockHandleSubmitFeedback).toHaveBeenCalledTimes(0);
    });

});
