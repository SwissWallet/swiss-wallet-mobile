import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v3/'
});

export default api;