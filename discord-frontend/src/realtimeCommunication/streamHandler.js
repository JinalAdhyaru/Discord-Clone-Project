import store from '../store/store';
import { setLocalStreamId, setRemoteStreamsId, updateRemoteStreamsId, setScreenSharingStreamId } from '../actions/streamActions';

class StreamHandler {
  
    constructor() {
        this.localStream = null;
        this.remoteStreamsMap = {};
        this.screenSharingStream = null;
    }

    setLocalStream(localStream) {
        if(localStream) {
            this.localStream = localStream;
            store.dispatch(setLocalStreamId(localStream.id));
        } else {
            this.localStream.getTracks().forEach((track) => track.stop());
            this.localStream = null;
            store.dispatch(setLocalStreamId(null));
        }
    }

    addRemoteStream(remoteStream) {
        this.remoteStreamsMap[remoteStream.id] = remoteStream;
        store.dispatch(setRemoteStreamsId(remoteStream.id));
    }

    updateRemoteStream(remoteStreamsId) {        
        if (remoteStreamsId) {
            delete this.remoteStreamsMap[remoteStreamsId];
        } else {
            this.remoteStreamsMap = {};
        }
        store.dispatch(updateRemoteStreamsId(remoteStreamsId));
    }

    setScreenSharingStream(screenSharingStream) {
        this.screenSharingStream = screenSharingStream;
        store.dispatch(setScreenSharingStreamId(screenSharingStream ? screenSharingStream.id : null));
    }

    getLocalStream() {
        return this.localStream;
    }

    getRemoteStreamsMap() {
        return this.remoteStreamsMap;
    }

    getScreenSharingStream() {
        return this.screenSharingStream;
    }

}

const streamHandler = new StreamHandler();

export default streamHandler;
