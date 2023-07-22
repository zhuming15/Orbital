import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignOut, useAuthUser } from 'react-auth-kit';
import { MDBCol, MDBContainer, MDBRow, MDBInput, MDBCard, MDBIcon, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import BACKEND_URL from "../config";


import NavigationBar from "../components/NavBar";
const UserSettings = () => {
  const signOut = useSignOut();
  const auth = useAuthUser();
  const username = auth().username;

  const fetchBio = async () => {
    await axios.get(`${BACKEND_URL}/api/bio/${username}`)
      .then((res) => {
        console.log(res);
        console.log("Fetch Bio OK");
        setNewBio(res);
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
        setFiles(res);
      })
      .catch(err => {
        console.log(err);
        console.log("Fetch Profile Pic NOT OK");
      })
  };

  const fetchEmail = async () => {
    await axios.get(`${BACKEND_URL}/api/email/${username}`)
      .then((res) => {
        console.log(res);
        console.log("Fetch Email OK");
        setNewEmail(res);
      })
      .catch(err => {
        console.log(err);
        console.log("Fetch Email NOT OK");
      })
  };

  useEffect(() => {
    // Fetch data from the backend API
    console.log("Fetching user settings...");
    fetchBio();
    fetchProfilePic();
    fetchEmail();
    setNewUsername(username);
    // fetchUserSettings();
  }, []);

  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [files, setFiles] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState("settings");
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => { setFiles(acceptedFiles); };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const removeFile = (file) => {
    const updatedFiles = files.filter((f) => f !== file);
    setFiles(updatedFiles);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setFiles(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation and update logic here
    if (newEmail === "" && newPassword === "") {
      setErrorMessage("Please enter a new email or password.");
    } else {
      // Update email logic
      if (newEmail !== "") {
        setNewEmail(newEmail);
      }

      // Update password logic
      if (newPassword !== "") {
        setPassword(newPassword);
      }

      setSuccessMessage("User settings updated successfully.");
    }

    let r = window.confirm("Are you sure?");
    if (r === true) {
      alert("Settings updated!");
      navigate("/");
    } else {
      return;
    }
  };

  const renderChangeEmailPage = () => {
    return (
      <div className="container">
        <button className="btn btn-secondary my-3" onClick={() => handlePageChange("settings")}>
          Back
        </button>
        <h2>Change Email</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-text" htmlFor="email">New Email:</label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={newEmail}
            onChange={handleEmailChange}
          />
          <label className="form-text" htmlFor="password">Current Password:</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={newPassword}
            onChange={handlePasswordChange}
          />
          <button className="btn btn-primary my-3" type="submit">Update Email</button>
        </form>
      </div>
    );
  };

  const renderChangePasswordPage = () => {
    return (
      <div className="container">
        <button className="btn btn-secondary my-3" onClick={() => handlePageChange("settings")}>
          Back
        </button>
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-text" htmlFor="currentPassword">Current Password:</label>
          <input className="form-control" type="password" id="currentPassword" name="currentPassword" value={password} />
          <label className="form-text" htmlFor="newPassword">New Password:</label>
          <input
            className="form-control"
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
          />
          <button className="btn btn-primary my-3" type="submit">Update Password</button>
        </form>
      </div>
    );
  };

  const renderConfirmDeleteAccountPage = () => {
    return (
      <div className="container">
        <button className="btn btn-secondary my-3" onClick={() => handlePageChange("settings")}>
          Back
        </button>
        <h2>Delete Account</h2>
        <p>Are you sure you want to delete your account?</p>
        <button className="btn btn-primary" onClick={deleteAccount}>Delete Account</button>
      </div>
    );
  };

  const renderCompleteDeleteAccountPage = () => {
    signOut();
    navigate("/login");
    alert("Account deleted!");
  };

  const renderEditProfilePage = () => {
    return (
      <div className="container">
        <button className="btn btn-secondary my-3" onClick={() => handlePageChange("settings")}>
          Back
        </button>
        <h2>Edit Profile</h2>
        <form onSubmit={saveEditProfilePage}>
          <h7>Upload New Profile Picture</h7>
          {files.length > 0 ? (
            <div>
              <h6>Uploaded Image:</h6>
              <div className="image-container">
                {files.map((file) => (
                  <div key={file.name} className="uploaded-image">
                    <img src={URL.createObjectURL(file)} alt={file.name} height="500" width="500" style={{ objectFit: "contain" }} />
                    <MDBIcon icon="times-circle" className="delete-icon ms-3" size="2x" onClick={() => removeFile(file)} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <div className="d-flex flex-column justify-content-center align-items-center">
                <MDBIcon fas icon="photo-video" size="3x" className="my-3" />
                <p className="my-3">Drag and drop an image here, or click to select an image</p>
              </div>
            </div>)}
          <label htmlFor="username" className="form-text">Username:</label>
          <input
            className="form-control"
            type="text"
            id="username"
            name="username"
            value={newUsername}
            onChange={handleUsernameChange}
          />
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
            value={files}
            onChange={handleProfilePictureChange}
          />
          <button type="submit" className="btn btn-primary my-3">Update Profile</button>
        </form>
      </div>

      // <MDBContainer className="h-100">
      //   <MDBRow className="justify-content-center align-items-center h-100">
      //     <MDBCol lg="9" xl="7">
      //       <form onSubmit={saveEditProfilePage}>
      //         <MDBCard>
      //           <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
      //             <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
      //               <MDBCardImage src={profilePictur || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"}
      //                 alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
      //             </div>
      //             <div className="ms-3" style={{ marginTop: '130px' }}>
      //               <MDBTypography tag="h5">{username || "@Andy_"}</MDBTypography>
      //               {/* <MDBCardText>{name || "Andy"}</MDBCardText> */}
      //             </div>
      //           </div>
      //           <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
      //             <div className="d-flex justify-content-end text-center py-1">
      //               <div>
      //                 <MDBCardText className="mb-1 h5">{2 || postNumber}</MDBCardText>
      //                 <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
      //               </div>
      //               <div className="px-3">
      //                 <MDBCardText className="mb-1 h5">{99 || followingNumber}</MDBCardText>
      //                 <MDBCardText className="small text-muted mb-0">Follower</MDBCardText>
      //               </div>
      //               <div>
      //                 <MDBCardText className="mb-1 h5">{99 || followerNumber}</MDBCardText>
      //                 <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
      //               </div>
      //             </div>
      //           </div>
      //           <MDBCardBody className="text-black p-4">
      //             <div className="mb-5">
      //               <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
      //                 <MDBCardText className="font-italic mb-1">{bio || "Hello World"}</MDBCardText>
      //               </div>
      //             </div>
      //             <div className="d-flex justify-content-between align-items-center mb-4">
      //               <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
      //               <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
      //             </div>
      //             <div className="d-flex flex-column">
      //               <Post />
      //               <Post />
      //             </div>
      //           </MDBCardBody>
      //         </MDBCard>
      //       </form>
      //     </MDBCol>
      //   </MDBRow>
      // </MDBContainer>
    );
  }

  const saveEditProfilePage = (e) => {
    e.preventDefault();
    // pass new setting to backend
  }

  const deleteAccount = () => {
    // Perform delete account logic here
    console.log("Deleting account...");

    return handlePageChange("completeDeleteAccount");
  };

  const handleLogout = () => {
    // Perform logout logic here
    console.log("Logging out...");
    signOut();
    return navigate("/login");
  };

  return (
    <div>
      <NavigationBar />
      {currentPage === "settings" && (
        <div className="container">
          <div className="container">
            <h2>Settings</h2>
          </div>
          <div className="container">
            <ul>
              <li>
                <button className="btn" onClick={() => handlePageChange("editProfile")}>
                  Edit Profile
                </button>
              </li>
              <li>
                <button className="btn" onClick={() => handlePageChange("changeEmail")}>
                  Change Email
                </button>
              </li>
              <li>
                <button className="btn" onClick={() => handlePageChange("changePassword")}>
                  Change Password
                </button>
              </li>
              <li>
                <button className="btn" onClick={() => handlePageChange("deleteAccount")}>
                  Delete Account
                </button>
              </li>
              <li>
                <button className="btn" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {currentPage === "changeEmail" && renderChangeEmailPage()}

      {currentPage === "changePassword" && renderChangePasswordPage()}

      {currentPage === "deleteAccount" && renderConfirmDeleteAccountPage()}

      {currentPage === "completeDeleteAccount" &&
        renderCompleteDeleteAccountPage()}

      {currentPage === "editProfile" && (renderEditProfilePage())}

      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

// function UserSettings() {
//   return (
//     <div className="container d-flex">
//       <SettingSideBar />
//       <SettingContent 
//     </div>
//   )
// }

export default UserSettings;
