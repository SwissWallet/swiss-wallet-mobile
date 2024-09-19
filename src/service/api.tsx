import axios from "axios";

const api = axios.create({
    baseURL: 'https://swiss-wallet-backend.onrender.com/api/v3/'
});

export default api;