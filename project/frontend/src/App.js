import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useIsAuthenticated, RequireAuth } from 'react-auth-kit';


import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ForgotPassword from "./Pages/ForgotPassword";
import NotFound from "./Pages/NotFound";
import Posts from "./components/Post/Post";
import Search from "./Pages/Search";
import UserProfile from "./Pages/UserProfile";
import Setting from "./Pages/Setting";
import About from "./Pages/About";
import Help from "./Pages/Help";
import Create from "./components/Create/Create";
import PostFocus from "./components/PostFocus/PostFocus";



const AuthWrapper = ({ element }) => {
  // Check if the user is authenticated using the auth object from react-auth-kit
  // For example, you can use the auth.isAuthenticated() function
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated()) {
    // Redirect unauthenticated users to the login page or any other appropriate action
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the element (component)
  return element;
};


const App = () => {


  return (
    <AuthProvider
      authType={'localstorage'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={
            <RequireAuth loginPath={'/login'}>
              <Home />
            </RequireAuth>}
          />
          <Route path="/posts/:postID" element={
            <RequireAuth loginPath={'/login'}>
              <PostFocus />
            </RequireAuth>}
          />
          <Route path="/profile" element={
            <RequireAuth loginPath={'/login'}>
              <UserProfile />
            </RequireAuth>}
          />
          <Route path="/*" element={<NotFound />} />
          <Route path="/settings" element={
            <RequireAuth loginPath={'/login'}>
              <Setting />
            </RequireAuth>}
          />
          <Route path="/search/:searchKeyWord" element={
            <RequireAuth loginPath={'login'}>
              <Search />
            </RequireAuth>}
          />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/create" element={
            <RequireAuth loginPath={'/login'}>
              <Create />
            </RequireAuth>}
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
