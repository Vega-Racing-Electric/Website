import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Linkedin, Youtube } from 'lucide-react';
import { gsap } from 'gsap';
import logo from '../images/Navbar_Logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const location = useLocation();

    const navLinks = [
        { name: 'Home', to: '/' },
        { name: 'Car', to: '/car' },
        { name: 'Research', to: '/research' },
        { name: 'Team', to: '/team' },
        { name: 'Achievements', to: '/achievements' },
        { name: 'Sponsors', to: '/sponsors' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Vega Racing Electric" className="h-10 transition-transform hover:scale-105" />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className={`font-orbitron text-xs font-medium tracking-widest hover:text-primary transition-colors uppercase ${location.pathname === link.to ? 'text-primary' : ''
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        className="bg-primary text-white border border-primary px-6 py-2 font-orbitron text-xs font-bold hover:bg-white hover:text-primary transition-all shadow-[0_0_15px_rgba(230,57,70,0.3)]"
                    >
                        CONTACT US
                    </Link>
                    <img src="/Website/pes_dark_logo.png" alt="PESU Logo" className="h-10 ml-4 hidden md:block" />
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-background z-40 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                <div className="flex flex-col h-full justify-center items-center gap-8 p-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className={`font-orbitron text-4xl font-bold tracking-tighter hover:text-primary transition-colors ${location.pathname === link.to ? 'text-primary' : ''
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="flex gap-6 mt-12">
                        <a href="https://www.instagram.com/vegaracingelectric/" target="_blank" rel="noreferrer">
                            <Instagram className="hover:text-primary cursor-pointer" />
                        </a>
                        <a href="https://in.linkedin.com/company/vega-racing-electric" target="_blank" rel="noreferrer">
                            <Linkedin className="hover:text-primary cursor-pointer" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
