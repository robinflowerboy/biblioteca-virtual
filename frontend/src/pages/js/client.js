
import axios from 'axios';

const API_URL = `http://${import.meta.env.VITE_API_HOST}`;
const API_PORT = import.meta.env.VITE_API_PORT;

const client = axios.create({
    baseURL: `${API_URL}:${API_PORT}`,
    withCredentials: true
});

export const login = async (username, password) => {
    const response = await client.post('/auth/login', { username, password });
    return response.data;
    
}

export const register = async (email, username, password) => {    
    const response = await client.post('/auth/register', {email, username, password});
    return response.data;
}

export const auth = async () => {
    const response = await client.get('/auth');
}