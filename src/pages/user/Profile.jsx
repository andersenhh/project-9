import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { Button, Row, Col, Card, Form } from 'react-bootstrap';
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
import './Profile.css';

const ProfilePage = () => {
  const auth = getAuth();
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, "Users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          setUserData(userDocSnapshot.data());
          setBio(userDocSnapshot.data().bio);
          setCity(userDocSnapshot.data().city);
        }
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  const handleSaveProfile = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, "Users", userId);

      // Update the user's profile data in Firebase
      await updateDoc(userDocRef, {
        bio: bio,
        city: city,
      });

      setEditMode(false);  // Exit edit mode after saving

      // Update userData state with the new bio and city
      setUserData(prevUserData => ({
        ...prevUserData,
        bio: bio,
        city: city,
      }));
    }
  };

  const user = auth.currentUser;

  return (
    <Layout>
      {user ? (
        <Card className="profile-card">
          <Card.Header className="profile-header">Profile</Card.Header>
          <Card.Body className="d-flex justify-content-center text-center">
          <Form>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control className="text-center" type="text" readOnly value={userData?.username}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control className="text-center" type="text" readOnly value={userData?.email}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Total Wins:</Form.Label>
                <Form.Control className="text-center" type="text" readOnly value={userData?.totalWins}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Total Losses:</Form.Label>
                <Form.Control className="text-center" type="text" readOnly value={userData?.totalLosses}/>
              </Form.Group>
          
            {editMode ? (
              <>  
                <Form.Group controlId="formBio">
                  <Form.Label className="bold-label">Bio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formCity">
                  <Form.Label className="bold-label">City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
              </>
            ) : <>
              <Form.Group>
                <Form.Label>Bio:</Form.Label>
                <Form.Control className="text-center" type="text" readOnly value={userData?.bio}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>City:</Form.Label>
                <Form.Control className="text-center" type="text" readOnly value={userData?.city}/>
              </Form.Group>
            </>}

            {!editMode ? (
              <Button variant="primary" onClick={() => setEditMode(true)} className="mt-3" >
                Edit
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSaveProfile} className="mt-3">
                Save Profile
              </Button>
            )}
          </Form>
            {/* Include other profile fields here */}
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default ProfilePage;
