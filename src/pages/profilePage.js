import "../styles/profilePage.css";
import NavigationCard from "../components/CourseCards/NavigationCard";
import profile from "./profile.jpg";

const ProfilePage = () => {
  return (
    <div className="pre-section">
      <NavigationCard />
      <div className="profile">
        <img src={profile} alt="asdasd" />
        <h1>Daris Mavric</h1>
      </div>
    </div>
  );
};

export default ProfilePage;
