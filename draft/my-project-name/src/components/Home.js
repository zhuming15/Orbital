import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";

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
      <h1>Welcome to the Home Page</h1>
      <p>You can add your own content and components here.</p>

      <h2>Posts:</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
