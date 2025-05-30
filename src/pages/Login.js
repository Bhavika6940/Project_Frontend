

// // src/pages/Login.jsx
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
// import { useAuth } from "../context/AuthContext";
// import api from "../service/api";

// export default function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");         
//     const [loading, setLoading] = useState(false);   
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             const res = await api.post('https://localhost:7086/api/Users/login', {
//                 email,
//                 password
//             });

//             const { userId, email: userEmail, role, token } = res.data;
//             login({ userId, email: userEmail, role, token });

//             navigate('/dashboard');
//         } catch (err) {
//             setError(
//                 err.response?.data?.message || "Login failed."
//             );
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     return (
//         <Card className="mx-auto mt-5 shadow" style={{ maxWidth: 420 }}>
//             <Card.Body>
//                 <h3 className="text-center mb-4">EduSync Login</h3>

//                 {error && <Alert variant="danger">{error}</Alert>}

//                 <Form onSubmit={handleSubmit} noValidate>
//                     <Form.Group className="mb-3" controlId="loginEmail">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="name@example.com"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             autoFocus
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-4" controlId="loginPassword">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                             type="password"
//                             placeholder="••••••••"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </Form.Group>

//                     <Button
//                         variant="primary"
//                         type="submit"
//                         className="w-100"
//                         disabled={loading}
//                     >
//                         {loading ? (
//                             <>
//                                 <Spinner animation="border" size="sm" className="me-2" />
//                                 Logging&nbsp;in…
//                             </>
//                         ) : (
//                             "Login"
//                         )}
//                     </Button>
//                 </Form>

//                 <hr />

//                 <div className="text-center">
//                     Don’t have an account?{" "}
//                     <Link to="/register" className="fw-semibold">
//                         Register
//                     </Link>
                    
//                 </div>
//             </Card.Body>
//         </Card>
//     );
// }





// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Alert, Spinner, InputGroup } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import api from "../service/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post('https://projectwebapp-gmbbhpdubchzf9a6.centralindia-01.azurewebsites.net/api/Users/login', {
                email,
                password
            });

            const { userId, email: userEmail, role, token } = res.data;
            login({ userId, email: userEmail, role, token });

            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="mx-auto mt-5 shadow" style={{ maxWidth: 420 }}>
            

            <Card.Body>
                
                <h3 className="text-center mb-4">EduSync Login</h3>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3" controlId="loginEmail">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-envelope"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-lock-fill"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Logging&nbsp;in…
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </Form>

                <hr />

                <div className="text-center">
                    Don’t have an account?{" "}
                    <Link to="/register" className="fw-semibold">
                        Register
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}






















