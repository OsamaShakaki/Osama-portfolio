'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar, Footer } from '@/components/layout';
import { BackToTop } from '@/components/ui/BackToTop';

export function ConditionalNavigation({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Force the locale cookie to 'en' to clean up any leftover 'ar' session cookies
        document.cookie = 'locale=en;path=/;max-age=31536000;path=/';
    }, []);

    const segments = pathname?.split('/').filter(Boolean) || [];
    const projectsIndex = segments.indexOf('projects');
    const isProjectDetail = projectsIndex !== -1 && segments.length > projectsIndex + 1;
    const blogIndex = segments.indexOf('blog');
    const isBlogDetail = blogIndex !== -1 && segments.length > blogIndex + 1;
    const isWorkspace = segments.includes('workspace');

    // Default to true for SSR to match the most common initial state,
    // but only actually render the conditional logic once mounted to avoid mismatches.
    const useFullLayout = !(isProjectDetail || isBlogDetail || isWorkspace);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <div
            className={useFullLayout ? "relative min-h-screen flex flex-col" : "contents"}
        >
            {useFullLayout && <Navbar />}
            <div className={useFullLayout ? "flex-1 relative" : "contents"}>
                {children}
            </div>
            {useFullLayout && <Footer />}
            {useFullLayout && <BackToTop />}
        </div>
    );
}
