// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// export default function Quiz() {
//     const { aid } = useParams(); // courseId
//     const [questions, setQuestions] = useState([]);
//     const [answers, setAnswers] = useState({});
//     const [score, setScore] = useState(null);
//     const [submittedAt, setSubmittedAt] = useState(null);
//     const [assessment, setAssessment] = useState(null); // Store full assessment object
//     const { user } = useAuth();

//     // Fetch assessment data by courseId
//     const fetchAssessmentByCourseId = async (courseId) => {
//         try {
//             const response = await axios.get(`https://localhost:7086/api/AssessmentModels/ByCourse/${courseId}`);
//             const data = response.data;

//             if (data && data.questions) {
//                 try {
//                     const parsedQuestions = JSON.parse(data.questions);
//                     setQuestions(parsedQuestions);
//                     setAssessment(data); // store full assessment object
                    
//                 } catch (err) {
//                     console.error("Error parsing JSON questions:", err);
//                 }
//             }
//         } catch (err) {
//             console.error("Error fetching assessment:", err);
//         }
//     };

//     useEffect(() => {
//         if (aid) {
//             fetchAssessmentByCourseId(aid);
//         }
//     }, [aid]);

//     const handleChange = (questionId, selectedOption) => {
//         setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
//     };

//     const handleSubmit = async () => {
//         let calculatedScore = 0;
//         questions.forEach((q) => {
//             const selected = answers[q.id];
//             if (selected && String(selected).toLowerCase() === String(q.answer).toLowerCase()) {
//                 calculatedScore += q.score || 1;
//             }
//         });

//         const now = new Date();
//         setScore(calculatedScore);
//         setSubmittedAt(now);

//         if (assessment && user.userId) {
//             const resultPayload = {
//                 assessmentId: assessment.assessmentId,  // ✅ using actual assessmentId
//                 userId: user.userId,
//                 score: calculatedScore,
//                 attemptDate: now.toISOString()
//             };

//             console.log("Submitting result:", resultPayload);

//             try {
//                 await axios.post("https://localhost:7086/api/ResultModels", resultPayload);
//                 console.log("Result submitted successfully.");
//             } catch (error) {
//                 console.error("Error submitting result:", error);
//             }
//         }
//     };

//     const formatDateTime = (date) => date.toLocaleString();

//     return (
//         <div className="container mt-5">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h2>Quiz</h2>
//             </div>

//             {questions.length === 0 ? (
//                 <div>Loading questions...</div>
//             ) : score === null ? (
//                 <>
//                     {questions.map((q) => (
//                         <div key={q.id} className="mb-4">
//                             <h5>{q.question}</h5>
//                             {Object.entries(q.options).map(([key, option]) => (
//                                 <div key={key} className="form-check mb-2">
//                                     <input
//                                         className="form-check-input"
//                                         type="radio"
//                                         name={`question-${q.id}`}
//                                         value={key}
//                                         onChange={() => handleChange(q.id, key)}
//                                         checked={answers[q.id] === key}
//                                     />
//                                     <label className="form-check-label">{option}</label>
//                                 </div>
//                             ))}
//                         </div>
//                     ))}

//                     <button className="btn btn-primary" onClick={handleSubmit}>
//                         Submit Quiz
//                     </button>
//                 </>
//             ) : (
//                 <div className="card p-4 mt-4 shadow-sm">
//                     <h4>Quiz</h4>
//                     <p><strong>Score:</strong> {score} / {questions.reduce((acc, q) => acc + (q.score || 1), 0)}</p>
//                     <p><strong>Submitted At:</strong> {submittedAt && formatDateTime(submittedAt)}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Quiz() {
    const { aid } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [submittedAt, setSubmittedAt] = useState(null);
    const [assessment, setAssessment] = useState(null);
    const { user } = useAuth();

    const fetchAssessmentByCourseId = async (courseId) => {
        try {
            const response = await axios.get(`https://projectwebapp-gmbbhpdubchzf9a6.centralindia-01.azurewebsites.net/api/AssessmentModels/ByCourse/${courseId}`);
            const data = response.data;

            if (data && data.questions) {
                try {
                    const parsedQuestions = JSON.parse(data.questions);
                    setQuestions(parsedQuestions);
                    setAssessment(data);
                } catch (err) {
                    console.error("Error parsing JSON questions:", err);
                }
            }
        } catch (err) {
            console.error("Error fetching assessment:", err);
        }
    };

    useEffect(() => {
        if (aid) {
            fetchAssessmentByCourseId(aid);
        }
    }, [aid]);

    const handleChange = (questionId, selectedOption) => {
        setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
    };

    const handleSubmit = async () => {
        let calculatedScore = 0;
        questions.forEach((q) => {
            const selected = answers[q.id];
            if (selected && String(selected).toLowerCase() === String(q.answer).toLowerCase()) {
                calculatedScore += q.score || 1;
            }
        });

        const now = new Date();
        setScore(calculatedScore);
        setSubmittedAt(now);

        if (assessment && user.userId) {
            const resultPayload = {
                assessmentId: assessment.assessmentId,
                userId: user.userId,
                score: calculatedScore,
                attemptDate: now.toISOString()
            };

            try {
                await axios.post("https://localhost:7086/api/ResultModels", resultPayload);
                console.log("Result submitted successfully.");
            } catch (error) {
                console.error("Error submitting result:", error);
            }
        }
    };

    const formatDateTime = (date) => date.toLocaleString();

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-primary">Quiz Assessment</h2>
                <span className="badge bg-secondary fs-6">{user?.role}</span>
            </div>

            {questions.length === 0 ? (
                <div className="text-muted">Loading questions...</div>
            ) : score === null ? (
                <>
                    {questions.map((q, index) => (
                        <div key={q.id} className="card p-4 mb-4 shadow-sm">
                            <h5 className="fw-semibold mb-3">
                                Q{index + 1}: {q.question}
                            </h5>
                            {Object.entries(q.options).map(([key, option]) => (
                                <div key={key} className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={key}
                                        onChange={() => handleChange(q.id, key)}
                                        checked={answers[q.id] === key}
                                        id={`q${q.id}-${key}`}
                                    />
                                    <label className="form-check-label" htmlFor={`q${q.id}-${key}`}>
                                        {key.toUpperCase()}. {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className="text-center">
                        <button className="btn btn-primary px-5 py-2 fs-5" onClick={handleSubmit}>
                            Submit Quiz
                        </button>
                    </div>
                </>
            ) : (
                <div className="card p-4 mt-5 shadow border-success">
                     <h4 className="fw-bold mb-3" style={{ color: '#6E6E85' }}>Quiz Submitted!</h4>
                     <h4>{user.name}</h4>

                    <p className="mb-2">
                        <strong>Score:</strong> {score} / {questions.reduce((acc, q) => acc + (q.score || 1), 0)}
                    </p>
                    <p>
                        <strong>Submitted At:</strong> {submittedAt && formatDateTime(submittedAt)}
                    </p>
                </div>
            )}
        </div>
    );
}





















