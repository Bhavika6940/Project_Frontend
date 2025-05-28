import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE ?? "https://localhost:7086/api",
    withCredentials: true // if using cookies
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;

// import axios from "axios";

// const api = axios.create({
//     baseURL: process.env.REACT_APP_API_BASE ?? "https://localhost:7086/api",
//     withCredentials: true, // if using cookies
//     timeout: 30000 // 10 seconds
// });

// api.interceptors.request.use(config => {
//     const token = localStorage.getItem("jwt");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });

// export default api;
