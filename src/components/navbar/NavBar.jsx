import React, { useEffect, useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore"; 
import { db } from "../../firebase/firebase"; 

const NavBar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [userData, setUserData] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, "Users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          setUserData(userDocSnapshot.data());
        }
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  const user = auth.currentUser;

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Binar 34
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/gamelist">
              Game List
            </Nav.Link>
            <Nav.Link as={Link} to="/userlist">
             User List
            </Nav.Link>

          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
                <Nav.Link disabled>Hi, {userData?.username}</Nav.Link>
                <Nav.Link as={Link} to={`/profile`}>
                  Profile{" "}
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
