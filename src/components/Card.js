import React from 'react';
import "../App.css";

function Card(props) {
  return (
    <>
      <li className = 'card'>
        <div className = 'card-link'>
          <a href = {props.path} target = '_blank' rel = "noreferrer">
          <figure className = 'card-pic-wrap' data-category = {props.label}>
            <img
              className = 'card-img'
              alt = ''
              src = {props.src}
            />            
          </figure>
          </a>
          <div className = 'card-info'>
          {props.profile && <a href = {props.profileLink} target = '_blank' rel = "noreferrer"><img className = 'medium-profile' src = {props.profile} alt = ''/></a>}
            <h5 className = 'card-heading'>{props.heading}</h5>
            <p className = 'card-text'>{props.text}</p>
            <a href = {props.path} target = '_blank' rel = "noreferrer"><footer className = 'card_footer'>{props.footer}</footer></a>
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;
