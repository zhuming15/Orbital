import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../Logo/Logo";
import Message from "../components/Message";
import Input from "../components/Input"

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
// event.preventDefault();

// await axios.post(`http://localhost:3002/api/login/${email}/${password}`, {
//   email: email,
//   password: password,
// })
//   .then((response) => {
//     console.log(response);
//     console.log("OK")
//     navigate("/");
//   })
//   .catch((error) => {
//     console.log(error);
//     console.log("Login NOT OK")
//     setError(true);
//   });
//   };

//   return (
//     <div className="py-5 container">
//       <PinterestLogo height="50" width="50" className="mb-3" viewBox="0 0 16 16" />
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <Input useState={[email, setEmail]} inputType="email" inputId="email" inputPlaceholder="Email" key="login_email" required />
//         <Input useState={[password, setPassword]} inputType="password" inputId="password" inputPlaceholder="Password" key="login_password" required />
//         {error && <Message messageID="loginHelpBlock" content="Invalid email or password combination." />}
//         <button type="submit" className="btn btn-primary">
//           Log In
//         </button>
//       </form>

//       <p className="form-text">
//         <Link to="/forgot-password">Forgot Password?</Link>
//       </p>
//       <p className="form-text">
//         Don't have an account? <Link to="/signup">Sign Up</Link>
//       </p>
//     </div>
//   );
// };

import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
});

function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission

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
        });
      console.log(values);
    },
  });
  const navigate = useNavigate();
  const email = formik.values.email;
  const password = formik.values.password;
  const setEmail = formik.handleChange;
  const setPassword = formik.handleChange;

  return (
    <div className="py-5 container">
      <Logo />
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <Input
          useState={[email, setEmail]}
          inputType="email"
          inputId="email"
          inputPlaceholder="Email"
          key="login_email"
          required
        />
        {formik.touched.email && formik.errors.email && (
          <div className="my-2" style={{ color: "red" }}>{formik.errors.email}</div>
        )}

        <Input
          useState={[password, setPassword]}
          inputType="password"
          inputId="password"
          inputPlaceholder="Password"
          key="login_password"
          required
        />
        {formik.touched.password && formik.errors.password && (
          <div className="my-2" style={{ color: "red" }}>{formik.errors.password}</div>
        )}

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
