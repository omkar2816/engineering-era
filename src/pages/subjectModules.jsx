import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import syllabusData from "../data/engineering_syllabus.json";
import "../styles/subjectModules.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SubjectModules() {
  const query = useQuery();
  const branch = query.get("branch");
  const subject = query.get("subject");

  const navigate = useNavigate();

  const branchData = syllabusData.find((b) => b.branch === branch);
  const subjectData = branchData?.subjects.find((s) => s.subjectName === subject);

  const [openModuleIndex, setOpenModuleIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("curriculum");

  const toggleModule = (index) => {
    setOpenModuleIndex(index === openModuleIndex ? null : index);
  };

  return (
    <div className="module-container">
      <div className="module-breadcrumb">{branch} → {subject}</div>
      {/* Tabs */}
      <div className="module-wrapper">
            <div className="module-tabs">
            {['curriculum', 'overview', 'instructor'].map(tab => (
            <div
                key={tab}
                className={`module-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
            >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
            ))}
        </div>

        <AnimatePresence mode="wait">
            {activeTab === "curriculum" && (
            <motion.div
                className="module-table"
                key="curriculum"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                {subjectData ? (
                subjectData.modules.map((module, index) => (
                    <div key={index} className="module-section">
                    <div
                        className={`module-title ${openModuleIndex === index ? "open" : ""}`}
                        onClick={() => toggleModule(index)}
                    >
                        <span className="module-arrow">{openModuleIndex === index ? "\u25B2" : "\u25BC"}</span>
                        {module.moduleName}
                    </div>
                    <AnimatePresence>
                        {openModuleIndex === index && (
                        <motion.div
                            className="subtopics"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {module.subtopics.map((topic, idx) => (
                                <div
                                    key={idx}
                                    className="subtopic-row"
                                    onClick={() =>
                                    navigate(
                                        `/lecture?branch=${encodeURIComponent(branch)}&subject=${encodeURIComponent(subject)}&moduleIndex=${index}&subtopicIndex=${idx}`
                                    )
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    {`${index + 1}.${idx + 1}`} &nbsp; {topic}
                                </div>
                            ))}
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>
                ))
                ) : (
                <p className="no-data-text">No module data found for this subject.</p>
                )}
            </motion.div>
            )}

            {activeTab === "overview" && (
            <motion.div
                key="overview"
                className="module-tab-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <p>Overview content is not specified</p>
            </motion.div>
            )}

            {activeTab === "instructor" && (
            <motion.div
                key="instructor"
                className="module-tab-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <p>Instructor info not added</p>
            </motion.div>
            )}
        </AnimatePresence>
        </div>
      </div>
      
  );
}
