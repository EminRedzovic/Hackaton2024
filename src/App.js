import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddCourse from "./pages/AddCourse";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addcourse" element={<AddCourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
