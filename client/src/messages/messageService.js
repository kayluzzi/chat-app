import axios from "axios"

const messageService = {
    getChannelMessages: async (channelName, token) => {
        console.log("messageService getChannelMessages", token)
        return await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/message/${channelName}`,
             { headers: { Authorization: `Bearer ${token}`} }
        )
    }
}

export default messageService 