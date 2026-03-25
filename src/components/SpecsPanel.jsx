import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { carSpecs } from '../data/specs';
import CarViewer from './CarViewer';
import { Zap, Battery, Settings, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Highlights = [
    { icon: <Zap size={24} />, title: "Electrified Powertrain", desc: "High-voltage performance" },
    { icon: <Settings size={24} />, title: "Competition Ready", desc: "Bespoke engineering" },
    { icon: <Activity size={24} />, title: "Full In-House Build", desc: "Prototype to track" },
    { icon: <Battery size={24} />, title: "Custom BMS", desc: "Intelligent safety" },
];

const SpecsPanel = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".spec-row", {
                x: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            });

            gsap.from(".highlight-card", {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".highlights-grid",
                    start: "top 85%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="py-24 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: 3D Viewer */}
                    <div className="h-[400px] md:h-[600px] bg-background/50 rounded-xl border border-white/5 relative group overflow-hidden">
                        <CarViewer />
                        <div className="absolute bottom-6 left-6 text-xs font-mono text-muted uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            DRAG TO ROTATE // SCROLL TO ZOOM
                        </div>
                    </div>

                    {/* Right: Specs */}
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-primary font-mono text-xs tracking-widest uppercase">Performance Data</span>
                            <h2 className="text-4xl md:text-5xl font-black">TECHNICAL SPECIFICATIONS</h2>
                        </div>

                        <div className="flex flex-col border-t border-white/10">
                            {carSpecs.map((spec, index) => (
                                <div
                                    key={index}
                                    className="spec-row flex justify-between items-center py-4 border-b border-white/5 hover:bg-white/5 px-2 transition-colors group"
                                >
                                    <span className="font-orbitron text-xs text-muted group-hover:text-white transition-colors uppercase tracking-widest">
                                        {spec.label}
                                    </span>
                                    <span className="font-mono text-lg font-bold text-primary">
                                        {spec.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Highlight Cards */}
                <div className="highlights-grid mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {Highlights.map((item, i) => (
                        <div key={i} className="highlight-card p-8 bg-background border border-white/5 hover:border-primary/50 transition-all group relative overflow-hidden">
                            <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="font-orbitron text-sm font-bold mb-2 tracking-tight">{item.title}</h3>
                            <p className="text-xs text-muted leading-relaxed uppercase tracking-tighter">{item.desc}</p>

                            {/* Subtle Red Overlay on Hover */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative text */}
            <div className="absolute -bottom-10 -right-10 text-[15rem] font-black text-white/[0.02] pointer-events-none select-none italic leading-none">
                EV4
            </div>
        </div>
    );
};

export default SpecsPanel;
