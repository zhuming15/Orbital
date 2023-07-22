import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBContainer, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBIcon, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import NavBar from './NavBar';
import BACKEND_URL from '../config';

const EditPost = () => {
  const [postFocus, setPostFocus] = useState({});
  const { pic, caption, title } = postFocus;
  const { postID } = useParams();
  const [newContent, setNewContent] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newPicture, setNewPicture] = useState(null);
  const navigate = useNavigate();

  const fetchPostFocus = async () => {
    await axios.get(`${BACKEND_URL}/api/post/${postID}`)
      .then((response) => {
        console.log(response);
        console.log("Fetch Post Focus OK");
        setPostFocus(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("Fetch Post Focus NOT OK");
      });
  };

  useEffect(() => {
    // Fetch data from the backend API
    fetchPostFocus();
    console.log("Fetching post focus...");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('content', newContent);
      formData.append('caption', newCaption);
      if (newPicture) {
        formData.append('picture', newPicture);
      }

      await axios.put(`${BACKEND_URL}/api/post/${postID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Edit Post OK");
      navigate(`/posts/${postID}`);
    } catch (error) {
      console.log(error);
      console.log("Edit Post NOT OK");
      navigate("/");
    }
  };

  return (
    <div>
      <NavBar />
      <MDBContainer>
        <MDBCard className="shadow-5-strong rounded-7" style={{ maxWidth: '1250px' }}>
          <MDBRow className="g-0">
            <MDBCol md="4">
              <MDBCardImage src={pic} className="rounded-7" alt='...' fluid position="start" />
            </MDBCol>
            <MDBCol md="8">
              <MDBCardBody>
                <MDBCardTitle>Edit Post</MDBCardTitle>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">Caption</label>
                    <textarea
                      className="form-control"
                      id="content"
                      rows="5"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="caption" className="form-label">tag</label>
                    <input
                      type="text"
                      className="form-control"
                      id="caption"
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="picture" className="form-label">Change Picture</label>
                    <input
                      type="file"
                      className="form-control"
                      id="picture"
                      onChange={(e) => setNewPicture(e.target.files[0])}
                    />
                  </div>
                  <MDBBtn type="submit" className="me-2" outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                    <MDBIcon far icon="save me-2" />Save Changes
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default EditPost;