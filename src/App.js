import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Landing from "./pages/home/Landing";
import Home from "./pages/home/Home";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import GameDetails from "./pages/game/GameDetails";
import GameList from "./pages/game/GameList";
import Game from "./pages/game/Game";
import ResetPassword from "./pages/authentication/ResetPassword"
import Profile from "./pages/user/Profile";
import NavBar from "./components/navbar/NavBar";
import UserList from "./pages/user/UserList";
import UserProfile from './pages/user/UserProfile';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<Game />} />
        <Route path="/gamedetails" element={<GameDetails />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/gamelist" element={<GameList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
