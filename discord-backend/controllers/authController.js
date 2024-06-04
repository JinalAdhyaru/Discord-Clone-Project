import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc Register
// @route POST /api/auth/register
// @access Public
const userRegister = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        //Check if email already exists
        const userExists = await User.findOne({ email: email.toLowerCase() });

        if(userExists) {
            return res.status(409).send("Email already in use");
        }

        //encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        //creating new user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        //create JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d"});

        return res.status(201).json({
            userDetails: {
                username: user.username,
                email: user.email,
                token: token,
                _id: user._id,
            },
        });
        
    } catch (error) {
        return res.status(500).send("Error occured. Please try again.");
    }

};

// @desc Login
// @route POST /api/auth/login
// @access Public
const userLogin = async (req, res) => {
    
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        
        if(user && (await bcrypt.compare(password, user.password))) {

            //create new JWT Token
            const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: "1d"});

            return res.status(200).json({
                userDetails: {
                    username: user.username,
                    email: user.email,
                    _id: user._id,
                    token,
                }
            });

        }

        //if passwords don't match or user doesn't exist
        return res.status(400).send("Invalid credentials. Please try again");
        
    } catch (error) {
        return res.status(500).send("Error occured. Please try again.");
    }

};

export {userRegister, userLogin};