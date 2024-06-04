import { joinActiveRoom, getActiveRoom } from "../serverStore.js";
import updateRooms from "./updates/updateRooms.js";

const roomJoinHandler = (socket, data) => {

    const { roomId } = data;

    const participantDetails = {
        userId: socket.user.userId,
        socketId: socket.id,
    };

    const roomDetails = getActiveRoom(roomId);
    joinActiveRoom(roomId, participantDetails);

    // send information to users in room that they should prepare for incoming connection
    roomDetails.participants.forEach((participant) => {
        if (participant.socketId !== participantDetails.socketId) {
            socket.to(participant.socketId).emit("conn-prepare", {
                connUserSocketId: participantDetails.socketId,
            });
        }
    });

    updateRooms();

};

export default roomJoinHandler;