import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";

export default function CourseUpload() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const course = {
            title,
            description,
            mediaUrl,
            userId: user.userId,
        };

        try {
            const response = await api.post("https://localhost:7086/api/CourseModels", course);
            const courseId = response.data.courseId;
            alert("Course uploaded successfully!");
            navigate(`/upload-assessment/${courseId}`); // optional: navigate to assessment upload
        } catch (err) {
            alert("Course upload failed.");
            console.error("Upload error:", err.response?.data || err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Upload Course</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Course Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="form-control mb-3"
                    placeholder="Course Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Media URL"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className="col-12 col-md-8 d-flex align-items-end">
                   

                </div>
            </form>
        </div>
    );
}



