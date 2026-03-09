import axios from "axios"

const channelService = {
    getAllChannels: async (token) => {
        return await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/channel`,
             { headers: { Authorization: `Bearer ${token}`} }
        )
    }
}

export default channelService 