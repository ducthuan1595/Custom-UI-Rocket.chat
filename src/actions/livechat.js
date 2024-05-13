import { API_URL } from "../util/util";

export const createRoom = async(token) => {
    const response = await fetch(`${API_URL}/api/v1/livechat/room?token=${token}`);
    
    const data = await response.json();
    if(data.success) {
        return data.room;
    }
}
