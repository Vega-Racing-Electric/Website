import React from 'react';

const AboutVRE = () => {
    return (
        <div className="relative py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
                {/* Image Section */}
                <div className="w-full md:w-1/3 flex justify-center">
                    <div className="relative">
                        <img
                            src={`${import.meta.env.BASE_URL}icon.png`}
                            alt="VRE Circle Logo"
                            className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_0_30px_rgba(230,57,70,0.3)]"
                        />
                    </div>
                </div>

                {/* Text Section */}
                <div className="w-full md:w-2/3">
                    <h2 className="text-4xl md:text-5xl font-black italic mb-6 tracking-tighter uppercase">
                        About <span className="text-primary italic">VRE</span>
                    </h2>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-sans mb-6">
                        We are an electric racing team under EV club of PES University. With the rising popularity of electric vehicles, we felt a need for a team focusing on promoting electric vehicles and its future in automobiles. Vega, formed in 2017, aims in designing and building 4 wheeled, formula one style open cockpit electric vehicles. Each year, we build award winning, fully electric race cars that aim to push the envelope, bringing together PES's brightest students in the process.
                    </p>
                </div>
            </div>

            {/* Subtle Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-surface to-transparent -z-10 opacity-30"></div>
        </div>
    );
};

export default AboutVRE;
