import React from "react";
import IconButton from "@mui/material/IconButton";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import streamHandler from "../../../../realtimeCommunication/streamHandler";
import { switchOutgoingTracks } from "../../../../realtimeCommunication/webRTCHandler";

const constraints = {
    audio: false,
    video: true,
};

function ScreenShareButton({ isScreenSharingActive }) {

    const handleScreenShareToggle = async () => {

        const localStream = streamHandler.getLocalStream();
                
        if (!isScreenSharingActive) {
            
            let screenSharingStream = null;
            
            try {
                screenSharingStream = await navigator.mediaDevices.getDisplayMedia(constraints);
            } catch (err) {
                console.log("Error occured when trying to get an access to screen share stream");
            }

            if (screenSharingStream) {
                streamHandler.setScreenSharingStream(screenSharingStream);
                switchOutgoingTracks(screenSharingStream);
            }

        } else {
            switchOutgoingTracks(localStream);
            const screenSharingStream = streamHandler.getScreenSharingStream();
            screenSharingStream.getTracks().forEach((t) => t.stop());
            streamHandler.setScreenSharingStream(null);
        }
    };

    return (
        <IconButton onClick={handleScreenShareToggle} style={{ color: "white" }}>
            {isScreenSharingActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
        </IconButton>
    );
  
};

export default ScreenShareButton;