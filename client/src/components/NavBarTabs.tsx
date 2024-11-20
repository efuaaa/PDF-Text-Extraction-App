import React, { useState } from "react";
import "../assets/styles/NavBarTabs.css";
import Dashboard from "./Dashboard";
import FileUpload from "./FileUpload";



const NavBarTabs = () => {
    const [activeTab, setActiveTab] = useState<string>("Upload");

    return (
        <div>
            <div className="tabs-responsive-card">

                <div className="tabs-container">
                    <button
                        className={`tab-button ${activeTab === "Upload" ? "active" : ""}`}
                        onClick={() => setActiveTab("Upload")}
                        style={{ fontFamily: "Avenir", fontSize: 15, fontWeight: "bold" }}
                    >
                        Upload File
                    </button>
                    <button
                        className={`tab-button ${activeTab === "View Recent Extractions" ? "active" : ""}`}
                        onClick={() => setActiveTab("View Recent Extractions")}
                        style={{ fontFamily: "Avenir", fontSize: 15, fontWeight: "bold" }}
                    >
                        View Recent Extractions
                    </button>
                </div>

                {/* Render Based on Selected Tab */}
                <div className="tab-content">
                    {activeTab === "Upload" && <FileUpload />}
                    {activeTab === "View Recent Extractions" && <Dashboard />}
                </div>
            </div>
        </div>
    );
};

export default NavBarTabs;
