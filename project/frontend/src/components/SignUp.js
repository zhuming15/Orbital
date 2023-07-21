import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "./LoginSystem/Input";
import Message from "./LoginSystem/Message"
import PinterestLogo from "./Logo/Pinterest";
import Footer from "./Footer";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform signup logic here, such as sending the data to an API endpoint
    console.log("Signup form submitted", email, password);


    await axios.post('http://localhost:3002/api/user', { email: email, username: username, password: password })
      .then(res => {
        console.log(res);
        console.log("SignUp OK");
        navigate("/");
      }).catch(err => {
        console.log(err);
        console.log("SignUp NOT OK");
        setError(true);
      });
  };


  return (
    <div className="py-5 container">
      <PinterestLogo height="50" width="50" className="mb-3" viewBox="0 0 16 16" />
      <h1 className="h3 mb-3 fw-normal">Signup</h1>
      <form onSubmit={handleSubmit} noValidate>
        <Input useState={[username, setUsername]} inputType="text" inputId="username" inputPlaceholder="Username" key="sign_up_username" required />
        {/* {error && <Message messageID="usernameHelpBlock" content="Invalid username." />} */}

        <Input useState={[email, setEmail]} inputType="email" inputId="email" inputPlaceholder="Email" key="sign_up_email" required />
        {/* {error && <Message messageID="emailHelpBlock" content="Invalid email." />} */}

        <Input useState={[password, setPassword]} inputType="password" inputId="password" inputPlaceholder="Password" key="sign_up_password" required />
        {/* {error && <Message
          messageID="passwordHelpBlock"
          content="Your password must be 8-20 characters long, contain letters and numbers, 
          and must not contain spaces, special characters, or emoji."
        />} */}
        {error && <Message messageID="signUpError" content="Invalid username, email and password combination." />}
        <button type="submit" className="btn btn-primary my-3">Sign Up</button>
      </form>
      <p className="form-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <Footer />
    </div>
  );
};

export default SignUp;