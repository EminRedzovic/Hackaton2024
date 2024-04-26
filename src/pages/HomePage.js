// Navigation.js

import React, { useState } from "react";
import "../styles/HomeScreen.css";
import mockedProfile from "../mockedData/profile.png";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const HomeScreen = () => {
  const mocked = ["Badge1", "Badge2", "Badge3", "Badge4", "Badge5", "Badge6"];
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Box className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <IconButton
        className={`close-button ${isOpen ? "visible" : "hidden"}`}
        onClick={toggleSidebar}
      >
        {isOpen ? <ArrowBackIcon /> : <ArrowForwardIcon />}
      </IconButton>
      {isOpen && (
        <Box>
          <Box className={`logo ${isOpen ? "visible" : "hidden"}`}>
            <Typography variant="p" sx={{ letterSpacing: 5, fontSize: 40 }}>
              LOGO
            </Typography>
          </Box>
          <Box className={`profile ${isOpen ? "visible" : "hidden"}`}>
            <img src={mockedProfile} alt="Profile Picture" />
            <span>Mocked User</span>
          </Box>
          <Box className={`badges ${isOpen ? "visible" : "hidden"}`}>
            <Typography>Bedzevi</Typography>
            <Box className="badges-container">
              {mocked.map((item) => {
                return <Typography className="customText">{item}</Typography>;
              })}
            </Box>
          </Box>
          <ul className={`navigation-items ${isOpen ? "visible" : "hidden"}`}>
            <li>Kursevi</li>
            <li>Downloaded Lessons</li>
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default HomeScreen;
