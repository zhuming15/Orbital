import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    event.preventDefault();

    // Perform reset password logic here, such as sending a reset email to the provided email address
    // const isValidEmail = checkForgotPasswordDetails(email);

    if (isValidEmail) {
      console.log("Reset email sent");
    } else {
      console.log("Reset email failed");
      return renderInvalidEmail();
    }

    // Reset form field and update state to indicate reset email sent
    setEmail("");
    setResetSent(true);
  };

  return (
    <div className="my-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        class="bi bi-pinterest"
        viewBox="0 0 16 16"
      >
        <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z" />
      </svg>
      <div className="forgot-password-contianer">
        <h2>Forgot Password</h2>
        {resetSent ? (
          <p>
            Reset email sent! Please check your email for further instructions.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button type="submit">Reset Password</button>
          </form>
        )}

        <p>
          <Link to="/login">Login</Link>
        </p>

        <p>
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
