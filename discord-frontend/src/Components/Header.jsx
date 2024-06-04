import React from 'react'
import { Typography } from '@mui/material';

function Header(props) {
  return (
    <>
        <Typography variant="h5" sx={{ color: "white"}}>
            {props.mainText}
        </Typography>
        <Typography sx={{ color: "#b9bbbe" }}>
            {props.subText}
        </Typography>
    </>
  )
}

export default Header;