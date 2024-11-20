import React from "react";
import "../assets/styles/Dashboard.css";
import logo from "../assets/images/text.png";
import Tabs from "./Tabs";


const Dashboard = () => {
    return (
        <div className="dashboard-container">

            {/* Header Section */}
            <header className="header">
                <h1 className="header-title">Fintory</h1>
            </header>

            {/* Summary Section */}
            <section className="summary-section">
                <div className="summary-card">
                    <div className="summary-icon">⬇️</div>
                    <div>
                        <p>Deposits</p>
                        <h2>$34,380.19</h2>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon">⬆️</div>
                    <div>
                        <p>Disbursements</p>
                        <h2>$12,426.02</h2>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon">📅</div>
                    <div>
                        <p>Average deposit</p>
                        <h2>$1,380.12</h2>
                    </div>
                </div>
            </section>

            {/* Recent Transactions */}
            <section className="transactions-section">
                <h2>Recent Transactions</h2>
                <div className="transactions-tabs">
                    <button className="active-tab">Deposits</button>
                    <button>Disbursements</button>
                </div>
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Transaction date</th>
                            <th>Type</th>
                            <th>Receiver country</th>
                            <th>Send amount</th>
                            <th>Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>27/07/2022, 7:32am</td>
                            <td>3424121248GH</td>
                            <td>🇩🇪 Germany</td>
                            <td>$4,818.22</td>
                            <td>$2.00</td>
                        </tr>
                        <tr>
                            <td>27/07/2022, 7:32am</td>
                            <td>3424121248GH</td>
                            <td>🇮🇹 Italy</td>
                            <td>$2,818.22</td>
                            <td>$2.00</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Dashboard;
