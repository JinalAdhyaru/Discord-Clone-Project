import express from "express";
import { userLogin, userRegister } from "../controllers/authController.js";
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import verifyToken from "../middleware/verifyToken.js";

const validator = createValidator();
const router = express.Router();

//Required body parameters for userRegister
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    email: Joi.string().email().required(), 
    password: Joi.string().min(6).max(12).required(),
});

//Required body parameters for userLogin
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
});

router.post("/register", validator.body(registerSchema), userRegister);

router.post("/login", validator.body(loginSchema), userLogin);

//test route to verify if our middleware is working
router.get("/test", verifyToken, (req, res) => {
    res.send("Request passed");
});

export default router;