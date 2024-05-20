import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { createMeeting } from '../Redux/Reducers/meetingSlice';

const CreateMeetingRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  const handleJoinMeeting = () => {
    const meetingId = uuidv4();

    dispatch(createMeeting({ id: meetingId, title }));

    navigate(`/meetings/${meetingId}`);

    setTitle('');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter title of the room"
        value={title}
        onChange={handleTitleChange}
      />
      <button onClick={handleJoinMeeting}>Join Room</button>
    </div>
  );
};

export default CreateMeetingRoom;
