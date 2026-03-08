import React, { useEffect } from 'react';
import Team from '../components/Team';

const TeamPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24">
            <Team />
        </div>
    );
};

export default TeamPage;
