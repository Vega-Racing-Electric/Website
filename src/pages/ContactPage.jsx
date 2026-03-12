import React, { useEffect } from 'react';
import Contact from '../components/Contact';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 min-h-screen relative w-full bg-background">
            <Contact />
        </div>
    );
};

export default ContactPage;
