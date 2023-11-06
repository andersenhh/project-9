// Fawwaz
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword,  } from "firebase/auth";

import Layout from "../../layout/Layout.jsx";
import "./RegisterLogin.css";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { Alert } from 'react-bootstrap'

const Register = () => {
  const navigate = useNavigate();
  // Make the variable to store email input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  // Fawwaz
  const handleRegister = async (e) => {
    e.preventDefault(); // so prevent default is like = dont reload page, but use this code instead
    setError(""); // Clear any previous error message
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "Users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) {
        const userData = {
          username: username,
          email: email,
          totalWins: 0,
          totalLosses: 0,
        };
        await setDoc(userDocRef, userData);
      }

      setEmail("");
      setPassword("");
      setUsername("");
      navigate("/login");
      // })
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email already in use");
          break;
        case "auth/weak-password":
          setError("Weak password");
          break;
        default:
          setError("Registration failed. Please try again");
      }
    }
  };
  return (
    <Layout>
      <form onSubmit={handleRegister}>
        <div className="RegisterLoginContainer">
          <div className="RegisterLoginHeader">
            <div className="text-auth">Register</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="forgot-password">
            {error && (
              <div className='error-box'>
                <Alert variant="danger" className='error-message'>{error}</Alert>
              </div>
              )}
          </div>
          <div className="submit-container">
            <button type="submit" className="submit">
              Register
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
