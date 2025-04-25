import React from "react";
import { Phone, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import "../styles/contactUs.css";
import Footer from "../components/footer";

const ContactSection = () => {
  return (
    <section className="contact-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get in touch
      </motion.h2>
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Want to get in touch? We'd love to hear from you. Here's how you can reach us.
      </motion.p>

      <div className="contact-cards">
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Phone size={48} className="contact-icon" />
          <h3>Collaborations & Doubts</h3>
          <p>Any type of collaborations and for your doubts contact us through our respective mails.</p>
          <a href="mailto:contact@engineeringera.com" className="email-btn">
            contact@engineeringera.com
          </a>
          <a href="mailto:doubts@engineeringera.com" className="email-btn">
            doubts@engineeringera.com
          </a>
        </motion.div>

        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Headphones size={48} className="contact-icon" />
          <h3>Contact Customer Support</h3>
          <p>Need any help regarding our content or Updates regarding subjects and content.</p>
          <a href="mailto:support@engineeringera.com" className="email-btn">
            support@engineeringera.com
          </a>
        </motion.div>
      </div>
      <Footer />
    </section>
  );
};

export default ContactSection;
