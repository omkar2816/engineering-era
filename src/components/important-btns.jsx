import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // added navigation import
import "../styles/important-btns.css";

const buttonData = [
  { label: "MU Courses", path: "/mu-courses" },
  { label: "MU Importants [All Subjects]", path: "/mu-importants" },
  { label: "Viva-Questions", path: "/viva-questions" },
  { label: "All Notes", path: "/all-notes" },
  { label: "Other Courses", path: "/other-courses" },
];

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  }),
};

export default function CourseButtons() {
  const navigate = useNavigate(); // create navigation hook

  return (
    <div className="button-background">
      <div className="button-container">
        {buttonData.map((button, i) => (
          <motion.button
            key={button.label}
            className="course-button"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(button.path)} // on click, navigate
          >
            {button.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
