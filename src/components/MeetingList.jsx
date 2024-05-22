import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectMeeting, addRequest } from '../Redux/Reducers/meetingSlice';
import "../css/MeetingList.css";

const MeetingList = () => {
  const [candidateName, setCandidateName] = useState('');
  const [selectedMeetingId, setSelectedMeetingId] = useState('');
  const  {meetingRoom}  = useSelector(selectMeeting) || [];

  const dispatch = useDispatch();
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
    const requestId = new Date().getTime(); 
   dispatch(addRequest({ id: requestId, candidateName, meetingId: selectedMeetingId }));
    
    setCandidateName('');
    setSelectedMeetingId('');
    alert('Your request to join the meeting has been sent to the admin.');
    navigate('/admin');

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
        {meetingRoom.map((meeting) => (
          <option key={meeting.id} value={meeting.id}>{meeting.title}</option>
        ))}
      </select>
      <button onClick={handleJoinMeeting}>Join Room</button>
    </div>
  );
};

export default MeetingList;
