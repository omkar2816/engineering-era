import React, { useState } from "react";
import { Plus, X, Save, Upload, Trash2 } from "lucide-react";
import { supabase } from "../pages/supabaseClient";
import "../styles/courseCreation.css";

const CourseCreation = ({ instructorName, instructorId, onCourseCreate, onCancel }) => {
  const [courseName, setCourseName] = useState("");
  const [branch, setBranch] = useState("");
  const [price, setPrice] = useState("");
  const [modules, setModules] = useState([{ name: "", subtopics: [""] }]);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const branches = [
    "First Year Engineering", 
    "Computer Engineering", 
    "Information Technology", 
    "AI & DS Engineering", 
    "AI & ML Engineering"
  ];

  // Add a new module
  const addModule = () => {
    setModules([...modules, { name: "", subtopics: [""] }]);
  };

  // Remove a module
  const removeModule = (moduleIndex) => {
    const updatedModules = modules.filter((_, index) => index !== moduleIndex);
    setModules(updatedModules);
  };

  // Update module name
  const updateModuleName = (moduleIndex, name) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].name = name;
    setModules(updatedModules);
  };

  // Add subtopic to a module
  const addSubtopic = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].subtopics.push("");
    setModules(updatedModules);
  };

  // Remove subtopic from a module
  const removeSubtopic = (moduleIndex, subtopicIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].subtopics = updatedModules[moduleIndex].subtopics.filter(
      (_, index) => index !== subtopicIndex
    );
    setModules(updatedModules);
  };

  // Update subtopic text
  const updateSubtopic = (moduleIndex, subtopicIndex, text) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].subtopics[subtopicIndex] = text;
    setModules(updatedModules);
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setFileName(file.name);

    try {
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const filePath = `course-content/${instructorId}/${Date.now()}.${fileExt}`;

      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('course-files')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL for the file
      const { data } = supabase.storage
        .from('course-files')
        .getPublicUrl(filePath);

      setFileUrl(data.publicUrl);
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseName || !branch || !price) {
      alert("Please fill in all required fields");
      return;
    }

    // Format modules data for storage
    const courseData = {
      name: courseName,
      branch,
      price: parseFloat(price),
      modules: JSON.stringify(modules),
      instructor_id: instructorId,
      instructor_name: instructorName,
      content_url: fileUrl,
      created_at: new Date()
    };

    try {
      // Insert course data into Supabase
      const { data, error } = await supabase
        .from('courses')
        .insert([courseData])
        .select();

      if (error) throw error;

      // Call the onCourseCreate callback with the new course data
      onCourseCreate(data[0]);
    } catch (error) {
      console.error("Error creating course:", error.message);
      alert("Failed to create course");
    }
  };

  return (
    <div className="course-creation-container">
      <div className="course-creation-header">
        <h2>Create New Course</h2>
        <button className="close-btn" onClick={onCancel}>
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="courseName">Course/Subject Name *</label>
            <input
              type="text"
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="branch">Department/Branch *</label>
            <select
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {branches.map((branchOption) => (
                <option key={branchOption} value={branchOption}>
                  {branchOption}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Course Price (₹) *</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="courseContent">Course Content</label>
            <div className="file-upload-container">
              <input
                type="file"
                id="courseContent"
                onChange={handleFileUpload}
                className="file-input"
              />
              <div className="file-upload-btn">
                <Upload size={16} />
                <span>{uploading ? "Uploading..." : "Upload File"}</span>
              </div>
              {fileName && (
                <div className="file-name">
                  <span>{fileName}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modules-section">
          <div className="section-header">
            <h3>Course Modules</h3>
            <button 
              type="button" 
              className="add-btn"
              onClick={addModule}
            >
              <Plus size={16} /> Add Module
            </button>
          </div>

          {modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="module-container">
              <div className="module-header">
                <div className="form-group module-name">
                  <input
                    type="text"
                    value={module.name}
                    onChange={(e) => updateModuleName(moduleIndex, e.target.value)}
                    placeholder="Module Name"
                  />
                </div>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeModule(moduleIndex)}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="subtopics-container">
                <h4>Subtopics</h4>
                {module.subtopics.map((subtopic, subtopicIndex) => (
                  <div key={subtopicIndex} className="subtopic-row">
                    <input
                      type="text"
                      value={subtopic}
                      onChange={(e) => updateSubtopic(moduleIndex, subtopicIndex, e.target.value)}
                      placeholder="Subtopic Name"
                    />
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeSubtopic(moduleIndex, subtopicIndex)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-small-btn"
                  onClick={() => addSubtopic(moduleIndex)}
                >
                  <Plus size={14} /> Add Subtopic
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            <Save size={16} /> Save Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreation;