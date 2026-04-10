import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const NotFound = () => {
    useEffect(() => {
        // Animate the big 404 text
        gsap.fromTo(".glitch-404", 
            { x: -5, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 0.1, repeat: 10, yoyo: true, ease: "power1.inOut" }
        );
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-center flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-8">
                <h1 className="glitch-404 font-orbitron text-[150px] md:text-[250px] font-black text-white/5 leading-none select-none italic">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white tracking-widest uppercase italic bg-background px-4">
                        Route Lost
                    </h2>
                </div>
            </div>

            <div className="max-w-md space-y-8">
                <div className="space-y-2">
                    <p className="font-mono text-primary text-xs tracking-[0.4em] uppercase">Status: Signal Disconnected</p>
                    <p className="text-muted font-mono text-sm leading-relaxed">
                        The coordinates you entered do not exist in our flight computer. You may have taken a wrong turn on the track.
                    </p>
                </div>

                <div className="flex flex-center justify-center pt-6">
                    <Link 
                        to="/" 
                        className="group relative px-10 py-4 bg-primary text-white font-orbitron text-xs font-black tracking-[0.3em] uppercase italic transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(230,57,70,0.3)]"
                    >
                        <span className="relative z-10">Return to Grid</span>
                        <div className="absolute inset-0 bg-white transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500"></div>
                        <span className="absolute inset-0 border border-white transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></span>
                    </Link>
                </div>
            </div>

            {/* Background elements */}
            <div className="fixed top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-1/4 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
    );
};

export default NotFound;
