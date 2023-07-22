import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";

function User(props) {
  const { username, profilePicture } = props;
  return (
    <MDBContainer>
      <MDBCard style={{ maxWidth: '540px' }}>
        <MDBRow className='g-0'>
          <MDBCol md='4'>
            <MDBCardImage src={profilePicture || 'https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp'} alt='...' fluid />
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