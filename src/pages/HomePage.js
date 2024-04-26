import { Typography } from "@mui/material";
import NavigationCard from "../components/CourseCards/NavigationCard";
import CourseCards from "../components/CourseCards/CourseCards";
import "../styles/HomeScreen.css";

const HomeScreen = () => {
  return (
    <>

      <div className="HomeScreen">
        <div className="side-bar">
          <NavigationCard />
        </div>

        <div className="main-screen">
          <CourseCards />
        </div>
      </div>

    </>
  );
};

export default HomeScreen;
