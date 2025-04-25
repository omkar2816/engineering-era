// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import ImportantBtns from "./components/important-btns";
import Universities from "./components/universities";
import EngineeringCourses from "./components/engineeringCourses";
import StudentReviews from "./components/studentReviews";
import SocialHandles from "./components/socialHandles";
import Footer from "./components/footer";

// Pages
import MuImportants from "./pages/departments";
import VivaQuestions from "./pages/vivaQuestions";
import AllNotes from "./pages/notes";
import AboutUs from "./pages/aboutUs";
import ContactUs from "./pages/contactUs";
import SubjectModules from "./pages/subjectModules";
import Lecture from "./pages/lectures";
import Reviews from "./pages/reviews";
import EngineeringMath from "./pages/engineeringMath";

// Modal
import AuthModal from "./pages/loginRegister";

function App() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar onLoginClick={() => setAuthModalOpen(true)} />
        {isAuthModalOpen && (
          <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <ImportantBtns />
                <Universities />
                <EngineeringCourses />
                <StudentReviews />
                <SocialHandles />
                <Footer />
              </>
            }
          />
          <Route path="/mu-courses" element={<><EngineeringCourses /> <Footer /></>} />
          <Route path="/mu-importants" element={<MuImportants />} />
          <Route path="/viva-questions" element={<VivaQuestions />} />
          <Route path="/all-notes" element={<AllNotes />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/subject-modules" element={<><SubjectModules /> <Footer /></>} />
          <Route path="/lecture" element={<><Lecture /> <Footer /></>} />
          <Route path="/reviews" element={<><Reviews /> <Footer /></>} />
          <Route path="/engineering-math" element={<><EngineeringMath /> <Footer /></>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
