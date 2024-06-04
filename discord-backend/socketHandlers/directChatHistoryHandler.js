import Conversation from "../models/conversation.js";
import updateChatHistory from "./updates/updateChatHistory.js";

const directChatHistoryHandler = async (socket, data) => {

    try {

        const { userId } = socket.user;
        const { receiverUserId } = data;

        const conversation = await Conversation.findOne({
            participants: { $all: [userId, receiverUserId] }
        });

        if (conversation) {
            updateChatHistory(conversation._id.toString(), socket.id);
        }

    } catch (err) {
        console.log(err);
    }
};

export default directChatHistoryHandler;