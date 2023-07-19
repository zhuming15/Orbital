import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MDBCol, MDBContainer, MDBRow, MDBCardTitle, MDBIcon, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

import NavBar from "../NavBar";


function PostFocus(props) {
  const { pic, caption, title } = props;
  return (
    <div>
      <NavBar />
      <MDBContainer>
        <MDBCard className="shadow-5-strong rounded-7" style={{ maxWidth: '1250px' }}>
          <MDBRow className="g-0">
            <MDBCol md="4">
              <MDBCardImage src={'https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp' || pic} className="rounded-7" alt='...' fluid position="start" />
            </MDBCol>
            <MDBCol md="8">
              <MDBCardBody>
                <MDBCardTitle>{"title" || title}</MDBCardTitle>
                <MDBCardText>
                  {"content and caption" || caption}
                </MDBCardText>
                <MDBCardText>
                  <small className='text-muted'>Last updated 3 mins ago</small>
                </MDBCardText>
                <MDBBtn className="me-2" outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                  <MDBIcon far icon="heart me-2" />Like
                </MDBBtn>
                <MDBBtn className="me-2" outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                  <MDBIcon far icon="edit me-2" />Edit
                </MDBBtn>
                <MDBBtn className="me-2" outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                  <MDBIcon far icon="trash-alt me-2" />Delete
                </MDBBtn>
                <MDBBtn className="me-2" outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                  <MDBIcon far icon="star me-2" />Save
                </MDBBtn>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  )
}

export default PostFocus;