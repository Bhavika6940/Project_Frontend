

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import dashboardImage from './image1.png'; // Adjust path if needed

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                {/* Left side - Text and Button */}
                <div className="col-md-6 mb-4 mb-md-0">
                    <h2>Welcome to <strong>EduSync</strong>, {user?.role}!</h2>
                    <p className="lead">
                        EduSync empowers students and educators with intuitive tools for managing courses,
                        tracking progress, and enhancing learning outcomes.
                    </p>
                    <p>
                        Whether you're exploring new topics or organizing content, EduSync provides a seamless
                        and engaging educational experience.
                    </p>
                    {user?.role === 'Student' ? (
                        <Link to="/courses" className="btn btn-success">Get Started</Link>
                    ) : (
                        <Link to="/courses" className="btn btn-success">Manage Courses</Link>
                    )}
                </div>

                {/* Right side - Image */}
                <div className="col-md-6 text-center">
                    <img
                        src={dashboardImage}
                        alt="Students Collaborating"
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: '350px' }}
                    />
                </div>
            </div>
        </div>
    );
}