import axios from "axios";

const API_URL = "http://localhost:3000";

export async function getDiscussion(groupName: string) {
    try {
        const response = await axios.get(
            `${API_URL}/api/get_discussion/${groupName}`
        );
        console.log(response.data.comments)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}