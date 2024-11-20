import React, { useState } from "react";

interface FeedbackData {
    id: number;
    fileName: string;
    size: string;
    dateUploaded: string;
    lastUpdated: string;
    uploadedBy: {
        name: string;
        email: string;
    };
}

const UploadedFilesView = () => {
    const [feedbackList, setFeedbackList] = useState<FeedbackData[]>([
        {
            id: 1,
            fileName: "Tech requirements.pdf",
            size: "200 KB",
            dateUploaded: "Jan 4, 2022",
            lastUpdated: "Jan 4, 2022",
            uploadedBy: { name: "Olivia Rhye", email: "olivia@untitledui.com" },
        },
        {
            id: 2,
            fileName: "Dashboard screenshot.jpg",
            size: "720 KB",
            dateUploaded: "Jan 4, 2022",
            lastUpdated: "Jan 4, 2022",
            uploadedBy: { name: "Phoenix Baker", email: "phoenix@untitledui.com" },
        },
        {
            id: 3,
            fileName: "Dashboard prototype.mp4",
            size: "16 MB",
            dateUploaded: "Jan 2, 2022",
            lastUpdated: "Jan 2, 2022",
            uploadedBy: { name: "Lana Steiner", email: "lana@untitledui.com" },
        },
        {
            id: 4,
            fileName: "Dashboard prototype FINAL.fig",
            size: "4.2 MB",
            dateUploaded: "Jan 6, 2022",
            lastUpdated: "Jan 6, 2022",
            uploadedBy: { name: "Demi Wilkinson", email: "demi@untitledui.com" },
        },
    ]);

    const [activeTab, setActiveTab] = useState<string>("View all");

    const handleDelete = (id: number) => {
        const updatedList = feedbackList.filter((feedback) => feedback.id !== id);
        setFeedbackList(updatedList);
    };

    const handleEdit = (id: number) => {
        alert(`Editing feedback with ID: ${id}`);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Attached files</h2>
            <p style={styles.subHeader}>
                Files and assets that have been attached to this project.
            </p>

            {/* Tabs */}
            <div style={styles.tabs}>
                {["View all", "Your files", "Shared files"].map((tab) => (
                    <button
                        key={tab}
                        style={{
                            ...styles.tabButton,
                            ...(activeTab === tab ? styles.activeTab : {}),
                        }}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>


            <div style={styles.filters}>
                <input
                    type="text"
                    placeholder="Search"
                    style={styles.searchBox}
                />
            </div>

            {/* Table */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.checkboxColumn}>
                            <input type="checkbox" />
                        </th>
                        <th style={styles.th}>File name</th>
                        <th style={styles.th}>Date uploaded</th>
                        <th style={styles.th}>Last updated</th>
                        <th style={styles.th}>Uploaded by</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbackList.map((feedback) => (
                        <tr key={feedback.id}>
                            <td style={styles.checkboxColumn}>
                                <input type="checkbox" />
                            </td>
                            <td style={styles.td}>
                                <span style={styles.fileName}>{feedback.fileName}</span>
                                <br />
                                <small style={styles.fileSize}>{feedback.size}</small>
                            </td>
                            <td style={styles.td}>{feedback.dateUploaded}</td>
                            <td style={styles.td}>{feedback.lastUpdated}</td>
                            <td style={styles.td}>
                                <strong>{feedback.uploadedBy.name}</strong>
                                <br />
                                <small>{feedback.uploadedBy.email}</small>
                            </td>
                            <td style={styles.td}>
                                <button
                                    style={styles.actionButton}
                                    onClick={() => handleEdit(feedback.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    style={{ ...styles.actionButton, ...styles.deleteButton }}
                                    onClick={() => handleDelete(feedback.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px",
    },
    header: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    subHeader: {
        color: "#666",
        marginBottom: "20px",
    },
    tabs: {
        display: "flex",
        marginBottom: "20px",
    },
    tabButton: {
        padding: "10px 20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        marginRight: "10px",
        backgroundColor: "#f9f9f9",
        cursor: "pointer",
    },
    activeTab: {
        borderBottom: "2px solid #007bff",
        fontWeight: "bold",
        backgroundColor: "#fff",
    },
    filters: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    searchBox: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        flex: 1,
    },
    filterTags: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    filterTag: {
        padding: "5px 10px",
        backgroundColor: "#f1f1f1",
        borderRadius: "20px",
        cursor: "pointer",
    },
    addFilter: {
        color: "#007bff",
        cursor: "pointer",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        textAlign: "left",
        borderBottom: "1px solid #ddd",
        padding: "10px",
        backgroundColor: "#f9f9f9",
    },
    td: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
    },
    fileName: {
        fontWeight: "bold",
    },
    fileSize: {
        color: "#999",
        fontSize: "12px",
    },
    actionButton: {
        padding: "5px 10px",
        marginRight: "5px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "#fff",
        fontSize: "12px",
    },
    deleteButton: {
        backgroundColor: "#dc3545",
    },
    checkboxColumn: {
        width: "30px",
    },
};

export default UploadedFilesView;
