import React from "react";
import "../styles/studentReviews.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const reviews = [
  { name: "Jayesh Channe", feedback: "I feared algorithms, but the incremental approach and coding exercises here helped me overcome that. Now, I can solve optimization problems with confidence." },
  { name: "Vedant Bhosale", feedback: "Great course design. The way concepts were broken down helped me master even the toughest topics." },
  { name: "Sahil Bomble", feedback: "I used to avoid coding interviews, now I look forward to solving problems every day. Truly transformative!" }
];

const cardVariants = {
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

export default function StudentReviews() {
  const navigate = useNavigate();

  return (
    <section className="student-reviews-section">
      <motion.h2
        className="student-reviews-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="white-text">What Students Say:</span>{" "}
        <span className="green-text">Reviews</span>
      </motion.h2>
      <div className="reviews-grid-container">
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <motion.div
              className="review-card-wrapper"
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              <h3 className="review-card-name">{review.name}</h3>
              <p className="review-card-feedback">"{review.feedback}"</p>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.button
        className="review-more-btn"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/reviews")}
        >
        <span role="img" aria-label="review icon">📝</span> See more reviews!
      </motion.button>
    </section>
  );
}
