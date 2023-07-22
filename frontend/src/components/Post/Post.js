import React from "react";
import { useNavigate } from "react-router-dom";
import { MDBCardImage, MDBRipple, MDBCard } from "mdb-react-ui-kit";

function Post(props) {
  const { picture, picture_name, postID } = props
  const navigate = useNavigate();

  const handleClick = () => {
    // perform focus logic
    return navigate(`/posts/${postID}`);
  }

  return (
    <MDBRipple
      className='bg-image hover-overlay hover-shadow mb-2'
      rippleTag='div'
      rippleColor='light'
      onClick={handleClick}
    >
      <MDBCard>
        <MDBCardImage src={"https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp" || picture}
          alt={"image-1" || picture_name} className="w-100 rounded-3" />
        <a href='#!'>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
        </a>
      </MDBCard>
    </MDBRipple>
  );
}

// function Post(props) {
//   const handleClick = () => {
//     // perform focus logic
//   }

//   return (
//     <div className="post" onClick={handleClick}>
//       <div className="col">
//         <div className="card shadow-sm">
//           <svg
//             className="bd-placeholder-img card-img-top"
//             width="100%"
//             height="225"
//             xmlns="http://www.w3.org/2000/svg"
//             role="img"
//             aria-label="Placeholder: Thumbnail"
//             preserveAspectRatio="xMidYMid slice"
//             focusable="false"
//           >
//             <title>Placeholder</title>
//             <rect width="100%" height="100%" fill="#55595c"></rect>
//             <image href={props.pic} width="100%" height="100%" />
//           </svg>
//           <div className="card-body">
//             <p className="card-text">{props.caption}</p>
//             <div className="d-flex justify-content-between align-items-center">
//               <div className="btn-group">
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-secondary"
//                 >
//                   Like
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-secondary"
//                 >
//                   Share
//                 </button>
//               </div>
//               <small className="text-body-secondary">{props.time}</small>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Post;
