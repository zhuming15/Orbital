import axios from "axios";
import React, { useParams, useState, useEffect } from "react";
import User from "../components/User";
import Post from "../components/Post/Post";
import NavBar from "../components/NavBar";
import BACKEND_URL from "../config";

function Search() {
  const searchKeyWord = useParams();
  const [postResult, setPostResult] = useState([]);
  const [userResult, setUserResult] = useState([]);

  const fecthPost = async (e) => {
    await axios.get(`${BACKEND_URL}/api/search/${searchKeyWord}`)
      .then((res) => {
        console.log('Fetch search result OK');
        setPostResult(res);
      })
      .catch((err) => {
        console.log("Fetch search result NOT OK");
        console.log(err);
      })
  }

  // const fecthUser = async (e) => {
  //   await axios.get()
  //   .then((res) => {
  //     console.log("Fetch User OK");
  //     setUserResult(res);
  //   })
  //   .catch((err) => {
  //     console.log("Fetch User result NOT OK");
  //     console.log(err);
  //   })
  // }

  useEffect(() => {
    fecthPost();
  }, []);

  return (
    <div>
      <NavBar />
      {postResult.map((post) => { <Post picture={post.pic} title={post.title} postID={post.id} /> })}
      {userResult.map((user) => { <User username={user.username} profilePicture={user.profilePicture} /> })}
    </div>
  )
}

export default Search;