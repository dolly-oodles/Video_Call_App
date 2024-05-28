import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateMeetingRoom from './components/MeetingRoom';
import { store } from './Redux/store';
import JoinScreen from './components/JoinScreen';
import Sidebar from './components/Sidebar';
import AdminPanel from './components/AdminPanel';
import CreateAPI from './components/API_Components/CreateApi';
import ReadAPI from './components/API_Components/ReadAPI';
// import MainSidebar from './components/MainSidebar';
import Layout from './components/Layout';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
        <Route path="/" element={<Layout/>} />
        <Route path="/createMeeting" element={ <CreateMeetingRoom />} />
        <Route path="/meetings/:meetingId" element={<Sidebar />} />
        <Route path='/admin' element={<AdminPanel/>}/>
        <Route path="/meetRoom/:id" element={<JoinScreen />} />
        <Route path="/CreateAPI" element={<CreateAPI />} />
        <Route path="/ReadAPI" element={<ReadAPI />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
