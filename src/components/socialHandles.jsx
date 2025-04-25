import React from "react";
import { motion } from "framer-motion";
import "../styles/socialHandles.css"; // Ensure this path is correct
import YoutubeIcon from "../assets/youtube.png"; // Ensure this path is correct
import Instagram from "../assets/instagram.png"; // Ensure this path is correct
import Facebook from "../assets/facebook.png"; // Ensure this path is correct

const socialLinks = [
  {
    icon: YoutubeIcon, // update path as needed
    label: "Engineering Era",
    handle: "",
  },
  {
    icon: Instagram, // update path as needed
    label: "@EngineeringEra",
    handle: "",
  },
  {
    icon: Facebook, // update path as needed
    label: "@EngineeringEra",
    handle: "",
  },
];

export default function SocialHandles() {
  return (
    <section className="social-handles-section">
      <motion.h2
        className="social-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="green-text">Social </span><span className="white-text">Handles</span>
      </motion.h2>

      <div className="social-grid">
        {socialLinks.map((link, index) => (
          <motion.div
            className="social-card"
            key={index}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <img src={link.icon} alt="social icon" className="social-icon" />
            <span className="social-label">{link.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
