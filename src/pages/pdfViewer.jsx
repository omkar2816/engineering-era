import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import syllabusData from "../data/engineering_syllabus.json";
import "../styles/pdfViewer.css";
import { motion } from "framer-motion";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PdfViewer() {
  const query = useQuery();
  const branch = query.get("branch");
  const subject = query.get("subject");
  const initialModuleIndex = parseInt(query.get("moduleIndex"), 10);
  const initialSubtopicIndex = parseInt(query.get("subtopicIndex"), 10);

  const branchData = syllabusData.find((b) => b.branch === branch);
  const subjectData = branchData?.subjects.find((s) => s.subjectName === subject);

  const [currentModuleIndex, setCurrentModuleIndex] = useState(initialModuleIndex);
  const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(initialSubtopicIndex);

  if (!branchData || !subjectData) {
    return (
      <div className="pdf-container">
        <p style={{ textAlign: "center", marginTop: "5rem", color: "#cbd5e1" }}>
          PDF data not found.
        </p>
      </div>
    );
  }

  const moduleData = subjectData.modules[currentModuleIndex];
  const subtopic = moduleData?.subtopics[currentSubtopicIndex];
  const pdfUrl = `https://your-s3-bucket-name.s3.amazonaws.com/${branch}/${subject}/${moduleData.moduleName}/${subtopic}.pdf`;

  const handleSubtopicClick = (modIndex, subIndex) => {
    setCurrentModuleIndex(modIndex);
    setCurrentSubtopicIndex(subIndex);
  };

  return (
    <div className="pdf-container">
      <div className="pdf-breadcrumb">
        {branch} → {subject}
      </div>

      <div className="pdf-main">
        <div className="pdf-sidebar">
          {subjectData.modules.map((mod, modIdx) => (
            <div key={modIdx} className="pdf-module">
              <div className="pdf-module-title">{mod.moduleName}</div>
              <div className="pdf-subtopics">
                {mod.subtopics.map((topic, subIdx) => (
                  <div
                    key={subIdx}
                    className={`pdf-subtopic ${modIdx === currentModuleIndex && subIdx === currentSubtopicIndex ? "active" : ""}`}
                    onClick={() => handleSubtopicClick(modIdx, subIdx)}
                  >
                    {`${modIdx + 1}.${subIdx + 1}`} {topic}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          className="pdf-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="pdf-title">{subtopic}</h2>
          <div className="pdf-frame-wrapper">
            <iframe
              className="pdf-frame"
              src={pdfUrl}
              title={subtopic}
              frameBorder="0"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
