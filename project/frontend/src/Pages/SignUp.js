import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../config";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSignIn, useAuthUser } from 'react-auth-kit';


import Input from "../components/Input";
import Logo from "../Logo/Logo";
import Footer from "../components/Footer";


const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
});

function SignUp() {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSignUp = async (values) => {
    await axios.post(`${BACKEND_URL}/api/user`, {
      username: values.username,
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        console.log("SignUp OK");
        if (signIn({
          token: res.data.token,
          expiresIn: res.data.expiresIn,
          tokenType: "Bearer",
          authState: res.data.authUserState,
        })) {
          console.log("SignUp Auth OK");
          navigate('/');
        } else {
          console.log("SignUp Auth NOT OK");
        }
      })
      .catch((err) => {
        // Handle signup or login error, e.g., display error message
        console.log("SignUp Not OK");
        console.log(err);
      });
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSignUp
  });

  return (
    <div className="py-5 container">
      <Logo />
      <h1 className="h3 mb-3 fw-normal">Signup</h1>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Input
          useState={[formik.values.username, formik.handleChange]}
          inputType="text"
          inputId="username"
          inputPlaceholder="Username"
          key="sign_up_username"
          required
        />
        {formik.touched.username && formik.errors.username && (
          <div className="my-2" style={{ color: "red" }}>{formik.errors.username}</div>
        )}

        <Input
          useState={[formik.values.email, formik.handleChange]}
          inputType="email"
          inputId="email"
          inputPlaceholder="Email"
          key="sign_up_email"
          required
        />

        {formik.touched.email && formik.errors.email && (
          <div className="my-2" style={{ color: "red" }}>{formik.errors.email}</div>
        )
        }

        <Input
          useState={[formik.values.password, formik.handleChange]}
          inputType="password"
          inputId="password"
          inputPlaceholder="Password"
          key="sign_up_password"
          required
        />
        {
          formik.touched.password && formik.errors.password && (
            <div className="my-2" style={{ color: "red" }} >{formik.errors.password}</div>
          )
        }

        <button type="submit" className="btn btn-primary my-3">Sign Up</button>
      </form>
      <p className="form-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <Footer />
    </div>
  )
}

export default SignUp;

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Perform signup logic here, such as sending the data to an API endpoint
//     console.log("Signup form submitted", email, password);


//     await axios.post('http://localhost:3002/api/user', { email: email, username: username, password: password })
//       .then(res => {
//         console.log(res);
//         console.log("SignUp OK");
//         navigate("/");
//       }).catch(err => {
//         console.log(err);
//         console.log("SignUp NOT OK");
//         setError(true);
//       });
//   };


//   return (
// <div className="py-5 container">
//   <PinterestLogo height="50" width="50" className="mb-3" viewBox="0 0 16 16" />
//   <h1 className="h3 mb-3 fw-normal">Signup</h1>
//   <form onSubmit={handleSubmit} noValidate>
//     <Input useState={[username, setUsername]} inputType="text" inputId="username" inputPlaceholder="Username" key="sign_up_username" required />
//     {/* {error && <Message messageID="usernameHelpBlock" content="Invalid username." />} */}

//     <Input useState={[email, setEmail]} inputType="email" inputId="email" inputPlaceholder="Email" key="sign_up_email" required />
//     {/* {error && <Message messageID="emailHelpBlock" content="Invalid email." />} */}

//     <Input useState={[password, setPassword]} inputType="password" inputId="password" inputPlaceholder="Password" key="sign_up_password" required />
//     {/* {error && <Message
//       messageID="passwordHelpBlock"
//       content="Your password must be 8-20 characters long, contain letters and numbers, 
//       and must not contain spaces, special characters, or emoji."
//     />} */}
//     {error && <Message messageID="signUpError" content="Invalid username, email and password combination." />}
//     <button type="submit" className="btn btn-primary my-3">Sign Up</button>
//   </form>
//   <p className="form-text">
//     Already have an account? <Link to="/login">Login</Link>
//   </p>
//   <Footer />
// </div>
//   );
// };