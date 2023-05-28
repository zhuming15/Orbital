import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import { Link, useNavigate } from "react-router-dom";

const UserSettings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState("settings");
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation and update logic here
    if (newEmail === "" && newPassword === "") {
      setErrorMessage("Please enter a new email or password.");
    } else {
      // Update email logic
      if (newEmail !== "") {
        setEmail(newEmail);
      }

      // Update password logic
      if (newPassword !== "") {
        setPassword(newPassword);
      }

      setSuccessMessage("User settings updated successfully.");
    }

    // Clear input fields
    setNewEmail("");
    setNewPassword("");
  };

  const renderChangeEmailPage = () => {
    return (
      <div>
        <h2>Change Email</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newEmail}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">Current Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={newPassword}
            onChange={handlePasswordChange}
          />
          <button type="submit">Update Email</button>
        </form>
      </div>
    );
  };

  const renderChangePasswordPage = () => {
    return (
      <div>
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="currentPassword">Current Password:</label>
          <input type="password" id="currentPassword" name="currentPassword" />
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
          />
          <button type="submit">Update Password</button>
        </form>
      </div>
    );
  };

  const renderConfirmDeleteAccountPage = () => {
    return (
      <div>
        <h2>Delete Account</h2>
        <p>Are you sure you want to delete your account?</p>
        <button onClick={deleteAccount}>Delete Account</button>
      </div>
    );
  };

  const renderCompleteDeleteAccountPage = () => {
    return (
      <div>
        <h2>Account Deleted</h2>
        <p>Your account has been deleted.</p>
        <Link to="/signup">Sign up</Link>
      </div>
    );
  };

  const deleteAccount = () => {
    // Perform delete account logic here
    console.log("Deleting account...");

    return handlePageChange("completeDeleteAccount");
  };

  const handleLogout = () => {
    // Perform logout logic here
    console.log("Logging out...");
    return navigate("/login");
  };

  return (
    <div>
      <NavigationBar />

      {currentPage === "settings" && (
        <div className="container">
          <div clsasName="container">
            <h2>Settings</h2>
          </div>
          <div className="container">
            <ul>
              <li>
                <button onClick={() => handlePageChange("editProfile")}>
                  Edit Profile
                </button>
              </li>
              <li>
                <button onClick={() => handlePageChange("changeEmail")}>
                  Change Email
                </button>
              </li>
              <li>
                <button onClick={() => handlePageChange("changePassword")}>
                  Change Password
                </button>
              </li>
              <li>
                <button onClick={() => handlePageChange("deleteAccount")}>
                  Delete Account
                </button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
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

      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default UserSettings;
