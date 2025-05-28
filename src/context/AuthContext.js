

import { createContext, useContext, useState } from "react";
import api from "../service/api"; // Make sure this is correctly imported

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // user = { userId, email, role, token }

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    // ✅ Add register function
    const register = async ({ name, email, role, password }) => {
        try {
            const response = await api.post("https://localhost:7086/api/Users", {
                name,
                email,
                role,
                password,
            });
            console.log("User registered:", response.data);
            return response.data;
        } catch (err) {
            console.error("Registration error:", err);
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
