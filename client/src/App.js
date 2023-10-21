import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import CollegePage from "./components/collegePage/CollegePage.jsx";
import StudentPage from "./components/common/student/StudentPage.jsx";
import StudentsByCollege from "./components/common/student/StudentsByCollege.jsx";
import SearchComponent from "./components/search/SearchComponent";
import Colleges from "./components/collegePage/Colleges";

function App() {
  return (
    <>
      <Router>
        <SearchComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/college-page/:collegeId" element={<CollegePage />} />
          <Route path="/student-page/:studentId" element={<StudentPage />} />
          <Route
            path="/students-by-college/:collegeId/:collegeName"
            element={<StudentsByCollege />}
          />
          <Route path="/colleges/:action/:value" element={<Colleges />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
