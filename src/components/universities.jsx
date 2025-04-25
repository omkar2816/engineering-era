import React from "react";
import { motion } from "framer-motion";
import universityLogo from "../assets/mumbai-university.png"; // Place your image in this path
import "../styles/universities.css";

export default function Universities() {
  return (
    <div className="universities-background">
      <div className="universities-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="universities-title"
        >
          <span className="white-text">Get All Courses & </span><span className="green-text">Study Materials</span><span className="green-text"> for Universities</span>
        </motion.h1>

        <motion.img
          src={universityLogo}
          alt="University of Mumbai Logo"
          className="university-logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        <motion.p
          className="university-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          University of Mumbai
        </motion.p>
      </div>
    </div>
  );
}
