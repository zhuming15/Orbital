import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import axios from 'axios';

import NavBar from '../components/NavBar';
import Post from '../components/Post/Post';
import BACKEND_URL from '../config';

function UserProfile() {
  const auth = useAuthUser();
  const username = auth().username;
  const [profilePictur, setProfile] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [bio, setBio] = useState(null);
  const [postNumber, setPostNumber] = useState(0);
  const [followerNumber, setFollowerNumber] = useState(0);
  const [followingNumber, setFollowingNumber] = useState(0);
  const [posts, setPosts] = useState([]);


  // const { profilePictur, bio, name, username, postNumber, followerNumber, followingNumber } = 
  const fetchFollowerNumber = async () => await axios(`${BACKEND_URL}/api/following /${username}`, {
    username: username
  })
    .then((res) => {
      console.log(res);
      console.log("Fetch Following Number OK");
      setFollowingNumber(res);
    })
    .catch(err => {
      console.log(err);
      console.log("Fetch Following Number NOT OK");
    })

  const fetchFollowingNumber = async () => await axios(`${BACKEND_URL}/api/follower/${username}`, {
    username: username
  })
    .then((res) => {
      console.log(res);
      console.log("Fetch Follower Number OK");
      setFollowerNumber(res);
    })
    .catch(err => {
      console.log(err);
      console.log("Fetch Follower Number NOT OK");
    })

  const fetchProfilePic = async () => await axios(`${BACKEND_URL}/api/profile-picture/${username}`, {
    username: username
  })
    .then((res) => {
      console.log(res);
      console.log("Fetch Profile Pic OK");
      setProfile(res);
    })
    .catch(err => {
      console.log(err);
      console.log("Fetch Profile Pic NOT OK");
    })

  const fetchPosts = async () => await axios(`${BACKEND_URL}/api/post/${username}`, {
    username: username,
  })
    .then((res) => {
      console.log(res);
      console.log("Fetch Post OK");
      setPostNumber(res);
    })
    .catch(err => {
      console.log(err);
      console.log("Fetch Post NOT OK");
    })

  useEffect(() => {
    fetchFollowerNumber();
    fetchFollowingNumber();
    fetchProfilePic();
    fetchPosts();
    setPostNumber(posts.length);
  }, []);

  const follow = async () => {
    if (isFollowed) {
      setFollowerNumber(followerNumber - 1);
    } else {
      setFollowerNumber(followerNumber + 1);
    }
    setIsFollowed(!isFollowed);
    await axios.post(`${BACKEND_URL}/api/follow/${username}`, {
      username: username,
    })
      .then((res) => {
        console.log(res);
        console.log("Follow OK");
      })
      .catch(err => {
        console.log(err);
        console.log("Follow NOT OK");
      })
  }


  return (
    <div className="gradient-custom-2">
      <NavBar />
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src={profilePictur || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  <MDBBtn onClick={follow} outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                    {isFollowed ? "Unfollow" : "Follow"}
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{username || "@Andy_"}</MDBTypography>
                  {/* <MDBCardText>{name || "Andy"}</MDBCardText> */}
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">{2 || postNumber}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{99 || followingNumber}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{followerNumber}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Follower</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">{bio || "Hello World"}</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
                <div className="d-flex flex-column">
                  {posts.map((post) => { <Post picture={post.pic} title={post.title} postID={post.id} /> })}
                  <Post />
                  <Post />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default UserProfile;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import NavigationBar from "../components/NavBar";
// import Posts from "../components/Posts";

// function UserProfile(props) {
//   const [posts, setPosts] = useState([]);
//   const [username, setUsername] = useState("test"); //Problem: username is hardcoded
//   const [profile, setProfile] = useState([]);
//   const [followingNumber, setFollowingNumber] = useState(0);
//   const [followerNumber, setFollowerNumber] = useState(0);

//   // Fetch data from the backend API
//   useEffect(() => { 
//     fetchPosts()
//     fetchProfilePic();
//     fetchFollowingNumber();
//     fetchFollowerNumber();
//   }, []);

//   const fetchFollowerNumber = async () => {
//     await axios.get(`http://localhost:3002//api/follower/${username}`, {
//       username: username
//     })
//       .then((res) => {
//         console.log(res);
//         console.log("Fetch Follower Number OK");
//         setFollowerNumber(res);
//       })
//       .catch(err => {
//         console.log(err);
//         console.log("Fetch Follower Number NOT OK");
//       })
//   };

//   const fetchFollowingNumber = async () => {
//     await axios.get(`http://localhost:3002//api/following/${username}`, {
//       username: username
//     })
//       .then((res) => {
//         console.log(res);
//         console.log("Fetch Follow Number OK");
//         setFollowingNumber(res);
//       })
//       .catch(err => {
//         console.log(err);
//         console.log("Fetch Follow Number NOT OK");
//       })
//   };


//   const fetchProfilePic = async () => {
//     await axios.get(`http://localhost:3002/api/profile-picture/${username}`, {
//       username: username
//     })
//       .then((res) => {
//         console.log(res);
//         console.log("Fetch Profile Pic OK");
//         setProfile(res);
//       })
//       .catch(err => {
//         console.log(err);
//         console.log("Fetch Profile Pic NOT OK");
//       })
//   };

//   const fetchPosts = async () => {
//     await axios.get(`http://localhost:3002/api/post/${username}`, {
//       username: username,
//     })
//       .then((res) => {
//         console.log(res);
//         console.log("Fetch Post OK");
//         setPosts(res.posts);
//         // setProfile(res.profileDetails);
//       })
//       .catch(err => {
//         console.log(err);
//         console.log("Fetch Post NOT OK");
//       })
//   };
// };


//  <MDBRow>
//                   <MDBCol className="mb-2">
//                     <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
//                       alt="image 1" className="w-100 rounded-3" />
//                   </MDBCol>
//                 </MDBRow>
//                 <MDBRow className="g-2">
//                   <MDBCol className="mb-2">
//                     <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
//                       alt="image 1" className="w-100 rounded-3" />
//                   </MDBCol>
//                   <MDBCol className="mb-2">
//                     <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
//                       alt="image 1" className="w-100 rounded-3" />
//                   </MDBCol>
//                 </MDBRow>