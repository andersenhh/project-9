import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // Import signInWithEmailAndPassword from Firebase Authentication
import Layout from "../../layout/Layout.jsx";
import "./RegisterLogin.css";
import email_icon from "../Assets/email.png";
import { Alert } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const auth = getAuth();

      await sendPasswordResetEmail(auth, email);
      console.log("email sent!:", email);
      setMessage("Password reset sent to email!");
    } catch (err) {
      console.error(err);
      setError("Failed to reset password");
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="RegisterLoginContainer">
          <div className="RegisterLoginHeader">
            <div className="text">Reset Password</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="forgot-password">
            {error && (
              <div className="error-box">
                <Alert variant="danger" className="error-message">
                  {error}
                </Alert>
              </div>
            )}
            {message && (
              <div className="text-success error-box">
                <Alert variant="success" className="error-message">
                  {message}
                </Alert>
              </div>
            )}
          </div>
          <div className="submit-container d-block">
            <button type="submit" className="submit">
              Send
            </button>
            <Link
              className="text-primary d-block text-decoration-none  mt-4 text-center cursor-pointer"
              to='/login'
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
