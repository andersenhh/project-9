import React from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.js"
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
} from "reactstrap";
import "./GameList.css";
import rpsImage from "./assets/rps.jpg";  
import coinToss from "./assets/cointoss-2.jpg";

const GameList = () => {

  const navigate = useNavigate();

  // const handlePlayNowClick = () => {
  //   onAuthStateChanged(auth, (user) => { 
  //     if (user) {
  //       // User is authenticated, navigate to the game page
  //       navigate("/gamedetail");
  //     } else {
  //       // User is not authenticated, navigate to the login page
  //       navigate("/login");
  //     }
  //   });
  // };

  return (
    <Layout>
      <div className="GameListContainer">
        <div className="CardWrapper">
          <Card
            body
            color="light"
            style={{
              width: "18rem",
            }}
          >
            <img
              alt="Sample"
              src={rpsImage}
              style={{
                width: "260px", 
                height: "200px", 
                objectFit: "cover",
              }}
            />
            <CardBody>
              <CardTitle tag="h4" className="text-center">Rock Paper Scissor</CardTitle>
              <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
                Single Player Game
              </CardSubtitle>
              <br/>
              <CardText className="text-center">
                A classic hand game of strategy and chance, Rock, Paper,
                Scissors is a simple yet engaging contest where players choose
                one of three symbols to beat their opponent.
              </CardText>
              <br/>
              <div className="d-flex justify-content-center">
                <Button size="sm" className="ButtonPlayNow" onClick={() => navigate('/game')}>
                  Play Game
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card
            body
            color="light"
            style={{
              width: "18rem",
            }}
          >
            <img
              alt="Sample"
              src={coinToss}
              style={{
                width: "260px", 
                height: "200px", 
                objectFit: "cover",
              }}
            />
            <CardBody>
              <CardTitle tag="h4" className="text-center" >Coin Toss</CardTitle>
              <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
                Multiplayer Game
              </CardSubtitle>
              <br/>
              <CardText className="text-center">
                A simple game where two players take turns calling "heads" or
                "tails" before flipping a coin. The winner is the one whose
                choice matches the side the coin lands on.
              </CardText>
              <br/>
              <div className="d-flex justify-content-center">
                <Button size="sm" className="ButtonPlayNow" disabled>
                  Coming Soon
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Add more cards here */}
        </div>
      </div>
    </Layout>
  );
};

export default GameList;
