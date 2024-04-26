import React, { useEffect, useState } from "react";
import "../../styles/HomeScreen.css";
import mockedProfile from "../../mockedData/profile.png";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import sajtLogo from "../../styles/sajtLogo.png";
import { auth, getUserData } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const NavigationCard = () => {
  const mocked = ["Badge1", "Badge2", "Badge3", "Badge4", "Badge5", "Badge6"];
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const getUser = async (uid) => {
    const result = await getUserData(uid);
    setUser(result);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        getUser(authUser.uid);
      }

      if (isLoading) {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, isLoading]);

  const logout = () => {
    auth.signOut();
    setUser();
  };

  return (
    <>
      <Box className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {isOpen && (
          <Box>
            <Box className={`logo`}>
              <img src={sajtLogo} alt="Profile Picture" />
              <Typography
                sx={{
                  letterSpacing: 4,
                  fontWeight: "bold",
                  fontSize: 21,
                }}
              >
                EduConnect
              </Typography>
            </Box>

            {user ? (
              <Button
                onClick={() => {
                  logout();
                }}
                variant="outlined"
              >
                Log out
              </Button>
            ) : (
              <Typography
                style={{
                  marginTop: 20,
                  marginLeft: 10,
                }}
              >
                <span
                  onClick={() => {
                    navigate("/loginpage");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </span>{" "}
                or{" "}
                <span
                  onClick={() => {
                    navigate("/registerPage");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Register
                </span>{" "}
                to use all features
              </Typography>
            )}
            {user && (
              <>
                <Box className={`profile`}>
                  <img src={mockedProfile} alt="Profile Picture" />
                  <span>{user && user.displayName}</span>
                </Box>
                <Box className={`badges `}>
                  <Typography>Bedzevi</Typography>
                  <Box className="badges-container">
                    {mocked.map((item) => {
                      return (
                        <Typography className="customText">{item}</Typography>
                      );
                    })}
                  </Box>
                </Box>
                <ul className={`navigation-items`}>
                  <li>Kursevi</li>
                  <li>Downloaded Lessons</li>
                  <li>None</li>
                </ul>
              </>
            )}
          </Box>
        )}
        <IconButton className={`close-button`} onClick={toggleSidebar}>
          {isOpen ? (
            <ArrowBackIcon sx={{ color: "white", marginLeft: 1 }} />
          ) : (
            <ArrowForwardIcon sx={{ color: "white", marginRight: -1 }} />
          )}
        </IconButton>
      </Box>
    </>
  );
};

export default NavigationCard;
