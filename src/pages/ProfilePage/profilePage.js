import "../styles/profilePage.css";
import NavigationCard from "../components/CourseCards/NavigationCard";
import profile from "./profile.jpg";
import medalja from "./medalja.svg";
import { CiSettings } from "react-icons/ci";
import { auth, getUserData } from "../firebase";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState();
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
    setUser(result);
  };
  const changeProfile = () => {};
  const editProfile = () => {
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
    <div className="pre-section">
      <NavigationCard />
      <div className="profile1">
        <div className="about-me-section">
          <div className="image-and-name">
            <img src={profile} alt="asdasd" />
            <h1>{user && user.displayName}</h1>
            <CiSettings
              style={{ width: "40px", height: "40px", marginLeft: "10px" }}
              onClick={() => editProfile()}
            />
          </div>
          <p>1028 Poena</p>
        </div>
        <h2>About me</h2>
        <div className="linija"></div>
        <div className="about-me">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic
          </p>
        </div>
        <div className="other">
          <ul>
            <li>Badges</li>
            <li>Joined Courses</li>
          </ul>
        </div>
        <div className="badges">
          <ul>
            <li>
              <img src={medalja} style={{ width: "150px", height: "120px" }} />
              <p>Prva pobeda na takmicenju</p>
            </li>
            <li>
              <img src={medalja} style={{ width: "150px", height: "120px" }} />
              <p>10 predjenih kurseva</p>
            </li>
            <li>
              <img src={medalja} style={{ width: "150px", height: "120px" }} />
              <p>1000 predjenih poena</p>
            </li>
            <li>
              <img src={medalja} style={{ width: "150px", height: "120px" }} />
              <p>Nzm sta je ovo</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="editProfile">
        <p onClick={() => editProfile()}>X</p>
        <img src={profile} />
        <input type="file" />
        <label>First and Last Name</label>
        <input type="text" placeholder="Daris Mavric" />
        <label>About me</label>
        <textarea placeholder="Write something about you" />
        <button onClick={() => changeProfile()}>Save</button>
      </div>
    </div>
  );
};

export default ProfilePage;
