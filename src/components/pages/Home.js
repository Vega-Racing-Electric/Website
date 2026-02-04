import React from 'react';
import '../../App.css';
import Carousel from '../Carousel';
import { CarouselData } from '../CarouselData';
import { useEffect } from 'react'

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
    <>
      <Carousel slides = {CarouselData} />
      <div className = "about">
        <div className = "about-container">
            <div className = 'img-content left'>
                <img className = 'img-inside-wrapper' src = 'images/Logo-Big.jpg' alt = ""/>
            </div>
            <div className = "txt-content right">
              <h1>About VRE</h1>
              <p>
              We are an electric racing team under EV club of PES University. With the rising popularity of electric vehicles, we felt a need for a team focusing on promoting electric vehicles and its future in automobiles. Vega, formed in 2017, aims in designing and building 4 wheeled, formula one style open cockpit electric vehicles. Each year, we build award winning, fully electric race cars that aim to push the envelope, bringing together PES’s brightest students in the process.
              </p>
            </div>
        </div>
        <div className = "about-container">
            <div className = "txt-content left">
              <h1>Research</h1>
              <p >
              We at VRE are strongly focused on research as a means of actively contributing to the industry and honing our own technical skills. Team members have undertaken projects in topics including, but not limited to:
              </p>
              <ul>
                <li>BLDC Motor Controller Design</li>
                <li>Thermal Analysis of Motor Controllers</li>
                <li>Vision Based Depth Perceptions for Autonomy</li>
                <li>Electrical Actuation of Steering</li>
                <li>Path Planning with CNNs and DQNs</li>
              </ul>
            </div>
            <div className = 'img-content right'>
                <img className = 'img-inside-wrapper' id = 'research' src = 'images/Research3.png' alt = ""/>
            </div>
        </div>
      </div>
    </>
  );
}
export default Home;