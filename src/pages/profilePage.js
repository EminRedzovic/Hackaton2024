import "../styles/profilePage.css";
import NavigationCard from "../components/CourseCards/NavigationCard";
import profile from "./profile.jpg";
import medalja from "./medalja.svg";

const ProfilePage = () => {
  return (
    <div className="pre-section">
      <NavigationCard />
      <div className="profile1">
        <div className="about-me-section">
          <div className="image-and-name">
            <img src={profile} alt="asdasd" />
            <h1>Daris Mavric</h1>
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
    </div>
  );
};

export default ProfilePage;
