import React from 'react';
import './../App.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test', 'btn--outline-full-width'];

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
  id,
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  to
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  if(to) {
    return (
      <Link to = {to} className = 'btn-mobile'> 
        <button id = {id} className = {`btn ${checkButtonStyle} ${checkButtonSize}`} onClick = {onClick} type = {type}> 
          {children} 
        </button> 
      </Link>
    );
  }  
  else return (
    <span className = 'btn-mobile'> 
      <button id = {id} className = {`btn ${checkButtonStyle} ${checkButtonSize}`} onClick = {onClick} type = {type}> 
        {children} 
      </button> 
    </span>
  ); 
};
