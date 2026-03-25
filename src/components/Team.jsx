import React, { useState, useEffect, useMemo } from 'react';
import { team } from '../data/team';
import { Linkedin, Github, Instagram } from 'lucide-react';
import { gsap } from 'gsap';

const Team = () => {
    // Toggles for Domain and Batch
    const [domain, setDomain] = useState('All');
    const [batch, setBatch] = useState('2026');

    // Extract all unique years from the team data and sort descending
    const availableBatches = useMemo(() => {
        const allYears = team.flatMap(m => m.years || []);
        const uniqueYears = Array.from(new Set(allYears)).sort((a, b) => parseInt(b) - parseInt(a));
        return uniqueYears;
    }, []);

    const domains = ['All', 'Autonomous', 'Electrical', 'Mechanical', 'Non Tech'];

    // Filter and Sort Logic
    const filteredTeam = useMemo(() => {
        let result = [...team];

        // 1. Filter by Batch (check if selected year is in member's years array)
        result = result.filter(m => m.years && m.years.includes(batch));

        // 2. Filter by Domain
        if (domain !== 'All') {
            result = result.filter(m => m.subsystem === domain);
        }

        // 3. Sort logic:
        // Priority 1: Role Hierarchy (Captain > Manager > Lead > Member)
        // Priority 2: Earliest year first (within same role tier)
        // Priority 3: Alphabetical name A-Z (within same role + same year)
        const roleHierarchy = (role) => {
            const r = (role || '').toLowerCase();
            if (r.includes('founder') || r.includes('head') || r.includes('captain') || r.includes('advisor')) return 0;
            if (r.includes('manager') || r.includes('vice captain')) return 1;
            if (r.includes('lead')) return 2;
            return 3; // Team Member, Technical Team Member, etc.
        };

        result.sort((a, b) => {
            // Get role for current batch to determine rank
            const roleA = a.rolesByYear && a.rolesByYear[batch] ? a.rolesByYear[batch] : a.role;
            const roleB = b.rolesByYear && b.rolesByYear[batch] ? b.rolesByYear[batch] : b.role;

            const rankA = roleHierarchy(roleA);
            const rankB = roleHierarchy(roleB);

            if (rankA !== rankB) return rankA - rankB;

            // 2. Earliest start year first
            const startA = Math.min(...(a.years || []).map(y => parseInt(y)));
            const startB = Math.min(...(b.years || []).map(y => parseInt(y)));
            if (startA !== startB) return startA - startB;

            // 3. Alphabetical by name (A → Z)
            return (a.name || '').localeCompare(b.name || '');
        });

        return result;
    }, [domain, batch]);

    useEffect(() => {
        gsap.fromTo(".member-card",
            { opacity: 0, y: 30, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out",
                overwrite: 'auto'
            }
        );
    }, [filteredTeam]);

    // Faculty Advisor data
    const facultyAdvisor = {
        name: "Dr. Rex Joseph",
        role: "Faculty Advisor",
        image: "/images/Team/drrex.jpg",
        description: "Mentor for VRE",
    };

    return (
        <div className="py-24 bg-background min-h-screen">
            <div className="container mx-auto px-6">

                {/* Faculty Advisor Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-6 mb-10">
                        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/20 to-white/10"></div>
                        <span className="font-mono text-primary text-xs tracking-[0.5em] uppercase whitespace-nowrap text-glow-red">
                            Faculty Advisor
                        </span>
                        <div className="h-px flex-grow bg-gradient-to-l from-transparent via-white/20 to-white/10"></div>
                    </div>

                    <div className="relative group w-full mx-auto">
                        {/* Outer Glow */}
                        <div className="absolute -inset-1 bg-primary/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="relative flex flex-col md:flex-row items-stretch bg-[#0a0a0a] border border-primary/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-primary/70 md:h-[280px]">

                            {/* Image Section - Framed Square */}
                            <div className="relative flex-shrink-0 p-6 md:p-8 flex items-center justify-center">
                                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden border border-white/5 shadow-2xl">
                                    <img
                                        src={`${import.meta.env.BASE_URL}images/Team/drrex.jpg`}
                                        alt={facultyAdvisor.name}
                                        className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    {/* Subtle Overlay to match the mockup's lighting */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                                {/* The 'Fade Out' effect from the mockup, placed behind or beside the frame */}
                                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-[#0a0a0a] hidden md:block z-0 pointer-events-none"></div>
                            </div>

                            {/* Content Section */}
                            <div className="flex-grow p-8 md:p-10 flex flex-col justify-center relative z-10">
                                <h4 className="font-orbitron font-black text-3xl md:text-4xl tracking-tighter uppercase text-primary mb-3 text-glow-red">
                                    {facultyAdvisor.name}
                                </h4>

                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs font-mono text-white/80 uppercase tracking-widest font-bold">
                                            <span className="text-white/40">Role:</span> {facultyAdvisor.role}
                                        </p>
                                    </div>

                                    <div className="relative">
                                        <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans italic max-w-2xl">
                                            "{facultyAdvisor.description}. Guiding the future of electric mobility with passion and expertise."
                                        </p>
                                    </div>
                                </div>

                                {/* Animated Accents */}
                                <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-primary/20 group-hover:border-primary/60 transition-colors duration-500 rounded-tr-md"></div>
                                <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-primary/20 group-hover:border-primary/60 transition-colors duration-500 rounded-bl-md hidden md:block"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="flex items-center gap-4 mb-16">
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
                    <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase font-bold">Team Members</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/5 to-white/10"></div>
                </div>

                {/* Header and Controls */}
                <div className="mb-20 flex flex-col gap-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <span className="font-mono text-primary text-xs tracking-[0.4em] uppercase mb-4 block text-glow-red">Elite Engineering Team</span>
                            <h2 className="text-5xl md:text-7xl font-black italic mb-4 uppercase text-white tracking-tighter">
                                The <span className="text-primary outline-text">VRE</span> Crew
                            </h2>
                            <p className="text-muted max-w-xl text-sm italic font-sans leading-relaxed">
                                Our legacy of innovation, tracked through generations of engineers building
                                award-winning electric race cars.
                            </p>
                        </div>
                    </div>

                    {/* Dual Toggle System */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 bg-surface/30 border border-white/5 rounded-sm backdrop-blur-sm shadow-2xl relative overflow-hidden">
                        {/* Domain Filter */}
                        <div className="flex flex-col gap-4">
                            <span className="font-mono text-[10px] text-primary font-bold tracking-[0.3em] uppercase">Browse Domains</span>
                            <div className="flex flex-wrap gap-2">
                                {domains.map((dom) => (
                                    <button
                                        key={dom}
                                        onClick={() => setDomain(dom)}
                                        className={`px-4 py-1.5 font-orbitron text-[9px] tracking-widest font-black transition-all border ${domain === dom
                                            ? 'bg-primary border-primary text-white shadow-[0_0_10px_rgba(230,57,70,0.4)]'
                                            : 'border-white/10 text-muted hover:border-white/30 hover:text-white'
                                            }`}
                                    >
                                        {dom.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Batch Filter */}
                        <div className="flex flex-col gap-4 lg:border-l lg:border-white/5 lg:pl-10">
                            <span className="font-mono text-[10px] text-primary font-bold tracking-[0.3em] uppercase">Select Batch</span>
                            <div className="flex flex-wrap gap-2">
                                {availableBatches.map((b) => (
                                    <button
                                        key={b}
                                        onClick={() => setBatch(b)}
                                        className={`px-4 py-1.5 font-orbitron text-[9px] tracking-widest font-black transition-all border ${batch === b
                                            ? 'bg-primary border-primary text-white shadow-[0_0_10px_rgba(230,57,70,0.4)]'
                                            : 'border-white/10 text-muted hover:border-white/30 hover:text-white'
                                            }`}
                                    >
                                        {b.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Corner Decorative VRE Text */}
                        <span className="absolute -bottom-6 -right-6 text-white/5 text-8xl font-black italic select-none pointer-events-none">VRE</span>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredTeam.length > 0 ? (
                        filteredTeam.map((member, i) => (
                            <div key={`${member.name}-${i}`} className="member-card group relative flex flex-col bg-surface border border-white/5 rounded-sm overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(230,57,70,0.1)]">

                                {/* Member Image Section */}
                                <div className="relative aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent z-10 opacity-80"></div>

                                    {/* Batch Badge (Shows the whole range) */}
                                    <div className="absolute top-4 right-4 z-20 px-2 py-1 bg-black/60 border border-white/10 backdrop-blur-md rounded-sm">
                                        <span className="font-mono text-[8px] tracking-widest text-primary font-bold">
                                            {(member.years || []).length > 1
                                                ? `${Math.min(...member.years)}-${Math.max(...member.years)}`
                                                : member.years[0]
                                            }
                                        </span>
                                    </div>

                                    {/* Image Display */}
                                    <div className="w-full h-full bg-neutral-900 flex items-center justify-center relative">
                                        {member.image ? (
                                            <img
                                                src={member.image.startsWith('/') ? `${import.meta.env.BASE_URL}${member.image.slice(1)}` : member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover absolute inset-0"
                                            />
                                        ) : (
                                            <>
                                                <span className="text-white/5 font-black text-6xl italic select-none absolute">VRE</span>
                                                <div className="w-48 h-48 border border-dashed border-white/5 flex items-center justify-center font-mono text-[9px] text-muted relative z-10">
                                                    MEMBER_VISUAL
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Social Links Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center gap-4 z-20 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                        {member.linkedin && (
                                            <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 bg-white flex items-center justify-center rounded-full text-black hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95">
                                                <Linkedin size={16} strokeWidth={2.5} />
                                            </a>
                                        )}
                                        {member.github && (
                                            <a href={member.github} target="_blank" rel="noreferrer" className="w-9 h-9 bg-white flex items-center justify-center rounded-full text-black hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95">
                                                <Github size={16} strokeWidth={2.5} />
                                            </a>
                                        )}
                                        {member.instagram && (
                                            <a href={member.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 bg-white flex items-center justify-center rounded-full text-black hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95">
                                                <Instagram size={16} strokeWidth={2.5} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 relative flex-grow flex flex-col border-t border-white/5">
                                    <div className="absolute top-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700"></div>

                                    <h4 className="font-orbitron font-black text-lg tracking-tight uppercase text-white leading-tight mb-1">
                                        {member.name}
                                    </h4>

                                    <div className="flex flex-col gap-1 mb-4">
                                        <p className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] font-bold">
                                            {member.rolesByYear && member.rolesByYear[batch]
                                                ? member.rolesByYear[batch]
                                                : member.role
                                            }
                                        </p>
                                        <span className="font-mono text-[9px] text-muted tracking-widest uppercase">
                                            {member.subsystem}
                                        </span>
                                    </div>



                                    <div className="pt-4 border-t border-white/5 mt-auto flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[8px] font-mono tracking-[0.3em] text-muted uppercase">VRE LEGACY MEMBER</span>
                                        <div className="h-[1px] w-8 bg-primary/40 group-hover:w-16 transition-all duration-700"></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center flex flex-col items-center gap-4">
                            <span className="text-white/20 font-black italic text-4xl uppercase tracking-tighter">No Members Found</span>
                            <p className="text-muted text-xs uppercase tracking-widest font-mono">In current category and batch selection</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Team;
