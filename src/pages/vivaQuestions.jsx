import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/vivaQuestions.css";
import Footer from "../components/footer";
import syllabusData from "../data/engineering_syllabus.json"; // <-- Import syllabus JSON

const branches = [
  "First Year Engineering",
  "Computer Engineering",
  "Information Technology",
  "AI & DS Engineering",
  "AI & ML Engineering",
];

export default function VivaQuestionsGrid() {
  const [selectedBranch, setSelectedBranch] = useState("Computer Engineering");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Find subjects dynamically from the syllabusData
    const branchInfo = syllabusData.find(b => b.branch === selectedBranch);
    if (branchInfo) {
      const subjectNames = branchInfo.subjects.map(subject => subject.subjectName);
      setSubjects(subjectNames);
    } else {
      setSubjects([]);
    }
  }, [selectedBranch]);

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
          {subjects.map((subject, index) => (
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
