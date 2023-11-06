import React from "react";
import Layout from "../../layout/Layout";
import { Container, Row, Col, Carousel } from "react-bootstrap";

import "./landing.styles.css";

const Landing = () => {
  return (
    <Layout>
      <div className="landingPage">
        <div className="welcomeSection">
          <Container className="container1 text-center">
            <Row className="justify-content-center">
              <Col>
                <h1 className="pageTitle">Project Binar Challenge 9</h1>
                <h4 className="descriptionPage">
                  This is a project for Binar Challenge 9
                </h4>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
