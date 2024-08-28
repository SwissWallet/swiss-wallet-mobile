import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.238.17:8080/api/v3/'
});

export default api;