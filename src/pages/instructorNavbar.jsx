import React from "react";
import { motion } from "framer-motion";
import "../styles/instructorNavbar.css";

const InstructorNavbar = () => {
  return (
    <nav className="instructor-navbar">
      <motion.div className="logo" whileHover={{ scale: 1.05 }}>
        EngiEra
      </motion.div>
      <ul className="nav-links">
        {["Home", "My Courses", "Doubts", "Student Reviews"].map((item) => (
          <motion.li key={item} whileHover={{ color: "#facc15" }}>
            {item}
          </motion.li>
        ))}
      </ul>
      <div className="profile-icon">👤</div>
    </nav>
  );
};

export default InstructorNavbar;
