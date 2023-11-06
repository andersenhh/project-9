import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase.js";
import Layout from "../../layout/Layout.jsx";
import "./RegisterLogin.css";
import email_icon from "../Assets/email.png";
import { Alert } from "react-bootstrap";
import password_icon from "../Assets/password.png";
import { doc, setDoc, getDoc } from "firebase/firestore";

export let socialMediaUser = {};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const provider = new GoogleAuthProvider();

  signOut(auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      navigate("/"); // Redirect to the desired page upon successful login
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/user-disabled":
          setError("User account is disabled.");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Invalid email or password.");
          break;
        default:
          setError("Login failed. Please try again later.");
          break;
      }
    }
  };

  const signInWithGoogle = async () => {
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("google user: ", user);
      socialMediaUser = user;

      const userDocRef = doc(db, "Users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) {
        const userData = {
          username: user.displayName,
          email: user.email,
          totalWins: 0,
          totalLosses: 0,
        };
        await setDoc(userDocRef, userData);
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleLogin}>
        <div className="RegisterLoginContainer">
          <div className="RegisterLoginHeader">
            <div className="text">Login</div>
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
            <p>
              Forget Password?{" "}
              <span onClick={() => navigate("/reset-password")}>
                Click Here!
              </span>
            </p>
            <button
              onClick={signInWithGoogle}
              className="btn btn-light "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "480px",
                margin: "10px 0",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google Logo"
                style={{ marginRight: "10px", width: "24px", height: "24px" }}
              />
              Sign in with Google
            </button>{" "}
            {error && (
              <div className="error-box">
                <Alert variant="danger" className="error-message">
                  {error}
                </Alert>
              </div>
            )}
          </div>
          <div className="submit-container">
            <button type="submit" className="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
