import React, { useEffect } from 'react';

const AchievementCard = ({ year, title, description, image, rank }) => {
    return (
        <div className="group relative overflow-hidden bg-surface/30 border border-white/5 rounded-sm transition-all duration-500 hover:border-primary/50">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px] group-hover:bg-primary/40 transition-all duration-700"></div>
            </div>

            <div className="relative z-10 p-8 flex flex-col items-center text-center h-full">
                {/* Image Section */}
                <div className="relative mb-8 w-32 h-32 flex items-center justify-center p-4 bg-white/5 rounded-full border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <img
                        src={image.startsWith('/') ? `${import.meta.env.BASE_URL}${image.slice(1)}` : `${import.meta.env.BASE_URL}${image}`}
                        alt={title}
                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                </div>

                {/* Text Content */}
                <span className="font-mono text-primary text-xs tracking-[0.4em] uppercase mb-4">{year}</span>
                <h3 className="text-xl font-black italic text-white tracking-tighter uppercase mb-4 group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                    {description}
                </p>

                {rank && (
                    <div className="mt-auto pt-6 border-t border-white/10 w-full flex flex-col gap-2">
                        {rank.map((r, i) => (
                            <div key={i} className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
                                <span className="text-muted">{r.label}</span>
                                <span className="text-white font-bold text-primary">{r.value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Corner Decorative Element */}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary/20 rotate-45 transform translate-x-4 translate-y-4 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500"></div>
        </div>
    );
};

const Achievements = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const achievementList = [
        {
            year: "2025",
            title: "Formula Bharat 2025",
            image: "images/Achievements/FormulaBharatLogo.jpg",
            description: "A stellar performance showcasing our latest electric drivetrain and chassis engineering.",
            rank: [
                { label: "State Ranking", value: "2ND IN KARNATAKA" },
                { label: "Overall Ranking", value: "15TH OVERALL" }
            ]
        },
        {
            year: "2022",
            title: "Formula Bharat 2022",
            image: "images/Achievements/FormulaBharatLogo.jpg",
            description: "Pushing the limits of electric reliability and thermal management throughout the endurance event.",
            rank: [
                { label: "Performance", value: "4TH PLACE OVERALL" }
            ]
        },
        {
            year: "2021",
            title: "Formula Green 2021",
            image: "images/Achievements/FormulaGreen.jpg",
            description: "Exceptional design and cost presentations leading to major podium finishes in static events.",
            rank: [
                { label: "Design Event", value: "RUNNER UP" },
                { label: "Cost Event", value: "3RD PLACE" }
            ]
        },
        {
            year: "2020",
            title: "Formula Bharat 2020",
            image: "images/Achievements/FormulaBharatLogo.jpg",
            description: "Solidifying our position as a top contender in the national electric racing circuit.",
            rank: [
                { label: "Ranking", value: "9TH PLACE" }
            ]
        },
        {
            year: "2019",
            title: "FSEV Concept Challenge",
            image: "images/Achievements/FormulaBharatLogo.jpg",
            description: "Recognized for innovative engineering concepts and advanced EV architecture designs.",
            rank: [
                { label: "Concept Ranking", value: "6TH PLACE" }
            ]
        },
        {
            year: "2018",
            title: "Formula Imperial",
            image: "images/Achievements/FormulaImperial.png",
            description: "The debut hybrid vehicle challenge demonstrating our team's versatility in powertrain engineering.",
            rank: [
                { label: "Ranking", value: "15TH PLACE" }
            ]
        }
    ];

    return (
        <div className="relative py-32 bg-background min-h-screen overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center gap-4 mb-24">
                    <span className="font-mono text-primary text-xs tracking-[0.5em] uppercase">Victory Lane</span>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none text-white">
                        VRE <span className="text-white/20 outline-text">Achievements</span>
                    </h1>
                    <div className="w-24 h-1 bg-primary mt-4"></div>
                    <p className="max-w-xl text-muted text-sm md:text-base mt-4 font-sans leading-relaxed">
                        Engineering excellence tracked through years of competitive racing and podium finishes across national events.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {achievementList.map((item, idx) => (
                        <AchievementCard
                            key={idx}
                            year={item.year}
                            title={item.title}
                            description={item.description}
                            image={item.image}
                            rank={item.rank}
                        />
                    ))}
                </div>
            </div>

            {/* Background Grain/Lines */}
            <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        </div>
    );
};

export default Achievements;
