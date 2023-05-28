import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import NotFound from "./components/NotFound";
import Posts from "./components/Posts";
import UserProfile from "./components/UserProfile.js";
import Setting from "./components/Setting.js";

import "./Style/home.css";
import "./Style/forgot-password.css";
import "./Style/login.css";
import "./Style/not-found.css";
import "./Style/signup.css";
import "./Style/user-profile.css";
import "./Style/nav-bar.css";
import "./Style/general.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </div>
  );
};

export default App;
