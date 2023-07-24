import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useAuthUser } from 'react-auth-kit';
import axios from "axios";
import BACKEND_URL from "../config";


import NavBar from "../components/NavBar";

function Edit() {
  const auth = useAuthUser();
  const username = auth().username;
  const [newProfilePicture, setNewProfilePicture] = useState([]);
  const [newBio, setNewBio] = useState("");

  const navigate = useNavigate();

  const fetchBio = async () => {
    await axios.get(`${BACKEND_URL}/api/bio/${username}`)
      .then((res) => {
        console.log(res);
        console.log("Fetch Bio OK");
        setNewBio(res.data[0].bio);
      })
      .catch(err => {
        console.log(err);
        console.log("Fetch Bio NOT OK");
      })
  };

  const fetchProfilePic = async () => {
    await axios.get(`${BACKEND_URL}/api/profile-picture/${username}`)
      .then((res) => {
        console.log(res);
        console.log("Fetch Profile Pic OK");
        setNewProfilePicture(res.data.picture_name);
      })
      .catch(err => {
        console.log(err);
        console.log("Fetch Profile Pic NOT OK");
      })
  };

  useEffect(() => {
    // Fetch data from the backend API
    fetchBio();
    fetchProfilePic();
    console.log("Fetching bio and profile picture...");
  },[])

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setNewProfilePicture(file);
  };

  const handleBioChange = (event) => {
    setNewBio(event.target.value);
  };

  const saveEditProfilePage = async (event) => {
    event.preventDefault();

    let r = window.confirm("Are you sure you want to update your profile?");
    if (r === false) {
      return;
    }

    const formData = new FormData();
    formData.append("image", newProfilePicture);

    await axios.put(`${BACKEND_URL}/api/profile-picture/${username}`, formData)
      .then((res) => {
        console.log(res);
        console.log("Update Profile Picture OK");
      })
      .catch(err => {
        console.log(err);
        console.log("Update Profile Picture NOT OK");
      })

    await axios.put(`${BACKEND_URL}/api/bio/${username}`, {
      username: username,
      bio: newBio,
    })
      .then((res) => {
        console.log(res);
        console.log("Update Bio OK");
      })
      .catch(err => {
        console.log(err);
        console.log("Update Bio NOT OK");
      });

    alert("Profile updated successfully!");
    navigate("/");
  };

  return (
    <div className="container">
      <button className="btn btn-secondary my-3" onClick={() => navigate("/settings")}>
        Back
      </button>
      <h2>Edit Profile</h2>
      <form onSubmit={saveEditProfilePage}>
        <label htmlFor="bio" className="form-text">Bio:</label>
        <input
          className="form-control"
          type="text"
          id="bio"
          name="bio"
          value={newBio}
          onChange={handleBioChange}
        />
        <label htmlFor="profilePicture" className="form-text">Profile Picture:</label>
        <input
            className="form-control"
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleProfilePictureChange}
        />
        <button type="submit" className="btn btn-primary my-3">Update Profile</button>
      </form>
    </div>
  )
}

export default Edit;