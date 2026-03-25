import React, { useState, useEffect } from 'react';
import { subsystems } from '../data/subsystems';
import { Zap, Battery, Settings, Wind, Cpu, Activity, X } from 'lucide-react';
import { gsap } from 'gsap';

const IconMap = {
    zap: <Zap />,
    battery: <Battery />,
    settings: <Settings />,
    wind: <Wind />,
    cpu: <Cpu />,
    activity: <Activity />,
};

const SubsystemModal = ({ subsystem, onClose }) => {
    if (!subsystem) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" onClick={onClose}></div>
            <div className="bg-surface w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 border border-white/10 p-8 md:p-12 shadow-2xl rounded-sm">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-muted hover:text-white"
                >
                    <X size={32} />
                </button>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <div className="text-primary mb-6 flex items-center gap-4">
                            {IconMap[subsystem.icon]}
                            <span className="font-mono text-xs tracking-[0.3em] uppercase">Engineering Subsystem</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase italic">{subsystem.name}</h2>
                        <p className="text-muted leading-relaxed mb-8">{subsystem.fullDescription}</p>

                        <div className="space-y-4">
                            <h4 className="font-orbitron text-xs font-bold tracking-widest text-white/50">KEY SPECIFICATIONS</h4>
                            <ul className="space-y-2">
                                {subsystem.specs?.map((spec, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-mono">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                        {spec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="aspect-video bg-background border border-white/5 flex items-center justify-center group overflow-hidden">
                            <span className="font-mono text-[10px] text-muted group-hover:text-primary transition-colors">PHOTO_PLACEHOLDER_{subsystem.id.toUpperCase()}</span>
                            {/* Image overlay effect */}
                            <div className="absolute inset-0 bg-primary/5 group-hover:opacity-0 transition-opacity"></div>
                        </div>

                        <div>
                            <h4 className="font-orbitron text-xs font-bold tracking-widest text-white/50 mb-4">SUB-TEAM</h4>
                            <div className="space-y-3">
                                {subsystem.members?.length > 0 ? subsystem.members.map((m, i) => (
                                    <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="font-bold text-sm tracking-wide">{m.name}</span>
                                        <span className="text-xs text-muted font-mono">{m.role}</span>
                                    </div>
                                )) : <p className="text-xs text-muted italic">Team member data coming soon.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Subsystems = () => {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        gsap.from(".subsystem-card", {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            scrollTrigger: {
                trigger: ".engineering-section",
                start: "top 70%",
            }
        });
    }, []);

    return (
        <div className="py-24 bg-surface engineering-section relative">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-black italic mb-4">ENGINEERING</h2>
                    <p className="text-muted max-w-2xl text-sm md:text-base">
                        Six highly specialized teams working in synergy to create a high-performance
                        electric racing machine. Each component is optimized for speed, reliability, and safety.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subsystems.map((sub) => (
                        <div
                            key={sub.id}
                            onClick={() => setSelected(sub)}
                            className="subsystem-card bg-background border border-white/5 p-8 cursor-pointer group hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="text-primary mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                                {IconMap[sub.icon] && React.cloneElement(IconMap[sub.icon], { size: 40 })}
                            </div>

                            <h3 className="font-orbitron font-bold text-xl mb-3 tracking-tighter uppercase group-hover:text-primary transition-colors">
                                {sub.name}
                            </h3>

                            <p className="text-xs text-muted leading-relaxed mb-6 group-hover:text-white/70 transition-colors">
                                {sub.description}
                            </p>

                            <div className="flex items-center gap-2 text-[10px] font-bold font-orbitron tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all">
                                LEARN MORE <span className="text-lg">→</span>
                            </div>

                            {/* Decorative corner accent */}
                            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                                <div className="absolute top-2 right-2 w-full h-[1px] bg-white/10 group-hover:bg-primary transition-colors"></div>
                                <div className="absolute top-2 right-2 w-[1px] h-full bg-white/10 group-hover:bg-primary transition-colors"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selected && <SubsystemModal subsystem={selected} onClose={() => setSelected(null)} />}
        </div>
    );
};

export default Subsystems;
