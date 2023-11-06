import React from "react";
import Layout from "../../layout/Layout";
import Image1 from "../game/assets/rps.jpg";   
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS for styling
const Home = () => {
  return (
    <Layout>
    <div className="home-container">
      <header className="header">
        <h1>Welcome to Home Page</h1>
      </header>
      <main className="main-content">
        <section className="hero">
          <div className="hero-text">
            <h2>Recomended Game For You</h2>
            <h1>Our most played game</h1>
            <div className="hero-image">
          <img
              alt="Sample"
              src={Image1}
              style={{
                width: "300px", 
                height: "250px", 
                objectFit: "cover",
              }}
              />
              </div>
            <Link className="explore-button" to="/GameList">Explore</Link>
          </div>
        </section>
        {/* Rest of your content */}
      </main>
    </div>
    </Layout>
  );
};

export default Home;
