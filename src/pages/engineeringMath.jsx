// src/components/EngineeringMath.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/engineeringMath.css";
import syllabusData from "../data/engineering_syllabus.json"; // Update path if needed

const subjects = [
  "Engineering Mathematics-I",
  "Engineering Mathematics-II",
  "Engineering Mathematics-III",
  "Engineering Mathematics-IV",
];

export default function EngineeringMath() {
  const navigate = useNavigate();

  return (
    <div className="engineering-math-container">
      <h1 className="engineering-math-title">
        <span className="white-text">#Mathematics: </span>
        <span className="green-text">Core Subjects</span>
      </h1>

      <div className="engineering-math-grid">
        {subjects.map((subject, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="math-card"
            onClick={() =>
              navigate(
                `/subject-modules?branch=Computer%20Engineering&subject=${encodeURIComponent(subject)}`
              )
            }
          >
            <div className="math-name">{subject}</div>
            <div className="math-footer">
              <span>Syllabus</span>
              <span className="math-arrow">&rarr;</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
