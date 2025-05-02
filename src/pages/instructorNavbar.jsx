import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, LogOut } from "lucide-react";
import { supabase } from "../backend/supabaseClient";
import "../styles/instructorNavbar.css";

const InstructorNavbar = ({ onLogout }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setTheme("dark");
      document.body.classList.add("dark-theme");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = theme === "dark";
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    document.body.classList.toggle("dark-theme", !isDark);
    localStorage.setItem("theme", nextTheme);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <motion.nav className="instructor-navbar" initial={{ y: -100 }} animate={{ y: 0 }}>
      <div className="instructor-logo">Engineering Era</div>
      <ul className="instructor-nav-links">
        {["Home", "My Courses", "Doubts", "Student Reviews"].map((item, i) => (
          <motion.li key={i} whileHover={{ color: "#facc15" }}>
            {item}
          </motion.li>
        ))}
      </ul>
      <div className="instructor-profile">
        <span onClick={toggleTheme}>
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </span>
        <span onClick={handleLogout}>
          <LogOut size={20} />
        </span>
      </div>
    </motion.nav>
  );
};

export default InstructorNavbar;
