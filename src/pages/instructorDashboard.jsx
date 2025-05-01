import React, { useState } from "react";
import InstructorNavbar from "./instructorNavbar";
import CourseCreation from "./CourseCreation";
import Toast from "./Toast";
import "../styles/instructorDashboard.css"; // Ensure you have this CSS file

const InstructorDashboard = () => {
  const instructorName = "John Doe"; // Fetch from user profile
  const [courses, setCourses] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);

  const handleCourseCreate = (course) => {
    setCourses((prev) => [...prev, course]);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div>
      <InstructorNavbar />
      <CourseCreation instructorName={instructorName} onCourseCreate={handleCourseCreate} />
      <Toast message="Course created successfully!" show={toastVisible} />
      <section className="my-courses-section">
        <h3>My Courses</h3>
        <ul>
          {courses.map((course, i) => (
            <li key={i}>{course.name} - {course.branch}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default InstructorDashboard;
