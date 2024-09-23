// services/authService.ts
import axios from 'axios';

const API_URL = 'http://192.168.1.10:8080'; 

export const login = async (username: string, password: string) => {
    try {
        console.log('Attempting to log in with:', username, password);
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });
        console.log(response,'response')
        return response.data;  
    } catch (error) {
        throw error; 
    }
};
