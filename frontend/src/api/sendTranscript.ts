import axios from "axios";

const API_URL = "http://localhost:3000";

export async function sendTranscript(transcript: string, uniqueToken: string) {
    try {
        const response = await axios.post(
            `${API_URL}/api/send_transcript`, 
            {
                transcript,
                uniqueToken
            },
        );
        console.log(`Transcript has been sent: ${response.data}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}