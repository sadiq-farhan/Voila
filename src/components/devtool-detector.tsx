'use client';

import { useEffect } from 'react';

export function DevToolDetector() {
    useEffect(() => {
        // Only run in production
        // if (process.env.NODE_ENV !== 'production') return;

        // Dynamically import to avoid SSR issues
        import('disable-devtool').then((module) => {
            module.default({
                ondevtoolopen: () => {
                    localStorage.clear();
                    // Redirect to warning page
                    window.location.reload();
                    window.location.href = '/warning';
                },
                interval: 1000, // Check every second
                disableMenu: true, // Don't disable right-click
                clearIntervalWhenDevOpenTrigger: true,
                clearLog: true,
            });
        });
    }, []);

    return null;
}
