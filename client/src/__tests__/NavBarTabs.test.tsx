import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBarTabs from "../components/NavBarTabs";


// Mock the child components
jest.mock("../components/FileUpload", () => () => <div data-testid="file-upload">Mocked FileUpload</div>);
jest.mock("../components/Dashboard", () => () => <div data-testid="dashboard">Mocked Dashboard</div>);

describe("NavBarTabs Component", () => {
    it("renders the tabs container with both buttons", () => {
        render(<NavBarTabs />);

        // Check that both tab buttons are rendered
        const uploadButton = screen.getByRole("button", { name: /Upload File/i });
        const viewRecentButton = screen.getByRole("button", { name: /View Recent Extractions/i });

        expect(uploadButton).toBeInTheDocument();
        expect(viewRecentButton).toBeInTheDocument();
    });

    it('activates the "Upload File" tab by default and renders FileUpload', () => {
        render(<NavBarTabs />);

        // Check that the "Upload File" tab is active by default
        const uploadButton = screen.getByRole("button", { name: /Upload File/i });
        expect(uploadButton).toHaveClass("active");

        // Check that FileUpload is rendered
        expect(screen.getByTestId("file-upload")).toBeInTheDocument();

        // Check that Dashboard is not rendered
        expect(screen.queryByTestId("dashboard")).not.toBeInTheDocument();
    });

    it('switches to "View Recent Extractions" tab and renders Dashboard', () => {
        render(<NavBarTabs />);

        // Click on the "View Recent Extractions" tab
        const viewRecentButton = screen.getByRole("button", { name: /View Recent Extractions/i });
        fireEvent.click(viewRecentButton);

        // Check that the "View Recent Extractions" tab is active
        expect(viewRecentButton).toHaveClass("active");

        // Check that Dashboard is rendered
        expect(screen.getByTestId("dashboard")).toBeInTheDocument();

        // Check that FileUpload is not rendered
        expect(screen.queryByTestId("file-upload")).not.toBeInTheDocument();
    });

    it('switches back to "Upload File" tab and renders FileUpload', () => {
        render(<NavBarTabs />);

        // Click on the "View Recent Extractions" tab
        const viewRecentButton = screen.getByRole("button", { name: /View Recent Extractions/i });
        fireEvent.click(viewRecentButton);

        // Click back on the "Upload File" tab
        const uploadButton = screen.getByRole("button", { name: /Upload File/i });
        fireEvent.click(uploadButton);

        // Check that the "Upload File" tab is active
        expect(uploadButton).toHaveClass("active");

        // Check that FileUpload is rendered
        expect(screen.getByTestId("file-upload")).toBeInTheDocument();

        // Check that Dashboard is not rendered
        expect(screen.queryByTestId("dashboard")).not.toBeInTheDocument();
    });
});
