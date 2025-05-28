
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
                <i className="bi bi-mortarboard me-2"></i> EduSync
            </Link>
            <div className="collapse navbar-collapse justify-content-end">
                {user ? (
                    <ul className="navbar-nav align-items-center">
                        {user.role === 'Student' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/courses">Courses</Link>
                            </li>
                        )}
                        {user.role === 'Instructor' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/courses">Manage Courses</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to="/result">Results</Link>
                        </li>
                        <li className="nav-item text-white mx-3 d-flex align-items-center">
                            <i className="bi bi-person-circle" style={{ marginRight: '0.5rem' }}></i>
                            <small className="text-light">{user.email}</small>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-light ms-2" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                ) : (
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}
