import User from "../models/user.js";
import FriendInvitation from "../models/friendInvitation.js";
import { updateFriendsPendingInvitations, updateFriends } from "../socketHandlers/updates/friends.js";

const postInvite = async (req, res) => {

    const { targetEmailAddress } = req.body;

    const { userId } = req.user;

    const currUser = await User.findById(userId);
    const email = currUser.email;
   
    // check if friend that we would like to invite is not user
    if (email.toLowerCase() === targetEmailAddress.toLowerCase()) {
        return res.status(409).send("The email address entered is same as the current users email address. Please enter a different email address");
    }

    const targetUser = await User.findOne({ email: targetEmailAddress.toLowerCase() });

    if (!targetUser) {
        return res.status(404).send(`The email address ${targetEmailAddress}, is not an existing user of this app. Please check email address.`);
     }

    // check if invitation has been already sent
    const invitationAlreadySent = await FriendInvitation.findOne({
        senderId: userId,
        receiverId: targetUser._id,
    });

    if (invitationAlreadySent) {
        return res.status(409).send("Invitation has been already sent");
    }

    // check if the user which we would like to invite is already our friend
    const usersAlreadyFriends = targetUser.friends.find(
        (friendId) => friendId.toString() === userId.toString()
    );

    if (usersAlreadyFriends) {
        return res.status(409).send("Friend already added. Please check friends list");
    }

    //check if receiver already sent an invite to the user and it is shown in pending invitations,
    const invitationAlreadyReceived = await FriendInvitation.findOne({
        senderId: targetUser._id,
        receiverId: userId,
    });

    if(invitationAlreadyReceived) {
        return res.status(409).send("Invite from this user already exists. Please check invitations list");
    }

    // create new invitation in database
    const newInvitation = await FriendInvitation.create({
        senderId: userId,
        receiverId: targetUser._id,
    });

    // if invtiation has been successfully created we would like to update friends invitations if other user is online

    // send pending invitations update to specific user
    updateFriendsPendingInvitations(targetUser._id.toString());

    return res.status(201).send("Invitation has been sent");

};

const postAccept = async (req, res) => {

    try {

        const { id } = req.body;

        const invitation = await FriendInvitation.findById(id);

        if (!invitation) {
            return res.status(401).send("Error occured. Please try again");
        }

        const { senderId, receiverId } = invitation;

        // add friends to both users
        const senderUser = await User.findById(senderId);
        senderUser.friends = [...senderUser.friends, receiverId];

        const receiverUser = await User.findById(receiverId);
        receiverUser.friends = [...receiverUser.friends, senderId];

        await senderUser.save();
        await receiverUser.save();

        // delete invitation
        await FriendInvitation.findByIdAndDelete(id);

        // update list of the friends if the users are online
        updateFriends(receiverId.toString());
        updateFriends(senderId.toString());

        // update list of friends pending invitations
        updateFriendsPendingInvitations(receiverId.toString());

        //check if receiver also sent an invite to sender
        const receiversInvite = await FriendInvitation.findOne({
            senderId: receiverId,
            receiverId: senderId,
        });

        //delete pending invitation from senders side as well
        if(receiversInvite) {
            await FriendInvitation.findByIdAndDelete(receiversInvite._id);            
            updateFriendsPendingInvitations(senderId.toString());
        }

        return res.status(200).send("Friend successfuly added");

    } catch (err) {

        console.log(err);
        return res.status(500).send("Something went wrong. Please try again");

    }
};

const postReject = async (req, res) => {

    try {

        const { id } = req.body;
        const { userId } = req.user;
    
        // remove that invitation from friend invitations collection
        const invitationExists = await FriendInvitation.findById(id);
        const { senderId, receiverId } = invitationExists;

        if (invitationExists) {
            await FriendInvitation.findByIdAndDelete(id);
        }
    
        // update pending invitations
        updateFriendsPendingInvitations(userId);

        //check if receiver also sent an invite to sender
        const receiversInvite = await FriendInvitation.findOne({
            senderId: receiverId,
            receiverId: senderId,
        });

        //if invitation exists, delete invite on senders side and update their pending invitations
        if(receiversInvite) {
            await FriendInvitation.findByIdAndDelete(receiversInvite._id);
            updateFriendsPendingInvitations(senderId.toString());
        }
    
        return res.status(200).send("Invitation succesfully rejected");

    } catch (err) {

      console.log(err);
      return res.status(500).send("Something went wrong please try again");

    }
};

export { postInvite, postAccept, postReject };
