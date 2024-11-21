import React, { useState, useEffect } from 'react';

import "../assets/styles/Dashboard.css";
import folder from "../assets/images/folder.png";
import thumbsUp from "../assets/images/thumbs_up.png";
import thumbsDown from "../assets/images/thumbs_down.png";
import rateUp from "../assets/images/rate_up.png";
import rateDown from "../assets/images/rate_down.png";
import axios from 'axios';
import moment from 'moment';


export interface ExtractedFileData {
    filename: string;
    file_content: string;
    feedback_rating: string;
    date_uploaded: string;
}

const Dashboard = () => {
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: ExtractedFileData }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const dictionaryLength = Object.keys(uploadedFiles).length
    const goodFeedbackCount = Object.values(uploadedFiles).filter(
        (file) => file.feedback_rating === "thumbs up"
    ).length;
    const badFeedbackCount = Object.values(uploadedFiles).filter(
        (file) => file.feedback_rating === "thumbs down"
    ).length;
    const goodRatingPercentage = (goodFeedbackCount / dictionaryLength) * 100
    const badRatingPercentage = (badFeedbackCount / dictionaryLength) * 100


    const getUploadedFiles = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/getfiles/')
            setUploadedFiles(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const sortedFiles = Object.entries(uploadedFiles)
        .sort(([, fileA], [, fileB]) => {
            const dateA = new Date(fileA.date_uploaded).getTime();
            const dateB = new Date(fileB.date_uploaded).getTime();
            return dateB - dateA;
        })
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {} as typeof uploadedFiles);

    const fetchSummary = async () => {
        setLoading(true);
        await getUploadedFiles();
        setLoading(false);

    };

    useEffect(() => {
        fetchSummary();
    }, []);


    const renderRatingIcon = (rating: string) => {
        if (rating === "thumbs up") {
            return <img
                src={rateUp}
                alt="rateUp"
                style={{ width: "22px", height: "22px" }}
            />
        }
        if (rating === "thumbs down") {
            return <img
                src={rateDown}
                alt="rateDown"
                style={{ width: "22px", height: "22px" }}
            />;
        }
        return "N/A";
    };

    return (
        <div className="dashboard-container">
            {/* Header Section */}
            <header className="header">
                <h1 className="header-title">Extraction Inventory</h1>
            </header>
            {/* Summary Section */}
            <h5 className="header-two">SUMMARY</h5>
            <section className="summary-section">
                <div className="responsive-card">
                    <div className="summary-card">
                        <div className="summary-icon"> <img
                            src={folder}
                            alt="folder"
                            style={{ width: "60px", height: "60px" }}
                        /></div>
                        <div>
                            <h2 style={{ color: "#2542A3" }}>{dictionaryLength}</h2>
                            <p>Files</p>

                        </div>
                    </div>
                    <div className="summary-card">
                        <div className="summary-icon"><img
                            src={thumbsUp}
                            alt="thumbsUp"
                            style={{ width: "60px", height: "60px" }}
                        /></div>
                        <div>
                            <h2 style={{ color: "#2542A3" }}>{parseFloat(goodRatingPercentage.toFixed(1)) + '%'}</h2>
                            <p>Good Rating</p>

                        </div>
                    </div>
                    <div className="summary-card">
                        <div className="summary-icon"><img
                            src={thumbsDown}
                            alt="thumbsDown"
                            style={{ width: "60px", height: "60px" }}
                        /></div>
                        <div>
                            <h2 style={{ color: "#2542A3" }}>{parseFloat(badRatingPercentage.toFixed(1)) + '%'}</h2>
                            <p>Bad Rating</p>

                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Transactions */}
            <section className="transactions-section">
                <h5 className="header-two">RECENT EXTRACTIONS</h5>


                <div className="summary-card">
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>File name</th>
                                <th>Date uploaded</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(sortedFiles).map(([key, file]) => (
                                <tr key={key}>
                                    <td>{file.filename}</td>
                                    <td>{moment(file.date_uploaded).format('LLL') || 'N/A'}</td>
                                    <td>{renderRatingIcon(file.feedback_rating)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </section>
        </div>
    );
};

export default Dashboard;
