import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileUpload from '../components/FileUpload';


jest.mock('axios');
const mockedAxios = require('axios');

// Mock MutationObserver to prevent the error
global.MutationObserver = class {
    constructor(callback: any) { }
    disconnect() { }
    observe() { }
    takeRecords() { return []; }
};

// Mock child components
jest.mock('../components/ModalView', () => (props: any) => (
    <div data-testid="modal-view">
        Mocked ModalView: {props.file_content}
        <button onClick={props.handleSubmitFeedback}>Submit Feedback</button>
    </div>
));

// Mock image assets
jest.mock('../assets/images/upload-file.png', () => 'mock-upload-file.png');
jest.mock('../assets/images/pdf.png', () => 'mock-pdf.png');

describe('FileUpload Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('renders the upload button and drag-and-drop area', () => {
        render(<FileUpload />);

        // Verify the upload button
        const uploadButton = screen.getByRole('button', { name: /upload/i });
        expect(uploadButton).toBeInTheDocument();

        // Verify the drag-and-drop area
        expect(screen.getByText(/drag and drop file here/i)).toBeInTheDocument();
    });


    it('handles drag-and-drop file upload', () => {
        render(<FileUpload />);

        // Simulate drag-and-drop
        const file = new File(['dummy content'], 'dragged.pdf', { type: 'application/pdf' });
        const dropArea = screen.getByText(/drag and drop file here/i);

        fireEvent.dragOver(dropArea);
        fireEvent.drop(dropArea, {
            dataTransfer: {
                files: [file],
            },
        });

        // Verify the file name is displayed
        expect(screen.getByText('dragged.pdf')).toBeInTheDocument();
    });
});
