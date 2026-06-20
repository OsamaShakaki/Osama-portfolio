'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onComplete?: () => void;
    onExitStart?: () => void;
    duration?: number;
}

// Neural network background particles
function NeuralParticles() {
    const particles = useMemo(() =>
        Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 4,
            opacity: 0.1 + Math.random() * 0.3,
        })), []
    );

    const connections = useMemo(() => {
        const conns: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 25) {
                    conns.push({
                        x1: particles[i].x,
                        y1: particles[i].y,
                        x2: particles[j].x,
                        y2: particles[j].y,
                        delay: Math.random() * 2,
                    });
                }
            }
        }
        return conns;
    }, [particles]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {connections.map((conn, i) => (
                    <motion.line
                        key={`conn-${i}`}
                        x1={`${conn.x1}%`}
                        y1={`${conn.y1}%`}
                        x2={`${conn.x2}%`}
                        y2={`${conn.y2}%`}
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-foreground/[0.06]"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0, 0.15, 0] }}
                        transition={{
                            duration: 3,
                            delay: conn.delay,
                            repeat: Infinity,
                            repeatDelay: 1,
                        }}
                    />
                ))}
            </svg>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-foreground"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, p.opacity, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                />
            ))}
        </div>
    );
}

export function LoadingScreen({ onComplete, onExitStart, duration }: LoadingScreenProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [phase, setPhase] = useState<'init' | 'code' | 'title' | 'ready'>('init');
    const codeText = '<O.S />';
    const titleText = 'AI ENGINEER';
    const [displayedCode, setDisplayedCode] = useState('');
    const [displayedTitle, setDisplayedTitle] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => setShowCursor(prev => !prev), 530);
        return () => clearInterval(interval);
    }, []);

    // Phase 1: Start after a small delay
    useEffect(() => {
        const timer = setTimeout(() => setPhase('code'), 300);
        return () => clearTimeout(timer);
    }, []);

    // Phase 2: Type out <O.S />
    useEffect(() => {
        if (phase !== 'code') return;
        let i = 0;
        const interval = setInterval(() => {
            if (i < codeText.length) {
                setDisplayedCode(codeText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => setPhase('title'), 600);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [phase]);

    // Phase 3: Type out AI ENGINEER
    useEffect(() => {
        if (phase !== 'title') return;
        setDisplayedCode('');
        let i = 0;
        const interval = setInterval(() => {
            if (i < titleText.length) {
                setDisplayedTitle(titleText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => setPhase('ready'), 500);
            }
        }, 70);
        return () => clearInterval(interval);
    }, [phase]);

    // Phase 4: Complete
    useEffect(() => {
        if (phase !== 'ready') return;
        const timer = setTimeout(() => {
            setIsLoading(false);
            onExitStart?.();
            setTimeout(() => {
                onComplete?.();
            }, 1200);
        }, 400);
        return () => clearTimeout(timer);
    }, [phase, onComplete, onExitStart]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{
                        y: "-100%",
                        transition: {
                            duration: 1.2,
                            ease: [0.7, 0, 0.3, 1]
                        }
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden will-change-transform"
                >
                    {/* Neural network particles background */}
                    <NeuralParticles />

                    {/* Subtle radial glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.08)_0%,_transparent_60%)]" />

                    {/* Main content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            y: -40,
                            transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
                        }}
                        className="relative flex flex-col items-center justify-center will-change-transform z-10"
                    >
                        {/* Code tag phase */}
                        <AnimatePresence mode="wait">
                            {phase === 'code' || (phase === 'init') ? (
                                <motion.div
                                    key="code"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                                    transition={{ duration: 0.4 }}
                                    className="flex items-center"
                                >
                                    <span className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                                        {displayedCode}
                                    </span>
                                    <span
                                        className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-blue-500"
                                        style={{ opacity: showCursor ? 1 : 0 }}
                                    >
                                        |
                                    </span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="title"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <span className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-none">
                                        {displayedTitle}
                                    </span>
                                    <span
                                        className="text-blue-500 text-5xl sm:text-6xl md:text-8xl font-black"
                                        style={{ opacity: showCursor ? 1 : 0, marginTop: '-0.15em' }}
                                    >
                                        _
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Subtitle that fades in during title phase */}
                        <AnimatePresence>
                            {(phase === 'title' || phase === 'ready') && displayedTitle.length > 5 && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="mt-6 text-xs sm:text-sm font-mono text-muted-foreground tracking-[0.3em] uppercase"
                                >
                                    Osama Shakaki
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Bottom progress indicator */}
                    <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        <motion.div
                            className="h-[2px] bg-blue-500/60 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: phase === 'init' ? 0 : phase === 'code' ? 40 : phase === 'title' ? 80 : 120 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                    </motion.div>

                    {/* Scanning line effect */}
                    <motion.div
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
                        animate={{
                            top: ['0%', '100%'],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}