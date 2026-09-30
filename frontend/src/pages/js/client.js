
import axios from 'axios';

const API_URL = `http://${import.meta.env.VITE_API_HOST}`;
const API_PORT = import.meta.env.VITE_API_PORT;

const client = axios.create({
    baseURL: `${API_URL}:${API_PORT}`,
    withCredentials: true
});

export const login = async (username, password) => {
    try {
        const response = await client.post('/auth/login', { username, password });
        console.log(response.status);
    } catch(e) {
        console.log(e.response.data);
    }
}