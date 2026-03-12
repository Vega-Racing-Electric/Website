import React, { useEffect } from 'react';
import SpecsPanel from '../components/SpecsPanel';

const CarPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24">
            <SpecsPanel />
        </div>
    );
};

export default CarPage;
