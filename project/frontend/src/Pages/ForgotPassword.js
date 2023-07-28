import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BACKEND_URL from "../config";

import Logo from "../Logo/Logo";
import Input from "../components/Input";
import Message from "../components/Message"
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const renderInvalidEmail = () => {
    return (
      <div className="invalid-email">
        <p>Invalid email address. Please try again.</p>
      </div>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform reset password logic here, such as sending a reset email to the provided email address
    await axios.put(BACKEND_URL + '/api/user', { email: email, password: 123 })
      .then(res => {
        console.log(res);
        console.log("Forgot Password OK");
        navigate("/login");
      }).catch(err => {
        console.log(err);
        console.log("Forgot Password NOT OK");
      });

    // if (isValidEmail) {
    //   console.log("Reset email sent");
    // } else {
    //   console.log("Reset email failed");
    //   return renderInvalidEmail();
    // }

    // Reset form field and update state to indicate reset email sent
    // setEmail("");
    // setResetSent(true);
  };

  return (
    <div className="py-5 container">
      <Logo />
      <div className="forgot-password-contianer">
        <h1 className="h3 mb-3 fw-normal">Forgot Password</h1>
        {resetSent ? (
          <Message messageID="reset-email-sent" content="Reset email sent! Please check your email for further instructions." />
        ) : (
          <form onSubmit={handleSubmit}>
            <Input useState={[email, setEmail]} inputType="email" inputId="email" inputPlaceholder="Email" key="forgot_password_email" required />
            <button type="submit" className="btn btn-primary my-3">Reset Password</button>
          </form>
        )}

        <p className="form-text">
          <Link to="/login">Login</Link>
        </p>

        <p className="form-text">
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
