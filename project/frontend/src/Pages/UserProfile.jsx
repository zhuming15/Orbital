import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { useNavigate, useParams } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import axios from 'axios';

import NavBar from '../components/NavBar';
import Post from '../components/Post/Post';
import BACKEND_URL from '../config';

function UserProfile() {
  const auth = useAuthUser();
  const username = auth().username;
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp");
  const [bio, setBio] = useState(null);
  const [postNumber, setPostNumber] = useState(0);
  const [followerNumber, setFollowerNumber] = useState(0);
  const [followingNumber, setFollowingNumber] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  let isSelf = false;

  const currentProfileUsername = useParams().username;

  if (currentProfileUsername === username) {
    isSelf = true;
  }

  const toggleFollow = async () => {
    setIsFollowing(!isFollowing);
    if (isFollowing) {
      setFollowerNumber(followerNumber - 1);
      await axios.post(`${BACKEND_URL}/api/follow/${username}/${currentProfileUsername}`, {})
        .then((res) => {
          console.log(res);
          console.log("Follow OK");
        })
        .catch(err => {
          console.log(err);
          console.log("Follow NOT OK");
        })
    } else {
      setFollowerNumber(followerNumber + 1);
      await axios.delete(`${BACKEND_URL}/api/follow/${username}/${currentProfileUsername}`, {})
        .then((res) => {
          console.log(res);
          console.log("Unfollow OK");
        })
        .catch(err => {
          console.log(err);
          console.log("Unfollow NOT OK");
        })
    }
  }

  // const { profilePicture, bio, name, username, postNumber, followerNumber, followingNumber } = 
  const fetchFollowingNumber = async () => await axios.get(`${BACKEND_URL}/api/following/${username}`)
    .then((res) => {
      console.log(res);
      console.log("Fetch Following Number OK");
      setFollowingNumber(res.data.number);
    })
    .catch(err => {
      console.log(err);
      console.log("Fetch Following Number NOT OK");
    })

  const fetchFollowerNumber = async () => await axios.get(`${BACKEND_URL}/api/follower/${currentProfileUsername}`)
    .then((res) => {
      console.log(res);
      console.log("Fetch Follower Number OK");
      setFollowerNumber(res.data.number);
    })
    .catch(err => {
      console.log(err);
      console.log("Fetch Follower Number NOT OK");
    })

  const fetchProfilePic = async () => await axios.get(`${BACKEND_URL}/api/profile-picture/${currentProfileUsername}`)
    .then((res) => {
      console.log(res);
      console.log("Fetch Profile Pic OK");
      setProfilePicture(BACKEND_URL + "/image/" + res.data[0].picture_name);
    })
    .catch(err => {
      console.log(err);
      console.log("Fetch Profile Pic NOT OK");
    })

  const fetchBio = async () => await axios.get(`${BACKEND_URL}/api/bio/${currentProfileUsername}`)
    .then((res) => {
      console.log(res);
      console.log("Fetch bio OK");
      setBio(res.data[0].bio);
    })
    .catch(err => {
      console.log(err);
      console.log("Fetch bio NOT OK");
    })

  const fetchPosts = async () => await axios.get(`${BACKEND_URL}/api/post/${currentProfileUsername}`)
    .then((res) => {
      console.log(res);
      console.log("Fetch Post OK");
      setPosts(res.data);
      setPostNumber(res.data.length);
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
      fetchBio();
    }, [currentProfileUsername]);



  return (
    <div className="gradient-custom-2">
      <NavBar />
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src={profilePicture}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  {isSelf ?
                    <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }} onClick={() => navigate("/settings")}>
                      Settings
                    </MDBBtn>
                    :
                    <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }} onClick={toggleFollow}>
                      {isFollowing ? "Following" : "Follow"}
                    </MDBBtn>
                  }
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{currentProfileUsername || "@Andy_"}</MDBTypography>
                  {/* <MDBCardText>{name || "Andy"}</MDBCardText> */}
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">{postNumber}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{followingNumber}</MDBCardText>
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
                  {posts.map((post) => (<Post props={post} />))}
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