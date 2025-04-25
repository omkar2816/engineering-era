import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/vivaQuestions.css";
import Footer from "../components/footer";

const branches = [
  "First Year Engineering",
  "Computer Engineering",
  "Information Technology",
  "AI & DS Engineering",
  "AI & ML Engineering",
];

const vivaSubjects = {
  "First Year Engineering": ["Basic Electrical Engineering", "Engineering Mechanics"],
  "Computer Engineering": ["Data Structures", "Computer Graphics", "Operating System"],
  "Information Technology": ["Database Management System", "Software Engineering"],
  "AI & DS Engineering": ["Artificial Intelligence", "Machine Learning"],
  "AI & ML Engineering": ["Big Data Analytics", "Deep Learning"],
};

export default function VivaQuestionsGrid() {
  const [selectedBranch, setSelectedBranch] = useState("Computer Engineering");

  return (
    <div className="viva-container">
      <h1 className="viva-title">Engineering Viva Questions</h1>
      <div className="viva-content">
        {/* Left Branch List */}
        <div className="viva-branches">
          {branches.map((branch, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`viva-branch-item ${selectedBranch === branch ? "active" : ""}`}
              onClick={() => setSelectedBranch(branch)}
            >
              {branch}
            </motion.div>
          ))}
        </div>

        {/* Right Viva Subjects */}
        <div className="viva-grid">
          {(vivaSubjects[selectedBranch] || []).map((subject, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="viva-card"
            >
              <div className="viva-name">{subject}</div>
              <div className="viva-footer">
                <span>Viva Questions</span>
                <span className="viva-arrow">&rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
