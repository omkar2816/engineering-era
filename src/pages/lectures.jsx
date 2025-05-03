
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import syllabusData from "../data/engineering_syllabus.json";
import videos from "../data/video.json";
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

  // Find the branch and subject data from syllabusData
  const branchData = syllabusData.find((b) => b.branch === branch);
  const subjectData = branchData?.subjects.find((s) => s.subjectName === subject);

  // State for current module and subtopic
  const [currentModuleIndex, setCurrentModuleIndex] = useState(initialModuleIndex || 0);
  const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(initialSubtopicIndex || 0);

  // Handle case where branch or subject data is not found
  if (!branchData || !subjectData) {
    return (
      <div className="lecture-container">
        <p style={{ textAlign: "center", marginTop: "5rem", color: "#cbd5e1" }}>
          Lecture data not found.
        </p>
      </div>
    );
  }

  // Find the corresponding video data from videos.json
  // const subjectVideoData = videos.find((v) => v.subjectName === subject);
  // const moduleVideoData = subjectVideoData?.modules[currentModuleIndex];
  const moduleVideoData = videos.modules[currentModuleIndex]; 
  const filename = moduleVideoData?.videoFiles[currentSubtopicIndex];

  // Construct the video URL from the Supabase bucket
  const videoUrl = filename
    ? `https://sbkeyhdfbzxdadjywjgy.supabase.co/storage/v1/object/public/videos/${filename}`
    : null;
    console.log("Videos JSON:", videos);

  // Handle subtopic click to update the current module and subtopic
  const handleSubtopicClick = (modIndex, subIndex) => {
    setCurrentModuleIndex(modIndex);
    setCurrentSubtopicIndex(subIndex);
  };

  console.log("Video URL:", videoUrl);
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
                    className={`lecture-subtopic ${
                      modIdx === currentModuleIndex && subIdx === currentSubtopicIndex ? "active" : ""
                    }`}
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
          <h2 className="lecture-title">
            {subjectData.modules[currentModuleIndex]?.subtopics[currentSubtopicIndex]}
          </h2>

          <div className="lecture-video-wrapper">
            {videoUrl ? (
              <video controls className="lecture-video">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p style={{ textAlign: "center", color: "#cbd5e1" }}>
                No video available for this subtopic.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
