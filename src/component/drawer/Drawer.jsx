import React from "react";
import { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "../../redux/slice/drawerslice.jsx";
import "./drawer.css";
import Divider from "@mui/material/Divider";

const Drawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawer.isOpen);

  const handleDrawerclose = () => {
    dispatch(closeDrawer());
  };

  return (
    <div className={isOpen ? "drawer_main" : "hidedrawer_main"}>
      <div className="drawerheader">
        {isOpen && (
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="header_logo_text"
          >
            DonganZo
          </Typography>
        )}
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={handleDrawerclose}
          edge="end"
          className="closebtn"
          sx={[
            {
              mr: 2,
              color: "#fff",
            },
            !isOpen && { display: "none" },
          ]}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
      {/* <Divider className="drawer_divider"/> */}
    </div>
  );
};

export default Drawer;
