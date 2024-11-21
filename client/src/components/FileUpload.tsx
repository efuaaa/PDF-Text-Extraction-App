import React, { useState, useRef } from 'react';
import axios from 'axios';
import myImage from "../assets/images/upload-file.png";
import pdf from "../assets/images/pdf.png"; // Adjust the path as needed
import ModalView from "./ModalView";


const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModalButton, setShowModalButton] = useState(false);
    const [showExtractButton, setshowExtractButton] = useState(false);
    const [showProgressContainer, setshowProgressContainer] = useState(false);
    const [extractedFileContent, setExtractedFileContent] = useState<string>('');


    const handleModalClose = () => {
        alert("Feedback Submitted Successfully!");
        setIsModalOpen(false);
        setshowExtractButton(false);
        setshowProgressContainer(false);
        setUploadProgress(0);
        setShowModalButton(false);
        setFile(null);
    };

    // Handle drag events
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const uploadedFile = event.dataTransfer.files[0];
        setFile(uploadedFile);
    };

    // Handle file selection
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        setFile(uploadedFile || null);
        setshowExtractButton(true)
        setshowProgressContainer(true);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file to upload');
            return;
        }
        setIsUploading(true);
        setUploadProgress(0);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post('http://127.0.0.1:8000/uploadfile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentCompleted);
                    }
                },
            });
            setShowModalButton(true)
            setshowExtractButton(false)
            setExtractedFileContent(response.data[file.name].file_content)
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file.');
        } finally {
            setIsUploading(false);
        }
    };

    const buttonFileSelect = () => {
        fileInputRef.current?.click(); // Programmatically click the file input
    };
    return (
        <div>
            <div style={styles.uploadPdf}>
                <h5 className="header-two">UPLOAD PDF DOCUMENT</h5>
                <button
                    onClick={buttonFileSelect}
                    style={styles.uploadButton1}
                    disabled={isUploading}
                >
                    {isUploading ? "Uploading..." : "Upload"}
                </button>

            </div>
            <div style={styles.container}>

                {/* Drag-and-Drop Area */}
                <div
                    style={{
                        ...styles.uploadBox,
                        ...(isDragging ? styles.dragging : {}),
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >

                    <img
                        src={myImage}
                        alt="My Image"
                        style={{ width: "60px", height: "60px" }}
                    />
                    <p style={styles.instructions}>
                        Drag and Drop file here or{' '}
                        <span style={styles.chooseFile}>Choose file</span>
                    </p>
                    {file && <p style={styles.fileName}>{file.name}</p>}
                    <div style={styles.supportedFormats}>
                        <h5>UPLOAD PDF DOCUMENTS ONLY</h5>

                    </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={styles.hiddenInput}
                    accept='.pdf'
                    onChange={handleFileSelect}
                />
                {file && showProgressContainer && (
                    <div style={styles.progressContainer}>
                        <div style={styles.fileNameContainer}>
                            <img
                                src={pdf}
                                alt="pdf"
                                style={{ width: "60px", height: "60px" }}
                            />
                            <span>{file.name}</span>

                        </div>
                        <div style={styles.fileSizeContainer}>
                            <h5 className="header-two">{(file.size / (1024 * 1024)).toFixed(2)} MB</h5>
                            <h5 className="header-two">{uploadProgress}%</h5>
                        </div>

                        <div style={styles.progressBarContainer}>
                            <div
                                style={{
                                    ...styles.progressBar,
                                    width: `${uploadProgress}%`,
                                }}
                            ></div>
                        </div>
                    </div>

                )}
                {
                    file && showExtractButton && (
                        <button
                            onClick={handleUpload}
                            style={styles.uploadButton}
                            disabled={isUploading}
                        >
                            {isUploading ? "Extracting..." : "Extract"}
                        </button>
                    )
                }
                {showModalButton && showProgressContainer && (
                    <button style={styles.modalButton}
                        onClick={() => setIsModalOpen(true)}>Review Extracted Text</button>
                )}

                {isModalOpen && (
                    <ModalView
                        title="Your Feedback"
                        file_name={file?.name}
                        onClose={() => setIsModalOpen(false)}
                        file_content={extractedFileContent}
                        closeModal={handleModalClose}
                    />
                )}
            </div>
        </div>

    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        marginTop: 30
    },
    uploadBox: {
        border: '2px dashed #cccccc',
        borderRadius: '8px',
        padding: '20px',
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'white',
        cursor: 'pointer',
    },
    dragging: {
        borderColor: '#007bff',
        backgroundColor: '#eef7ff',
    },
    instructions: {
        color: '#555555',
        fontSize: '14px',
    },
    chooseFile: {
        color: '#007bff',
        cursor: 'pointer',
    },
    hiddenInput: {
        border: '2px dashed #cccccc',
        borderRadius: '8px',
        padding: '20px',
        width: '100%',
        height: 150,
        marginTop: -185,
        textAlign: 'center',
        backgroundColor: 'purple',
        cursor: 'pointer',
        opacity: 0,
    },
    fileName: {
        marginTop: '10px',
        fontSize: '14px',
        color: '#333333',
    },
    supportedFormats: {
        marginTop: '20px',
        color: '#888888',
        fontSize: '12px',
        flex: 1,
        flexDirection: 'row',
    },
    input: {
        margin: '10px 0',
        padding: '8px',
        width: '70%',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    uploadButton: {
        padding: "10px 20px",
        marginTop: 60,
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    uploadButton1: {
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },

    modalButton: {
        padding: "10px 20px",
        marginTop: 60,
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        alignSelf: 'center',
    },
    progressContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: '80%',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        marginTop: 30,
        flex: 1,
        backgroundColor: '#F0F3F5',
        padding: 20,
        borderRadius: '8px',

    },
    fileNameContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    fileSizeContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },

    uploadPdf: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        marginTop: 30,
        gap: 20,
        padding: 20,
        flex: 1,
        flexWrap: 'wrap'

    },
    progressBarContainer: {
        height: '8px',
        width: '100%',
        backgroundColor: '#f3f3f3',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    progressBar: {
        height: '8px',
        backgroundColor: '#355FCB',
        transition: 'width 0.3s ease-in-out', // Add animation
    },
};

export default FileUpload;
