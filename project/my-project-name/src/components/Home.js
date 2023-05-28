import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import Posts from "./Posts";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Fetch data from the backend API
  useEffect(() => {
    // Fetch data from the backend API
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/posts/");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <h1>Welcome to the Pinterest Clone Home Page</h1>

      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Home;
