import React, { useState, useEffect } from "react";
import {
  Home, Book, Users, Info, Phone, LogIn, UserCircle, Sun, Moon, LogOut
} from "lucide-react";
import { supabase } from "../backend/supabaseClient";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import Logo from "../assets/logo.png";

const menuVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function Navbar({ onLoginClick }) {
  const [showDept, setShowDept] = useState(false);
  const [showEngg, setShowEngg] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(""); // ✅ Track user role
  const [loggedIn, setLoggedIn] = useState(false); // ✅ Confirm successful login
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user;
      if (currentUser) {
        const currentRole = currentUser.user_metadata?.role || "student";
        setUser(currentUser);
        setRole(currentRole);
        setLoggedIn(true);

        // ✅ Redirect based on role
        if (currentRole === "instructor") {
          navigate("/instructor-dashboard");
        } else {
          navigate("/");
        }
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user;
      if (currentUser) {
        const currentRole = currentUser.user_metadata?.role || "student";
        setUser(currentUser);
        setRole(currentRole);
        setLoggedIn(true);

        // ✅ Redirect after login
        if (currentRole === "instructor") {
          navigate("/instructor-dashboard");
        } else {
          navigate("/");
        }
      } else {
        setUser(null);
        setRole("");
        setLoggedIn(false);
      }
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    }

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole("");
    setLoggedIn(false);
    setShowProfileMenu(false);
    navigate("/");
  };

  const toggleTheme = () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const fullName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    "https://www.svgrepo.com/show/508699/user-circle.svg";

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="navbar-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to={loggedIn && role === "instructor" ? "/instructor-dashboard" : "/"} className="logo">
            <img src={Logo} alt="Logo" className="logo-image" />
            <span>
              <span className="green-text">Engineering</span>{" "}
              <span className="white-text">Era</span>
            </span>
          </Link>
        </motion.div>

        <div className="nav-links">
          {loggedIn && role === "instructor" ? (
            <>
              <Link to="/instructor-dashboard" className="nav-item"><Home size={20} /> Home</Link>
              <Link to="/instructor-dashboard" className="nav-item"><Book size={20} /> My Courses</Link>
              <Link to="/instructor-doubts" className="nav-item"><Users size={20} /> Doubts</Link>
              <Link to="/instructor-reviews" className="nav-item"><Info size={20} /> Student Reviews</Link>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="nav-item">
                <Link to="/" className="nav-item"><Home size={20} /> Home</Link>
              </motion.div>

              <div className="dropdown" onMouseEnter={() => setShowDept(true)} onMouseLeave={() => setShowDept(false)}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="nav-item">
                  <Users size={20} /> Department
                </motion.div>
                {showDept && (
                  <motion.div initial="hidden" animate="visible" exit="hidden" variants={menuVariants} className="dropdown-menu">
                    {[{ name: "Computer", query: "Computer Engineering" },
                      { name: "IT", query: "Information Technology" },
                      { name: "AI & DS", query: "AI & DS Engineering" },
                      { name: "AI & ML", query: "AI & ML Engineering" }].map((dept) => (
                        <Link key={dept.name} to={`/mu-importants?branch=${encodeURIComponent(dept.query)}`} className="dropdown-item">
                          {dept.name}
                        </Link>
                      ))}
                  </motion.div>
                )}
              </div>

              <div className="dropdown" onMouseEnter={() => setShowEngg(true)} onMouseLeave={() => setShowEngg(false)}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="nav-item">
                  <Book size={20} /> Engineering
                </motion.div>
                {showEngg && (
                  <motion.div initial="hidden" animate="visible" exit="hidden" variants={menuVariants} className="dropdown-menu">
                    <Link to="/mu-importants?branch=First%20Year%20Engineering" className="dropdown-item">First Year</Link>
                    <Link to="/engineering-math" className="dropdown-item">Engineering Mathematics</Link>
                    <Link to="/viva-questions" className="dropdown-item">Viva Questions</Link>
                    <Link to="/all-notes" className="dropdown-item">Notes</Link>
                  </motion.div>
                )}
              </div>

              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="nav-item">
                <Link to="/about" className="nav-item"><Info size={20} /> About Us</Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="nav-item">
                <Link to="/contact" className="nav-item"><Phone size={20} /> Contact Us</Link>
              </motion.div>
            </>
          )}

          {user ? (
            <div className="profile-container">
              <div className="profile-info" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <img src={avatarUrl} alt="User Avatar" className="profile-avatar" />
                <span className="profile-name">{fullName.split(" ")[0]}</span>
              </div>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="dropdown-item" onClick={toggleTheme}>
                    {document.body.classList.contains("dark-theme") ? (
                      <>
                        <Sun size={16} style={{ marginRight: "0.5rem" }} /> Light Mode
                      </>
                    ) : (
                      <>
                        <Moon size={16} style={{ marginRight: "0.5rem" }} /> Dark Mode
                      </>
                    )}
                  </div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    <LogOut size={16} style={{ marginRight: "0.5rem" }} /> Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="login-btn"
              onClick={() => onLoginClick && onLoginClick(role)}
            >
              <LogIn size={20} /> Login
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
