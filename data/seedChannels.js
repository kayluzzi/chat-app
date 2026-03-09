import "dotenv/config";
import axios from "axios"
import data from "./chat.channels.data.json" with { type: "json" }


let interval = null
let index = 0

const createChannel = async () => {
    if (index < data.length) {
        console.log(data[index])
        const response = await axios.post(`${process.env.SERVER_URL}/channel`, data[index])
        console.log("response.data", response.data)
        index++
    } else {
        clearInterval(interval)
    }
}
interval = setInterval(createChannel, 1000)
