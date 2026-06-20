'use client';

import { useState, useCallback, useEffect, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Spotlight } from '@/components/ui/spotlight-new';
import {
    ChevronUp,
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Copy,
    Check,
    X,
    Music,
    Phone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';
import { portfolioData } from '@/data/portfolio';

const XIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const DiscordIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
    </svg>
);

const socialIcons: { [key: string]: any } = {
    github: Github,
    linkedin: Linkedin,
    twitter: XIcon,
    x: XIcon,
    instagram: Instagram,
    discord: DiscordIcon,
    spotify: Music,
    phone: Phone,
};

const marqueeKeys = ['0', '1', '2', '3', '4', '5'];

function Marquee() {
    const t = useTranslations('footer.marquee') as (key: string) => string;
    return (
        <div className="relative flex overflow-hidden py-4 bg-zinc-50 dark:bg-black border-y border-zinc-200 dark:border-white/10 backdrop-blur-sm">
            <motion.div
                className="flex gap-12 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                {[...marqueeKeys, ...marqueeKeys, ...marqueeKeys].map((key, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-mono tracking-widest uppercase text-muted-foreground/80">
                        <span>{t(key)}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    </div>
                ))}
            </motion.div>

            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10" />
        </div>
    );
}

import { SocialLink } from '@/types/index';

function SocialCard({ social }: { social: SocialLink }) {
    const Icon = socialIcons[social.icon] || Github;

    return (
        <motion.a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-4 h-11 md:h-12 transition-all duration-300 rounded-full border border-white/5 bg-secondary/30 hover:bg-secondary/50 backdrop-blur-sm shadow-sm"
            whileHover={{ y: -4, scale: 1.05 }}
        >
            <Icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            <span className="text-sm md:text-base font-bold tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">{social.platform}</span>
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-all duration-300" />
        </motion.a>
    );
}

