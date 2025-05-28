// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// export default function Register() {
//     const { register } = useAuth();
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         role: "",
//         password: "",
//     });

//     const handleChange = (e) =>
//         setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await register(formData);
//             alert("User registered successfully");
//         } catch (err) {
//             console.error(err);
//             alert("Registration failed");
//         }
//     };
//     return (
//         <div
//             style={{
//                 maxWidth: 420,
//                 margin: "4rem auto",
//                 padding: "2rem",
//                 border: "1px solid #ddd",
//                 borderRadius: 12,
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                 fontFamily: "system-ui, sans-serif",
//             }}
//         >
//             <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Register</h3>

//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     onChange={handleChange}
//                     required
//                     style={inputStyle}
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     onChange={handleChange}
//                     required
//                     style={inputStyle}
//                 />
//                 <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     required
//                     style={{ ...inputStyle, cursor: "pointer" }}
//                 >
//                     <option value="">Select role…</option>
//                     <option value="Student">Student</option>
//                     <option value="Instructor">Instructor</option>
//                 </select>

//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     onChange={handleChange}
//                     required
//                     style={inputStyle}
//                 />

//                 <button
//                     type="submit"
//                     style={{
//                         display: "block",
//                         width: "100%",
//                         padding: "0.75rem",
//                         marginTop: "0.5rem",
//                         backgroundColor: "#0d6efd",
//                         border: "none",
//                         borderRadius: 8,
//                         color: "#fff",
//                         fontSize: 16,
//                         cursor: "pointer",
//                     }}
//                 >
//                     Register
//                 </button>
//             </form>
//         </div>
//     );
// }

// const inputStyle = {
//     width: "100%",
//     padding: "0.65rem 0.8rem",
//     marginBottom: "0.8rem",
//     border: "1px solid #ccc",
//     borderRadius: 8,
//     fontSize: 15,
//     outlineColor: "#0d6efd",
// };



import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
    });

    const handleChange = (e) =>
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("User registered successfully");
        } catch (err) {
            console.error(err);
            alert("Registration failed");
        }
    };

    return (
        <div
            style={{
                maxWidth: 420,
                margin: "4rem auto",
                padding: "2rem",
                border: "1px solid #ddd",
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontFamily: "system-ui, sans-serif",
            }}
        >
            <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Register</h3>

            <form onSubmit={handleSubmit}>
                <div style={inputWrapperStyle}>
                    <i className="bi bi-person input-icon"></i>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputWrapperStyle}>
                    <i className="bi bi-envelope input-icon"></i>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputWrapperStyle}>
                    <i className="bi bi-person input-icon"></i>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        style={{ ...inputStyle, cursor: "pointer" }}
                    >
                        <option value="">Select role…</option>
                        <option value="Student">Student</option>
                        <option value="Instructor">Instructor</option>
                    </select>
                </div>
                <div style={inputWrapperStyle}>
                    <i className="bi bi-lock-fill input-icon"></i>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        display: "block",
                        width: "100%",
                        padding: "0.75rem",
                        marginTop: "0.5rem",
                        backgroundColor: "#0d6efd",
                        border: "none",
                        borderRadius: 8,
                        color: "#fff",
                        fontSize: 16,
                        cursor: "pointer",
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
}

// Styles
const inputWrapperStyle = {
    position: "relative",
    marginBottom: "0.8rem",
};

const inputStyle = {
    width: "100%",
    padding: "0.65rem 0.8rem 0.65rem 2.4rem", // left padding for icon space
    border: "1px solid #ccc",
    borderRadius: 8,
    fontSize: 15,
    outlineColor: "#0d6efd",
};

const iconStyle = {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    fontSize: "1rem",
    color: "#555",
};

// You can also put this style in CSS if preferred:
const style = document.createElement('style');
style.innerHTML = `
    .input-icon {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        font-size: 1rem;
        color: #555;
    }
`;
document.head.appendChild(style);
