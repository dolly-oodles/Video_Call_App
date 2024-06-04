import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMeeting,
  denyRequest,
  approveRequest,
} from "../../Redux/Reducers/meetingSlice";
import "../../css/AdminPanel.css";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { requests } = useSelector(selectMeeting) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleApprove = (id) => {
    dispatch(approveRequest({ requestId: id }));
    const request = requests.find((req) => req.id === id) || [];
    if (request) {
      const { candidateName } = request;
      navigate(`/meetRoom/${request.id}`, { state: { candidateName } });
    }
  };

  const handleDeny = (id) => {
    dispatch(denyRequest({ requestId: id }));
    const request = requests.find((req) => req.id !== id) || [];
    if (request) navigate(`/meetings/${request.id}`);

    alert("Your Request To enter Meet Room has been denied");
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      {requests.length === 0 ? (
        <p>No join requests</p>
      ) : (
        <table className="requests-table">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Meeting ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.candidateName}</td>
                <td>{request.meetingId}</td>
                <td className="btn">
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(request.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="deny-btn"
                    onClick={() => handleDeny(request.id)}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
