import axios from "axios";

const API_URL = "http://localhost:3000";

export async function getUniqueToken() {
    try {
        const response = await axios.get(
            `${API_URL}/api/get_unique_token`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}