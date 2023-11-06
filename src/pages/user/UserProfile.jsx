import React from "react";
import Layout from "../../layout/Layout";
import { Card } from 'react-bootstrap';
import './Profile.css';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { username } = useParams();
    const email = new URLSearchParams(window.location.search).get('email');
    const bio = new URLSearchParams(window.location.search).get('bio');
    const city = new URLSearchParams(window.location.search).get('city');
    const totalWins = new URLSearchParams(window.location.search).get('totalWins');
    const totalLosses= new URLSearchParams(window.location.search).get('totalLosses');

    return (
        <Layout>
            <Card className="profile-card">
                <Card.Header className="profile-header">Profile {username}</Card.Header>
                <Card.Body>
                    <Card.Text className="profile-text">Username : {username}</Card.Text>
                    <Card.Text className="profile-text">Email :  {email}</Card.Text>
                    <Card.Text className="profile-text">Bio :  {bio}</Card.Text>
                    <Card.Text className="profile-text">City : {city}</Card.Text>
                    <Card.Text className="profile-text">Total Wins : {totalWins}</Card.Text>
                    <Card.Text className="profile-text">Total Losses : {totalLosses}</Card.Text>
                </Card.Body>
            </Card>
            <br />
            <br />
        </Layout>
    );
};

export default UserProfile;