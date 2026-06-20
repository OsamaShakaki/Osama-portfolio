'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Moon, Sun, Globe, ChevronDown, Focus } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

function Clock() {
    const [time, setTime] = useState<string>('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const s = String(now.getSeconds()).padStart(2, '0');
            setTime(`${h}:${m}:${s}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return <span className="font-mono text-xl md:text-2xl font-black opacity-0">00:00:00</span>;

    return (
        <span className="font-mono text-xl md:text-2xl font-black text-gradient tracking-widest hover:tracking-[0.2em] transition-all duration-300">
            {time}
        </span>
    );
}

// Single-page navigation links helper
const getNavLinks = (t: any) => [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/#about' },
    { label: t('projects'), href: '/#projects' },
    { label: t('skills'), href: '/skills' },
    { label: t('experience'), href: '/#experience' },
    { label: t('certifications'), href: '/#certifications' },
    { label: t('contact'), href: '/#contact' },
];

export function Navbar() {
    const t = useTranslations('navigation');
    const navLinks = getNavLinks(t);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const pathname = usePathname();
    const { scrollY } = useScroll();

    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [currentLocale] = useState('en');

    const isDark = resolvedTheme === 'dark';

    useEffect(() => {
        setMounted(true);
        // Force the locale cookie to 'en' to clean up any leftover 'ar' session cookies
        document.cookie = 'locale=en;path=/;max-age=31536000;path=/';
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (isMenuOpen) return; // Don't hide navbar when menu is open

        const direction = latest > lastScrollY ? 'down' : 'up';
        setIsScrolled(latest > 50);

        if (direction === 'down' && latest > 100) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        setLastScrollY(latest);
    });

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const handleNavigation = useCallback((href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        const isAnchor = href.startsWith('#') || href.startsWith('/#');
        
        if (isAnchor) {
            const targetId = href.replace(/^\/?#/, '');
            if (pathname === '/') {
                e.preventDefault();
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', href);
                }
            }
        } else if (href === '/') {
            if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState(null, '', '/');
            }
        }
        closeMenu();
    }, [pathname, closeMenu]);

    // Animation variants
    const navVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
    };

    const menuVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    return (
        <>
            <motion.nav
                variants={navVariants}
                initial="hidden"
                animate={isVisible || isMenuOpen ? 'visible' : 'hidden'}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed top-0 left-0 right-0 z-[100]"
            >
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-4 md:py-6">
                    <motion.div
                        className={cn(
                            'flex items-center justify-between transition-all duration-500 rounded-full',
                            isScrolled ? 'glass-strong px-6 py-3' : 'py-2'
                        )}
                        layout
                    >
                        {/* Make the Clock a Link to Home */}
                        <Link href="/" className="relative group min-w-[120px]" onClick={handleNavigation('/')}>
                            <Clock />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-2">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={handleNavigation(item.href)}
                                    className="relative px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-all duration-300 rounded-full hover:bg-muted/50"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 md:gap-3">
                            {/* Workspace Button with Tooltip */}
                            <div className="relative group/tooltip flex items-center justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 md:p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors text-foreground"
                                    aria-label="Workspace"
                                >
                                    <Link href="/workspace">
                                        <Focus className="w-4 h-4" />
                                    </Link>
                                </motion.button>
                                <div className="absolute top-full mt-2.5 left-1/2 -translate-x-1/2 opacity-0 scale-95 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 ease-out bg-zinc-950 dark:bg-zinc-900 text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap shadow-xl border border-white/5 z-[1000] flex flex-col items-center">
                                    <span>Workspace</span>
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-950 dark:bg-zinc-900 rotate-45 border-l border-t border-white/5" />
                                </div>
                            </div>

                            {/* Theme Toggle with Tooltip */}
                            {mounted && (
                                <div className="relative group/tooltip flex items-center justify-center">
                                    <AnimatedThemeToggler />
                                    <div className="absolute top-full mt-2.5 left-1/2 -translate-x-1/2 opacity-0 scale-95 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 ease-out bg-zinc-950 dark:bg-zinc-900 text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap shadow-xl border border-white/5 z-[1000] flex flex-col items-center">
                                        <span>Theme</span>
                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-950 dark:bg-zinc-900 rotate-45 border-l border-t border-white/5" />
                                    </div>
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleMenu}
                                className="p-2 md:p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors lg:hidden"
                                aria-label="Toggle menu"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={isMenuOpen ? 'close' : 'menu'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.nav >

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {
                    isMenuOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[90] lg:hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-background"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            <div className="relative flex flex-col items-center justify-center h-full overflow-y-auto py-20">
                                <nav className="flex flex-col items-center gap-6">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={handleNavigation(link.href)}
                                            className="text-3xl font-black text-muted-foreground hover:text-foreground transition-all hover:scale-105 duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center gap-4 mt-12"
                                >

                                    {mounted && (
                                        <AnimatedThemeToggler
                                            className="px-6 py-6 glass-card text-sm font-medium hover:bg-muted/50 flex items-center gap-2"
                                        />
                                    )}
                                </motion.div>
                            </div>
                        </motion.div >
                    )
                }
            </AnimatePresence >
        </>
    );
}
