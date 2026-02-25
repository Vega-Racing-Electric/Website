import React, { useRef } from 'react';
import { FaRegPlayCircle } from 'react-icons/fa';
import '../App.css';
import { Button } from './Button';
import Car360Viewer from './Car360Viewer';

function HeroSection() {
  const [showResults, setShowResults] = React.useState(true)
  const vidRef = useRef(null);

  const unhide = () => { setShowResults(true) }
  const handlePlayVideo = () => {
    setShowResults(false); // Hiding some elements
    if (vidRef.current) {
      vidRef.current.muted = true;
      vidRef.current.play();
    }
  }
  return (
    <div className='hero-container'>
      <Car360Viewer />
      {showResults &&
        (<>
          <h1 className="Hero">Vega Racing Electric</h1>
          <p className="Hero" id="tagline">Electrifying Racing since 2017</p>
          <div className='hero-btns'>
            <Button
              id="trailer"
              className='btns'
              buttonStyle='btn--outline'
              buttonSize='btn--large'
              onClick={handlePlayVideo}
            >
              WATCH TRAILER <FaRegPlayCircle className="fa-symbol" />
            </Button>
          </div>
        </>)
      }

    </div>
  );
}

export default HeroSection;