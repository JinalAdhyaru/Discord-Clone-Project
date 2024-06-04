import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: { type: String },
    date: { type: Date },
    type: { type: String },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;