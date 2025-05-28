import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../service/api";

export default function UploadQuestions() {
    const { user } = useAuth();
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "",
            options: {
                a: "",
                b: "",
                c: "",
                d: ""
            },
            correctAnswer: ""
        }
    ]);

    const handleChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (index, optKey, value) => {
        const newQuestions = [...questions];
        newQuestions[index].options[optKey] = value;
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        const newQuestion = {
            id: questions.length + 1,
            question: "",
            options: { a: "", b: "", c: "", d: "" },
            correctAnswer: ""
        };
        setQuestions([...questions, newQuestion]);
    };

    const handleSubmit = async () => {
        if (!courseId) {
            alert("Course ID not found.");
            return;
        }

        // Map the questions to match the required field names
        const formattedQuestions = questions.map(({ id, question, options, correctAnswer }) => ({
            id,
            question,
            options,
            answer: correctAnswer // Renaming the field
        }));

        const payload = {
            courseId,
            title: "Mock Test",
            questions: JSON.stringify(formattedQuestions), // stringify as per the required format
            maxScore: formattedQuestions.length // you can also calculate maxScore dynamically
        };

        console.log("payload", payload);

        try {
            await api.post("https://localhost:7086/api/AssessmentModels", payload);
            alert("Assessment uploaded successfully!");
            navigate("/courses");
        } catch (error) {
            console.error("Error uploading assessment", error);
            alert("Failed to upload assessment.");
        }
    };
    

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Upload Questions for Mock Test</h2>
            {questions.map((q, index) => (
                <div key={index} className="mb-4">
                    <label className="form-label">Question {index + 1}</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={q.question}
                        onChange={(e) => handleChange(index, "question", e.target.value)}
                        placeholder="Enter question"
                    />
                    {Object.entries(q.options).map(([key, val]) => (
                        <input
                            key={key}
                            type="text"
                            className="form-control mb-1"
                            placeholder={`Option ${key.toUpperCase()}`}
                            value={val}
                            onChange={(e) => handleOptionChange(index, key, e.target.value)}
                        />
                    ))}
                    
                    <select
                        className="form-select mb-2"
                        value={q.correctAnswer}
                        onChange={(e) => handleChange(index, "correctAnswer", e.target.value)}
                    >
                        <option value="">Select Correct Answer</option>
                        <option value="a">Option A</option>
                        <option value="b">Option B</option>
                        <option value="c">Option C</option>
                        <option value="d">Option D</option>
                    </select>



                </div>
            ))}
            <button onClick={handleAddQuestion} className="btn btn-secondary me-2">
                Add Another Question
            </button>
            <button onClick={handleSubmit} className="btn btn-primary">
                Submit Assessment
            </button>
        </div>
    );
}


















