
import React, { useState } from "react";
import "../styles/loginRegister.css";
import { EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const AuthModal = ({ isOpen, onClose }) => {
  const [view, setView] = useState("login");
  const [activeRole, setActiveRole] = useState("student");
  const navigate = useNavigate();

  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  if (activeRole === "instructor") {
    navigate("/instructor-dashboard");
  }

  if (!isOpen) return null;

  const handleSwitch = (targetView) => setView(targetView);

  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) console.error("OAuth login error:", error.message);
  };

  const renderPasswordField = (placeholder, visible, setVisible) => (
    <div className="input-wrapper">
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        className="password-input"
      />
      <span
        className="toggle-icon"
        onClick={() => setVisible(!visible)}
        title={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff /> : <Eye />}
      </span>
    </div>
  );

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        
        {view === "login" && (
          <div className="auth-content">
            <h2>Login with your Account</h2>
            <div className="role-tabs">
              <div
                className={`role-tab ${activeRole === "student" ? "active" : ""}`}
                onClick={() => setActiveRole("student")}
              >
                Student
              </div>
              <div
                className={`role-tab ${activeRole === "instructor" ? "active" : ""}`}
                onClick={() => setActiveRole("instructor")}
              >
                Instructor
              </div>
            </div>
            <input type="text" placeholder="Username or Email" />
            {renderPasswordField("Password", loginPasswordVisible, setLoginPasswordVisible)}
            <div className="row">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox" />
                Remember password
              </label>
              <span className="forgot">Forgot password?</span>
            </div>
            <button className="yellow-btn">LOGIN</button>
            <div className="oauth-buttons">
              <button className="oauth-btn google-btn" onClick={() => handleOAuthLogin("google")}>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                Continue with Google
              </button>
              <button className="oauth-btn github-btn" onClick={() => handleOAuthLogin("github")}>
                <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" />
                Continue with GitHub
              </button>
            </div>
            <p className="switch">
              Don’t have Account?{" "}
              <span onClick={() => handleSwitch("register")}>Register Now</span>
            </p>
          </div>
        )}

        {view === "register" && (
          <div className="auth-content">
            <h2>Register a new Account</h2>
            <div className="role-tabs">
              <div
                className={`role-tab ${activeRole === "student" ? "active" : ""}`}
                onClick={() => setActiveRole("student")}
              >
                Student
              </div>
              <div
                className={`role-tab ${activeRole === "instructor" ? "active" : ""}`}
                onClick={() => setActiveRole("instructor")}
              >
                Instructor
              </div>
            </div>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            {renderPasswordField("Password", registerPasswordVisible, setRegisterPasswordVisible)}
            {renderPasswordField("Repeat Password", confirmPasswordVisible, setConfirmPasswordVisible)}
            {activeRole === "instructor" && (
              <input type="text" placeholder="Organization Name" />
            )}
            <button className="yellow-btn">REGISTER</button>
            <div className="oauth-buttons">
              <button className="oauth-btn google-btn" onClick={() => handleOAuthLogin("google")}>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                Sign up with Google
              </button>
              <button className="oauth-btn github-btn" onClick={() => handleOAuthLogin("github")}>
                <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" />
                Sign up with GitHub
              </button>
            </div>
            <p className="switch">
              Already have an Account?{" "}
              <span onClick={() => handleSwitch("login")}>Login Now</span>
            </p>
          </div>
        )}

        {view === "otp" && (
          <div className="auth-content">
            <h2>Register a new Account</h2>
            <p>Enter OTP for Account verification</p>
            <div className="otp-boxes">
              {[...Array(6)].map((_, i) => (
                <input key={i} maxLength="1" className="otp-input" />
              ))}
            </div>
            <div className="resend-otp">
              1:03 <span>Resend</span>
            </div>
            <button className="yellow-btn">VERIFY OTP</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
