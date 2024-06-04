import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    friends: [{
        type: mongoose.Schema.Types.Object,
        ref: "User"
    }],
});

const User = mongoose.model("User", userSchema);

export default User;