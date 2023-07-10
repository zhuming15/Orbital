import React, { useState } from "react";
import { Link } from "react-router-dom";
import PinterestLogo from "./Logo/Pinterest";
import Input from "./LoginSystem/Input";
import Message from "./LoginSystem/Message"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const renderInvalidEmail = () => {
    return (
      <div className="invalid-email">
        <p>Invalid email address. Please try again.</p>
      </div>
    );
  };

  const handleSubmit = (event) => {
    // event.preventDefault();

    // // Perform reset password logic here, such as sending a reset email to the provided email address
    // // const isValidEmail = checkForgotPasswordDetails(email);

    // if (isValidEmail) {
    //   console.log("Reset email sent");
    // } else {
    //   console.log("Reset email failed");
    //   return renderInvalidEmail();
    // }

    // // Reset form field and update state to indicate reset email sent
    // setEmail("");
    // setResetSent(true);
  };

  return (
    <div className="py-5 container">
      <PinterestLogo height="50" width="50" className="mb-3" viewBox="0 0 16 16" />
      <div className="forgot-password-contianer">
        <h1 className="h3 mb-3 fw-normal">Forgot Password</h1>
        {resetSent ? (
          <Message messageID="reset-email-sent" content="Reset email sent! Please check your email for further instructions." />
        ) : (
          <form onSubmit={handleSubmit}>
            <Input init="" inputType="email" inputId="email" inputPlaceholder="Email" key="forgot_password_email" required />
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
