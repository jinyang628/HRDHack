import axios from "axios";

const AWS_PUBLIC_ADDRESS = "18.220.21.200"
const BACKEND_LOCAL_PORT = "3000"
const API_URL = `http://${AWS_PUBLIC_ADDRESS}:${BACKEND_LOCAL_PORT}`
// const API_URL = "http://localhost:3000";

export async function testAPI(userInput) {
    try {
        const response = await axios.post(
            `${API_URL}/api/items`, 
            {
                userInput
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}