import { Routes, Route } from "react-router-dom";

import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ForgotPassword from "./Pages/ForgotPassword";
import NotFound from "./Pages/NotFound";
import Posts from "./components/Post/Post";
import UserProfile from "./Pages/UserProfile";
import Setting from "./Pages/Setting";
import About from "./Pages/About";
import Help from "./Pages/Help";
import Create from "./components/Create/Create";
import PostFocus from "./components/PostFocus/PostFocus";

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/posts/:postID" element={<PostFocus />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/settings" element={<Setting />}>
          {/* <Route path="/settings/edit-profile" element={<Setting />} />
          <Route path="/settings/change-password" element={<Setting />} />
          <Route path="/settings/change-email" element={<Setting />} />
          <Route path="/settings/delete-account" element={<Setting />} /> */}
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
};

export default App;
