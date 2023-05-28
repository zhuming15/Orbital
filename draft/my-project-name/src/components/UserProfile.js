import React from "react";
import NavigationBar from "./NavigationBar";

const UserProfile = ({ username, profilePicture, bio, followerCount }) => {
  const posts = [
    {
      id: 1,
      title: "Post Title 1",
      image: "scr/Asset/image.jpg",
      likes: 10,
      comments: 5,
    },
    {
      id: 2,
      title: "Post Title 2",
      image: "../Asset/image.jpg",
      likes: 20,
      comments: 8,
    },
    // Add more post objects as needed
  ];

  return (
    <div>
      <NavigationBar />
      <div className="my-container">
        <h2>User Profile: {username}</h2>

        <div className="user-profile">
          <div className="profile-details">
            <img
              src={profilePicture}
              alt={username}
              className="profile-picture"
            />
            <p className="bio">{bio}</p>
            <p className="follower-count">Followers: {followerCount}</p>
          </div>

          <h3>Posts</h3>
          <div className="post-container">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <img
                  src="../scr/Asset/image.jpg"
                  alt={post.title}
                  className="post-image"
                />
                <div className="post-details">
                  <p className="post-title">{post.title}</p>
                  <div className="post-interactions">
                    <span className="post-likes">{post.likes} Likes</span>
                    <span className="post-comments">
                      {post.comments} Comments
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
