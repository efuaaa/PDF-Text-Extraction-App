import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import myImage from "../assets/images/upload-file.png";
import pdf from "../assets/images/pdf.png"; // Adjust the path as needed
import ModalView from "./ModalView";


export interface ExtractedFileData {
    filename: string;
    file_content: string;
    feedback_rating: string;
}

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<ExtractedFileData | null>(null);
    const [submittedFeedback, setsubmittedFeedback] = useState<boolean>(false);
    const [uploadedFiles, setUploadedFiles] = useState<ExtractedFileData[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploaded, setUploaded] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModalButton, setShowModalButton] = useState(false);
    const [showExtractButton, setshowExtractButton] = useState(false);
    const [extractedFileContent, setExtractedFileContent] = useState<string>('');



    const handleThumbsUp = () => {
        alert("You clicked Thumbs Up!");
        setIsModalOpen(false);
    };

    const handleThumbsDown = () => {
        alert("You clicked Thumbs Down!");
        setIsModalOpen(false);
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

            console.log("peach");
            console.log(response.data[file.name].file_content)
            setExtractedFileContent(response.data[file.name].file_content)
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file.');
        } finally {
            setIsUploading(false);
        }
    };


    const submitFeedback = async (file_name: string | undefined, feedback: string) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/submit/feedback/', { "file_name": file_name, "feedback": feedback })
            if (response.data === "Submitted feedback successfully") {
                setsubmittedFeedback(true);

            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    const buttonFileSelect = () => {
        fileInputRef.current?.click(); // Programmatically click the file input
    };


    return (
        <div>
            <div style={styles.uploadPdf}>
                <h5 style={styles.headerFive} className="header-two">UPLOAD PDF DOCUMENT</h5>
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
                        {/* <h5>Maximum size: 25MB</h5> */}
                    </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={styles.hiddenInput}
                    accept='.pdf'
                    onChange={handleFileSelect}
                />
                {file && (

                    <div style={styles.progressContainer}>

                        <div style={styles.fileInfo}>
                            <img
                                src={pdf}
                                alt="pdf"
                                style={{ width: "60px", height: "60px" }}
                            />
                            <span style={styles.fileNameText}>{file.name}</span>
                            <span style={styles.fileSizeText}>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>

                            <span style={styles.progressText}>
                                {uploadProgress}%
                            </span>

                        </div>
                        <div style={styles.progressBarContainer}>
                            <div
                                style={{
                                    ...styles.progressBar,
                                    width: `${uploadProgress}%`,
                                }}
                            ></div>
                        </div>
                        {/* {isUploading && (
                            <span style={styles.progressText}>
                                {uploadProgress}%
                            </span>
                        )} */}
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
                {showModalButton && (
                    <button style={styles.modalButton}
                        onClick={() => setIsModalOpen(true)}>Review Extracted Text</button>
                )
                }

                {isModalOpen && (
                    <ModalView
                        title="Your Feedback"
                        file_name={file?.name}
                        onClose={() => setIsModalOpen(false)}
                        file_content={extractedFileContent}
                        onThumbsUp={handleThumbsUp}
                        onThumbsDown={handleThumbsDown}
                    />
                )
                }

            </div>

            {/* <div>
                <div style={styles.uploadBox}>{data?.file_content}</div>
                <div style={styles.feedBackSection}>
                    <button style={styles.downloadButton} onClick={() => submitFeedback(data?.filename, "thumbs up")}>Thumbs Up</button>
                    <button style={styles.downloadButton} onClick={() => submitFeedback(data?.filename, "thumbs down")}>Thumbs Down</button>
                    <button style={styles.downloadButton} onClick={() => getUploadedFiles()}>Get List of Files</button>
                </div>
            </div> */}
        </div>
    );
};

// Styles
const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // width: '100%',
        maxWidth: '800px',
        // maxHeight: '800px',
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
    feedBackSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 20,
        gap: 20,
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
        width: '800px'
    },
    exampleSection: {
        marginTop: '20px',
        textAlign: 'center',
    },
    downloadButton: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
        margin: 20,
    },
    exampleText: {
        marginTop: '10px',
        fontSize: '12px',
        color: '#888888',
    },

    uploadLabel: {
        display: 'block',
        marginBottom: '10px',
        color: '#007BFF',
        cursor: 'pointer',
    },
    orUploadFromURL: {
        marginBottom: '20px',
    },
    input: {
        margin: '10px 0',
        padding: '8px',
        width: '70%',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    fileSizeText: {
        marginTop: 30,
        marginLeft: -130,
        color: '#515151',
        fontSize: 13,
    },
    fileNameText: {
        marginTop: 5,
        color: 'black',
        fontSize: 16,
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
        marginTop: 30,
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: 180,
    },
    headerFive: {
        marginTop: 30,
        marginLeft: 180,
        // paddingBottom: -90,

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
        marginTop: '20px',
        textAlign: 'left' as const,
        backgroundColor: '#F0F3F5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: '100px',
        width: '800px',
        padding: 20,

        borderRadius: '8px',

    },
    fileInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    uploadPdf: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        flexDirection: 'row'
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
    progressText: {
        marginTop: '10px',
        fontSize: '14px',
        color: '#333',
        marginLeft: 650
    },

};

export default FileUpload;
