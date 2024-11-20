import React from "react";

interface ModalProps {
    title: string;
    summary: string;
    file_content: string | undefined;
    onClose: () => void;
    onThumbsUp: () => void;
    onThumbsDown: () => void;
}

const ModalView: React.FC<ModalProps> = ({
    title,
    summary,
    file_content,
    onClose,
    onThumbsUp,
    onThumbsDown,
}) => {
    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {/* Close Button */}
                <button style={styles.closeButton} onClick={onClose}>
                    &times;
                </button>

                {/* Title */}
                <h2 style={styles.title}>{title}</h2>

                {/* Summary */}
                <p style={styles.summary}>{summary}</p>
                <div style={styles.uploadBox}>{file_content}</div>

                {/* Buttons */}
                <div style={styles.buttonContainer}>
                    <button style={{ ...styles.button, ...styles.thumbsUp }} onClick={onThumbsUp}>
                        👍 Thumbs Up
                    </button>
                    <button style={{ ...styles.button, ...styles.thumbsDown }} onClick={onThumbsDown}>
                        👎 Thumbs Down
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "500px",
        width: "90%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        position: "relative",
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
    closeButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "none",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
    },
    title: {
        margin: "0 0 20px 0",
        fontSize: "24px",
        fontWeight: "bold",
        textAlign: "center",
    },
    summary: {
        fontSize: "16px",
        color: "#555",
        textAlign: "center",
        marginBottom: "30px",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
    },
    button: {
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        fontSize: "16px",
        cursor: "pointer",
        flex: 1,
        margin: "0 5px",
    },
    thumbsUp: {
        backgroundColor: "#007bff",
        color: "#fff",
    },
    thumbsDown: {
        backgroundColor: "#dc3545",
        color: "#fff",
    },
};

export default ModalView;
