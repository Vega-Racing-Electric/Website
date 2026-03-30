import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MessageCircle, Phone, Globe } from 'lucide-react';
import logo from '../images/Navbar_Logo.png';

const ExclusiveContact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const leads = [
        { 
            name: "Arnav Rao", 
            role: "Team Captain", 
            phone: "+91 8310908323", 
            wa: "918310908323"
        },
        { 
            name: "Dhruva Meravanige", 
            role: "Team Captain", 
            phone: "+91 7760971429", 
            wa: "917760971429"
        },
        { 
            name: "Dakshin S", 
            role: "Team Manager", 
            phone: "+91 88708 54142", 
            wa: "918870854142"
        }
    ];

    const socials = [
        { icon: <Globe size={20} />, name: "Website", url: "https://vre.pes.edu" },
        { icon: <Instagram size={20} />, name: "Instagram", url: "https://www.instagram.com/vegaracingelectric/" },
        { icon: <Mail size={20} />, name: "Email", url: "mailto:vegaracingelectric@pes.edu" }
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -z-10"></div>

            {/* Logo */}
            <Link to="/" className="mb-16 transition-all hover:scale-105 active:scale-95">
                <img src={logo} alt="VRE Logo" className="h-20 drop-shadow-[0_0_15px_rgba(230,57,70,0.3)]" />
            </Link>

            {/* Title */}
            <div className="text-center mb-16">
                <span className="font-mono text-primary text-xs tracking-[0.5em] uppercase mb-4 block">Official Lead Contacts</span>
                <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
                    Contact <span className="text-primary outline-text">Us</span>
                </h1>
            </div>

            {/* Global Links - 3 Tabs at top */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-12">
                {socials.map((social, i) => (
                    <a 
                        key={i}
                        href={social.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-3 bg-surface/50 border border-white/5 py-4 rounded-sm text-white font-orbitron text-xs font-bold tracking-widest hover:bg-primary transition-all duration-300 shadow-xl group"
                    >
                        {social.icon} {social.name.toUpperCase()}
                    </a>
                ))}
            </div>

            {/* Lead Contacts - 3 Cards below */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {leads.map((lead, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-white/5 p-10 rounded-sm relative transition-all duration-500 hover:border-primary/40 group text-center shadow-2xl">
                        <div className="mb-8">
                            <h3 className="font-orbitron font-black text-2xl text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{lead.name}</h3>
                            <p className="font-mono text-xs text-muted uppercase tracking-[0.2em] font-bold">{lead.role}</p>
                        </div>
                        
                        {/* THE RED NUMBER */}
                        <div className="mb-10">
                            <a href={`tel:${lead.phone.replace(/\s+/g, '')}`} className="text-2xl md:text-3xl font-orbitron font-black text-primary hover:text-white transition-colors tracking-tight">
                                {lead.phone}
                            </a>
                        </div>
                        
                        {/* WhatsApp Primary Action */}
                        <a 
                            href={`https://wa.me/${lead.wa}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-sm font-orbitron text-[10px] font-black tracking-widest hover:bg-white hover:text-[#25D366] transition-all shadow-lg active:scale-95 w-full uppercase"
                        >
                            <MessageCircle size={18} />
                            WhatsApp
                        </a>
                    </div>
                ))}
            </div>

            {/* Hidden Message */}
            <p className="mt-24 font-mono text-[8px] text-white/5 tracking-[0.8em] uppercase select-none">Auth: Sponsor-VRE-2026</p>
        </div>
    );
};

export default ExclusiveContact;
