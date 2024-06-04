import { getActiveRooms, removeConnectedUser } from "../serverStore.js";
import roomLeaveHandler from "./roomLeaveHandler.js";

const disconnectHandler = (socket) => {

    const activeRooms = getActiveRooms();

    activeRooms.forEach((activeRoom) => {

        const userInRoom = activeRoom.participants.some(
            (participant) => participant.socketId === socket.id
        );

        if (userInRoom) {
            roomLeaveHandler(socket, { roomId: activeRoom.roomId });
        }
        
    });

    removeConnectedUser(socket.id);
};

export default disconnectHandler;