import { addNewActiveRoom } from "../serverStore.js";
import updateRooms from "./updates/updateRooms.js";

const roomCreateHandler = (socket) => {

    const socketId = socket.id;
    const userId = socket.user.userId;

    const roomDetails = addNewActiveRoom(userId, socketId);

    socket.emit("room-create", {
        roomDetails,
    });

    updateRooms();
    
};

export default roomCreateHandler;
