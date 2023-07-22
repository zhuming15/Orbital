import React, { useState } from 'react';

function Input(props) {
  const [input, setInput] = props.useState;
  const inputType = props.inputType;
  const inputId = props.inputId;
  const inputPlaceholder = props.inputPlaceholder;
  return (
    <div className="mb-3">
      <label htmlFor={inputId} className="form-label" >{inputPlaceholder}</label>
      <input
        className="form-control"
        type={inputType}
        id={inputId}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  )
}

export default Input;