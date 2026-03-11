import React, { useEffect } from 'react';
import Achievements from '../components/Achievements';

const AchievementsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 min-h-screen relative w-full bg-background">
            <Achievements />
        </div>
    );
};

export default AchievementsPage;
