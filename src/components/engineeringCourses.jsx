import React from "react";
import "../styles/engineeringCourses.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import courseIcon from "../assets/course-icon.png";

const courses = [
  "First Year Engineering",
  "Computer Engineering",
  "Information Technology",
  "AI & DS Engineering",
  "Computer Science Engineering",
  "AI & ML Engineering",
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  }),
};

export default function EngineeringCourses() {
  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    navigate(`/mu-importants?branch=${encodeURIComponent(course)}`);
  };

  return (
    <section className="courses-section">
      <motion.h2
        className="courses-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="white-text">#No More KTs: </span>
        <span className="green-text">Engineering Courses</span>
      </motion.h2>
      <div className="courses-grid">
        {courses.map((course, index) => (
          <motion.div
            className="course-card"
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleCourseClick(course)}
          >
            <img src={courseIcon} alt="Course Icon" className="course-icon" />
            <p className="course-name">{course}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
