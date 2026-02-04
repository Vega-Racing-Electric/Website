import React from 'react';
import '../../App.css';
import Card from '../Card';
import { useEffect } from 'react';

export default function Achievements() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  
  const FG = <>
    Runner Up in Formula Green Concept, 2021 <br/>
    2<sup>nd</sup> in Design Event <br/>
    3<sup>rd</sup> in Cost Event <br/>
    Best Team Captain - Raj Purohit
  </>;
  
  return (
    <>
      <div className = 'page'>
        <h1>Achievements</h1>
        <p>
          Here is a glimpse of our Achievements so far
        </p>
  
        <div className = 'cards-container'>
          <div className = 'cards-wrapper'>
            <ul className = 'cards'>
              <Card
                src = 'images/Achievements/FormulaGreen.jpg'
                heading = {FG}
                label = 'Formula Green Concept 2021 (Season 6)'
              />
                </ul>
                <ul className = 'cards'>
              <Card
                src = 'images/Achievements/FormulaBharatLogo.jpg'
                heading = 'Obtained 9th place in Formula Bharath, 2020'
                label = 'Formula Bharat 2020'
              />
              <Card
                src = 'images/Achievements/FormulaBharatLogo.jpg'
                heading = 'Obtained 6th place in FSEV concept challenge, 2019'
                label = 'Formula Bharat 2019'
              />
              <Card
                src = 'images/Achievements/FormulaImperial.png'
                heading = 'Obtained 15th place in Formula Imperial Hybrid Vehicle Challenge, 2018'
                label = 'Formula Imperial 2018'
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}