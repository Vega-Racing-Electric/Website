import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, Mail, MapPin } from 'lucide-react';
import logo from '../images/Navbar_Logo.png';

const Footer = () => {
    return (
        <footer className="bg-background border-t border-primary/20 pt-24 pb-12 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center group">
                            <img src={logo} alt="Vega Racing Electric" className="h-12 w-auto filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                        </Link>
                        <p className="text-muted text-xs leading-relaxed max-w-xs uppercase tracking-tighter">
                            Engineering the future of electric mobility since 2017.
                            The official Formula Student Electric team of PES University.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a href="#" className="p-3 bg-surface hover:bg-primary transition-all rounded-sm text-white/50 hover:text-white group">
                                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="p-3 bg-surface hover:bg-primary transition-all rounded-sm text-white/50 hover:text-white group">
                                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="p-3 bg-surface hover:bg-primary transition-all rounded-sm text-white/50 hover:text-white group">
                                <Youtube size={18} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Nav Column */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-orbitron text-xs font-black tracking-widest text-primary mb-2 uppercase">Explore</h4>
                            {['Home', 'Car', 'Research', 'Team', 'Achievements', 'Sponsors', 'Contact'].map(link => (
                                <Link key={link} to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-[10px] font-bold text-muted hover:text-white transition-colors uppercase tracking-widest">
                                    {link}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-orbitron text-xs font-black tracking-widest text-primary mb-2 uppercase">Official</h4>
                            {['PES University', 'Formula Bharat', 'VRE Racing', 'Media Kit'].map(link => (
                                <a key={link} href="#" className="text-[10px] font-bold text-muted hover:text-white transition-colors uppercase tracking-widest">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-orbitron text-xs font-black tracking-widest text-primary mb-4 uppercase">Contact Us</h4>
                        <div className="flex items-start gap-4 text-xs">
                            <Mail size={16} className="text-primary mt-1" />
                            <div className="flex flex-col">
                                <span className="text-muted uppercase font-bold tracking-tighter">Email</span>
                                <span className="text-white font-mono lowercase">vegaracingelectric@pes.edu</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 text-xs">
                            <MapPin size={16} className="text-primary mt-1" />
                            <div className="flex flex-col">
                                <span className="text-muted uppercase font-bold tracking-tighter">HQ</span>
                                <span className="text-white leading-relaxed">
                                    PES University RR Campus, <br />
                                    Outer Ring Road, Bengaluru, <br />
                                    KA 560085, India
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
                    <p className="text-[10px] font-mono text-muted/50 uppercase tracking-[0.2em]">
                        © 2025 VEGA RACING ELECTRIC, PES UNIVERSITY. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-[9px] font-bold text-muted/30 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</a>
                        <a href="#" className="text-[9px] font-bold text-muted/30 hover:text-white uppercase tracking-widest transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>

            {/* Background Decorative Text */}
            <div className="absolute -bottom-10 -left-10 text-[10rem] font-black text-white/[0.01] pointer-events-none select-none italic leading-none whitespace-nowrap">
                ENGINEERING EXCELLENCE
            </div>
        </footer>
    );
};

export default Footer;
