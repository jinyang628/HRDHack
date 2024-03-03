import axios from "axios";

const API_URL = "http://localhost:3000";

export async function generateQuestion() {
    try {
        const response = await axios.get(
            `${API_URL}/api/generate_question`
        );
        return response.data.question;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}