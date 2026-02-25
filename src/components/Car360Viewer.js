import React, { useEffect } from 'react';

const Car360Viewer = () => {
    useEffect(() => {
        // Re-initialize the CI360 viewer when this component mounts
        // The script is loaded from CDN in index.html
        if (window.CI360 && typeof window.CI360.init === 'function') {
            window.CI360.init();
        }
    }, []);

    return (
        <div className="car-360-view-container">
            <div
                className="cloudimage-360"
                data-folder="https://scaleflex.cloudimg.io/v7/demo/360-car/"
                data-filename="iris-{index}.jpg"
                data-amount="36"
                data-auto-play="true"
                data-magnifier="2"
                data-speed="100"
                data-drag-speed="150"
            ></div>
        </div>
    );
};

export default Car360Viewer;
