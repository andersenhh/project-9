import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from 'react-router-dom';
import "./UserList.css";
import { auth } from "../../firebase/firebase"; // Import Firebase auth

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const currentUser = auth.currentUser; // Get the currently authenticated user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollection = await getDocs(collection(db, "Users"));
        const userList = userCollection.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // Add the user's document ID
            username: data.username,
            email: data.email,
            bio: data.bio,
            city: data.city,
            totalWins: data.totalWins,
            totalLosses: data.totalLosses,
          };
        });
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="userlist">
        <h2>List of Users:</h2>
        <ListGroup>
          {users.map((user) => (
           <ListGroupItem
           key={user.id}
           className={currentUser && user.id === currentUser.uid ? "list-item highlighted-user" : "list-item"}
         >
           <Link
             to={`/profile/${user.username}?email=${user.email}&bio=${user.bio}&city=${user.city}&totalWins=${user.totalWins}&totalLosses=${user.totalLosses}`}
             className={currentUser && user.id === currentUser.uid ? "custom-link" : "custom-link"}
           >
             {user.username}
           </Link>
           {currentUser && user.id === currentUser.uid && (
               <span className="authenticated-text">Current User</span>
           )}
         </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </Layout>
  );
};

export default UsersList;
