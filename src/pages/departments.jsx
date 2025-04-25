import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/departments.css"; // Updated css
import Footer from "../components/footer";
import { useLocation, useNavigate } from "react-router-dom";
import syllabusData from "../data/engineering_syllabus.json"; // Update path if needed

// Static Branch List
const branches = [
  "First Year Engineering",
  "Computer Engineering",
  "Information Technology",
  "AI & DS Engineering",
  "AI & ML Engineering",
];

export default function DepartmentsGrid() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  // const query = useQuery();
  // const defaultBranch = query.get("branch") || branches[0];
  // const [selectedBranch, setSelectedBranch] = useState(defaultBranch);
  const query = useQuery();
  const branchQuery = query.get("branch") || branches[0];
  const [selectedBranch, setSelectedBranch] = useState(branchQuery);

  useEffect(() => {
    setSelectedBranch(branchQuery);
  }, [branchQuery]);

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  return (
    <div className="departments-grid-container">
      <h1 className="departments-grid-title">
        {selectedBranch || "All Departments"}
      </h1>

      <div className="departments-grid-content">
        {/* Branches Sidebar */}
        <div className="departments-branches">
          {branches.map((branch, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`departments-branch-item ${selectedBranch === branch ? "active" : ""}`}
              onClick={() => setSelectedBranch(branch)}
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
          ) : subjects.length > 0 ? (
            subjects.map((subject, index) => (
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
                <div className="departments-subject-footer">
                  <span>Syllabus</span>
                  <span className="departments-subject-arrow">&rarr;</span>
                </div>
              </motion.div>
            ))
          ) : (
            <div style={{ color: "#cbd5e1", textAlign: "center", marginTop: "2rem" }}>
              No subjects available.
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
