import { streamActions } from '../actions/streamActions';

const initialState = {
    localStreamId: null, 
    audioOnly: false,
    remoteStreamsId: [],
    screenSharingStreamId: null,
    isScreenSharingActive: false,
    isUserJoinedWithOnlyAudio: false,
};

const streamReducer = (state = initialState, action) => {
    switch (action.type) {

        case streamActions.SET_LOCAL_STREAM_ID:
            return {
                ...state,
                localStreamId: action.localStreamId,
            };

        case streamActions.SET_AUDIO_ONLY:
            return {
                ...state,
                audioOnly: action.audioOnly,
            };

        case streamActions.SET_REMOTE_STREAMS_ID:
            return {
                ...state,
                remoteStreamsId: [
                    ...state.remoteStreamsId,
                    action.remoteStreamsId,
                ]
            };

        case streamActions.UPDATE_REMOTE_STREAMS_ID:
            let updatedRemoteStreamsId;

            if(action.remoteStreamId) {
                updatedRemoteStreamsId = state.remoteStreamsId.filter( id => id !== action.remoteStreamId );
            } else {
                updatedRemoteStreamsId = [];
            }
            return {
                ...state,
                remoteStreamsId: updatedRemoteStreamsId,
            };

        case streamActions.SET_SCREEN_SHARE_STREAM_ID:
            return {
                ...state,
                screenSharingStreamId: action.screenSharingStreamId,
                isScreenSharingActive: action.isScreenSharingActive,
            };

        case streamActions.SET_IS_USER_JOINED_WITH_ONLY_AUDIO:
            return {
                ...state,
                isUserJoinedWithOnlyAudio: action.isUserJoinedWithOnlyAudio,
            };    
        
            default:
          return state;
    }
};

export default streamReducer;
  