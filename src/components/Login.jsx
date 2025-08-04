import { useState } from "react";
import formLogo from "../assets/formlogo.png";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import FormBuilder from "./FormBuilder";
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Step 1: Initialize state for user email and password(Handles login form submission)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Step 2: Check if password is long enough
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    setError("");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);

    setEmail("");
    setPassword("");
  };

  // If not logged in, show login page
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <img src={formLogo} alt="Form Logo" className="login-logo" />
            <h1 className="login-title">Welcome</h1>
            <p className="login-subtitle">
              Sign in to access your form builder
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="login-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <FiMail className="form-icon" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <FiLock className="form-icon" />
                Password
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input password-input"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <p className="demo-note">
              Use any valid email and password (6+ characters) to login
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If logged in, show the main application
  return (
    <>
      <Header userEmail={email} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <FormBuilder />
      </main>
    </>
  );
};

export default Login;
