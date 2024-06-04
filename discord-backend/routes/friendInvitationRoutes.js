import express from "express";
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import verifyToken from "../middleware/verifyToken.js";
import { postInvite, postAccept, postReject } from "../controllers/friendInvitationControllers.js"

const validator = createValidator();
const router = express.Router();

const postFriendInvitationSchema = Joi.object({
    targetEmailAddress: Joi.string().email(),
});
  
const inviteDecisionSchema = Joi.object({
    id: Joi.string().required(),
});
  
router.post("/invite", verifyToken, validator.body(postFriendInvitationSchema), postInvite );
router.post("/accept", verifyToken, validator.body(inviteDecisionSchema), postAccept );
router.post("/reject", verifyToken, validator.body(inviteDecisionSchema), postReject );
  
export default router;