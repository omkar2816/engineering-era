import React from "react";
import { motion } from "framer-motion";
import "../styles/footer.css";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-column">
          <h3 className="footer-heading">Useful Links</h3>
          <ul className="footer-links">
            <li>Home</li>
            <li>Department</li>
            <li>First Year</li>
            <li>Notes</li>
            <li>Viva Questions</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Address</h3>
          <ul className="footer-contact">
            <li><FaEnvelope /> admin@engineeringera.com</li>
            <li><FaMapMarkerAlt /> A508, Runwal My City, Mumbai, 400001</li>
            <li><FaPhoneAlt /> +91 8457589614</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Connect with us!</h3>
          <form className="footer-form">
            <input
              type="email"
              placeholder="Enter an Email"
              className="footer-input"
            />
            <textarea
              placeholder="Write Something....."
              className="footer-textarea"
            ></textarea>
            <motion.button
              type="submit"
              className="footer-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send
            </motion.button>
          </form>
        </div>
      </div>
      <p className="footer-bottom">All rights reserved by Engineering Era © 2025</p>
    </footer>
  );
}