import React from "react";

function NotFound() {
  return (
    <div className="p-5 text-center bg-body-tertiary">
      <div className="container py-5">
        <h1 className="text-body-emphasis">Page not found!</h1>
        <p className="col-lg-8 mx-auto lead">
          Please try again later or contact us if the problem persists.
        </p>
      </div>
    </div>
  )
}

export default NotFound;
