import NavigationCard from "../../components/CourseCards/NavigationCard";
import "./Leaderboard.css";
import profilepicture from "../../mockedData/profile.png";

const LeaderboardPage = () => {
  return (
    <div className="pre-leaderboard">
      <NavigationCard />
      <div className="leaderboard">
        <div className="first-three">
          <div className="silver">
            <h1>Emin Redzovic</h1>
            <img className="profile-picture" src={profilepicture} />
          </div>
          <div className="gold">
            <h1>Daris Mavric</h1>
            <img className="profile-picture" src={profilepicture} />
          </div>
          <div className="bronze">
            <h1>Danilo Petrovic</h1>
            <img className="profile-picture" src={profilepicture} />
          </div>
        </div>
        <div className="sections">
          <h1>Rank</h1>
          <h1>Name</h1>
          <h1>Finished Courses</h1>
          <h1>Points</h1>
        </div>
        <div className="student">
          <h3>1</h3>
          <h3>Daris Mavric</h3>
          <h3>20</h3>
          <h3>1208</h3>
        </div>
        <div className="student">
          <h3>2</h3>
          <h3>Emin Redzovic</h3>
          <h3>18</h3>
          <h3>1000</h3>
        </div>
        <div className="student">
          <h3>3</h3>
          <h3>Danilo Petrovic</h3>
          <h3>10</h3>
          <h3>650</h3>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
