import { React, useEffect } from 'react';
import '../../App.css';

export default function Sponsors() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  const photos = [
    {src: '/images/Sponsors/Gremot.png'},
    {src: '/images/Sponsors/Rajamane.png'},
    {src: '/images/Sponsors/BenderNew.png'},
    {src: '/images/Sponsors/magod.png'},
    {src: '/images/Sponsors/precesionForge.png'},
    {src: '/images/Sponsors/copperpilot.png'},
    {src: '/images/Sponsors/R3Automation.png'},
    {src: '/images/Sponsors/DSSolidworks.png'}
  ];
   
  const sponsorLogos = photos.map((element, index) => {return <img alt = "" src = {element.src} key = {index}/>});

  return (
    <div className = "sponsors">
      <h1>Sponsors</h1>
      <section className = "sponsorLogos">{sponsorLogos}</section>
    </div>
  );
}
