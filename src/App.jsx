// App.jsx
import React, { useState, useEffect } from "react";
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

import InstructorDashboard from "./pages/instructorDashboard";

// Modal
import AuthModal from "./pages/loginRegister";

// Protected Route Component
import ProtectedRoute from "./components/protectedRoute";

// Supabase Client
import { supabase } from "./backend/supabaseClient";

function App() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Check if the user is logged in when the app loads
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true); // User is logged in
      }
    };
    checkUser();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar onLoginClick={() => setAuthModalOpen(true)} />

        {/* Login Modal */}
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setAuthModalOpen(false)}
            onLoginSuccess={() => {
              setIsLoggedIn(true); // Update login state on success
              setAuthModalOpen(false); // Close the modal
            }}
          />
        )}

        {/* Routes */}
        <Routes>
          {/* Public Routes */}
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

          {/* Protected Routes */}
          <Route
            path="/subject-modules"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} setAuthModalOpen={setAuthModalOpen}>
                <><SubjectModules /> <Footer /></>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lecture"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} setAuthModalOpen={setAuthModalOpen}>
                <><Lecture /> <Footer /></>
              </ProtectedRoute>
            }
          />

          {/* Other Routes */}
          <Route path="/reviews" element={<><Reviews /> <Footer /></>} />
          <Route path="/engineering-math" element={<><EngineeringMath /> <Footer /></>} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
