import "../styles/profilePage.css";
import NavigationCard from "../components/CourseCards/NavigationCard";
import profile from "./profile.jpg";

const ProfilePage = () => {
  return (
    <div className="pre-section">
      <NavigationCard />
      <div className="profile1">
        <div className="image-and-name">
          <img src={profile} alt="asdasd" />
          <h1>Daris Mavric</h1>
        </div>
        <div className="about-me">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
