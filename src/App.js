import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AddCourse from "./pages/AddCourse/AddCourse";

import LoginPage from "./pages/Loginpage/LoginPage";
import RegisterPage from "./pages/Registerpage/RegisterPage";

import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage/profilePage";
import Course from "./pages/Course/Course";

import LessonPage from "./pages/Lesson/lessonPage.js";
import QuestionPage from "./pages/Questions/questionPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/registerPage" element={<RegisterPage />} />
        <Route path="/course" element={<Course />} />
        <Route path="/questions" element={<QuestionPage />} />
        <Route path="/lesson" element={<LessonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
