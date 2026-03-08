import React from 'react';
import { Link } from 'react-router-dom';

const JoinUs = () => {
    const roles = ["Mechanical", "Electrical", "Software", "Management", "Operations"];

    return (
        <div className="relative py-32 overflow-hidden bg-background">
            {/* Dramatic Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <span className="font-mono text-primary text-xs tracking-[0.4em] uppercase mb-4 block">Recruitment 2025</span>
                    <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-tight mb-8">
                        PUSH YOUR <br />
                        <span className="text-white/20 outline-text">LIMITS.</span>
                    </h2>

                    <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mb-12">
                        We recruit passionate engineers and creative minds every year. Join the legacy
                        of India's most innovative student racing team. Applications open soon.
                    </p>

                    <div className="flex flex-wrap gap-4 mb-16">
                        <a href="mailto:vegaracingelectric@pes.edu" className="bg-primary text-white border border-primary px-10 py-5 font-orbitron font-bold text-xs tracking-widest hover:bg-transparent transition-all shadow-[0_0_30px_rgba(230,57,70,0.3)]">
                            APPLY NOW
                        </a>
                        <Link to="/team" className="border border-white/20 px-10 py-5 font-orbitron font-bold text-xs tracking-widest hover:bg-white hover:text-black transition-all">
                            LEARN MORE
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-white/5 pt-12">
                        {roles.map((role) => (
                            <div key={role} className="flex flex-col gap-2">
                                <span className="font-orbitron font-bold text-[10px] tracking-widest text-white/40 uppercase">Open Role</span>
                                <span className="font-bold text-sm text-primary">{role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default JoinUs;
