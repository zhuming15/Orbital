import React from 'react';

function Message(props) {
  return (
    <div id={props.messageID} className="my-3">
      {props.content}
    </div>
  )
}

export default Message;