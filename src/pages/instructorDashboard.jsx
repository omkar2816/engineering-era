import React, { useState, useEffect } from "react";
import { Plus, BookOpen } from "lucide-react";
import InstructorNavbar from "./instructorNavbar";
import CourseCreation from "./courseCreation";
import Toast from "./notificationToast";
import { supabase } from "../backend/supabaseClient";
import "../styles/instructorDashboard.css";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [instructorName, setInstructorName] = useState("");
  const [instructorId, setInstructorId] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setInstructorName(user.user_metadata.full_name);
      setInstructorId(user.id);
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (instructorId) {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('instructor_id', instructorId);
        
        if (error) {
          console.error("Error fetching courses:", error);
        } else {
          setCourses(data || []);
        }
      }
    };

    fetchCourses();
  }, [instructorId]);

  const handleCourseCreate = (course) => {
    setCourses((prev) => [...prev, course]);
    setShowForm(false);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div className="instructor-dashboard">
      {/* <InstructorNavbar /> */}
      
      <div className="dashboard-header">
        {/* <h1 className="dashboard-title">Instructor Dashboard</h1> */}
      </div>
      
      {instructorName && (
        <p className="welcome-message">Welcome, {instructorName}!</p>
      )}

      <div className="create-course-container">
        {!showForm ? (
          <button className="yellow-btn" onClick={() => setShowForm(true)}>
            <Plus size={20} /> Create Course
          </button>
        ) : (
          <CourseCreation
            instructorName={instructorName}
            instructorId={instructorId}
            onCourseCreate={handleCourseCreate}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>

      <section className="my-courses-section">
        <h3>
          <BookOpen size={24} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          My Courses
        </h3>
        
        {courses.length > 0 ? (
          <ul className="courses-list">
            {courses.map((course, i) => (
              <li key={i} className="course-item">
                <div className="course-details">
                  <span className="course-name">{course.name}</span>
                  <span className="course-branch">{course.branch}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-courses">
            No courses created yet. Create your first course to get started!
          </div>
        )}
      </section>
      
      <Toast message="Course created successfully!" show={toastVisible} />
    </div>
  );
};

export default InstructorDashboard;