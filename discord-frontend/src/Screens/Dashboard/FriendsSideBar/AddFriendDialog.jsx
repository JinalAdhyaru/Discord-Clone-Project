import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import { validateEmail } from "../../../utils/validators";
import InputWithLabel from "../../../Components/InputWithLabel";
import CustomPrimaryButton from "../../../Components/CustomPrimaryButtons";
import { connect } from "react-redux";
import { getActions } from "../../../actions/friendsActions";

function AddFriendDialog({
  isDialogOpen,
  closeDialogHandler,
  sendFriendInvitation = () => {},
}) {

  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState("");

  const handleSendInvitation = () => {
    sendFriendInvitation({
      targetEmailAddress: email,
    },
    handleCloseDialog
    );
  };

  const handleCloseDialog = () => {
    closeDialogHandler();
    setEmail("");
  };

  useEffect(() => {
    setIsFormValid(validateEmail(email));
  }, [email, setIsFormValid]);

  return (

    <div>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>

        <DialogTitle>
          <Typography>Invite a Friend</Typography>
        </DialogTitle>

        <DialogContent>

          <DialogContentText>
            Enter email address of friend which you would like to invite
          </DialogContentText>

          <InputWithLabel
            label="Email"
            type="text"
            value={email}
            setValue={setEmail}
            placeholder="Enter email address"
          />

        </DialogContent>

        <DialogActions>
          <CustomPrimaryButton
            onClick={handleSendInvitation}
            disabled={!isFormValid}
            label="Send"
            additionalStyles={{
              marginLeft: "15px",
              marginRight: "15px",
              marginBottom: "10px",
            }}
          />
        </DialogActions>

      </Dialog>

    </div>

  );

};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(AddFriendDialog);
