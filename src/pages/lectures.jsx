import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import syllabusData from "../data/engineering_syllabus.json";
import "../styles/lecture.css";
import { motion } from "framer-motion";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Lecture() {
  const query = useQuery();
  const branch = query.get("branch");
  const subject = query.get("subject");
  const initialModuleIndex = parseInt(query.get("moduleIndex"), 10);
  const initialSubtopicIndex = parseInt(query.get("subtopicIndex"), 10);

  const navigate = useNavigate();

  const branchData = syllabusData.find((b) => b.branch === branch);
  const subjectData = branchData?.subjects.find((s) => s.subjectName === subject);

  const [currentModuleIndex, setCurrentModuleIndex] = useState(initialModuleIndex);
  const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(initialSubtopicIndex);

  if (!branchData || !subjectData) {
    return (
      <div className="lecture-container">
        <p style={{ textAlign: "center", marginTop: "5rem", color: "#cbd5e1" }}>
          Lecture data not found.
        </p>
      </div>
    );
  }

  const moduleData = subjectData.modules[currentModuleIndex];
  const subtopic = moduleData?.subtopics[currentSubtopicIndex];

  const handleSubtopicClick = (modIndex, subIndex) => {
    setCurrentModuleIndex(modIndex);
    setCurrentSubtopicIndex(subIndex);
  };

  const videoUrl = `https://your-s3-bucket-name.s3.amazonaws.com/${branch}/${subject}/${moduleData.moduleName}/${subtopic}.mp4`;

  return (
    <div className="lecture-container">
      {/* Top Breadcrumb */}
      <div className="lecture-breadcrumb">
        {branch} → {subject}
      </div>

      {/* Main Content Split */}
      <div className="lecture-main">
        {/* Sidebar */}
        <div className="lecture-sidebar">
          {subjectData.modules.map((mod, modIdx) => (
            <div key={modIdx} className="lecture-module">
              <div className="lecture-module-title">{mod.moduleName}</div>
              <div className="lecture-subtopics">
                {mod.subtopics.map((topic, subIdx) => (
                  <div
                    key={subIdx}
                    className={`lecture-subtopic ${modIdx === currentModuleIndex && subIdx === currentSubtopicIndex ? "active" : ""}`}
                    onClick={() => handleSubtopicClick(modIdx, subIdx)}
                  >
                    {`${modIdx + 1}.${subIdx + 1}`} {topic}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Video Area */}
        <motion.div
          className="lecture-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="lecture-title">{subtopic}</h2>

          <div className="lecture-video-wrapper">
            <video controls className="lecture-video">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
