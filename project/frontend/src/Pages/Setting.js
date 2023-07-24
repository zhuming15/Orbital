import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';

import NavBar from "../components/NavBar";

function Settings() {
  const navigate = useNavigate();
  const signOut = useSignOut();

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2>Settings</h2>
      </div>
      <div className="container">
        <ul>
          <li>
            <button className="btn" onClick={() => navigate("/settings/edit")}>
              Edit Profile
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => navigate("/settings/change-password")}>
              Change Password
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => navigate("/settings/delete")}>
              Delete Account
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Settings;