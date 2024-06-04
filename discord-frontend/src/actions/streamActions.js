export const streamActions = {
    SET_LOCAL_STREAM_ID: "STREAMS.SET_LOCAL_STREAM_ID",
    SET_AUDIO_ONLY: "STREAMS.SET_AUDIO_ONLY",
    SET_REMOTE_STREAMS_ID: "STREAMS.SET_REMOTE_STREAMS_ID",
    UPDATE_REMOTE_STREAMS_ID: "STREAMS.UPDATE_REMOTE_STREAMS_ID",
    SET_SCREEN_SHARE_STREAM_ID: "STREAMS.SET_SCREEN_SHARE_STREAM_ID",
    SET_IS_USER_JOINED_WITH_ONLY_AUDIO: "STREAMS.SET_IS_USER_JOINED_WITH_ONLY_AUDIO",
};

export const getActions = (dispatch) => {
    return {
          setAudioOnly: (audioOnly) => dispatch(setAudioOnly(audioOnly)),
          setScreenSharingStreamId: (screenSharingStreamId) => { dispatch(setScreenSharingStreamId(screenSharingStreamId)); },
    };
};

export const setLocalStreamId = (localStreamId) => {
    return {
        type: streamActions.SET_LOCAL_STREAM_ID,
        localStreamId, 
    }
};

export const setAudioOnly = (audioOnly) => {
    return {
        type: streamActions.SET_AUDIO_ONLY,
        audioOnly,
    }
};

export const setRemoteStreamsId = (remoteStreamsId) => {
    return {
        type: streamActions.SET_REMOTE_STREAMS_ID,
        remoteStreamsId,
    };
};

export const updateRemoteStreamsId = (remoteStreamId) => {
    return {
        type: streamActions.UPDATE_REMOTE_STREAMS_ID,
        remoteStreamId,
    };
};

export const setScreenSharingStreamId = (screenSharingStreamId) => {
    return {
        type: streamActions.SET_SCREEN_SHARE_STREAM_ID,
        isScreenSharingActive: screenSharingStreamId ? true : false,
        screenSharingStreamId: screenSharingStreamId || null,
    };
};

export const setIsUserJoinedWithOnlyAudio = (withOnlyAudio) => {
    return {
        type: streamActions.SET_IS_USER_JOINED_WITH_ONLY_AUDIO,
        isUserJoinedWithOnlyAudio: withOnlyAudio,
    };
};
  