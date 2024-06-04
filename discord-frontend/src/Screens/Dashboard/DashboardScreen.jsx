import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { logout } from "../../utils/auth";
import { connect } from "react-redux";
import { getActions } from "../../actions/authActions";
import socketConnection from "../../realtimeCommunication/socketConnection";
import Room from "./Room/Room";

const Wrapper = styled("div")({
    width: "100%",
    height: "100vh",
    display: "flex",
});

function DashboardScreen({ setUserDetails, isUserInRoom }) {

    useEffect(() => {
        const userDetails = localStorage.getItem("user");

        if (!userDetails) {
            logout();
        } else {
            setUserDetails(JSON.parse(userDetails));
            socketConnection(JSON.parse(userDetails));
        }
    }, [setUserDetails]);


    return (
        <Wrapper>
            <SideBar />
            <FriendsSideBar />
            <Messenger />
            <AppBar />
            {isUserInRoom && <Room />}
        </Wrapper>
    )
}

const mapStoreStateToProps = ({ room }) => {
    return {
        ...room,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(DashboardScreen);