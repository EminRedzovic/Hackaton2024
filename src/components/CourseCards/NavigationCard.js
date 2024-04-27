import React, { useEffect, useState } from "react";
import "../../pages/HomePage/HomeScreen.css";
import mockedProfile from "../../mockedData/profile.png";
import cestKorisnik from "../../badges/5Dan.svg";
import osvojenoTakmicenje from "../../badges/osvojenoTakmicenje.svg";
import prviKurs from "../../badges/prviKurs.svg";
import prvoMesto from "../../badges/prvoMesto.svg";
import { Box, Typography } from "@mui/material";
import sajtLogo from "../../styles/sajtLogo.png";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { auth, getUserData } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
            <img src={sajtLogo} alt="Profile Picture" />
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
              <ul className={`navigation-items`}>
                <li
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Kursevi
                </li>
                <li
                  onClick={() => {
                    navigate("/leaderboard");
                  }}
                >
                  Leaderboard
                </li>
                {user && user.isAdmin && (
                  <li
                    onClick={() => {
                      navigate("/addcourse");
                    }}
                  >
                    Dodaj kurs
                  </li>
                )}
              </ul>
            </>
          )}
          {user ? (
            <button className="logoutButton" onClick={logout}>
              Log out
            </button>
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
        </Box>

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
            <span>{user && user.displayName}</span>
          </Box>
        )}
      </Box>
    </>
  );
};

export default NavigationCard;