export function Footer() {
    const { theme } = useTheme();
    const tNav = useTranslations('navigation');
    const t = useTranslations('footer');
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAboutExpanded, setIsAboutExpanded] = useState(false);
    const [isEmailHovered, setIsEmailHovered] = useState(false);
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [copyrightIndex, setCopyrightIndex] = useState(0);
    const [localTime, setLocalTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Riyadh'
            };
            const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
            // Madinah is UTC+3
            setLocalTime(`${timeString} UTC+3`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setCopyrightIndex(prev => (prev + 1) % 2);
        }, 2500); // Trigger every 2.5s
        return () => clearInterval(interval);
    }, []);

    const currentYear = new Date().getFullYear();

    // Lock body scroll when footer is expanded
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isExpanded]);

    const toggleExpand = useCallback(() => {
        setIsExpanded((prev) => !prev);
    }, []);

    const closeExpanded = useCallback(() => {
        setIsExpanded(false);
    }, []);

    const handleNavigation = useCallback((href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        closeExpanded();
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
    }, [pathname, closeExpanded]);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(portfolioData.personal.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Animation variants
    const overlayVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    const isBlog = pathname?.includes('/blog');
    const isBlogDetail = pathname?.includes('/blog/') && pathname.split('/blog/')[1]?.length > 0;

    const previewSocials = portfolioData.personal.socialLinks
        .filter((s: SocialLink) => s.platform !== 'Spotify')
        .slice(0, 5);

    return (
        <>
            {/* Compact Footer - Always visible */}
            <footer className={cn(
                isBlog ? 'absolute bottom-0 w-full border-t-0 pointer-events-none !bg-transparent z-20' : 'relative z-20 mt-auto dark:bg-black',
                isExpanded && 'opacity-0 pointer-events-none'
            )}>
                <div className={`max-w-[1600px] mx-auto relative z-10 px-6 md:px-12 lg:px-24 py-6 md:py-8 pointer-events-auto ${isBlog ? '!bg-transparent' : ''}`}>
                    <div className={`
                        px-6 md:px-8 py-4 md:py-6 transition-all duration-300
                        ${isBlog
                            ? 'bg-card dark:bg-black/40 dark:backdrop-blur-xl border-2 border-foreground/10 dark:border-white/5 rounded-[2rem] shadow-xl dark:shadow-black/20'
                            : 'glass-card'
                        }
                    `}>
                        <div className="flex items-center justify-between gap-4">
                            {/* Left Side - Animated Copyright */}
                            <div className="flex items-center gap-1.5 md:gap-2 pl-2 md:pl-4 z-10 overflow-hidden h-6">
                                <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isBlog ? 'text-muted-foreground' : 'text-gradient'}`}>
                                    © {currentYear}
                                </span>
                                <div className="relative w-[280px] h-full flex items-center">
                                    <AnimatePresence mode="popLayout">
                                        {mounted && (
                                            <motion.span
                                                key={copyrightIndex}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -20, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                                className={`absolute left-0 text-xs md:text-sm font-bold uppercase tracking-widest whitespace-nowrap ${isBlog ? 'text-muted-foreground' : 'text-gradient'}`}
                                            >
                                                {copyrightIndex === 0
                                                    ? `${portfolioData.personal.name}.`
                                                    : "All rights reserved."}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Right Side - Socials & More Button */}
                            <div className="flex items-center justify-end gap-4 md:gap-8 z-10 ml-auto">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    {/* Social Icons */}
                                    {previewSocials.map((social: SocialLink) => {
                                        const Icon = socialIcons[social.icon];
                                        return (
                                            <Fragment key={social.platform}>
                                                <motion.a
                                                    href={social.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 rounded-full hover:bg-foreground/5 transition-all text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95"
                                                    aria-label={social.platform}
                                                >
                                                    {Icon && <Icon className="w-4 h-4" />}
                                                </motion.a>
                                            </Fragment>
                                        );
                                    })}
                                </div>

                                <motion.button
                                    onClick={toggleExpand}
                                    className={`
                                            flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full transition-all text-xs font-black uppercase tracking-[0.2em]
                                            ${isBlog
                                            ? 'bg-muted/50 border-2 border-foreground/10 text-foreground hover:bg-muted hover:border-foreground/20'
                                            : 'bg-muted hover:bg-muted/80 text-foreground'
                                        }
                                        `}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="hidden sm:inline">{t('more')}</span>
                                    <motion.span
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronUp className="w-4 h-4" />
                                    </motion.span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Expanded Footer Overlay */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            variants={overlayVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed inset-0 z-[10000] bg-white dark:bg-black flex flex-col pt-0 overflow-hidden"
                        >
                            <Spotlight
                                gradientFirst={theme === 'dark'
                                    ? "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)"
                                    : "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 20%, .03) 0, hsla(0, 0%, 15%, .01) 50%, hsla(0, 0%, 10%, 0) 80%)"
                                }
                                gradientSecond={theme === 'dark'
                                    ? "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)"
                                    : "radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 20%, .02) 0, hsla(0, 0%, 15%, .01) 80%, transparent 100%)"
                                }
                                gradientThird={theme === 'dark'
                                    ? "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)"
                                    : "radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 20%, .01) 0, hsla(0, 0%, 15%, .01) 80%, transparent 100%)"
                                }
                            />

                            {/* Top Marquee */}
                            <div className="flex-shrink-0 pt-[5vh]">
                                <Marquee />
                            </div>

                            <div className="flex-1 flex flex-col px-[8vw] pt-[4vh] pb-0 justify-between relative">
                                <div className="flex-1 flex flex-col justify-center max-w-[1600px] w-full mx-auto relative">

                                    {/* Close Button - Size-Locked with clamp */}
                                    <div className="absolute top-0 right-[-2vw] z-[10001]">
                                        <motion.button
                                            onClick={closeExpanded}
                                            className="relative p-[clamp(12px,1.2vw,20px)] flex items-center justify-center"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <div className="absolute inset-0 rounded-full bg-black dark:bg-white shadow-2xl" />
                                            <motion.div
                                                className="relative z-10 flex items-center justify-center"
                                                whileHover={{ rotate: 90 }}
                                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                            >
                                                <X className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)] text-white dark:text-black" strokeWidth={2.5} />
                                            </motion.div>
                                        </motion.button>
                                    </div>

                                    {/* Main Grid - Forced 4-column layout regardless of zoom/screen */}
                                    <div className="w-full grid grid-cols-4 gap-x-[5vw] gap-y-[4vh]">
                                        <FooterColumn title={t('links')}>
                                            <FooterLink href="/" onClick={handleNavigation('/')}>{tNav('home')}</FooterLink>
                                            <FooterLink href="/#education" onClick={handleNavigation('/#education')}>{tNav('resume')}</FooterLink>
                                            <FooterLink href="/#contact" onClick={handleNavigation('/#contact')}>{tNav('contact')}</FooterLink>
                                            <AboutHoverMenu tNav={tNav} onExpandChange={setIsAboutExpanded} handleNavigation={handleNavigation} />
                                        </FooterColumn>

                                        <FooterColumn title={t('socials')}>
                                            <div
                                                className="relative flex items-center gap-2 group w-fit"
                                                onMouseEnter={() => setIsEmailHovered(true)}
                                                onMouseLeave={() => setIsEmailHovered(false)}
                                            >
                                                <FooterLink href={`mailto:${portfolioData.personal.email}`}>Email</FooterLink>
                                                <AnimatePresence>
                                                    {isEmailHovered && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: 5 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 5 }}
                                                            className="absolute left-full ml-[clamp(8px,1vw,16px)] whitespace-nowrap flex items-center gap-[clamp(4px,0.5vw,8px)] z-50"
                                                        >
                                                            <span className="text-[clamp(12px,1.1vw,18px)] font-medium text-zinc-400 dark:text-zinc-500 select-all">
                                                                {portfolioData.personal.email}
                                                            </span>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleCopyEmail();
                                                                }}
                                                                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                                                title="Copy Email"
                                                            >
                                                                {copied ? <Check className="w-[clamp(14px,1vw,20px)] h-[clamp(14px,1vw,20px)] text-green-500" /> : <Copy className="w-[clamp(14px,1vw,20px)] h-[clamp(14px,1vw,20px)]" />}
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            <FooterLink href={portfolioData.personal.socialLinks.find(s => s.platform === 'LinkedIn')?.url || '#'} target="_blank">LinkedIn</FooterLink>
                                            <FooterLink href={portfolioData.personal.socialLinks.find(s => s.platform.toLowerCase() === 'twitter' || s.platform.toLowerCase() === 'x')?.url || '#'} target="_blank">X</FooterLink>
                                            <FooterLink href={portfolioData.personal.socialLinks.find(s => s.platform === 'GitHub')?.url || '#'} target="_blank">GitHub</FooterLink>
                                            {portfolioData.personal.phone && (
                                                <FooterLink href={`tel:${portfolioData.personal.phone}`}>Phone</FooterLink>
                                            )}
                                        </FooterColumn>

                                        <FooterColumn title={t('localTime')}>
                                            <p className="text-zinc-900 dark:text-white text-[1.2vw] min-text-[14px] font-medium tracking-tight">
                                                {localTime}
                                            </p>
                                            <a
                                                href="https://www.google.com/maps/place/Riyadh,+Saudi+Arabia"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-900 dark:text-white text-[1.2vw] min-text-[14px] font-medium tracking-tight hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors inline-block"
                                            >
                                                Riyadh, Saudi Arabia
                                            </a>
                                        </FooterColumn>

                                        <FooterColumn title={t('version')}>
                                            <p className="text-zinc-900 dark:text-white text-[1.2vw] min-text-[14px] font-medium tracking-tight">
                                                {t('versionEdition')}
                                            </p>
                                        </FooterColumn>
                                    </div>
                                </div>

                                {/* Bottom Brand Name - Scaled and Clipped (Top-half visible) */}
                                <div className="mt-auto overflow-hidden flex-shrink-0 relative">
                                    <motion.h2
                                        initial={{ opacity: 0, y: "100%" }}
                                        animate={isAboutExpanded ? { opacity: 0, y: "120%" } : { opacity: 1, y: "38%" }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-[18vw] font-black leading-none text-zinc-900 dark:text-white tracking-tighter select-none text-center"
                                    >
                                        OSAMA
                                    </motion.h2>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-[1.5vw]">
            <h3 className="text-zinc-500 text-[clamp(10px,0.8vw,14px)] font-bold tracking-widest uppercase">{title}</h3>
            <div className="flex flex-col gap-[0.8vw]">
                {children}
            </div>
        </div>
    );
}

function FooterLink({ href, children, target, onClick }: { href: string; children: React.ReactNode; target?: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    const isMailOrTel = href.startsWith('mailto:') || href.startsWith('tel:');

    return (
        <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {isInternal ? (
                <Link
                    href={href}
                    target={target}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    onClick={onClick}
                    className="text-zinc-900 dark:text-white text-[clamp(14px,1.2vw,22px)] font-medium hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors w-fit whitespace-nowrap block"
                >
                    {children}
                </Link>
            ) : (
                <a
                    href={href}
                    target={isMailOrTel ? undefined : (target || '_blank')}
                    rel={isMailOrTel ? undefined : 'noopener noreferrer'}
                    onClick={onClick}
                    className="text-zinc-900 dark:text-white text-[clamp(14px,1.2vw,22px)] font-medium hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors w-fit whitespace-nowrap block"
                >
                    {children}
                </a>
            )}
        </motion.div>
    );
}

function AboutHoverMenu({ tNav, onExpandChange, handleNavigation }: { tNav: (key: string) => string; onExpandChange: (expanded: boolean) => void; handleNavigation: (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);

    const subLinks = [
        { href: '/#education', label: tNav('education') },
        { href: '/#experience', label: tNav('experience') },
        { href: '/#certifications', label: tNav('certifications') },
        { href: '/skills', label: tNav('skills') },
        { href: '/#projects', label: tNav('projects') },
    ];

    const active = isMobile ? isOpen : isHovered;

    useEffect(() => {
        onExpandChange(active);
    }, [active, onExpandChange]);

    const containerVariants = {
        open: {
            height: 'auto',
            opacity: 1,
            transition: {
                height: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.4, ease: "linear" },
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
        closed: {
            height: 0,
            opacity: 0,
            transition: {
                height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.2, ease: "linear" },
                staggerChildren: 0.03,
                staggerDirection: -1
            }
        }
    };

    const itemVariants = {
        open: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
        closed: { y: 10, opacity: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div
            className="flex flex-col gap-2"
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
            <div
                className="flex items-center gap-2 cursor-pointer group w-fit"
                onClick={() => isMobile && setIsOpen(!isOpen)}
            >
                <Link
                    href="/#about"
                    onClick={handleNavigation('/#about')}
                    className="text-zinc-900 dark:text-white text-[clamp(14px,1.2vw,22px)] font-medium group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors"
                >
                    {tNav('about')}
                </Link>
                <motion.div
                    animate={{ rotate: active ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronUp className="w-4 h-4 text-zinc-500 transform rotate-180" />
                </motion.div>
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div
                        variants={containerVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="overflow-hidden flex flex-col gap-2 pl-4 border-l border-zinc-200 dark:border-white/10 ml-2"
                    >
                        {subLinks.map((link) => (
                            <motion.div key={link.href} variants={itemVariants}>
                                <Link
                                    href={link.href}
                                    onClick={handleNavigation(link.href)}
                                    className="text-zinc-500 dark:text-zinc-400 text-[clamp(12px,1vw,18px)] font-medium hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}




