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

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
    },
    input: {
      padding: '10px',
      margin: '10px 0',
      width: '300px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      padding: '10px 20px',
      margin: '10px 0',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      userSelect: 'none'
    },
    title: {
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
      userSelect: 'none'
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Meeting Room</h1>
      <input
        type="text"
        placeholder="Enter title of the room"
        value={title}
        onChange={handleTitleChange}
        style={styles.input}
      />
      <button onClick={handleJoinMeeting} style={styles.button}>Join Room</button>
    </div>
  );
};

export default CreateMeetingRoom;
