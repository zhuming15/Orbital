import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

// import Footer from "./Footer";
import NavigationBar from "../components/NavBar";
import Posts from "../components/Post/Post";
import Footer from "../components/Footer";

import BACKEND_URL from "../config";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const auth = useAuthUser();
  const username = auth().username;

  useEffect(() => {
    // Fetch data from the backend API
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    await axios.get(`${BACKEND_URL}/api/post/${username}`)
      .then((res) => {
        console.log(res);
        console.log("Fetch Post OK");
        setPosts(res);
      })
      .catch(err => {
        console.log(err);
        console.log("Fetch Post NOT OK");
      })
  };

  return (
    <div className="container">
      <NavigationBar />

      <div className="container my-6 d-block">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          {posts.map(post => (<Posts picture={post.img} title={post.title} postID={post.postID} />))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
