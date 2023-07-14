import React, { useEffect, useState } from "react";
import NavigationBar from "./NavBar";
import Posts from "./Posts";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const username = "tests"; //Problem: username is hardcoded

  // Fetch data from the backend API
  useEffect(() => {
    // Fetch data from the backend API
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    await axios.get(`http://localhost:3002/api/post/${username}`)
      .then((res) => {
        console.log(res);
        console.log("Fetch Post OK");
        //setPosts(res);
      })
      .catch(err => {
        console.log(err);
        console.log("Fetch Post NOT OK");
      })
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
