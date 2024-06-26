import "./profilePage.css";
import NavigationCard from "../../components/CourseCards/NavigationCard";
import profile from "../../mockedData/profile.png";
import cestKorisnik from "../../badges/5Dan.svg";
import osvojenoTakmicenje from "../../badges/osvojenoTakmicenje.svg";
import prviKurs from "../../badges/prviKurs.svg";
import prvoMesto from "../../badges/prvoMesto.svg";
import { CiSettings } from "react-icons/ci";
import { auth, editProfile, getUserData } from "../../firebase";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { GiGraduateCap } from "react-icons/gi";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [fullname, setFullname] = useState();
  const [aboutme, setAboutme] = useState();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(user);
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
  const getUser = async (uid) => {
    const result = await getUserData(uid);
    setFullname(result && result.displayName);
    setAboutme(result && result.aboutme && result.aboutme);
    setUser(result);
  };
  const changeProfile = async () => {
    const data = {
      badges: [],
      displayName: fullname,
      email: user.email,
      isAdmin: false,
      userId: user.userId,
      aboutme: aboutme,
    };
    try {
      await editProfile(user.userId, data);
      editProfile1();
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };
  const editProfile1 = async () => {
    console.log(user.userId);
    let modal = document.querySelector(".editProfile");
    console.log(modal.style.display);
    if (modal.style.display === "" || modal.style.display === "none") {
      modal.style.display = "block";
    } else {
      modal.style.display = "none";
    }
  };
  return (
    <div className="about-page">
      <div className="pre-section">
        <NavigationCard />
      </div>

      <div className="profile1">
        <div className="about-div">
          <div className="about-me-section">
            <div className="image-and-name">
              <img src={profile} alt="asdasd" />
              <h1>{user && user.displayName}</h1>
              <CiSettings
                style={{ width: "40px", height: "40px", marginLeft: "10px" }}
                onClick={() => editProfile1()}
              />
            </div>
            <div className="points-div">
              <p>
                1028
                <GiGraduateCap
                  style={{
                    width: "30px",
                    color: "#bc7c19",
                  }}
                />
              </p>
            </div>
          </div>
          <h2 className="about-me-h2">O Meni</h2>
          <div className="linija"></div>
          <div className="about-me">
            <p>
              {user && user.aboutme ? (
                user.aboutme
              ) : (
                <Typography>About me</Typography>
              )}
              {/* Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic */}
            </p>
          </div>
          <div className="other">
            <ul>
              <li className="badges-li">Bedzevi</li>
              <div className="linija"></div>
            </ul>
          </div>
          <div className="badges">
            <ul>
              <li>
                <img
                  src={cestKorisnik}
                  style={{ width: "150px", height: "120px" }}
                />
                <p>7 uzastopni dan ulazka na platformu</p>
              </li>
              <li>
                <img
                  src={osvojenoTakmicenje}
                  style={{ width: "150px", height: "120px" }}
                />
                <p>Osvojeno Takmicenje</p>
              </li>
              <li>
                <img
                  src={prviKurs}
                  style={{ width: "150px", height: "120px" }}
                />
                <p>Prvi zapoceti kurs</p>
              </li>
              <li>
                <img
                  src={prvoMesto}
                  style={{ width: "150px", height: "120px" }}
                />
                <p>Prvo mesto na rang listi</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="editProfile">
        <p onClick={() => editProfile1()}>X</p>
        <img src={profile} />
        <input type="file" />
        <label>Ime i Prezime</label>
        <input
          type="text"
          placeholder="Daris Mavric"
          value={fullname}
          onChange={(e) => {
            setFullname(e.target.value);
          }}
        />
        <label>O Meni</label>
        <textarea
          placeholder="Write something about you"
          value={aboutme}
          onChange={(e) => {
            setAboutme(e.target.value);
          }}
        />
        <button style={{ cursor: "pointer" }} onClick={() => changeProfile()}>
          Sacuvaj
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
