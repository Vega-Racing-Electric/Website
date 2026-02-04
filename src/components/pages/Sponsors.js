import { React, useEffect } from 'react';
import '../../App.css';

export default function Sponsors() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  const photos = [
    {src: '/images/Sponsors/Orion.jpg'},
    {src: '/images/Sponsors/3M.png'},
    {src: '/images/Sponsors/TE.png'},
    {src: '/images/Sponsors/Gremot.png'},
    {src: '/images/Sponsors/Rajamane.png'},
    {src: '/images/Sponsors/Sirius.jpg'},
    {src: '/images/Sponsors/Bender.jpg'},
    {src: '/images/Sponsors/Altair.png'}, 
    {src: '/images/Sponsors/WE.png'}
  ];
   
  const sponsorLogos = photos.map((element, index) => {return <img alt = "" src = {element.src} key = {index}/>});

  return (
    <div className = "sponsors">
      <h1>Sponsors</h1>
      <section className = "sponsorLogos">{sponsorLogos}</section>
    </div>
  );
}
