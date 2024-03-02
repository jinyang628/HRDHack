import axios from "axios";

const API_URL = "http://localhost:3000";

export async function giveConsent(username: string) {
    try {
        const response = await axios.post(
            `${API_URL}/api/give_consent`, 
            {
                username
            },
        );
        console.log(`Unique token created: ${response.data}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}