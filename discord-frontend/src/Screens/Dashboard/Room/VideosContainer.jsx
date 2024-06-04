import React from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Video from "./Video";
import streamHandler from "../../../realtimeCommunication/streamHandler";

const MainContainer = styled("div")({
    height: "85%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
});

function VideosContainer({ localStreamId }) {

    const localStream = streamHandler.getLocalStream(); 
    let remoteStreams = streamHandler.getRemoteStreamsMap();    
    const screenSharingStream = streamHandler.getScreenSharingStream();

    if (!Array.isArray(remoteStreams)) {
        remoteStreams = Object.values(remoteStreams); 
    }

    return (
        <MainContainer>
            <Video key={localStreamId} stream={screenSharingStream ? screenSharingStream : localStream} isLocalStream />
            {remoteStreams.map((stream) => (
                <Video key={stream.id} stream={stream} />
            ))}
        </MainContainer>
    );
}

const mapStoreStateToProps = ({ streams }) => {
    return {
        ...streams, 
    };
};

export default connect(mapStoreStateToProps)(VideosContainer);
