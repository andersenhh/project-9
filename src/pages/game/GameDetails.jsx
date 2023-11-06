import React from "react";
import Layout from "../../layout/Layout";
import { Link } from 'react-router-dom';
import GameDetailimage from "./assets/GameDetail1.png"; 
import './GameDetails.css'; // Import the CSS for styling

const GameDetails = () => {
  return (
    <Layout>
      <div className="GameDetail-container">
      <header className="header">
        <h1>Game Details</h1>
      </header>
      <main className="main-content">
      <h1 className="text"> Rock Paper Scissors</h1>
        <h2 className="text-1">
                        What is the concept of Rock Paper Scissors? Each gesture defeats one and is
                        defeated by one of the other two: rock defeats scissors but is defeated by
                        paper; paper defeats rock but is defeated by scissors. The person whose
                        gesture defeats the other is selected.
                      </h2>
                      <img
              alt="Sample"
              src={GameDetailimage}
              style={{
                width: "300px", 
                height: "300px", 
                objectFit: "cover",
              }}
            />
      <Link className="explore-button" to="/Game">Play Now!</Link>
      </main>
      </div>
    </Layout>
  );
};

export default GameDetails;
