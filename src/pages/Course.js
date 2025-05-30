


// import React, { useEffect, useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import api from "../service/api";

// export default function Courses() {
//     const [courses, setCourses] = useState([]);
//     const { user } = useAuth();

//     useEffect(() => {
//         (async () => {
//             try {
//                 const res = await api.get("https://localhost:7086/api/CourseModels");
//                 setCourses(res.data);
//             } catch (err) {
//                 console.error("Failed to load courses", err);
//             }
//         })();
//     }, []);

//     const grouped = useMemo(() => {
//         return courses.reduce((acc, c) => {
//             const key = c.category ?? "Others";
//             (acc[key] = acc[key] || []).push(c);
//             return acc;
//         }, {});
//     }, [courses]);

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this course?")) {
//             try {
//                 await api.delete(`https://localhost:7086/api/CourseModels/${id}`);
//                 setCourses((prev) => prev.filter((c) => c.courseId !== id));
//             } catch {
//                 alert("Failed to delete course");
//             }
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <header className="d-flex justify-content-between align-items-center mb-4">
//                 <h2 className="mb-0">Courses</h2>
//                 {user.role === "Instructor" && (
//                     <Link to="/upload-course" className="btn btn-primary">
//                         Upload New Course
//                     </Link>
//                 )}
//             </header>

//             {Object.keys(grouped).length === 0 ? (
//                 <p>No courses available.</p>
//             ) : (
//                 Object.entries(grouped).map(([category, items]) => (
//                     <section key={category} className="mb-5">
//                         <h4 className="fw-bold mb-3 text-emerald-700 d-flex align-items-center gap-2">
//                             <i className="bi bi-book"></i> {category}
//                         </h4>
//                         <div className="d-flex flex-wrap gap-4">
//                             {items.map((course) => (
//                                 <div
//                                     key={course.courseId}
//                                     className="card shadow-sm border-0"
//                                     style={{ width: "18rem" }}
//                                 >
//                                     <div className="card-body d-flex flex-column">
//                                         <h5 className="card-title fw-semibold mb-2">
//                                             {course.title}
//                                         </h5>
//                                         <p className="card-text text-muted flex-grow-1">
//                                             {course.description ?? "No description provided."}
//                                         </p>

//                                         {user.role === "Instructor" ? (
//                                             <>
//                                                 <button
//                                                     className="btn btn-sm btn-danger mt-auto align-self-start"
//                                                     onClick={() => handleDelete(course.courseId)}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                                 <Link
//                                                     to={`/assessment-upload/${course.courseId}`}
//                                                     className="btn btn-sm btn-secondary mt-2 align-self-start"
//                                                 >
//                                                     Upload Assessment
//                                                 </Link>
//                                             </>
//                                         ) : (
//                                             <Link
//                                                 to={`/courses/${course.courseId}`}
//                                                 className="btn btn-outline-primary mt-auto align-self-start"
//                                             >
//                                                 View Course
//                                             </Link>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//                 ))
//             )}
//         </div>
//     );
// }




import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../service/api";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const { user } = useAuth(); // must include userId and role

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get("https://projectwebapp-gmbbhpdubchzf9a6.centralindia-01.azurewebsites.net/api/CourseModels");
                setCourses(res.data);
            } catch (err) {
                console.error("Failed to load courses", err);
            }
        })();
    }, []);

    // ✅ Filter for Instructor: only show courses uploaded by the logged-in instructor
    const filteredCourses = useMemo(() => {
        if (user.role === "Instructor") {
            return courses.filter((c) => c.userId === user.userId); // filter using instructorId
        }
        return courses; // for students/admins
    }, [courses, user]);

    // ✅ Group filtered courses by category
    const grouped = useMemo(() => {
        return filteredCourses.reduce((acc, c) => {
            const key = c.category ?? "Others";
            (acc[key] = acc[key] || []).push(c);
            return acc;
        }, {});
    }, [filteredCourses]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                await api.delete(`https://projectwebapp-gmbbhpdubchzf9a6.centralindia-01.azurewebsites.net/api/CourseModels/${id}`);
                setCourses((prev) => prev.filter((c) => c.courseId !== id));
            } catch {
                alert("Failed to delete course");
            }
        }
    };

    return (
        <div className="container mt-5">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Courses</h2>
                {user.role === "Instructor" && (
                    <Link to="/upload-course" className="btn btn-primary">
                        Upload New Course
                    </Link>
                )}
            </header>

            {Object.keys(grouped).length === 0 ? (
                <p>No courses available.</p>
            ) : (
                Object.entries(grouped).map(([category, items]) => (
                    <section key={category} className="mb-5">
                        <h4 className="fw-bold mb-3 text-emerald-700 d-flex align-items-center gap-2">
                            <i className="bi bi-book"></i> {category}
                        </h4>
                        <div className="d-flex flex-wrap gap-4">
                            {items.map((course) => (
                                <div
                                    key={course.courseId}
                                    className="card shadow-sm border-0"
                                    style={{ width: "18rem" }}
                                >
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title fw-semibold mb-2">
                                            {course.title}
                                        </h5>
                                        <p className="card-text text-muted flex-grow-1">
                                            {course.description ?? "No description provided."}
                                        </p>

                                        {user.role === "Instructor" ? (
                                            <>
                                                <button
                                                    className="btn btn-sm btn-danger mt-auto align-self-start"
                                                    onClick={() => handleDelete(course.courseId)}
                                                >
                                                    Delete
                                                </button>
                                                <Link
                                                    to={`/assessment-upload/${course.courseId}`}
                                                    className="btn btn-sm btn-secondary mt-2 align-self-start"
                                                >
                                                    Upload Assessment
                                                </Link>
                                            </>
                                        ) : (
                                            <Link
                                                to={`/courses/${course.courseId}`}
                                                className="btn btn-outline-primary mt-auto align-self-start"
                                            >
                                                View Course
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))
            )}
        </div>
    );
}
