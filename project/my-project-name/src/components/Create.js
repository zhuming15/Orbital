import React, { useState } from "react";
import NavigationBar from "./NavigationBar";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can implement the logic to submit the post content
    // and the image file to your backend or perform any other actions as needed
    console.log("Post content:", postContent);
    console.log("Image file:", imageFile);
    setPostContent(""); // Clear the input field after submission
    setImageFile(null); // Clear the selected image file
  };

  return (
    <div className="create-post">
      <NavigationBar />
      <div className="container">
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <textarea
              value={postContent}
              onChange={handleInputChange}
              placeholder="Write your post..."
              rows={4}
            ></textarea>
          </div>
          <div className="container">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <button type="submit">Share</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
