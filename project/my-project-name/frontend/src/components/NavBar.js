import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PinterestLogo from "./Logo/Pinterest";

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
  return (
    <div className="py-3 container">
      <div className="d-flex flex-row flex-wrap align-items-center justify-content-between">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
          <PinterestLogo height="40" width="40" className="" viewBox="0 0 16 16" />
        </a>

        {/* <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" className="nav-link px-2 link-body-emphasis">Inventory</a></li>
          <li><a href="#" className="nav-link px-2 link-body-emphasis">Customers</a></li>
          <li><a href="#" className="nav-link px-2 link-body-emphasis">Products</a></li>
        </ul> */}

        <form className="col-8 mb-3 mb-lg-0" role="search">
          <input type="search" className="form-control py-2" placeholder="Search..." aria-label="Search" />
        </form>

        <div className="col-lg-auto dropdown text-end">
          <a href="#" className="link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="40" height="40" className="rounded-circle" />
          </a>
          <ul className="dropdown-menu text-small">
            <li><a className="dropdown-item" href="/settings">Setting</a></li>
            <li><a className="dropdown-item" href="/profile">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="/login">Log out</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar;
