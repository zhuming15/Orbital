import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import axios from "axios";
import BACKEND_URL from "../config";
import { useNavigate } from "react-router-dom";

function User(props) {
  const [profilePicture, setProfilePicture] = useState('https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp');
  const { username } = props;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the backend API
    fetchProfilePicture();
    console.log("Fetching profile picture...");
  }, []);

  const fetchProfilePicture = async () => {
    await axios.get(`${BACKEND_URL}/api/profile-picture/${username}`)
      .then((res) => {
        console.log(res);
        console.log("Fetch Profile Pic OK");
        setProfilePicture(`${BACKEND_URL}/image/${res.data[0].picture_name}`);
      })
      .catch(err => {
        console.log(err);
        console.log("Fetch Profile Pic NOT OK");
      })
  };

  return (
    <MDBContainer className="my-2" onClick={() => navigate(`/profile/${username}`)}>
      <MDBCard style={{ maxWidth: '540px' }}>
        <MDBRow className='g-0'>
          <MDBCol md='4'>
            <MDBCardImage src={profilePicture} alt='...' fluid />
          </MDBCol>
          <MDBCol md='8'>
            <MDBCardBody>
              <MDBCardTitle>{username}</MDBCardTitle>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  )
}

export default User;