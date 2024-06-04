import { setOpenRoom, setRoomDetails, setActiveRooms } from "../actions/roomActions";
import streamHandler from './streamHandler';
import store from "../store/store";
import { createNewRoom as createNewSocketRoom, joinRoom as joinSocketRoom, leaveRoom as leaveSocketRoom } from "./socketConnection";
import { getLocalStreamPreview, closeAllConnections } from "./webRTCHandler";
import { setIsUserJoinedWithOnlyAudio } from "../actions/streamActions";

export const createNewRoom = () => {
    
    const successCalbackFunc = () => {
        store.dispatch(setOpenRoom(true, true));
        const withOnlyAudio = store.getState().streams.audioOnly;
        store.dispatch(setIsUserJoinedWithOnlyAudio(withOnlyAudio));
        createNewSocketRoom();
    };

    const audioOnly = store.getState().streams.audioOnly;
    getLocalStreamPreview(audioOnly, successCalbackFunc);
};

export const newRoomCreated = (data) => {
    const { roomDetails } = data;
    store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  
    const { activeRooms } = data;
    
    const friends = store.getState().friends.friends;
    const rooms = [];
  
    const userId = store.getState().auth.userDetails?._id;
  
    activeRooms.forEach((room) => {
        
        const isRoomCreatedByMe = room.roomCreator.userId === userId;
    
        if (isRoomCreatedByMe) {
            rooms.push({ ...room, creatorUsername: "Me" });
        } else {
            friends.forEach((f) => {
                if (f.id === room.roomCreator.userId) {
                    rooms.push({ ...room, creatorUsername: f.username });
                }
            });
        }
    });
  
    store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {

    const successCalbackFunc = () => {
        store.dispatch(setRoomDetails({ roomId }));
        store.dispatch(setOpenRoom(false, true));
        const audioOnly = store.getState().streams.audioOnly;
        store.dispatch(setIsUserJoinedWithOnlyAudio(audioOnly));
        joinSocketRoom({ roomId });
    };
  
    const audioOnly = store.getState().streams.audioOnly;
    getLocalStreamPreview(audioOnly, successCalbackFunc);

};

export const leaveRoom = () => {

    const roomId = store.getState().room.roomDetails.roomId;
    const localStreamId = store.getState().streams.localStreamId;
    if (localStreamId) {
        streamHandler.setLocalStream();
    }
  
    const screenSharingStream = streamHandler.getScreenSharingStream();
    if (screenSharingStream) {
        screenSharingStream.getTracks().forEach((track) => track.stop());
        streamHandler.setScreenSharingStream(null);
    }
  
    streamHandler.updateRemoteStream();
    closeAllConnections();
  
    leaveSocketRoom({ roomId });
    store.dispatch(setRoomDetails(null));
    store.dispatch(setOpenRoom(false, false));
};