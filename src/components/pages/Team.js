import React, { useEffect, useState } from 'react';
import { FaTools, FaMicrochip, FaLaptopCode, FaUsers } from 'react-icons/fa';
import '../../App.css';

export default function Team() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <div className="team">
      <h1>Meet the team</h1>

      {/* UPDATED: Year Dropdown */}
      <div className="team-year-selector">
        <label htmlFor="year-select">Select Year: </label>
        <select 
          id="year-select"
          className="year-dropdown"
          value={selectedYear} 
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Image updates automatically based on state */}
      <img alt={`Team ${selectedYear}`} src={`/images/Team/Team${selectedYear}.jpg`}/>
      
      <h1> Team Structure </h1>
      <div className="team-container">
         {/* ... (Rest of your component remains exactly the same) ... */}
         <div className="team-column" >
            <FaMicrochip className="team-structure"></FaMicrochip>
            <h2><b>Electrical</b></h2>
            <p>The Electrical division consists of 4 sub-systems :<br /><br />
              <b><span className="special">Accumulator:</span></b> Designing and manufacturing a custom Battery.<br/><br/>
              <b><span className="special">Powertrain:</span></b> Working with the data signals and power lines associated with the Motor and Controller.<br /><br />
              <b><span className="special">Low Voltage Safety:</span></b> Active and Passive Safety Systems including the fuses and the circuitry that monitors Brake Pressure, Current and Voltage.<br /><br />
              <b><span className="special">Data Acquisition:</span></b> Gathering vehicle data over CAN bus, storing and transmitting data over radio and Visualisation Tools to understand the data.
            </p>
        </div>
        
        <div className="team-column" >
            <FaTools className="team-structure"></FaTools>
            <h2><b>Mechanical</b></h2>
            <p>The Mechanical division consists of 3 sub-systems:<br /><br />
              <b><span className="special">Chassis and Bodyworks:</span></b> Design, analysis and fabrication of structural frame for the vehicle. Integration of vehicle components to the framework.<br /><br />
              <b><span className="special">Vehicle Dynamics:</span></b> Design, analysis and manufacturing of suspension, steering, braking system and wheel assembly for vehicle handling and performance.<br /><br />
              <b><span className="special">Powertrain:</span></b> Design and Manufacturing of gearbox and differential, Motor optimization, Mechanical and Electrical Powertrain integration.
            </p>
        </div>
      
        <div className="team-column" >
            <FaLaptopCode className="team-structure larger"></FaLaptopCode>
            <h2><b>Computers</b></h2>
            <p>The Computers division consists of 4 sub-systems:<br /><br />
              <b><span className="special">Vision:</span></b> Gathering all the frames from the on board cameras and producing a point cloud of the surrounding environment in the vehicle frame.<br /><br />
              <b><span className="special">Sensor Fusion and Mapping:</span></b> Fusing the Vision, GPS, Acceleration, Wheel Speed data to produce an map of the environment as it is being driven through.<br /><br />
              <b><span className="special">Path Planning:</span></b> Computing a safe and viable racing line through the mapped area accounting for traction, powertrain limits and uncertainties in the map.<br /><br />
              <b><span className="special">Control and Actuation:</span></b> Translating the planned path into actuation commands to drive the vehicle through the desired vector.<br /><br />
            </p>
        </div>
      
        <div className="team-column" >
          <FaUsers className="team-structure larger"></FaUsers>
          <h2><b>Non Technical</b></h2>
          <p>The Non Technical division consists of 5 sub-systems:<br /><br />
            <b><span className="special">Statics:</span></b> Documentation and Presentation of design report, cost report and others.<br /><br />
            <b><span className="special">Social:</span></b> Co-ordination with industries for sponsorship and Maintaining social media handles.<br /><br />
            <b><span className="special">Accounting:</span></b> Maintaining record of income and expenditure.<br /><br />
            <b><span className="special">Inventory:</span></b> Managing inventory register for items in the workshop.<br /><br />
            <b><span className="special">Photo/Video:</span></b> Taking pictures and creating videos for event submissions and  social media handles.
          </p>
        </div>
      </div>
    </div>
  );
}
