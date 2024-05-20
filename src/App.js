import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateMeetingRoom from './components/MeetingRoom';
import { store } from './Redux/store';
// import MeetingList from './components/MeetingList';
import JoinScreen from './components/JoinScreen';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<CreateMeetingRoom />} />
          <Route path="/meetings/:meetingId" element={<Sidebar />} />
          <Route path="/meetRoom/:meetingId" element={<JoinScreen />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
