// pages/reviews.jsx
import React from "react";
import "../styles/review.css";
import { motion } from "framer-motion";

const allReviews = [
  { name: "Jayesh Channe", feedback: "I feared algorithms, but the incremental approach and coding exercises here helped me overcome that. Now, I can solve optimization problems with confidence." },
  { name: "Vedant Bhosale", feedback: "Great course design. The way concepts were broken down helped me master even the toughest topics." },
  { name: "Sahil Bomble", feedback: "I used to avoid coding interviews, now I look forward to solving problems every day. Truly transformative!" },
  { name: "Tanvi Patil", feedback: "Visuals + explanations = 🔥. Loved the structure and instructor support." },
  { name: "Rohan Kale", feedback: "Finally got my dream internship. Big thanks to this platform!" },
  { name: "Sneha More", feedback: "The real-world project assignments boosted my confidence and portfolio!" },
  { name: "Yash Pawar", feedback: "Every module felt like a level-up. I'm now way ahead of my batchmates!" },
  { name: "Priya Deshmukh", feedback: "The hands-on quizzes and live sessions helped me stay accountable." },
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

export default function Reviews() {
  return (
    <section className="all-reviews-section">
      <motion.h2
        className="all-reviews-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="white-text">Student</span> <span className="green-text">Testimonials</span>
      </motion.h2>

      <div className="all-reviews-grid">
        {allReviews.map((review, index) => (
          <motion.div
            key={index}
            className="all-review-card"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <h3 className="all-review-name">{review.name}</h3>
            <p className="all-review-feedback">"{review.feedback}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
