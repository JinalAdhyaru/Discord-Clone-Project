import React from "react";
import { styled } from "@mui/system";
import CameraButton from "./CameraButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import ScreenShareButton from "./ScreenShareButton";
import streamHandler from "../../../../realtimeCommunication/streamHandler";
import { connect } from "react-redux";
import { getActions } from "../../../../actions/streamActions";

const MainContainer = styled("div")({
    height: "15%",
    width: "100%",
    backgroundColor: "#5865f2",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

function RoomButtons(props) {

    const { isUserJoinedWithOnlyAudio } = props;    
    const localStream = streamHandler.getLocalStream(); 

    return (
        <MainContainer>
            {!isUserJoinedWithOnlyAudio && <ScreenShareButton {...props} /> }
            <MicButton localStream={localStream} />
            <CloseRoomButton />
            {!isUserJoinedWithOnlyAudio && <CameraButton localStream={localStream} /> } 
        </MainContainer>
    );

};

const mapStoreStateToProps = ({ streams }) => {
    return {
        ...streams,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomButtons);