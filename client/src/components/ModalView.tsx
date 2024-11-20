import React, { useState } from 'react';
import "../assets/styles/ModalView.css";
import thumbsUp from "../assets/images/thumbs_up.png";
import thumbsDown from "../assets/images/thumbs_down.png";
import axios from 'axios';


interface ModalProps {
    title: string;
    file_name: string | undefined;
    file_content: string;
    onClose: () => void;
    onThumbsUp: () => void;
    onThumbsDown: () => void;
}



const ModalView: React.FC<ModalProps> = ({
    title,
    file_name,
    file_content,
    onClose,
    onThumbsUp,
    onThumbsDown,
}) => {

    const [submittedFeedback, setsubmittedFeedback] = useState<boolean>(false);


    const submitFeedback = async (file_name: string | undefined, feedback: string) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/submit/feedback/', { "file_name": file_name, "feedback": feedback })
            if (response.data === "Submitted feedback successfully") {
                console.log("lolipop")
                setsubmittedFeedback(true);
                onThumbsUp();
                onThumbsDown();
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };
    return (
        <div className="responsive-overlay">
            <div className="responsive-modal">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h4 className="header-two">SUBMIT FEEDBACK - PLEASE REVIEW CAREFULLY</h4>
                <div className="progress-container"><p style={{ fontFamily: "Avenir", fontSize: 14, color: 'grey' }} >Review extracted text from PDF uploaded and give it a thumbs up if the extracted text closely matches contents in pdf, or a thumbs down if does not</p>
                </div>
                <div className="modal-card">
                    <div className="modal-content">{file_content}</div>
                </div>
                <div className="modal-buttons">
                    <button className="modal-button thumbs-up" onClick={() => submitFeedback(file_name, "thumbs up")}>
                        <img
                            src={thumbsUp}
                            alt="thumbsUp"
                            style={{ width: "30px", height: "30px" }}
                        /> Good
                    </button>
                    <button className="modal-button thumbs-down" onClick={() => submitFeedback(file_name, "thumbs down")}>
                        <img
                            src={thumbsDown}
                            alt="thumbsDown"
                            style={{ width: "30px", height: "30px" }}
                        />  Not Good
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ModalView;
