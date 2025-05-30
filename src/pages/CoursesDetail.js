// src/pages/CourseDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        // console.log(course.mediaUrl);
        // const mockCourse = {
        //     courseId: id,
        //     title: 'Mock React Course',
        //     description: 'This is a sample course description for testing.',
        //     mediaUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' // Sample video
        // };
        // setCourse(mockCourse);
        axios.get(`https://projectwebapp-gmbbhpdubchzf9a6.centralindia-01.azurewebsites.net/api/CourseModels/${id}`).then(res => setCourse(res.data));
        
        
    }, [id]);

    if (!course) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            {course.mediaUrl && (
                <div>
                    <video controls width="600" src={course.mediaUrl}></video>
                </div>
            )}
            <Link to={`/quiz/${course.courseId}`} className="btn btn-warning mt-3">Enroll</Link>
        </div>
    );
}
