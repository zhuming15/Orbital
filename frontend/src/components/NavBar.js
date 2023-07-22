import React, { useState } from "react";
import NavBarLogo from "../Logo/NavBarLogo";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import { useSignOut } from 'react-auth-kit';

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
  const [showBasic, setShowBasic] = useState(false);
  const signOut = useSignOut();

  return (
    <div className="sticky-top">
      <MDBContainer className="my-2">
        <MDBNavbar className="d-flex justify-content-between" expand='lg' light bgColor='light'>
          <MDBContainer fluid>
            {/* <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"> */}
            <MDBNavbarBrand href="/">
              <NavBarLogo />
            </MDBNavbarBrand>
            {/* </Link> */}

            <MDBNavbarToggler
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setShowBasic(!showBasic)}
            >
              <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showBasic}>
              <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current='page' href='/create'>
                    <MDBBtn className="btn btn-dark btn-rounded">
                      <i className="far fa-square-plus me-2"></i>
                      Create
                    </MDBBtn>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem className="mr-auto col-lg-9 my-2">
                  <form className="mb-lg-0" role="search">
                    <input type="search" className="form-control  py-2" placeholder="Search..." aria-label="Search" />
                  </form>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <div className="col-lg-auto dropdown text-end">
                    <Link to="profile" className="nav-link link-body-emphasis text-decoration-none dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" || profilePic}
                        alt="profile-pic" width="40" height="40" className="rounded-circle" />
                    </Link>
                    <ul className="dropdown-menu text-small">
                      <li><Link className="dropdown-item" to="/settings"><MDBIcon fas icon="cog me-2" />Setting</Link></li>
                      <li><Link className="dropdown-item" to="/profile"><MDBIcon fas icon="user-circle me-2" />Profile</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/login" onClick={signOut}><MDBIcon fas icon="sign-out-alt me-2" />Log out</Link></li>
                    </ul>
                  </div>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </MDBContainer>
    </div>
  )
}

export default NavBar;

{/* <div className="py-3 container sticky-top" style={{ backgroundColor: "white" }}>
  <div className="d-flex flex-row flex-wrap align-items-center justify-content-between">
    <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
      <NavBarLogo />
    </Link>

    <ul className="nav justify-content-center mb-md-0">
      <li>
        <Link to="/create" className="nav-link link-body-emphasis text-decoration-none">
          <MDBBtn className="btn btn-dark btn-rounded">
            <i class="far fa-square-plus fa-1x me-2"></i>
            Create
          </MDBBtn>
        </Link>
      </li>
    </ul>

    <form className="col-8 mb-3 mb-lg-0" role="search">
      <input type="search" className="form-control py-2" placeholder="Search..." aria-label="Search" />
    </form>

    <div className="col-lg-auto dropdown text-end">
      <Link to="profile" className="nav-link link-body-emphasis text-decoration-none dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img src={"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" || profilePic}
          alt="profile-pic" width="40" height="40" className="rounded-circle" />
      </Link>
      <ul className="dropdown-menu text-small">
        <li><Link className="dropdown-item" to="/settings"><MDBIcon fas icon="cog me-2" />Setting</Link></li>
        <li><Link className="dropdown-item" to="/profile"><MDBIcon fas icon="user-circle me-2" />Profile</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><Link className="dropdown-item" to="/login"><MDBIcon fas icon="sign-out-alt me-2" />Log out</Link></li>
      </ul>
    </div>
  </div>
</div> */}