import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.105.81.82:8080/api/v3/'
});

export default api;