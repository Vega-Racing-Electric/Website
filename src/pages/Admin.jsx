import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Settings, Users, Database } from 'lucide-react';

const Admin = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        { icon: <Users size={20} />, name: "Manage Team", desc: "Add/Remove members from Google Sheets Sync" },
        { icon: <Database size={20} />, name: "Export Data", desc: "Download recent team stats and logs" },
        { icon: <Settings size={20} />, name: "Configuration", desc: "Update system environment and API keys" }
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></div>
            
            <div className="max-w-md w-full text-center mb-16">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20 shadow-xl animate-pulse">
                    <Lock size={24} className="text-primary" />
                </div>
                <h1 className="font-orbitron font-black text-4xl text-white uppercase tracking-tighter mb-4">
                    VRE <span className="text-primary">ADMIN</span>
                </h1>
                <p className="font-mono text-xs text-muted leading-relaxed uppercase tracking-widest">
                    This area is restricted. Access is logged.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {features.map((feature, i) => (
                    <div key={i} className="p-8 border border-white/5 bg-surface/30 rounded-sm opacity-30 grayscale pointer-events-none transition-all hover:border-primary/40 group">
                        <div className="text-primary mb-6 transition-transform group-hover:scale-110">{feature.icon}</div>
                        <h4 className="font-orbitron font-bold text-sm text-white uppercase mb-2 tracking-widest">{feature.name}</h4>
                        <p className="font-mono text-[9px] text-muted tracking-widest uppercase">{feature.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-20 flex flex-col items-center gap-6">
                <Link 
                    to="/" 
                    className="border border-white/10 px-8 py-3 font-orbitron text-[10px] font-bold text-muted hover:text-white hover:border-white transition-all tracking-[0.2em]"
                >
                    RETURN TO HOME
                </Link>
                <span className="font-mono text-[8px] text-white/5 tracking-[0.4em] uppercase">SYSTEM VRE-2026-X86-64</span>
            </div>
        </div>
    );
};

export default Admin;
