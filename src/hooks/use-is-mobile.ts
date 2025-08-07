import React, { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768; // You can adjust this value

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    return isMobile;
}
