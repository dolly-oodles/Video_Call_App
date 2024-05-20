import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectMeeting } from '../Redux/Reducers/meetingSlice';
import "../css/MeetingList.css";// Import the CSS file

const MeetingList = () => {
  const [candidateName, setCandidateName] = useState('');
  const [selectedMeetingId, setSelectedMeetingId] = useState('');
  const meetings = useSelector(selectMeeting);
  const navigate = useNavigate();

  const handleJoinMeeting = () => {
    if (candidateName.trim() === '') {
      alert('Please enter your name before joining the meeting.');
      return;
    }
    if (!selectedMeetingId) {
      alert('Please select a meeting before joining.');
      return;
    } 
    navigate(`/meetRoom/${selectedMeetingId}`, { state: { candidateName } });
  };

  return (
    <div className="meeting-list-container">
    
      <input
        type="text"
        placeholder="Enter your name"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
      />
      <select onChange={(e) => setSelectedMeetingId(e.target.value)} value={selectedMeetingId}>
        <option value="">Select a meeting</option>
        {meetings.map((meeting) => (
          <option key={meeting.id} value={meeting.id}>{meeting.title}</option>
        ))}
      </select>
      <button onClick={handleJoinMeeting}>Join Room</button>
    </div>
  );
};

export default MeetingList;
