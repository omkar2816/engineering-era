import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // <<--- ADD THIS
import "../styles/footer.css";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function Footer() {
  const navigate = useNavigate(); // <<--- ADD THIS
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
  
    if (!email || !message) {
      alert("Please fill all fields.");
      return;
    }
  
    const templateParams = {
      from_email: email,
      message: message,
    };
  
    emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      templateParams,
      "YOUR_PUBLIC_KEY"
    )
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      alert("Message sent successfully!");
    })
    .catch((error) => {
      console.error("FAILED...", error);
      alert("Failed to send message. Please try again later.");
    })
    .finally(() => {
      setEmail("");
      setMessage("");
    });
  };

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-column">
          <h3 className="footer-heading">Useful Links</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link-item">Home</Link></li>
            <li><Link to="/mu-importants" className="footer-link-item">Department</Link></li>
            <li><Link to="/mu-importants?branch=First%20Year%20Engineering" className="footer-link-item">First Year</Link></li>
            <li><Link to="/all-notes" className="footer-link-item">Notes</Link></li>
            <li><Link to="/viva-questions" className="footer-link-item">Viva Questions</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Address</h3>
          <ul className="footer-contact">
            <li onClick={() => navigate("/contact")} style={{cursor: "pointer"}}><FaEnvelope /> admin@engineeringera.com</li>
            <li><FaMapMarkerAlt /> A508, Runwal My City, Mumbai, 400001</li>
            <li><FaPhoneAlt /> +91 8457589614</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Connect with us!</h3>
          <form className="footer-form" onSubmit={sendEmail}>
            <input
              type="email"
              placeholder="Enter an Email"
              className="footer-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Write Something....."
              className="footer-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
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
