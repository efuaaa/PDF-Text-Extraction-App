import React, { useState } from "react";
import "../assets/styles/Tabs.css";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState<string>("Upload File");

    return (
        <div className="tabs-container">
            <button
                className={`tab-button ${activeTab === "Upload File" ? "active" : ""}`}
                onClick={() => setActiveTab("Upload File")}
            >
                Upload File
            </button>
            <button
                className={`tab-button ${activeTab === "View Recent Extractions" ? "active" : ""}`}
                onClick={() => setActiveTab("View Recent Extractions")}
            >
                View Recent Extractions
            </button>
        </div>
    );
};

export default Tabs;
