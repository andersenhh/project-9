import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";

import batu from "./assets/batu.png";
import gunting from "./assets/gunting.png";
import kertas from "./assets/kertas.png";
import { auth, db } from "../../firebase/firebase";
import { getDoc, query, updateDoc, doc, collection, getDocs, orderBy, limit } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import RedirectPopUp from "../others/RedirectPopUp";

const Game = () => {
  const choices = ["rock", "paper", "scissors"];
  const images = [batu, gunting, kertas];

  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [play, setPlay] = useState(false);
  const [isClicked, setIsClicked] = useState([false, false, false]);
  const [totalWins, setTotalWins] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
  const [leaderboardScores, setLeaderboardScores] = useState([])

  const handleClick = (index) => {
    const updatedStatus = isClicked.map((status, i) =>
      i === index ? !status : false
    );
    setIsClicked(updatedStatus);
  };

  const getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return "It's a tie!";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "scissors" && computer === "paper") ||
      (player === "paper" && computer === "rock")
    ) {
      return "You win!";
    } else {
      return "Computer wins!";
    }
  };

  const playGame = async (choice) => {
    const computerChoice = getRandomChoice();
    const winner = determineWinner(choice, computerChoice);

    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    setResult(winner);

    try {
      const auth = getAuth()
      const user = auth.currentUser;

      const userDocRef = doc(db, "Users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();

      if (winner === "You win!") {
        await updateDoc(userDocRef, {
          totalWins: userData.totalWins + 1,
        });
        setTotalWins(userData.totalWins + 1);
        setTotalLosses(userData.totalLosses);
      } else if (winner === "Computer wins!") {
        await updateDoc(userDocRef, {
          totalLosses: userData.totalLosses + 1,
        });
        setTotalWins(userData.totalWins);
        setTotalLosses(userData.totalLosses + 1);
      } else {
        setTotalWins(userData.totalWins);
        setTotalLosses(userData.totalLosses);
      }
    } catch (err) {
      console.error("error updating document: ", err);
    }

    fetchLeaderboard()
  };

  const getResultTextColor = () => {
    if (result === "You win!") return "green";
    else if (result === "Computer wins!") return "red";
    else return "";
  };

  const fetchLeaderboard = async () => {
    try {
      const q = query(collection(db, 'Users'), orderBy('totalWins', 'desc'), limit(5))
      const querySnapshot = await getDocs(q)

      const scoresData = querySnapshot.docs.map((doc) => doc.data());
      setLeaderboardScores(scoresData);
      console.log('scores data:', scoresData)
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
        <div className="col-md-3 d-flex align-items-center">
          <div className="card">
            <div className="container bg-light p-3 rounded d-flex flex-column justify-content-center">

            <div className="container bg-light p-3 rounded">
              <h2 className="mb-3 text-center">Leaderboard</h2>
              <ul className="list-group">
                {leaderboardScores.map((score, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{score.username}</span>
                    <span className="badge bg-primary rounded-pill">
                      {score.totalWins}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            </div>
          </div>
        </div>
            
          <div className="col-md-9 border-start">
            <h1 className="text-center mb-4">Rock, Paper, Scissors</h1>

            <div className="row justify-content-center">
              {choices.map((choice, index) => (
                <div key={choice} className="col-md-3 text-center">
                  <div
                    style={{
                      backgroundColor: isClicked[index] ? "grey" : "transparent",
                    }}
                  >
                    <img
                      src={images[index]}
                      alt={images[index]}
                      className="img-fluid"
                      style={{
                        width: "260px",
                        height: "220px",
                        padding: "10px",
                      }}
                    />
                  </div>
                  <br />
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                      playGame(choice);
                      handleClick(index);
                      setPlay(true);
                    }}
                  >
                    {choice}
                  </button>
                </div>
              ))}
            </div>

            {play ? (
              <div
                className="container d-flex align-items-center justify-content-center"
                style={{ height: "350px" }}
              >
                {playerChoice && computerChoice && (
                  <div className="mt-4 text-center col-lg-6">
                    <div className="card">
                      <div className="card-body">
                        <p>
                          Your Choice:{" "}
                          <span className="text-uppercase">{playerChoice}</span>
                        </p>
                        <p>
                          Computer's Choice:{" "}
                          <span className="text-uppercase">{computerChoice}</span>
                        </p>
                        <div style={{ backgroundColor: getResultTextColor() }}>
                          <p className="font-weight-bold text-uppercase">
                            <span
                              style={{
                                color:
                                  result === `It\'s a tie!` ? "black" : "white",
                              }}
                            >
                              {result}
                            </span>
                          </p>
                        </div>
                        <hr />
                        <p>Total Wins: {totalWins}</p>
                        <p>Total Losses: {totalLosses}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ height: "100px" }}></div>
            )}
          </div>
        </div>
        {!auth.currentUser && <RedirectPopUp/>}
      </div>

    </Layout>
  );
};

export default Game;
