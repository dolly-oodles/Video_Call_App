import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateMeetingRoom from "./components/VideoCall_App_Components/MeetingRoom.jsx";
import JoinScreen from "./components/VideoCall_App_Components/JoinScreen.jsx";
import AdminPanel from "./components/VideoCall_App_Components/AdminPanel.jsx";
import CreateAPI from "./components/API_Components/CreateApi.jsx";
import ReadAPI from "./components/API_Components/ReadAPI.jsx";
import Layout from "./components/Layout.jsx";
import MeetingList from "./components/VideoCall_App_Components/MeetingList.jsx";
import Login from "./components/Chat_App_Components/Login.jsx";
import Register from "./components/Chat_App_Components/Register.jsx";
import { VerifyUser } from "./utils/VerifyUser.jsx";
import Home from "./components/Chat_App_Components/Home.jsx";
import { Helmet } from "react-helmet";
import logo from "./assets/logo.png";

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Conn-Action Dashboard </title>
        <link rel="icon" type="image/svg+xml" href={logo} />
      </Helmet>

      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<VerifyUser />}>
              <Route path="/createMeeting" element={<CreateMeetingRoom />} />
              <Route path="/meetings/:meetingId" element={<MeetingList />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/meetRoom/:id" element={<JoinScreen />} />
              <Route path="/CreateAPI" element={<CreateAPI />} />
              <Route path="/ReadAPI" element={<ReadAPI />} />
              <Route path="/chatapp" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
