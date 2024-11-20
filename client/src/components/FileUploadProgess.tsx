import React, { useState } from 'react';
import axios from 'axios';

const FileUploadProgress = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [fileURL, setFileURL] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
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

            console.log("peach");
            console.log(response.data)
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            <div style={styles.container}>
                <div style={styles.uploadBox}>
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="fileInput" style={styles.uploadLabel}>
                        {file ? file.name : 'Select a file to upload'}
                    </label>
                    <span>or drag and drop it here</span>
                </div>

                {file && (
                    <div style={styles.progressContainer}>
                        <div style={styles.fileInfo}>
                            <span>{file.name}</span>
                            <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                        </div>
                        <div style={styles.progressBarContainer}>
                            <div
                                style={{
                                    ...styles.progressBar,
                                    width: `${uploadProgress}%`,
                                }}
                            ></div>
                        </div>
                        {isUploading && (
                            <span style={styles.progressText}>
                                Uploading... {uploadProgress}%
                            </span>
                        )}
                    </div>
                )}
                {
                    file && (
                        <button
                            onClick={handleUpload}
                            style={styles.uploadButton}
                            disabled={isUploading}
                        >
                            {isUploading ? "Extracting..." : "Extract"}
                        </button>
                    )
                }

            </div>

        </>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center' as const,
    },
    uploadBox: {
        border: '2px dashed #ccc',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        cursor: 'pointer',
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
    uploadButton: {
        padding: "10px 20px",
        marginTop: 60,

        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        disabled: {
            backgroundColor: "#cccccc",
            cursor: "not-allowed",
        },
    },
    progressContainer: {
        marginTop: '20px',
        textAlign: 'left' as const,
    },
    fileInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    progressBarContainer: {
        height: '10px',
        width: '100%',
        backgroundColor: '#f3f3f3',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    progressBar: {
        height: '10px',
        backgroundColor: '#007BFF',
        transition: 'width 0.3s ease-in-out', // Add animation
    },
    progressText: {
        marginTop: '10px',
        fontSize: '14px',
        color: '#333',
    },
};

export default FileUploadProgress;
