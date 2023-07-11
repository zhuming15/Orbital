import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PinterestLogo from "./Logo/Pinterest";
import Message from "./LoginSystem/Message";
import Input from "./LoginSystem/Input"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:3002/api/login/${email}/${password}`, {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response);
        console.log("OK")
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        console.log("Login NOT OK")
        setError(true);
      });
  };

  return (
    <div className="py-5 container">
      <PinterestLogo height="50" width="50" className="mb-3" viewBox="0 0 16 16" />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input useState={[email, setEmail]} inputType="email" inputId="email" inputPlaceholder="Email" key="login_email" required />
        <Input useState={[password, setPassword]} inputType="password" inputId="password" inputPlaceholder="Password" key="login_password" required />
        {error && <Message messageID="loginHelpBlock" content="Invalid email or password combination." />}
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>

      <p className="form-text">
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
      <p className="form-text">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
