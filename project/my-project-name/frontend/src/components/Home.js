import React, { useEffect, useState } from "react";
import NavigationBar from "./NavBar";
import Posts from "./Posts";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const username = "test"; //Problem: username is hardcoded

  // Fetch data from the backend API
  useEffect(() => {
    // Fetch data from the backend API
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/posts/${username}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  return (
    <div className="container">
      <NavigationBar />
      <h1>Welcome to the Pinterest Clone Home Page</h1>

      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {posts.map(post => (<Posts pic={post.img} caption={post.caption} time={post.time} />))}
        </div>
      </div>
    </div>
  );
};

export default Home;
