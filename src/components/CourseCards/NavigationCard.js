import React, { useEffect, useState } from "react";
import "../../pages/HomePage/HomeScreen.css";
import mockedProfile from "../../mockedData/profile.png";
import { Box, Typography, Button } from "@mui/material";
import sajtLogo from "../../styles/sajtLogo.png";
import { auth, getUserData } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import BookIcon from "@mui/icons-material/Book";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const NavigationCard = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      <Box className={"sidebar"}>
        <Box>
          <Box className={`logo`}>
            <img
              src={sajtLogo}
              alt="Profile Picture"
              className="logo-sidebar"
            />
            <Typography
              sx={{
                letterSpacing: 4,
                fontWeight: "bold",
                fontSize: 20,
                paddingLeft: 2,
              }}
            >
              EduConnect
            </Typography>
          </Box>

          {user && (
            <>
              <Box className={`badges `}>
                <Typography
                  className="badges-p"
                  sx={{ fontSize: "22px", fontWeight: "bold" }}
                >
                  Badges
                </Typography>
                <Box className="badges-container">
                  {/* <MilitaryTechIcon sx={{ color: "gold", fontSize: "30px" }} />
                    <MilitaryTechIcon
                      sx={{ color: "silver", fontSize: "30px" }}
                    />
                    <MilitaryTechIcon
                      sx={{ color: "bronze", fontSize: "30px" }}
                    />
                    <MilitaryTechIcon sx={{ color: "brown", fontSize: "30px" }} /> */}
                </Box>
              </Box>
              <ul className={`navigation-items`}>
                <li
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <BookIcon />
                  Kursevi
                </li>
                <li
                  onClick={() => {
                    navigate("/leaderboard");
                  }}
                >
                  <LeaderboardIcon />
                  Leaderboard
                </li>
                {user && user.isAdmin && (
                  <li
                    onClick={() => {
                      navigate("/addcourse");
                    }}
                  >
                    <AddCircleOutlineIcon />
                    Dodaj kurs
                  </li>
                )}
              </ul>
            </>
          )}

          {user && (
            <Box
              className={`profile`}
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/profile");
              }}
            >
              <img src={mockedProfile} alt="Profile Picture" />
              <span className="profile-username">
                {user && user.displayName}
              </span>
            </Box>
          )}

          {user ? (
            <button className="sidebar-button logout-button" onClick={logout}>
              Log out
            </button>
          ) : (
            <div>
              <button
                className="sidebar-button"
                onClick={() => {
                  navigate("/registerPage");
                }}
              >
                Register
              </button>

              <button
                className="sidebar-button login-button  "
                onClick={() => {
                  navigate("/loginpage");
                }}
              >
                Login
              </button>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
};

export default NavigationCard;
