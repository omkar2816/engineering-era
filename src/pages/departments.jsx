import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/departments.css";
import Footer from "../components/footer";
import { useLocation, useNavigate } from "react-router-dom";
import syllabusData from "../data/engineering_syllabus.json";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const branches = [
  "First Year Engineering",
  "Computer Engineering",
  "Information Technology",
  "AI & DS Engineering",
  "AI & ML Engineering",
];

// Helper to fetch subject progress from localStorage
const getProgress = (branch, subject) => {
  const progressData = JSON.parse(localStorage.getItem("userProgress")) || {};
  const branchData = progressData[branch] || {};
  const subjectData = branchData[subject] || { watched: 0, total: 1 };
  return Math.round((subjectData.watched / subjectData.total) * 100);
};

export default function DepartmentsGrid() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const branchQuery = query.get("branch") || branches[0];
  const [selectedBranch, setSelectedBranch] = useState(branchQuery);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedBranch(branchQuery);
  }, [branchQuery]);

  useEffect(() => {
    if (selectedBranch) {
      const fetchSubjects = async () => {
        setLoading(true);
        try {
          const data = syllabusData.find(
            (entry) => entry.branch === selectedBranch
          );
          setSubjects(data?.subjects.map((s) => s.subjectName) || []);
        } catch (error) {
          console.error("Failed to fetch subjects:", error);
          setSubjects([]);
        } finally {
          setLoading(false);
        }
      };

      fetchSubjects();
    }
  }, [selectedBranch]);

  const filteredSubjects = subjects.filter((subject) =>
    subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="departments-grid-container">
      <h1 className="departments-grid-title">
        {selectedBranch || "All Departments"}
      </h1>

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

      <div className="departments-grid-content">
        {/* Branches Sidebar */}
        <div className="departments-branches">
          {branches.map((branch, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`departments-branch-item ${selectedBranch === branch ? "active" : ""}`}
              onClick={() => {
                setSelectedBranch(branch);
                setSearchTerm("");
              }}
            >
              {branch}
            </motion.div>
          ))}
        </div>

        {/* Subjects Grid */}
        <div className="departments-subjects-grid">
          {loading ? (
            Array(6)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="departments-subject-card loading" />
              ))
          ) : filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="departments-subject-card"
                onClick={() =>
                  navigate(
                    `/subject-modules?branch=${encodeURIComponent(selectedBranch)}&subject=${encodeURIComponent(subject)}`
                  )
                }
              >
                <div className="departments-subject-name">{subject}</div>

                {/* Circular Progress Bar */}
                <div className="departments-subject-progress">
                  <CircularProgressbar
                    value={getProgress(selectedBranch, subject)}
                    text={`${getProgress(selectedBranch, subject)}%`}
                    styles={buildStyles({
                      textColor: "#f1f5f9",
                      pathColor: "#22c55e",
                      trailColor: "#334155",
                      textSize: "28px",
                    })}
                  />
                </div>

                <div className="departments-subject-footer">
                  <span>Syllabus</span>
                  <span className="departments-subject-arrow">&rarr;</span>
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

      <Footer />
    </div>
  );
}
