import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MDBCol, MDBContainer, MDBRow, MDBCardTitle, MDBIcon, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { useAuthUser } from "react-auth-kit";

import NavBar from "../NavBar";
import BACKEND_URL from "../../config";



function PostFocus() {
  const [postFocus, setPostFocus] = useState({});
  const { pic, caption, picture_name, datetime } = postFocus;
  const { postID } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const auth = useAuthUser();
  const username = auth().username;
  const navigate = useNavigate();

  const fetchPostFocus = async () => {
    await axios.get(`${BACKEND_URL}/api/post/${username}/${picture_name}`)
      .then((res) => {
        console.log(res);
        console.log("Fetch Post Focus OK");
        setPostFocus(res);
      })
      .catch(err => {
        console.log(err);
        console.log("Fetch Post Focus NOT OK");
      })
  };

  useEffect(() => {
    // Fetch data from the backend API
    fetchPostFocus();
    console.log("Fetching post focus...");
  }, []);

  const like = async () => {
    setIsLiked(!isLiked);
    await axios.post(`${BACKEND_URL}/api/like/${username}`, {
      picture_name: postID,
      username: username
    })
      .then((res) => {
        console.log(res);
        console.log("Like OK");
      })
      .catch(err => {
        console.log(err);
        console.log("Like NOT OK");
      })
  };

  const edit = () => {
    console.log("Edit OK");
    navigate(`/edit/${postID}`);
  };

  const deletePost = async () => {
    await axios.delete(`${BACKEND_URL}/api/post/${username}`, {
      picture_name: postID,
      username: username
    })
      .then((res) => {
        console.log(res);
        console.log("Delete OK");
        let r = window.confirm("Are you sure you want to delete this post?");
        if (r == true) {
          navigate("/");
        } else {
          navigate(`/posts/${postID}`);
        }
      })
      .catch(err => {
        console.log(err);
        console.log("Delete NOT OK");
        let r = window.confirm("Are you sure you want to delete this post?");
        if (r == true) {
          navigate("/");
        } else {
          navigate(`/posts/${postID}`);
        }
      })
  };

  const save = async () => {
    setIsSaved(!isSaved);
  }


  return (
    <div>
      <NavBar />
      <MDBContainer>
        <MDBCard className="shadow-5-strong rounded-7" style={{ maxWidth: '1250px' }}>
          <MDBRow className="g-0">
            <MDBCol md="4">
              <MDBCardImage src={'https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp' || pic} className="rounded-7" alt='...' fluid position="start" />
            </MDBCol>
            <MDBCol md="8">
              <MDBCardBody>
                {/* <MDBCardTitle>{"picture_name" || picture_name}</MDBCardTitle> */}
                <MDBCardText>
                  {"content and caption" || caption}
                </MDBCardText>
                <MDBCardText>
                  <small className='text-muted'>Last updated {datetime}</small>
                </MDBCardText>
                <MDBBtn onClick={like} className="me-2" outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                  {isLiked ? <MDBIcon fas icon="heart me-2" /> : <MDBIcon far icon="heart me-2" />}Like
                </MDBBtn>
                <MDBBtn onClick={edit} className="me-2" outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                  <MDBIcon far icon="edit me-2" />Edit
                </MDBBtn>
                <MDBBtn onClick={deletePost} className="me-2" outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                  <MDBIcon far icon="trash-alt me-2" />Delete
                </MDBBtn>
                <MDBBtn onClick={save} className="me-2" outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                  {isSaved ? <MDBIcon fas icon="star me-2" /> : <MDBIcon far icon="star me-2" />}Save
                </MDBBtn>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  )
}

export default PostFocus;