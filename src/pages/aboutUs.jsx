import React from "react";
import { motion } from "framer-motion";
import "../styles/aboutUs.css";
import Footer from "../components/footer";
import SocialHandles from "../components/socialHandles";
import { desc } from "framer-motion/client";

const teamMembers = [
  { name: "Omkar Korgaonkar", role: "Full Stack Developer, Founder, CTO", description: "A Visionary leader with a passion for technology and education. He has a strong background in full-stack development and is dedicated to creating innovative solutions that enhance the learning experience." },
  { name: "Chetan Nanda", role: "Full Stack Developer, Co-Founder, CFO", description: "A skilled full-stack developer with a keen eye for detail. He is committed to building user-friendly applications that make learning more accessible and engaging." },
  { name: "Rohan Patil", role: "Research Analyst, Content Management", description: "An experienced content manager with a focus on educational materials. He is dedicated to ensuring that our content is accurate, relevant, and aligned with industry standards." },
  { name: "Harshad Kante", role: "Research Analyst, Content Management", description: "An expert in educational content extracter, he focuses on creating high-quality materials that bridge the gap between theory and practice." },
];

const AboutUs = () => {
  return (
    <div className="about-container">
      <motion.h2 className="about-title" whileHover={{ color: "#10b981" }}>
        Our Goal
      </motion.h2>
      <p className="about-quote">
        "True education is not just about imparting knowledge, but about delivering it with the highest quality, inspiring minds to think critically, innovate boldly, and excel with purpose."
      </p>

      <h3 className="about-section-title">What are we?</h3>
      <p className="about-description">
      At Engineering Era, we are a team of passionate educators and curriculum developers committed to advancing engineering education. Our focus is on creating comprehensive, high-quality educational content and structured syllabi designed to equip future engineers with the knowledge and skills necessary to thrive in their fields. We specialize in developing curriculum materials that bridge the gap between academic theory and real-world engineering applications, ensuring that students are well-prepared to tackle practical challenges. Our approach to education emphasizes both foundational engineering principles and the latest technological advancements. We collaborate closely with industry experts, academics, and educational institutions to ensure that our content remains relevant and forward-thinking. Whether it’s through textbooks, digital modules, or hands-on learning experiences, we strive to make complex engineering concepts accessible and engaging for learners at all levels. In addition to content creation, we also provide assessment tools and professional development resources for educators. We believe that empowering teachers with modern techniques and up-to-date materials is essential to fostering better learning outcomes. Our goal is to inspire curiosity, creativity, and critical thinking in students, helping them not only master engineering fundamentals but also become innovators in a rapidly evolving industry. At Engineering Era, we are dedicated to shaping the future of engineering education. By delivering cutting-edge resources and innovative learning strategies, we aim to support both students and educators in achieving excellence and pushing the boundaries of what’s possible in the world of engineering.
      </p>

      <h3 className="about-section-title">Meet our Team</h3>
      <div className="about-team-grid">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="about-team-member"
            whileHover={{ scale: 1.05 }}
          >
            <div className="about-avatar"></div>
            <p className="about-name">{member.name}</p>
            <p className="about-role">{member.role}</p>
            <p className="about-description">{member.description}</p>
          </motion.div>
        ))}
      </div>
      <SocialHandles />
      <Footer />
    </div>
  );
};

export default AboutUs;