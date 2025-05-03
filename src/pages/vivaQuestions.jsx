import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/vivaQuestions.css";
import Footer from "../components/footer";
import syllabusData from "../data/engineering_syllabus.json";

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
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const branchInfo = syllabusData.find(b => b.branch === selectedBranch);
    if (branchInfo) {
      const subjectNames = branchInfo.subjects.map(subject => subject.subjectName);
      setSubjects(subjectNames);
    } else {
      setSubjects([]);
    }
  }, [selectedBranch]);

  const filteredSubjects = subjects.filter(subject =>
    subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubjectClick = (subject) => {
    navigate(
      `/pdf-viewer?branch=${encodeURIComponent(selectedBranch)}&subject=${encodeURIComponent(subject)}&moduleIndex=0&subtopicIndex=0`
    );
  };

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
              onClick={() => {
                setSelectedBranch(branch);
                setSearchTerm(""); // Reset search when branch changes
              }}
            >
              {branch}
            </motion.div>
          ))}
        </div>

        {/* Right Viva Subjects */}
        <div className="viva-subjects-wrapper">
          {/* Search Bar */}
          <div className="subject-search-bar-wrapper">
            <input
              type="text"
              placeholder="Search subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="subject-search-input"
            />
          </div>

          <div className="viva-grid">
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="viva-card"
                  onClick={() => handleSubjectClick(subject)}
                >
                  <div className="viva-name">{subject}</div>
                  <div className="viva-footer">
                    <span>Viva Questions</span>
                    <span className="viva-arrow">&rarr;</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div style={{ color: "#cbd5e1", textAlign: "center", marginTop: "2rem" }}>
                No subjects match your search.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
