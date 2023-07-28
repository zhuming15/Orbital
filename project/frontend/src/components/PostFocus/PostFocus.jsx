import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MDBCol, MDBContainer, MDBRow, MDBCardTitle, MDBIcon, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

import NavBar from "../NavBar";
import BACKEND_URL from "../../config";
import { useAuthUser } from "react-auth-kit";


function PostFocus() {
  const [postFocus, setPostFocus] = useState({});
  const {caption, datetime, tags} = postFocus;
  const { postID } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const auth = useAuthUser();
  const username = auth().username;
  const navigate = useNavigate();

  const fetchPostFocus = async () => {
    await axios.get( BACKEND_URL + `/api/singlePost/${postID}`)
      .then((res) => {
        console.log(res);
        console.log("Fetch Post Focus OK");
        setPostFocus(res.data[0]);
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
  }, [postID]);

   const deletePost = async () => {
      let r = window.confirm("Are you sure you want to delete this post?");
      if (r === false) {
        return;
      }

      await axios.delete(BACKEND_URL + `/api/post/${postID}`, {
        postID: postID
      })
        .then((res) => {
          console.log(res);
          console.log("Delete Post OK");
          alert("Post deleted successfully");
          navigate("/");
        })
        .catch(err => {
          console.log(err);
          console.log("Delete Post NOT OK");
        })
    };

    const clickLike = async () => {
      if (isLiked) {
        await axios.delete(BACKEND_URL + `/api/like/${username}`, {
          pciture_name: postID
        })
          .then((res) => {
            console.log(res);
            console.log("Unlike OK");
            setIsLiked(false);
          })
          .catch(err => {
            console.log(err);
            console.log("Unlike NOT OK");
          })
      } else {
        await axios.post(BACKEND_URL + `/api/like/${username}`, {
          pciture_name: postID
        })
          .then((res) => {
            console.log(res);
            console.log("Like OK");
            setIsLiked(true);
          })
          .catch(err => {
            console.log(err);
            console.log("Like NOT OK");
          })
      }
    };

    const clickSave = async () => {
      setIsSaved(!isSaved);
    };

return (
    <div>
      <NavBar />
      <MDBContainer>
        <MDBCard className="shadow-5-strong rounded-7" style={{ maxWidth: '1250px' }}>
          <MDBRow className="g-0">
            <MDBCol md="4">
              <MDBCardImage src={ BACKEND_URL + "/image/" + postID} className="rounded-7" alt='...' fluid position="start" />
            </MDBCol>
            <MDBCol md="8">
              <MDBCardBody>
                <MDBCardText>
                  {caption}
                </MDBCardText>
                <MDBCardText>
                  {tags}
                </MDBCardText>
                <MDBCardText>
                  {datetime}
                </MDBCardText>
                <MDBCardText>
                  <small className='text-muted'>{datetime}</small>
                </MDBCardText>
                  <MDBBtn className="me-2" outline color="dark" style={{ height: '36px', overflow: 'visible' }} onClick={clickLike}>
                  {isLiked ? <MDBIcon fas icon="heart me-2" /> : <MDBIcon far icon="heart me-2" />}Like
                </MDBBtn>
                <MDBBtn className="me-2" outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                  <MDBIcon far icon="edit me-2" />Edit
                </MDBBtn>
                <MDBBtn className="me-2" outline color="dark" style={{ height: '36px', overflow: 'visible' }} onClick={deletePost}>
                  <MDBIcon far icon="trash-alt me-2" />Delete
                </MDBBtn>
                <MDBBtn className="me-2" outline color="dark" style={{ height: '36px', overflow: 'visible' }} onClick={clickSave}>
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
