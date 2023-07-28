import React from "react";
import { useNavigate } from "react-router-dom";
import { MDBCardImage, MDBRipple, MDBCard } from "mdb-react-ui-kit";
import BACKEND_URL from "../../config";

function Post(props) {
  const { picture_name, caption, tags, datetime } = props.props;  
  const navigate = useNavigate();

  const handleClick = () => {
    // const state = {
    //   caption: caption,
    //   tags: tags,
    //   datetime: datetime
    // };
    // console.log(state);
    // perform focus logic
    return navigate(`/posts/${picture_name}`, { state: props.props });
    };

    return (
      <div onClick={handleClick}>
       <MDBRipple
         className='bg-image hover-overlay hover-shadow mb-2'
         rippleTag='div'
         rippleColor='light'
    
       >
         <MDBCard>
           <MDBCardImage src = { BACKEND_URL + "/image/" + picture_name }
             alt={"image-1" || picture_name} className="w-100 rounded-3" />
           <a href='#!'>
             <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
           </a>
         </MDBCard>
       </MDBRipple>
     </div>
     );
}

export default Post;
