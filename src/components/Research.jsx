import React, { useState } from 'react';
import Allen_1 from '../images/Allen-1.jpeg';
import Allen_2 from '../images/Allen-2.jpeg';

const ResearchCard = ({ title, description, image, details }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative overflow-hidden group transition-all duration-700 cursor-pointer ${isHovered ? 'h-[500px]' : 'h-[350px]'} border border-white/5 bg-surface/30 rounded-sm`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={image || "/images/Research3.png"}
                    alt={title}
                    className="w-full h-full object-cover filter transition-all duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className={`absolute bottom-0 left-0 w-full p-8 z-10 transition-all duration-500 ${isHovered ? 'translate-y-0 pb-12' : 'translate-y-4'}`}>
                <h3 className="text-2xl font-black italic text-white tracking-tighter uppercase mb-4 transition-all group-hover:text-primary">
                    {title}
                </h3>

                <p className={`text-white/60 text-sm leading-relaxed transition-all duration-500 ${isHovered ? 'opacity-100 max-h-[100px] mb-6' : 'opacity-0 max-h-0'}`}>
                    {description}
                </p>

                {/* Expanded Details Section */}
                <div className={`overflow-hidden transition-all duration-700 ${isHovered ? 'max-h-[300px] opacity-100 mt-4 border-t border-white/10 pt-4' : 'max-h-0 opacity-0'}`}>
                    <ul className="grid grid-cols-1 gap-2">
                        {details && details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-xs text-white/80 font-mono tracking-widest uppercase">
                                <span className="w-1.5 h-1.5 bg-primary mt-1 flex-shrink-0"></span>
                                {detail}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={`mt-6 text-primary font-mono text-[10px] tracking-[0.3em] font-bold uppercase overflow-hidden transition-all duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                    HOVER TO EXPLORE →
                </div>
            </div>
        </div>
    );
};

const Research = () => {
    const researchModules = [
        {
            title: "BLDC Motor Controller Design",
            description: "Developing custom high-power density inverter stages and drive algorithms specifically for electric motorsport applications.",
            image: "/images/Research3.png",
            details: [
                "Custom Inverter Topologies",
                "Advanced PWM Control Schemes",
                "High-Speed Current Sensing",
                "Efficiency Optimization Algorithms"
            ]
        },
        {
            title: "Thermal Analysis & Heat Sink Optimization",
            description: "Computational fluid dynamics (CFD) and electro-thermal modeling to optimize cooling performance while reducing weight.",
            image: "/images/Carousel/4.jpg",
            details: [
                "Junction Temperature Management",
                "CFD Airflow Simulation",
                "Phase-Change Cooling Solutions",
                "Weight-to-Cooling Ratio Maximization"
            ]
        },
        {
            title: "Vision Based Path Planning",
            description: "Implementing state-of-the-art computer vision and sensor fusion for real-time race track mapping and autonomous navigation.",
            image: "/images/Carousel/6.jpg",
            details: [
                "Real-time Cone Detection",
                "SLAM for Track Mapping",
                "Dynamic Obstacle Avoidance",
                "Stereoscopic Depth Perception"
            ]
        },
        {
            title: "AI & RL for Race Strategy",
            description: "Using reinforcement learning (RL) and deep convolutional neural networks (CNNs) to optimize pathing and speed profiles.",
            image: "/images/Carousel/1.jpg",
            details: [
                "Optimal Path Search (DQN)",
                "Telemetry-Driven Performance Mapping",
                "Real-time Strategy Optimization",
                "Sim-to-Real Policy Transfer"
            ]
        }
    ];

    return (
        <div className="relative py-24 overflow-hidden bg-background min-h-screen">
            <div className="container mx-auto px-6 relative z-10">
                {/* Paper Section */}
                <div className="flex flex-col gap-2 mb-16">
                    <span className="font-mono text-primary text-xs tracking-[0.4em] uppercase">Engineering Publication</span>
                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-tight max-w-5xl text-white">
                        Development of <span className="text-white/20 outline-text">Electro-Thermal Model</span> for Field-Effect Transistor
                    </h1>
                    <p className="mt-4 font-orbitron font-bold text-sm tracking-widest text-muted uppercase">
                        By: Allen Denny, Dhrupad Vijay, Amartya S V, Neelkanth Kirloskar
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start mb-32 border-b border-white/5 pb-24">
                    <div className="flex flex-col gap-8">
                        <div className="bg-surface/50 border border-white/5 p-4 rounded-sm">
                            <img src={Allen_1} alt="Research Plot 1" className="w-full h-auto object-cover rounded-sm filter brightness-110" />
                        </div>
                        <div className="bg-surface/50 border border-white/5 p-4 rounded-sm">
                            <img src={Allen_2} alt="Research Plot 2" className="w-full h-auto object-cover rounded-sm filter brightness-110" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="p-8 bg-surface/30 border border-white/5 backdrop-blur-sm rounded-sm">
                            <h3 className="font-orbitron font-black text-xl mb-6 text-primary tracking-widest uppercase">Abstract</h3>
                            <div className="flex flex-col gap-6 font-sans text-white/80 leading-relaxed text-sm md:text-base">
                                <p>
                                    This project describes the transient thermal analysis of MOSFETs and proposes a method to optimize their placement on the PCB to reduce heating.
                                </p>
                                <p>
                                    By creating an electro-thermal model, heat dissipation values are used to optimize component placement using neural networks and genetic algorithms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modules Section */}
                <div className="flex flex-col gap-2 mb-16">
                    <span className="font-mono text-primary text-xs tracking-[0.4em] uppercase">Technical Modules</span>
                    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-white">
                        Autonomous <span className="text-white/20 outline-text">& Advanced</span> Systems
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-32">
                    {researchModules.map((item, idx) => (
                        <ResearchCard
                            key={idx}
                            title={item.title}
                            description={item.description}
                            image={item.image}
                            details={item.details}
                        />
                    ))}
                </div>

                <div className="mt-32 pt-16 border-t border-white/5">
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-12 text-white">Faculty & Student <span className="text-primary italic">Medium</span> Publications</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <PubCard href="https://medium.com/@adityang5" title="ADITYA N G" text="Automotive Systems Research Articles." />
                        <PubCard href="https://medium.com/@dhruvalpb" title="DHRUVA L P B" text="Deep Learning In Motorsport journals." />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PubCard = ({ href, title, text }) => (
    <a href={href} target="_blank" rel="noreferrer" className="group p-8 bg-surface/50 border border-white/5 rounded-sm hover:border-primary/50 transition-all flex flex-col items-center text-center">
        <h4 className="font-orbitron font-bold text-lg mb-2 group-hover:text-primary transition-colors text-white">{title}</h4>
        <p className="text-muted text-sm leading-relaxed mb-4 font-sans">{text}</p>
        <span className="text-primary font-mono text-xs font-bold tracking-[0.2em] uppercase">Read Professional Blog →</span>
    </a>
);

export default Research;
