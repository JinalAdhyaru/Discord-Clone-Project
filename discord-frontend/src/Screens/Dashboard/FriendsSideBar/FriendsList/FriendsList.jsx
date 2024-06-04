import React from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { connect } from "react-redux";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const checkIfFriendIsOnline = (friend, onlineUsers = []) => {  
  const isUserOnline = onlineUsers.find((user) => user.userId === friend.id);
  return isUserOnline ? true : false;
};

function FriendsList({ friends, onlineUsers }) {

  return (

    <MainContainer>

      {friends.map((f) => (
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={checkIfFriendIsOnline(f, onlineUsers)}
        />
      ))}

    </MainContainer>
    
  );

};

const mapStoreStateToProps = ({ friends }) => {
 return {
  ...friends,
 }; 
};

export default connect(mapStoreStateToProps)(FriendsList);
