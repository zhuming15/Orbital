import React from "react";

const Posts = ({ title, content, author }) => {
  return (
    <div className="post">
      <div className="col">
        <div className="card shadow-sm">
          <svg
            className="bd-placeholder-img card-img-top"
            width="100%"
            height="225"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: Thumbnail"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#55595c"></rect>
            <image href={require("../Asset/image.jpg")} width="100%" height= "100%" />
          </svg>
          <div className="card-body">
            <p className="card-text">beautiful picture</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Like
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Share
                </button>
              </div>
              <small className="text-body-secondary">0 mins</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
