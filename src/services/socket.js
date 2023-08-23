import { io } from "socket.io-client";


class socket{
    constructor(){
        this.socket = io("http://localhost:5500");
        this.socket.on('room-joined',msg=>console.log(`Joined ${msg.roomname}`))
    }
    joinRoom = (roomid) => {
        this.socket.emit("join-room-public", roomid);
    }
    leaveRoom = (roomid) => {
        this.socket.emit("leave-room", roomid);
    }
    toRoom=(msg)=>{
        this.socket.emit('message-to-room','dummyRoom',msg)
    }
    

}

// const socket = useMemo(() => io("http://localhost:5500"), []);




export default socket;