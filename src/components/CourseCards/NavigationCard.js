import React, { useEffect, useState } from "react";
import "../../pages/HomePage/HomeScreen.css";
import mockedProfile from "../../mockedData/profile.png";

import cestKorisnik from "../../badges/5Dan.svg";
import osvojenoTakmicenje from "../../badges/osvojenoTakmicenje.svg";
import prviKurs from "../../badges/prviKurs.svg";
import prvoMesto from "../../badges/prvoMesto.svg";

import { Box, Typography, CircularProgress } from "@mui/material";

import sajtLogo from "../../styles/sajtLogo.png";
import { auth, getUserData } from "../../firebase";
import { signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import BookIcon from "@mui/icons-material/Book";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const NavigationCard = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getUser = async (uid) => {
    const result = await getUserData(uid);
    setIsLoading(false);
    setUser(result);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        getUser(authUser.uid);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    });
    return () => unsubscribe();
  }, [auth, isLoading]);

  const logout = () => {
    signOut(auth);
    setUser();
  };

  return (
    <div className="sidebar">
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box className="logo">
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

          {user ? (
            <>
              <Box className="badges">
                <Typography
                  className="badges-p"
                  sx={{ fontSize: "22px", fontWeight: "bold" }}
                >
                  Bedzevi
                </Typography>
                <Box className="badges-container">
                  <img src={cestKorisnik} width={"60px"} height={"60px"} />
                  <img
                    src={osvojenoTakmicenje}
                    width={"50px"}
                    height={"50px"}
                  />
                  <img src={prviKurs} width={"50px"} height={"50px"} />
                  <img src={prvoMesto} width={"50px"} height={"50px"} />
                </Box>
              </Box>

              <ul className="navigation-items">
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
                  Rang Lista
                </li>
                {user.isAdmin && (
                  <>
                    <li
                      onClick={() => {
                        navigate("/addcourse");
                      }}
                    >
                      <AddCircleOutlineIcon />
                      Dodaj kurs
                    </li>
                  </>
                )}
              </ul>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Box>
          )}

          {user && (
            <Box
              className="profile"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/profile");
              }}
            >
              <img src={mockedProfile} alt="Profile Picture" />
              <span className="profile-username">{user.displayName}</span>
            </Box>
          )}

          {user ? (
            <button className="sidebar-button logout-button" onClick={logout}>
              Izloguj se
            </button>
          ) : (
            <div>
              <button
                className="sidebar-button"
                onClick={() => {
                  navigate("/registerPage");
                }}
              >
                Registruj se
              </button>
              <button
                className="sidebar-button login-button"
                onClick={() => {
                  navigate("/loginpage");
                }}
              >
                Login
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NavigationCard;
