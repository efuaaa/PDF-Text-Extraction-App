import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import ModalView from '../components/ModalView'; // Update the path to your ModalView component

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ModalView Component', () => {
    const mockProps = {
        title: 'Test Modal',
        file_name: 'example.pdf',
        file_content: 'This is a sample extracted text.',
        onClose: jest.fn(),
        onThumbsUp: jest.fn(),
        onThumbsDown: jest.fn(),
    };

    beforeEach(() => {
        mockedAxios.post.mockClear();
        mockProps.onClose.mockClear();
        mockProps.onThumbsUp.mockClear();
        mockProps.onThumbsDown.mockClear();
    });

    it('renders ModalView with correct props', () => {
        render(<ModalView {...mockProps} />);
        expect(screen.getByText('SUBMIT FEEDBACK - PLEASE REVIEW CAREFULLY')).toBeInTheDocument();
        expect(screen.getByText(mockProps.file_content)).toBeInTheDocument();
        expect(screen.getByAltText('thumbsUp')).toBeInTheDocument();
        expect(screen.getByAltText('thumbsDown')).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', () => {
        render(<ModalView {...mockProps} />);
        fireEvent.click(screen.getByText('×'));
        expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('submits "thumbs up" feedback and calls onThumbsUp', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: 'Submitted feedback successfully' });

        render(<ModalView {...mockProps} />);
        fireEvent.click(screen.getByText(/Good/i));

        expect(mockedAxios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/submit/feedback/', {
            file_name: mockProps.file_name,
            feedback: 'thumbs up',
        });

        await screen.findByText(/Good/i); // Wait for any asynchronous effects to complete
        expect(mockProps.onThumbsUp).toHaveBeenCalledTimes(1);
        expect(mockProps.onThumbsDown).toHaveBeenCalledTimes(1);
    });

    it('submits "thumbs down" feedback and calls onThumbsDown', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: 'Submitted feedback successfully' });

        render(<ModalView {...mockProps} />);
        fireEvent.click(screen.getByText(/Not Good/i));

        expect(mockedAxios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/submit/feedback/', {
            file_name: mockProps.file_name,
            feedback: 'thumbs down',
        });

        await screen.findByText(/Not Good/i); // Wait for any asynchronous effects to complete
        expect(mockProps.onThumbsUp).toHaveBeenCalledTimes(1);
        expect(mockProps.onThumbsDown).toHaveBeenCalledTimes(1);
    });

    it('handles feedback submission error gracefully', async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));

        render(<ModalView {...mockProps} />);
        fireEvent.click(screen.getByText(/Good/i));

        expect(mockedAxios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/submit/feedback/', {
            file_name: mockProps.file_name,
            feedback: 'thumbs up',
        });

        await screen.findByText(/Good/i); // Wait for any asynchronous effects to complete
        expect(mockProps.onThumbsUp).not.toHaveBeenCalled();
        expect(mockProps.onThumbsDown).not.toHaveBeenCalled();
    });
});
