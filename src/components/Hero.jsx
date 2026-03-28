import React, { useEffect, useState } from 'react';
import CarViewer from './CarViewer';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [showScroll, setShowScroll] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowScroll(false);
            } else {
                setShowScroll(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about-vre');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">

            {/* 3D Car - BEHIND everything and TRANSLUCENT */}
            <div className="absolute inset-0 z-0 opacity-40">
                <CarViewer />
            </div>

            {/* Text Overlay - FULLY OPAQUE AND IN FRONT */}
            <div className="relative z-50 h-full flex flex-col items-center justify-center pointer-events-none px-6">

                {/* Tagline */}
                <div className="mb-4">
                    <span className="font-mono text-primary text-xs md:text-sm tracking-[0.5em] uppercase font-bold text-shadow-glow">
                        Formula Student Electric · PES University
                    </span>
                </div>

                {/* Main Title - FULLY OPAQUE WHITE/RED */}
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter leading-tight uppercase text-white drop-shadow-2xl">
                        VEGA RACING
                    </h1>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter leading-tight uppercase text-primary drop-shadow-2xl">
                        ELECTRIC
                    </h1>
                </div>

                {/* Subtitle */}
                <p className="mt-8 text-sm md:text-lg max-w-xl text-center leading-relaxed text-white font-medium drop-shadow-lg">
                    Pushing the boundaries of electric mobility through engineering excellence.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-6 mt-12 pointer-events-auto">
                    <Link to="/car" className="bg-primary text-white border-2 border-primary px-12 py-5 font-orbitron font-bold text-xs tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all shadow-xl">
                        VIEW SPECS
                    </Link>
                    <Link to="/team" className="border-2 border-white text-white px-12 py-5 font-orbitron font-bold text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-xl">
                        THE TEAM
                    </Link>
                </div>
            </div>

            {/* Simple Background Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>

            {/* Scroll Down Button */}
            <div 
                className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-300 ${showScroll ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <button 
                    onClick={scrollToAbout}
                    className="flex items-center justify-center w-14 h-14 bg-primary rounded-full hover:bg-white text-white hover:text-primary transition-all shadow-xl animate-bounce"
                    aria-label="Scroll to About"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </button>
            </div>

        </div>
    );
};

export default Hero;
