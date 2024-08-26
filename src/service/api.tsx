import axios from "axios";

const api = axios.create({
    baseURL: 'http://172.16.3.231:8080/api/v3/'
});

export default api;