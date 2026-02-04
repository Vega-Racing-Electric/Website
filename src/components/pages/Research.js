import React from 'react';
import '../../App.css';
import MediumEmbed from '../MediumEmbed';
import Allen_1 from '../../images/Allen-1.jpeg';
import Allen_2 from '../../images/Allen-2.jpeg';
import { useEffect } from 'react';

export default function Research() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
    <div className = "research">
      <div className = "research-container">
        <h1>  Development of Electro-Thermal Model for Field-Effect Transistor  </h1>
        <h4>- ALLEN DENNY, DHRUPAD VIJAY, AMARTYA S V, NEELKANTH KIRLOSKAR</h4>
        <div className = "research-info">
          <img src = {Allen_1}/>
          <img src = {Allen_2}/>
        </div>
        <p id = "caption">Temperature distribution plots on PCB for (a) 2 Components (b) 3 Components (c) 4 Components (d) 5 Components</p>
        <p>
          This project describes the transient thermal analysis of MOSFETs used in hybrid electric
          vehicles, and proposes a method to optimize the placement of these MOSFETs on the
          printed circuit board to reduce the heating of the MOSFETs so that its junction temperature
          does not exceed the prescribed limit during operation of the hybrid electric vehicle. The
          transient thermal analysis of the MOSFET is carried out by creating the electro-thermal
          model of the MOSFET to obtain the heat dissipated by the MOSFET during the various
          operating conditions of the hybrid electric vehicle. The heat dissipation values of each
          MOSFET are used to optimize its placement on the printed circuit boards by using neural
          networks and genetic algorithms. The placement optimization of components having
          varying heat dissipation values, ensures that the junction temperature of the MOSFET stays
          within its safety limit. Neural networks are used to obtain temperature predictions for a
          given placement. Genetic algorithms are then used to efficiently search for the best
          placement in the vast solution space of possible placements. The electro-thermal model is
          coupled to the MOSFETs in the inverter of the drivetrain model of the hybrid electric
          vehicle to extract the heat dissipated values of the MOSFETs when the vehicle is driven
          through a particular drive cycle.
          </p>
      </div>
      <br/>
      <MediumEmbed heading="Autonomous Vehicles"/>
    </div>
  );
}