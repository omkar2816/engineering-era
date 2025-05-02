import React, { useState } from "react";
import "../styles/loginRegister.css";
import { EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../backend/supabaseClient";

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [view, setView] = useState("login");
  const [activeRole, setActiveRole] = useState("student");
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Password visibility states
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  if (activeRole === "instructor") {
    navigate("/instructor-dashboard");
  }

  if (!isOpen) return null;

  const handleSwitch = (targetView) => {
    setView(targetView);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (activeRole === "instructor" && !formData.organization.trim()) {
      newErrors.organization = "Organization name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // First sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
            role: activeRole,
            ...(activeRole === "instructor" && { organization: formData.organization })
          }
        }
      });
      
      if (authError) {
        throw authError;
      }
      
      // Then insert the user data into your public.users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            name: formData.username,
            email: formData.email,
            password: formData.password, // Note: In production, you should hash this properly
            role: activeRole === "instructor" ? "senior" : "student" // Assuming 'senior' is your instructor role
          }
        ])
        .select();
      
      if (userError) {
        throw userError;
      }
      
      // Registration successful
      alert("Registration successful! Please check your email for verification.");
      setView("login");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        organization: ""
      });
      
    } catch (error) {
      console.error("Registration error:", error.message);
      setErrors({ server: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) console.error("OAuth login error:", error.message);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        setErrors({ server: error.message });
        return;
      }
      onLoginSuccess(); // Notify parent component of successful login
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordField = (name, placeholder, visible, setVisible, error) => (
    <div className="input-wrapper">
      <input
        type={visible ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        className={`password-input ${error ? "error" : ""}`}
        value={formData[name]}
        onChange={handleInputChange}
      />
      <span
        className="toggle-icon"
        onClick={() => setVisible(!visible)}
        title={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff /> : <Eye />}
      </span>
      {error && <span className="error-message">{error}</span>}
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
            <input 
              type="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {renderPasswordField("password", "Password", loginPasswordVisible, setLoginPasswordVisible)}
            {errors.server && <span className="error-message">{errors.server}</span>}
            <div className="row">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox" />
                Remember password
              </label>
              <span className="forgot">Forgot password?</span>
            </div>
            <button className="yellow-btn" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "LOGIN"}
            </button>
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
              Don't have Account?{" "}
              <span onClick={() => handleSwitch("register")}>Register Now</span>
            </p>
          </div>
        )}

        {view === "register" && (
          <form className="auth-content" onSubmit={handleRegister}>
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
            
            <input 
              type="text" 
              name="username"
              placeholder="Username" 
              value={formData.username}
              onChange={handleInputChange}
              className={errors.username ? "error" : ""}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
            
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
            
            {renderPasswordField("password", "Password", registerPasswordVisible, setRegisterPasswordVisible, errors.password)}
            {renderPasswordField("confirmPassword", "Repeat Password", confirmPasswordVisible, setConfirmPasswordVisible, errors.confirmPassword)}
            
            {activeRole === "instructor" && (
              <>
                <input 
                  type="text" 
                  name="organization"
                  placeholder="Organization Name" 
                  value={formData.organization}
                  onChange={handleInputChange}
                  className={errors.organization ? "error" : ""}
                />
                {errors.organization && <span className="error-message">{errors.organization}</span>}
              </>
            )}
            
            {errors.server && <div className="server-error">{errors.server}</div>}
            
            <button 
              className="yellow-btn" 
              type="submit"
              disabled={loading}
            >
              {loading ? "REGISTERING..." : "REGISTER"}
            </button>
            
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
          </form>
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