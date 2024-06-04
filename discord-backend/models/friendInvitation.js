import mongoose from "mongoose";

const friendInvitationSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
});

const FriendInvitation = mongoose.model("FriendInvitation", friendInvitationSchema);

export default FriendInvitation;