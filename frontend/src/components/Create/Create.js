import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MDBCol, MDBContainer, MDBRow, MDBInput, MDBCard, MDBIcon, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { useDropzone } from 'react-dropzone';

import NavBar from "../NavBar";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [tag, setTag] = useState("");
  const navigate = useNavigate();
  const username = "test1"; // hardcode

  const handleInputChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can implement the logic to submit the post content
    // and the image file to your backend or perform any other actions as needed
    await axios.post(`http://localhost:3002/api/post/${username}`, {
      username: username,
      image: imageFile,
      caption: postContent
    })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch(err => {
        console.log(err);
        alert("Fail to create Post");
      })
    setPostContent(""); // Clear the input field after submission
    setImageFile(null); // Clear the selected image file
  };

  const [postTitle, setPostTitle] = useState(""); // [postTitle, setPostTitle
  const [files, setFiles] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const removeFile = (file) => {
    const updatedFiles = files.filter((f) => f !== file);
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  return (
    // <div className="container">
    //   <NavigationBar />
    //   <div className="container">
    //     <h2 className="h2 mb-3 fw-normal">Create Post</h2>
    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-3">
    //         <label htmlFor="caption" className="form-label" >Caption</label>
    //         <textarea
    //           className="form-control"
    //           value={postContent}
    //           onChange={handleInputChange}
    //           placeholder="Write your post..."
    //           rows={4}
    //           id="caption"
    //         ></textarea>
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="img" className="form-label" >Post</label>
    //         <input className="form-control" type="file" id="img" accept="image/*" onChange={handleImageUpload} />
    //       </div>
    //       <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
    //         Post
    //       </MDBBtn>
    //     </form>
    //   </div>
    // </div>

    <div>
      <NavBar />
      <MDBContainer className="shadow-5-strong rounded-7 py-5 px-5">
        <form onSubmit={handleFormSubmit}>
          <MDBRow className="align-items-center">
            <MDBCol className="h-100">
              <div>
                {files.length > 0 ? (
                  <div>
                    <h6>Uploaded Image:</h6>
                    <div className="image-container">
                      {files.map((file) => (
                        <div key={file.name} className="uploaded-image">
                          <img src={URL.createObjectURL(file)} alt={file.name} height="500" width="500" style={{ objectFit: "contain" }} />
                          <MDBIcon icon="times-circle" className="delete-icon ms-3" size="2x" onClick={() => removeFile(file)} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                    <input {...getInputProps()} />
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <MDBIcon fas icon="photo-video" size="3x" className="my-3" />
                      <p className="my-3">Drag and drop an image here, or click to select an image</p>
                    </div>
                  </div>)}
              </div>
            </MDBCol>
            <MDBCol>
              <MDBRow className="my-2">
                <MDBInput label="Title" type="text" id="title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
              </MDBRow>
              <MDBRow className="my-2">
                <MDBInput label="Caption" type="text" id="caption" value={postContent} onChange={(e) => setPostContent(e.target.value)} />
              </MDBRow>
              <MDBRow className="my-2">
                <MDBInput label="Tag" type="text" id="tag" value={tag} onChange={(e) => setTag(e.target.value)} />
              </MDBRow>

              <MDBBtn color="btn btn-dark" type="submit">
                Create Post
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    </div>
  );
};

export default CreatePost;
