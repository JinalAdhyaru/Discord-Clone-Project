import streamHandler from './streamHandler';
// import store from '../store/store';
import Peer from "simple-peer";
import { signalPeerData } from "./socketConnection";

const getConfiguration = () => {

    const turnIceServers = null;
  
    if (turnIceServers) {
      // TODO use TURN server credentials
    } else {
        console.warn("Using only STUN server");
        return {
            iceServers: [
            {
                urls: "stun:stun.l.google.com:19302",
            },
            ],
        };
    }
};

const onlyAudioConstraints = {
    audio: true,
    video: false,
};

const defaultConstraints = {
    video: true,
    audio: true,
};


export const getLocalStreamPreview = (audioOnly = false, callbackFunc) => {

    const constraints = audioOnly ? onlyAudioConstraints : defaultConstraints;
    navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
        streamHandler.setLocalStream(stream);
        callbackFunc();
    })
    .catch((err) => {
        console.log(err);
        console.log("Cannot get access to local stream");
    });
    
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  
    const localStream = streamHandler.getLocalStream();
    const screenSharingStream = streamHandler.getScreenSharingStream();
    const streamToSend = screenSharingStream || localStream;
    
    // if (isInitiator) {
    //     console.log("Preparing new peer connection as initiator");
    // } else {
    //     console.log("Preparing new peer connection as not initiator");
    // }    

    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        config: getConfiguration(),
        stream: streamToSend,
    });

    peers[connUserSocketId].on("signal", (data) => {
        const signalData = {
            signal: data,
            connUserSocketId: connUserSocketId,
        };

        // Pass signaling data to other users
        signalPeerData(signalData);
    });

    peers[connUserSocketId].on("stream", (remoteStream) => {
        remoteStream.connUserSocketId = connUserSocketId;
        addNewRemoteStream(remoteStream);
    });

};

export const handleSignalingData = (data) => {
    
    const { connUserSocketId, signal } = data;
  
    if (peers[connUserSocketId]) {
        peers[connUserSocketId].signal(signal);
    }

};

const addNewRemoteStream = (remoteStream) => {    
    streamHandler.addRemoteStream(remoteStream);
};

export const closeAllConnections = () => {
    
    Object.entries(peers).forEach((mappedObject) => {
        const connUserSocketId = mappedObject[0];
        if (peers[connUserSocketId]) {
            peers[connUserSocketId].destroy();
            delete peers[connUserSocketId];
        }
    });

};

export const handleParticipantLeftRoom = (data) => {
    
    const { connUserSocketId } = data;
  
    if (peers[connUserSocketId]) {
        peers[connUserSocketId].destroy();
        delete peers[connUserSocketId];
    }
  
    const remoteStreamsMap = streamHandler.getRemoteStreamsMap();
  
    const remoteStreamsId = Object.keys(remoteStreamsMap).find(
        (remoteStreamsId) => remoteStreamsMap[remoteStreamsId].connUserSocketId === connUserSocketId
    );

    streamHandler.updateRemoteStream(remoteStreamsId);

};

export const switchOutgoingTracks = (stream) => {

    for (let socket_id in peers) {
        for (let index in peers[socket_id].streams[0].getTracks()) {
            for (let index2 in stream.getTracks()) {
                if ( peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind ) {
                    peers[socket_id].replaceTrack(
                        peers[socket_id].streams[0].getTracks()[index],
                        stream.getTracks()[index2],
                        peers[socket_id].streams[0]
                    );
                    break;
                }
            }
        }
    }
};
