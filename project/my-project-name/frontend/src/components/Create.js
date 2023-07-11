import React, { useState } from "react";
import NavigationBar from "./NavBar";
import Input from "./LoginSystem/Input"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
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

  return (
    <div className="container">
      <NavigationBar />
      <div className="container">
        <h2 className="h2 mb-3 fw-normal">Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="caption" className="form-label" >Caption</label>
            <textarea
              className="form-control"
              value={postContent}
              onChange={handleInputChange}
              placeholder="Write your post..."
              rows={4}
              id="caption"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="img" className="form-label" >Post</label>
            <input className="form-control" type="file" id="img" accept="image/*" onChange={handleImageUpload} />
          </div>
          <button type="submit" className="btn btn-primary my-3">Share</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
