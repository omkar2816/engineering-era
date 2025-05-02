import React, { useState } from "react";
import { Plus, X, Save, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../pages/supabaseClient";
import "../styles/courseCreation.css";

const CourseCreation = ({ instructorName, instructorId, onCourseCreate, onCancel }) => {
  const [courseName, setCourseName] = useState("");
  const [branch, setBranch] = useState("");
  const [price, setPrice] = useState("");
  const [modules, setModules] = useState([{ name: "", subtopics: [""] }]);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const branches = [
    "First Year Engineering", "Computer Engineering",
    "Information Technology", "AI & DS Engineering", "AI & ML Engineering"
  ];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setFileName(file.name);
    const fileExt = file.name.split(".").pop();
    const path = `course-content/${instructorId}/${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from("course-files").upload(path, file);

    if (uploadError) {
      alert("Upload failed.");
      console.error(uploadError);
    } else {
      const { data } = supabase.storage.from("course-files").getPublicUrl(path);
      setFileUrl(data.publicUrl);
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: courseName,
      branch,
      price: parseFloat(price),
      modules: JSON.stringify(modules),
      instructor_id: instructorId,
      instructor_name: instructorName,
      content_url: fileUrl,
      created_at: new Date(),
    };

    const { data, error } = await supabase.from("courses").insert([payload]).select();
    if (error) {
      alert("Failed to create course");
      console.error(error);
    } else {
      onCourseCreate(data[0]);
    }
  };

  return (
    <motion.div className="course-creation-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="header">
        <h2>Create Course</h2>
        <span className="close-btn-container">
            <button className="close-btn" onClick={onCancel}><X size={20} /></button>
        </span>
      </div>

      <form className="course-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="form-group">
            <label>Course Name</label>
            <input value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Branch</label>
            <select value={branch} onChange={(e) => setBranch(e.target.value)} required>
              <option value="">Select</option>
              {branches.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Price (₹)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="form-group upload-group">
            <label>Upload Content</label>
            <div className="upload-area">
              <input type="file" onChange={handleFileUpload} />
              {uploading ? "Uploading..." : fileName || "Choose file"}
            </div>
          </div>
        </div>

        <div className="modules">
          <div className="modules-header">
            <h3>Modules</h3>
            <button type="button" className="add-btn" onClick={() => setModules([...modules, { name: "", subtopics: [""] }])}>
              <Plus size={14} /> Add Module
            </button>
          </div>

          {modules.map((mod, i) => (
            <div className="module-box" key={i}>
              <div className="module-header">
                <input
                  value={mod.name}
                  placeholder="Module Name"
                  onChange={(e) => {
                    const newModules = [...modules];
                    newModules[i].name = e.target.value;
                    setModules(newModules);
                  }}
                />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => {
                    const newModules = [...modules];
                    newModules.splice(i, 1);
                    setModules(newModules);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {mod.subtopics.map((topic, j) => (
                <div className="subtopic-row" key={j}>
                  <input
                    value={topic}
                    placeholder="Subtopic"
                    onChange={(e) => {
                      const newModules = [...modules];
                      newModules[i].subtopics[j] = e.target.value;
                      setModules(newModules);
                    }}
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => {
                      const newModules = [...modules];
                      newModules[i].subtopics.splice(j, 1);
                      setModules(newModules);
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="add-small-btn"
                onClick={() => {
                  const newModules = [...modules];
                  newModules[i].subtopics.push("");
                  setModules(newModules);
                }}
              >
                <Plus size={14} /> Add Subtopic
              </button>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="save-btn"><Save size={16} /> Save</button>
        </div>
      </form>
    </motion.div>
  );
};

export default CourseCreation;
