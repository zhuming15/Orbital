import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useAuthUser } from 'react-auth-kit';
import axios from "axios";


import NavBar from "../components/NavBar";
import BACKEND_URL from "../config";

function ChangePassword() {
  const auth = useAuthUser();
  const username = auth().username;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm new password do not match");
      return;
    }

    await axios.put(`${BACKEND_URL}/api/changePassword/${username}/`, {
      username: username,
      currentPassword: currentPassword,
      newPassword: newPassword
    })
      .then((res) => {
        console.log(res);
        console.log("Change Password OK");
        navigate("/");
      })
      .catch(err => {
        console.log(err);
        console.log("Change Password NOT OK");
        alert("Fail to update password");
      })
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <button className="btn btn-secondary my-3" onClick={() => navigate("/settings")}>
          Back
        </button>
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-text" htmlFor="currentPassword">Current Password:</label>
          <input
            className="form-control"
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <label className="form-text" htmlFor="newPassword">New Password:</label>
          <input
            className="form-control"
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label className="form-text" htmlFor="newPassword">Confirm new Password:</label>
          <input
            className="form-control"
            type="password"
            id="confirmnewPassword"
            name="confirmnewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button className="btn btn-primary my-3" type="submit">Update Password</button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword;