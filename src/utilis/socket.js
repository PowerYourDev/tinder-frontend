import io from "socket.io-client"
import { BASE_URL } from "./constant"

export const createSocketConnnection=()=>{
    return io(BASE_URL)
}