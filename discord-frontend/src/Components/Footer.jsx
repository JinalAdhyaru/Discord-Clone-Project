import React from "react";
import CustomPrimaryButton from "./CustomPrimaryButtons";
import RedirectInfo from "./RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

function Footer({formValidMsg, formInvalidMsg, historyPath, text, label, redirectText, handleFunction, isFormValid}) {
  
  const navigate = useNavigate();

  function handleRedirect() {
    navigate(historyPath); 
  }

  return (
    <>

      <Tooltip title={!isFormValid ? formInvalidMsg : formValidMsg}>
        <div>
          <CustomPrimaryButton 
            label={label}
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleFunction}
          />  
        </div>
      </Tooltip>

      <RedirectInfo 
        text={text}
        redirectText={redirectText}
        additionalStyles={{marginTop: "5px"}}
        redirectHandler={handleRedirect}
      />

    </>
  );

};

export default Footer;