import React from 'react';
import '../../App.css';
import Card from '../Card';
import { useEffect } from 'react';

export default function Achievements() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  
  const FG = <>
    Formula Bharat, 2025 <br/>
    1<sup>st</sup> in Bangalore <br/>
    3<sup>rd</sup> in South India <br/>
    15<sup>th</sup> in India <br/>
    The first-ever first-year team to successfully clear the Accumulator Technical Inspection in Formula Bharat.
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
                src = 'images/Achievements/FormulaBharatLogo.jpg'
                heading = {FG}
                label = 'Formula Bharat 2025'
              />
                </ul>
                <ul className = 'cards'>
              <Card
                src = 'images/Achievements/FormulaBharatLogo.jpg'
                heading = 'Obtained 4th place Overall, 2022'
                label = 'Formula Bharat 2022'
              />
              <Card
                src = 'images/Achievements/FormulaBharatLogo.jpg'
                heading = 'Runner up in Design Event and 3rd in Cost Event, 2021'
                label = 'Formula Green 2021'
              />
              <Card
                src = 'images/Achievements/FormulaBharatLogo.jpg'
                heading = 'Obtained 9th place in Formula Bharat, 2020'
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