export const roomActions = {
    OPEN_ROOM: "ROOM.OPEN_ROOM",
    SET_ROOM_DETAILS: "ROOM.SET_ROOM_DETAILS",
    SET_ACTIVE_ROOMS: "ROOM.SET_ACTIVE_ROOMS",
};

export const setOpenRoom = (isUserRoomCreator = false, isUserInRoom = false) => {
    return {
        type: roomActions.OPEN_ROOM,
        isUserRoomCreator,
        isUserInRoom,
    };
};

export const setRoomDetails = (roomDetails) => {
    return {
        type: roomActions.SET_ROOM_DETAILS,
        roomDetails,
    };
};

export const setActiveRooms = (activeRooms) => {
    return {
        type: roomActions.SET_ACTIVE_ROOMS,
        activeRooms,
    };
};