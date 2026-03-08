import React, { useEffect } from 'react';
import JoinUs from '../components/JoinUs';

const JoinPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24">
            <JoinUs />
        </div>
    );
};

export default JoinPage;
