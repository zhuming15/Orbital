import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from 'react-auth-kit';
import { useSignOut } from 'react-auth-kit';
import axios from "axios";

import NavBar from "../components/NavBar";
import BACKEND_URL from "../config";

function Delete() {
  const auth = useAuthUser();
  const username = auth().username;
  const [email, setEmail] = useState("");
  const signOut = useSignOut();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let r = window.confirm("Are you sure you want to delete your account?");
    if (r === false) {
      return;
    }

    await axios.delete(`${BACKEND_URL}/api/user`, {
      data: { email: email }
    })
      .then((res) => {
        console.log(res);
        console.log("Delete Account OK");
        signOut();
        alert("Account deleted successfully");
      })
      .catch(err => {
        console.log(err);
        console.log("Account deletion NOT OK");
      })
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <button className="btn btn-secondary my-3" onClick={() => navigate("/settings")}>
          Back
        </button>
        <h2>Delete Account</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-text" htmlFor="currentPassword">Email:</label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary my-3" type="submit">Delete Account</button>
        </form>
      </div>
    </div>
  )
}

export default Delete;