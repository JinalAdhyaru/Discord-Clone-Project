import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { logout } from "../../../utils/auth";
import { getActions } from "../../../actions/streamActions";
import { connect } from "react-redux";

function DropdownMenu({ audioOnly, setAudioOnly }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAudioOnlyChange = () => {
        setAudioOnly(!audioOnly);
    };

    return (

        <div>
            
            <IconButton onClick={handleMenuOpen} style={{ color: "white" }}>
                <MoreVertIcon />
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
              <MenuItem onClick={handleAudioOnlyChange}>
                  {audioOnly ? "Audio Only Enabled" : "Audio Only Disabled"}
              </MenuItem>
            </Menu>
            
        </div>

    );
}

const mapStoreStateToProps = ({ streams }) => {
    return {
        ...streams,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(DropdownMenu);