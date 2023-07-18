import React, { useState } from "react";
import NavBarLogo from "../Logo/NavBarLogo";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

// const NavBar = () => {
//   const navigate = useNavigate();

//   const handleBackToHome = () => {
//     navigate("/");
//   };

//   return (
//     <nav>
//       <div className="logo">
//         <button className="logo-button" onClick={handleBackToHome}>
//           <PinterestLogo height="25" width="25" className="mb-3" viewBox="0 0 16 16" />
//         </button>
//       </div>
//       <div className="nav-bar-links">
//         <Link to="/profile">Profile</Link>
//       </div>
//       <div className="nav-bar-links">
//         <Link to="/settings">Settings</Link>
//       </div>
//       <div className="nav-bar-links">
//         <Link to="/create">Create Your Post</Link>
//       </div>
//       <div className="search-bar">
//         <input type="text" placeholder="Search" />
//         <button type="submit">Search</button>
//       </div>
//     </nav>
//   );
// };

function NavBar() {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("../Asset/image.jpg");
  return (
    <div className="py-3 container">
      <div className="d-flex flex-row flex-wrap align-items-center justify-content-between">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
          <NavBarLogo />
        </a>

        <ul className="nav justify-content-center mb-md-0">
          <li>
            <a href="create">
              <MDBBtn className="btn btn-dark btn-rounded">
                <i class="far fa-square-plus fa-1x me-2"></i>
                Create
              </MDBBtn>
            </a>
          </li>
        </ul>

        <form className="col-8 mb-3 mb-lg-0" role="search">
          <input type="search" className="form-control py-2" placeholder="Search..." aria-label="Search" />
        </form>

        <div className="col-lg-auto dropdown text-end">
          <a href="profile" className="nav-link link-body-emphasis text-decoration-none dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" || profilePic}
              alt="profile-pic" width="40" height="40" className="rounded-circle" />
          </a>
          <ul className="dropdown-menu text-small">
            <li><a className="dropdown-item" href="/settings"><MDBIcon fas icon="cog me-2" />Setting</a></li>
            <li><a className="dropdown-item" href="/profile"><MDBIcon fas icon="user-circle me-2" />Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="/login"><MDBIcon fas icon="sign-out-alt me-2" />Log out</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar;
