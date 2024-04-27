import NavigationCard from "../../components/CourseCards/NavigationCard";
import "./Leaderboard.css";

const LeaderboardPage = () => {
  return (
    <div className="pre-leaderboard">
      <NavigationCard />
      <div className="leaderboard">
        <div className="first-three">
          <div className="silver">
            <h1>Daris Mavric</h1>
          </div>
          <div className="gold">
            <h1>Daris Mavric</h1>
          </div>
          <div className="bronze">
            <h1>Daris Mavric</h1>
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
          <h3>1</h3>
          <h3>Daris Mavric</h3>
          <h3>20</h3>
          <h3>1208</h3>
        </div>
        <div className="student">
          <h3>1</h3>
          <h3>Daris Mavric</h3>
          <h3>20</h3>
          <h3>1208</h3>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
