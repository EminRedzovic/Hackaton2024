import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddCourse from "./pages/AddCourse";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/profilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/addcourse" element={<AddCourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
