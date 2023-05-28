import React from "react";
import NavigationBar from "./NavigationBar";

const Posts = ({ title, content, author }) => {
  return (
    <div className="post">
      <NavigationBar />
      <h2>{title}</h2>
      <p>{content}</p>
      <p>Author: {author}</p>
    </div>
  );
};

export default Posts;
