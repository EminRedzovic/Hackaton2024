import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddCourse from "./pages/AddCourse";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import LeaderboardPage from "./pages/LeaderboardPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/registerPage" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
