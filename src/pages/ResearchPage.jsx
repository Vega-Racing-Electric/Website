import React, { useEffect } from 'react';
import Research from '../components/Research';

const ResearchPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 min-h-screen relative w-full bg-background">
            <Research />
        </div>
    );
};

export default ResearchPage;
