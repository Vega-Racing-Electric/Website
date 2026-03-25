import React from 'react';
import { Link } from 'react-router-dom';
import { sponsors } from '../data/sponsors';

const Sponsors = () => {
    return (
        <div className="py-24 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-6 mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Our Sponsors</h2>
                <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            </div>

            <div className="relative flex overflow-hidden">
                {/* First Row */}
                <div className="animate-marquee whitespace-nowrap flex items-center gap-12 md:gap-24 py-8">
                    {[...sponsors, ...sponsors].map((sponsor, i) => (
                        <div key={i} className="flex-shrink-0 flex flex-col items-center gap-4 group">
                            <div className="h-16 md:h-24 w-32 md:w-48 bg-background rounded-sm flex items-center justify-center p-4 border border-white/5 transition-all duration-300">
                                <img
                                    src={sponsor.src.startsWith('/') ? `${import.meta.env.BASE_URL}${sponsor.src.slice(1)}` : sponsor.src}
                                    alt={sponsor.name}
                                    className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <span className="hidden font-orbitron font-black text-xs md:text-sm text-muted/30 group-hover:text-white transition-colors uppercase">
                                    {sponsor.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 mt-16 text-center">
                <p className="text-muted text-sm max-w-lg mx-auto mb-8 font-mono uppercase tracking-widest">
                    Empowering the next generation of engineers.
                </p>
                <Link to="/contact" className="text-primary font-orbitron font-bold text-xs tracking-[0.2em] border-b-2 border-primary/20 hover:border-primary transition-all pb-1 uppercase">
                    Interested in sponsoring? → Contact Us
                </Link>
            </div>
        </div>
    );
};

export default Sponsors;
