import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "./supabaseClient"; // make sure this path is correct
import "../styles/courseCreation.css";

useEffect(() => {
  const getUserInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setInstructorId(user.id);
    setInstructorName(user.user_metadata.full_name); // depends on how you store names
  };
  getUserInfo();
}, []);


const CourseCreation = ({ instructorName, instructorId, onCourseCreate }) => {
  const [courseData, setCourseData] = useState({
    name: "",
    branch: "",
    subject: "",
    modules: "",
    subtopics: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error, data } = await supabase.from("courses").insert([
      {
        name: courseData.name,
        branch: courseData.branch,
        subject: courseData.subject,
        modules: courseData.modules,
        subtopics: courseData.subtopics,
        price: courseData.price,
        instructor_name: instructorName,
        instructor_id: instructorId,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Error adding course:", error.message);
      alert("Course creation failed.");
      return;
    }

    onCourseCreate(data[0]);
    setCourseData({
      name: "",
      branch: "",
      subject: "",
      modules: "",
      subtopics: "",
      price: "",
    });
  };

  return (
    <motion.div className="course-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={courseData.name} onChange={handleChange} placeholder="Course Name" required />
        <input name="branch" value={courseData.branch} onChange={handleChange} placeholder="Engineering Branch" />
        <input name="subject" value={courseData.subject} onChange={handleChange} placeholder="Subject" />
        <input name="modules" value={courseData.modules} onChange={handleChange} placeholder="Modules" />
        <input name="subtopics" value={courseData.subtopics} onChange={handleChange} placeholder="Subtopics" />
        <input name="price" value={courseData.price} onChange={handleChange} placeholder="Price (optional)" />
        <input value={instructorName} readOnly disabled className="readonly" />
        <button className="yellow-btn" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </motion.div>
  );
};

export default CourseCreation;
