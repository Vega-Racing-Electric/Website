import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import AboutVRE from '../components/AboutVRE';
import EngineeringHome from '../components/EngineeringHome';
import JoinUs from '../components/JoinUs';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-background">
            <Hero />
            <AboutVRE />
            <EngineeringHome />
            <JoinUs />
        </div>
    );
};

export default Home;
