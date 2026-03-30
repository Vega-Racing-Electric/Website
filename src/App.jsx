import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import CarPage from './pages/CarPage';
import TeamPage from './pages/TeamPage';
import SponsorsPage from './pages/SponsorsPage';
import ResearchPage from './pages/ResearchPage';
import AchievementsPage from './pages/AchievementsPage';
import JoinPage from './pages/JoinPage';
import ContactPage from './pages/ContactPage';
import Admin from './pages/Admin';
import ExclusiveContact from './pages/ExclusiveContact';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    // Hide Navbar and Footer on secret/admin pages
    const isSecretPage = ['/admin', '/contactus'].includes(location.pathname);

    return (
        <div className="bg-background min-h-screen text-secondary selection:bg-primary selection:text-white flex flex-col">
            {loading && <Preloader onLoaded={() => setLoading(false)} />}

            {!loading && (
                <>
                    {!isSecretPage && <Navbar />}
                    <main className={`relative overflow-hidden flex-grow ${isSecretPage ? 'pt-0' : ''}`}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/car" element={<CarPage />} />
                            <Route path="/research" element={<ResearchPage />} />
                            <Route path="/team" element={<TeamPage />} />
                            <Route path="/achievements" element={<AchievementsPage />} />
                            <Route path="/sponsors" element={<SponsorsPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/join" element={<JoinPage />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/contactus" element={<ExclusiveContact />} />
                        </Routes>
                    </main>
                    {!isSecretPage && <Footer />}
                </>
            )}
        </div>
    );
}

export default App;
