import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../components/User";
import Post from "../components/Post/Post";
import NavBar from "../components/NavBar";
import BACKEND_URL from "../config";
import { post } from "../components/User";

function Search() {
  const { searchKeyWord } = useParams();
  const [postResult, setPostResult] = useState([]);
  const [userResult, setUserResult] = useState([]);

  const fecthPost = async (e) => {
    await axios.get(`${BACKEND_URL}/api/search-post/${searchKeyWord}`)
      .then((res) => {
        console.log('Fetch search post result OK');
        setPostResult(res.data);
      })
      .catch((err) => {
        console.log("Fetch search post result NOT OK");
        console.log(err);
      })
  }

  const fecthUser = async (e) => {
    await axios.get(`${BACKEND_URL}/api/search-user/${searchKeyWord}`)
      .then((res) => {
        console.log(res);
        console.log('Fetch search user result OK');
        setUserResult(res.data);
      })
      .catch((err) => {
        console.log("Fetch search user result NOT OK");
        console.log(err);
      })
  }

  useEffect(() => {
    fecthPost();
    fecthUser();
  }, []);

  return (
    <div>
      <NavBar />
        <div className="container my-6 d-block">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {postResult.length === 0 && userResult.length === 0 && <h1>No result found</h1>}
      {postResult.map((post) => ( <Post title={post.picture_name} postID={post.picture_name} /> ))}
      {userResult.map((user) => ( <User username={user.username} /> ))}
      </div>
      </div>
    </div>
  )
}

export default Search;