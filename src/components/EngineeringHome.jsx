import React from 'react';

const EngineeringHome = () => {
    return (
        <div className="relative py-24 bg-surface overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row-reverse items-center gap-12">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative overflow-hidden rounded-lg shadow-[0_0_50px_rgba(230,57,70,0.4)] transition-transform duration-500 hover:scale-105">
                        <img
                            src={`${import.meta.env.BASE_URL}images/Research3.png`}
                            alt="Engineering Research PCB"
                            className="w-full h-auto object-cover rounded-sm filter brightness-110"
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-black italic mb-6 tracking-tighter uppercase">
                        VRE <span className="text-primary italic">Engineering</span>
                    </h2>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-sans mb-8 italic">
                        "We at VRE are strongly focused on research as a means of actively contributing to the industry and honing our own technical skills. Team members have undertaken projects in topics including, but not limited to:"
                    </p>

                    <ul className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        {[
                            "BLDC Motor Controller Design",
                            "Thermal Analysis of Motor Controllers",
                            "Vision Based Depth Perceptions for Autonomy",
                            "Electrical Actuation of Steering",
                            "Path Planning with CNNs and DQNs"
                        ].map((item, id) => (
                            <li key={id} className="flex items-center gap-4 text-white/90 font-mono text-xs md:text-sm tracking-widest uppercase py-1 px-4 border-l-2 border-primary/40 bg-white/5 transition-all hover:bg-primary/20 hover:border-primary">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Red Glow/Lines Decoration */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-64 h-[1px] bg-gradient-to-l from-primary to-transparent opacity-50"></div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>
        </div>
    );
};

export default EngineeringHome;
