import { getSocketServerInstance, getActiveRooms } from "../../serverStore.js";

const updateRooms = (toSpecifiedSocketId = null) => {

    const io = getSocketServerInstance();
    const activeRooms = getActiveRooms();

    if (toSpecifiedSocketId) {

        io.to(toSpecifiedSocketId).emit("active-rooms", {
            activeRooms,
        });
        
    } else {
        
        io.emit("active-rooms", {
            activeRooms,
        });
        
    }

};

export default updateRooms;