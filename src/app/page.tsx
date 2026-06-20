'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingScreen } from '@/components/layout';
import { SocialCorner } from '@/components/layout/SocialCorner';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Footer = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer), {
    ssr: false
});



const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
    ssr: false,
    loading: () => <div className="h-[600px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5" />
});



const HeroVisual = dynamic(() => import("@/components/sections/HeroVisual").then(mod => mod.HeroVisual), {
    ssr: false
});

// ─── Helpers (Keeping Original Design) ───────────────────────────────────────


const MetricCTAHijack = () => {
    return (
        <section className="relative z-20 bg-background dark:bg-black">
            {/* Top shadow element to prevent downward bleeding into footer */}
            <div className="absolute top-0 left-0 w-full h-10 shadow-[0_-50px_100px_rgba(0,0,0,0.05)] dark:shadow-[0_-50px_150px_rgba(0,0,0,0.8)] -z-10" />

            <div className="h-[10vh]" />
            <CTASection />
            <div className="h-20" />
        </section>
    );
};

const CTASection = dynamic(() => import("@/components/sections/CTASection"), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5" />
});

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('portfolioLoaded');
        if (hasLoaded) {
            setIsLoading(false);
            setIsExiting(true);
        }

        if (typeof window === 'undefined' || !('ResizeObserver' in window)) return;
        const refreshLayout = () => {
            window.dispatchEvent(new Event('resize'));
            ScrollTrigger.refresh();
        };
        const resizeObserver = new ResizeObserver(() => { refreshLayout(); });
        resizeObserver.observe(document.body);
        window.addEventListener('load', refreshLayout);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('load', refreshLayout);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    useEffect(() => {
        if (isExiting && !isLoading) {
            const timer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 1500); // Once, after transition is likely done
            return () => clearTimeout(timer);
        }
    }, [isExiting, isLoading]);

    useEffect(() => {
        if (pathname !== '/' || isLoading) return;
        const handleHashScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                const targetId = hash.substring(1);
                if (!targetId) return;

                // Robust polling to wait for the element to exist in the DOM (e.g. dynamic/lazy components)
                let attempts = 0;
                const maxAttempts = 60; // up to 3 seconds
                const interval = setInterval(() => {
                    const element = document.getElementById(targetId);
                    if (element) {
                        clearInterval(interval);
                        // Add a tiny delay to ensure Layout & scroll engine (Lenis) are fully settled
                        setTimeout(() => {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }, 50);
                    }
                    attempts++;
                    if (attempts >= maxAttempts) {
                        clearInterval(interval);
                    }
                }, 50);
            }
        };

        const timer = setTimeout(handleHashScroll, 100);
        window.addEventListener('hashchange', handleHashScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('hashchange', handleHashScroll);
        };
    }, [pathname, isLoading]);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        if (!window.location.hash) {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
        sessionStorage.setItem('portfolioLoaded', 'true');
        setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    };

    const handleExitStart = () => {
        setIsExiting(true);
    };

    return (
        <>
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} onExitStart={handleExitStart} duration={2500} />}
            <motion.main
                initial={{ opacity: 0, y: 40 }}
                animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                    duration: 1.4,
                    ease: [0.16, 1, 0.3, 1], // Expo out for snappy yet smooth feel
                    opacity: { duration: 0.8 }
                }}
                className="relative overflow-x-clip will-change-transform will-change-opacity"
            >
                {/* 
                   Hero di-mount bersamaan dengan LoadingScreen agar "nyambung".
                   Komponen internal Hero menggunakan state isExiting untuk memulai animasinya.
                */}
                <HeroVisual isExiting={isExiting || !isLoading} />

                {!isLoading && (
                    <>
                        <AboutSection />
                        <MetricCTAHijack />
                        <SocialCorner className="fixed bottom-12 right-12 z-[30]" />
                    </>
                )}
            </motion.main>
        </>
    );
}
