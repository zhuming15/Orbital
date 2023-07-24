import React, { useState, useEffect } from "react";
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
import BACKEND_URL from "../config";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

function NavBar() {
  const auth = useAuthUser();
  const username = auth().username;
  const [profilePic, setProfilePic] = useState("https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp");
  const [showBasic, setShowBasic] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const signOut = useSignOut();
  const navigate = useNavigate();


  const handleSearch = (e) => {
    return navigate(`/search/${searchKeyWord}`);
  }

  const fetchProfilePicture = async () => {
    await axios.get(BACKEND_URL + `/api/profile-picture/${username}`)
      .then((res) => {
        console.log(res);
        console.log("Fetch Profile picture OK");
        setProfilePic(BACKEND_URL + "/image/" + res.data[0].picture_name);
      })
      .catch(err => {
        console.log(err);
        console.log("Fetch Profile picture NOT OK");
      })
  };

  useEffect(() => {
    fetchProfilePicture();
  }, []);

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
                  <form className="mb-lg-0" role="search" onSubmit={handleSearch}>
                    <input type="search" className="form-control py-2" value={searchKeyWord} onChange={(e) => {
                      setSearchKeyWord(e.target.value)
                    }} placeholder="Search..." aria-label="Search" />
                  </form>
                </MDBNavbarItem>
                  <MDBNavbarItem>
                  <div className="col-lg-auto dropdown text-end">
                    <Link to={`/profile/${username}`} className="nav-link link-body-emphasis text-decoration-none dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={profilePic}
                        alt="profile-pic" width="40" height="40" className="rounded-circle" />
                    </Link>
                    <ul className="dropdown-menu text-small">
                      <li><Link className="dropdown-item" to="/settings"><MDBIcon fas icon="cog me-2" />Setting</Link></li>
                      <li><Link className="dropdown-item" to={`/profile/${username}`}><MDBIcon fas icon="user-circle me-2" />Profile</Link></li>
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
