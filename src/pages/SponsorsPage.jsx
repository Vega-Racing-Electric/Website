import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sponsors } from '../data/sponsors';

const SponsorsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[150px] -z-10 rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col gap-2 mb-16 text-center md:text-left">
                    <span className="font-mono text-primary text-xs tracking-[0.4em] uppercase">Partnerships</span>
                    <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-tight">
                        OUR <span className="text-primary outline-text">SPONSORS</span>
                    </h2>
                    <p className="text-muted mt-4 max-w-2xl text-sm leading-relaxed">
                        We are incredibly grateful to our industry partners whose support, technology, and expertise make our journey possible.
                    </p>
                </div>

                {/* Sponsors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sponsors.map((sponsor, index) => (
                        <a
                            key={index}
                            href={sponsor.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group block relative h-64 bg-surface/50 border border-white/5 rounded-sm p-6 flex flex-col items-center justify-center overflow-hidden hover:border-primary/50 transition-colors"
                        >
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center z-20 backdrop-blur-sm">
                                <h3 className="font-orbitron font-bold text-white text-lg mb-2 tracking-widest uppercase">{sponsor.name}</h3>
                                <p className="font-mono text-xs text-white/90 leading-relaxed">{sponsor.desc}</p>
                            </div>

                            {/* Default Logo */}
                            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                                <img
                                    src={sponsor.src.startsWith('/') ? `${import.meta.env.BASE_URL}${sponsor.src.slice(1)}` : sponsor.src}
                                    alt={sponsor.name}
                                    className="max-w-[80%] max-h-[80%] object-contain opacity-70 group-hover:opacity-0 transition-opacity duration-300"
                                    onError={(e) => {
                                        // Fallback if image doesn't exist yet
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <span className="hidden font-orbitron font-bold text-xl text-white/50">{sponsor.name}</span>
                            </div>
                        </a>
                    ))}
                </div>

                {/* --- FOOTER CTA FOR SPONSORS --- */}
                <div className="mt-32 pt-16 border-t border-white/5 text-center">
                    <p className="font-mono text-xs md:text-sm text-muted tracking-widest leading-relaxed">
                        For further information about sponsoring, <Link to="/contactus" className="text-primary font-bold hover:underline selection:text-white">contact us</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SponsorsPage;
