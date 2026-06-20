'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { portfolioData } from '@/data/portfolio';
import {
    MapPin,
    Clock,
    Briefcase,
    GraduationCap,
    Award,
    Linkedin,
    Github,
    Mail,
    Sun,
    Moon,
    Home,
    CheckCircle2,
    ArrowUpRight,
    FileText,
    Bot,
    ChevronDown,
    X,
    Phone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DeveloperTerminal } from '@/components/ui/DeveloperTerminal';

const XIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

interface DockItemProps {
    tooltip: string;
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    external?: boolean;
    active?: boolean;
    hasNotification?: boolean;
    className?: string;
}

function DockItem({ tooltip, children, onClick, href, external, active, hasNotification, className }: DockItemProps) {
    const [hovered, setHovered] = useState(false);

    const content = (
        <motion.div
            className={cn(
                "relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300",
                "border border-zinc-200 dark:border-zinc-800 bg-background/50 dark:bg-zinc-950/50 text-muted-foreground hover:text-foreground",
                "hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50",
                active && "border-zinc-800 dark:border-zinc-200 bg-zinc-100/80 dark:bg-zinc-900/80 text-foreground shadow-[0_4px_12px_rgba(0,0,0,0.05)] font-bold"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
            {hasNotification && (
                <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-background dark:border-zinc-950" />
            )}
            
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.85, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                        exit={{ opacity: 0, y: 10, scale: 0.85, x: '-50%' }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute bottom-full mb-3 left-1/2 bg-zinc-950 dark:bg-zinc-900 text-white text-[11px] font-medium px-4 py-1.5 rounded-full whitespace-nowrap shadow-xl pointer-events-none z-[1000] border border-white/5"
                    >
                        {tooltip}
                        {/* Downward triangle arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-950 dark:bg-zinc-900 rotate-45 border-r border-b border-white/5" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );

    if (href) {
        const isMailOrTel = href.startsWith('mailto:') || href.startsWith('tel:');
        if (isMailOrTel) {
            return (
                <a 
                    href={href} 
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}
                    className="block"
                >
                    {content}
                </a>
            );
        }
        if (external) {
            return (
                <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}
                    className="block"
                >
                    {content}
                </a>
            );
        }
        return (
            <Link 
                href={href} 
                onMouseEnter={() => setHovered(true)} 
                onMouseLeave={() => setHovered(false)}
                className="block"
            >
                {content}
            </Link>
        );
    }

    return (
        <button 
            onClick={onClick} 
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}
            className={cn("block", className)}
        >
            {content}
        </button>
    );
}

// Live clock showing Riyadh/Saudi Arabia time (UTC+3)
function RiyadhClock() {
    const [time, setTime] = useState<string>('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
                timeZone: 'Asia/Riyadh'
            };
            const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
            setTime(timeString);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return <span className="opacity-0">00:00:00 AM</span>;
    return <span>{time}</span>;
}

const techLogos: Record<string, string> = {
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'LangChain': 'https://cdn.simpleicons.org/langchain',
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'YOLO': 'https://cdn.simpleicons.org/yolo',
    'Azure AI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    'Power BI': '/powerbi.svg',
    'HTML/CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
};

const toolLogos: Record<string, string> = {
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'Jupyter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
    'Antigravity': 'https://cdn.simpleicons.org/googlegemini',
    'MySQL Workbench': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'Hugging Face': 'https://cdn.simpleicons.org/huggingface',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'Ollama': 'https://cdn.simpleicons.org/ollama',
};

export default function WorkspacePage() {
    const { personal, experiences, education, projects, hardSkills, softSkills, techStack, achievements } = portfolioData;
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [currentLocale] = useState('en');
    const [isImageOpen, setIsImageOpen] = useState(false);

    const tData = useTranslations('data');
    const tNav = useTranslations('navigation');
    const tSkills = useTranslations('skills');

    useEffect(() => {
        setMounted(true);
        // Force the locale cookie to 'en' to clean up any leftover 'ar' session cookies
        document.cookie = 'locale=en;path=/;max-age=31536000;path=/';
        // Force the viewport to start at the top of the page
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    const isDark = resolvedTheme === 'dark';

    const translate = useCallback((key: string, fallback: string): string => {
        try {
            return tData.has(key) ? tData(key) : fallback;
        } catch {
            return fallback;
        }
    }, [tData]);

    const translateArray = useCallback((key: string, fallback: string[]): string[] => {
        try {
            return tData.has(key) ? tData.raw(key) : fallback;
        } catch {
            return fallback;
        }
    }, [tData]);

    // Translate dynamic lists
    const translatedProjects = useMemo(() => projects.map(project => ({
        ...project,
        title: translate(`projects.${project.id}.title`, project.title),
        description: translate(`projects.${project.id}.description`, project.description),
        longDescription: translate(`projects.${project.id}.longDescription`, project.longDescription || project.description),
        category: translate(`projects.${project.id}.category`, project.category || ''),
        role: translate(`projects.${project.id}.role`, project.role || ''),
        team: translate(`projects.${project.id}.team`, project.team || ''),
        highlights: translateArray(`projects.${project.id}.highlights`, project.highlights || [])
    })), [projects, translate, translateArray]);

    const translatedExperiences = useMemo(() => experiences.map(exp => ({
        ...exp,
        company: translate(`experiences.${exp.id}.company`, exp.company),
        position: translate(`experiences.${exp.id}.position`, exp.position),
        description: translate(`experiences.${exp.id}.description`, exp.description),
        location: translate(`experiences.${exp.id}.location`, exp.location || ''),
        responsibilities: translateArray(`experiences.${exp.id}.responsibilities`, exp.responsibilities || []),
        skills: translateArray(`experiences.${exp.id}.skills`, exp.skills || [])
    })), [experiences, translate, translateArray]);

    const translatedEducation = useMemo(() => education.map(edu => ({
        ...edu,
        institution: translate(`education.${edu.id}.institution`, edu.institution),
        degree: translate(`education.${edu.id}.degree`, edu.degree),
        major: translate(`education.${edu.id}.major`, edu.major),
        gpa: translate(`education.${edu.id}.gpa`, edu.gpa || ''),
        achievements: translateArray(`education.${edu.id}.achievements`, edu.achievements || [])
    })), [education, translate, translateArray]);

    const translatedAchievements = useMemo(() => achievements.map(cert => ({
        ...cert,
        title: translate(`achievements.${cert.id}.title`, cert.title),
        issuer: translate(`achievements.${cert.id}.issuer`, cert.issuer),
        description: translate(`achievements.${cert.id}.description`, cert.description || '')
    })), [achievements, translate, translateArray]);

    const translatedSoftSkills = useMemo(() => softSkills.map(s => ({
        ...s,
        name: translate(`softSkills.${s.name}.name`, s.name),
        description: translate(`softSkills.${s.name}.description`, s.description || '')
    })), [softSkills, translate]);

    // Social Links
    const githubLink = personal.socialLinks.find(s => s.platform.toLowerCase() === 'github')?.url || '#';
    const linkedinLink = personal.socialLinks.find(s => s.platform.toLowerCase() === 'linkedin')?.url || '#';
    const twitterLink = personal.socialLinks.find(s => s.platform.toLowerCase() === 'twitter' || s.platform.toLowerCase() === 'x')?.url || '#';

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500 font-sans pb-32">
            {/* Top Minimal Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

            <div className="max-w-[760px] mx-auto px-6 pt-16 md:pt-24 space-y-12">
                
                {/* ─── HEADER SECTION ─── */}
                <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-start gap-6 pb-8 border-b border-border/50 text-left">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">{personal.name}</h1>
                            <span className="inline-flex items-center justify-center text-blue-500 bg-blue-500/10 p-1 rounded-full w-6 h-6" title="Verified AI Engineer">
                                <CheckCircle2 className="w-4 h-4 fill-current text-white dark:text-black" />
                            </span>
                        </div>
                        
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                            {translate("personal.subtitle", personal.subtitle)}
                        </p>
                        
                        {/* Badges container */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono">
                            <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-bold bg-green-500/10 px-2.5 py-1 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                {translate("personal.available", "Available for opportunities")}
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                                <MapPin className="w-3.5 h-3.5" />
                                {translate("personal.location", personal.location)}
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                                <Clock className="w-3.5 h-3.5" />
                                <RiyadhClock />
                            </div>
                        </div>
                    </div>
                    
                    {/* Avatar circle */}
                    <div className="relative flex-shrink-0 select-none">
                        {/* Avatar Image container */}
                        <div 
                            onClick={() => setIsImageOpen(true)}
                            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-border/80 overflow-hidden bg-muted relative group shadow-md cursor-pointer block"
                        >
                            <img 
                                src={personal.avatar} 
                                alt={personal.name}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                    // Fallback avatar if local image doesn't exist yet
                                    e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${personal.name}&backgroundColor=3b82f6`;
                                }}
                            />
                        </div>

                        {/* Floating Arrow button */}
                        <Link 
                            href="/contact" 
                            className="absolute -bottom-1 -right-1 w-8 h-8 md:w-9 md:h-9 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 z-10 cursor-pointer text-zinc-600 dark:text-zinc-300"
                            title="Let's Connect"
                        >
                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                        </Link>
                    </div>
                </div>

                {/* ─── ABOUT SECTION ─── */}
                <div className="space-y-4 text-left">
                    <h2 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-muted-foreground">{tNav('about')}</h2>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-justify">
                        {translate("personal.bio", personal.bio)}
                    </p>
                </div>

                {/* ─── EXPERIENCE SECTION ─── */}
                <div className="space-y-6 text-left">
                    <h2 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-muted-foreground">
                        Work Experience
                    </h2>
                    <div className="relative border-border border-l pl-6 ml-3 space-y-8">
                        {translatedExperiences.map((exp) => (
                            <div key={exp.id} className="relative group">
                                {/* Timeline Dot */}
                                <div className={cn(
                                    "absolute top-1.5 w-3 h-3 rounded-full bg-background border-2 border-blue-500 group-hover:bg-blue-500 transition-colors duration-300",
                                    "-left-[31px]"
                                )} />
                                
                                <div className="flex flex-col sm:flex-row gap-4 items-start">
                                    {exp.logo && (
                                        <div className="relative group/logo flex-shrink-0 self-center sm:self-start">
                                            {/* Ambient Glow */}
                                            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-15 blur-sm group-hover/logo:opacity-40 transition-opacity duration-500" />
                                            {/* Gradient Border Frame */}
                                            <div className="relative p-[1px] rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 group-hover/logo:from-blue-500 group-hover/logo:to-indigo-500 transition-all duration-500 shadow-md">
                                                {/* Logo Container */}
                                                <div className="w-12 h-12 rounded-[11px] bg-white dark:bg-zinc-950 p-1.5 flex items-center justify-center">
                                                    <img 
                                                        src={exp.logo} 
                                                        alt={exp.company} 
                                                        className="w-full h-full object-contain filter drop-shadow-sm group-hover/logo:scale-105 transition-transform duration-300" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex-1 space-y-1">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                            <h3 className="font-bold text-foreground text-sm md:text-base">{exp.position}</h3>
                                            <span className="text-xs font-mono text-muted-foreground sm:pt-0.5">
                                                {exp.startDate} - {exp.isOngoing ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                                            <span className="text-xs md:text-sm font-semibold text-blue-500">{exp.company}</span>
                                            <span className="text-xs text-muted-foreground/50">•</span>
                                            <span className="text-xs text-muted-foreground">{exp.location}</span>
                                        </div>
                                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pt-2">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── EDUCATION SECTION ─── */}
                <div className="space-y-6 text-left">
                    <h2 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-muted-foreground">{tNav('education')}</h2>
                    <div className="relative border-border border-l pl-6 ml-3 space-y-8">
                        {translatedEducation.map((edu) => (
                            <div key={edu.id} className="relative group">
                                {/* Timeline Dot */}
                                <div className={cn(
                                    "absolute top-1.5 w-3 h-3 rounded-full bg-background border-2 border-indigo-500 group-hover:bg-indigo-500 transition-colors duration-300",
                                    "-left-[31px]"
                                )} />
                                
                                <div className="flex flex-col sm:flex-row gap-4 items-start">
                                    {edu.logo && (
                                        <div className="relative group/logo flex-shrink-0 self-center sm:self-start">
                                            {/* Ambient Glow */}
                                            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 opacity-15 blur-sm group-hover/logo:opacity-40 transition-opacity duration-500" />
                                            {/* Gradient Border Frame */}
                                            <div className="relative p-[1px] rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 group-hover/logo:from-indigo-500 group-hover/logo:to-blue-500 transition-all duration-500 shadow-md">
                                                {/* Logo Container */}
                                                <div className="w-12 h-12 rounded-[11px] bg-white dark:bg-zinc-950 p-1.5 flex items-center justify-center">
                                                    <img 
                                                        src={edu.logo} 
                                                        alt={edu.institution} 
                                                        className="w-full h-full object-contain filter drop-shadow-sm group-hover/logo:scale-105 transition-transform duration-300" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex-1 space-y-1">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                            <h3 className="font-bold text-foreground text-sm md:text-base">{edu.degree}</h3>
                                            <span className="text-xs font-mono text-muted-foreground sm:pt-0.5">
                                                {edu.startDate} - {edu.isOngoing ? 'Present' : edu.endDate}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <GraduationCap className="w-4 h-4 text-indigo-500" />
                                            <span className="text-xs md:text-sm font-semibold text-indigo-500">{edu.institution}</span>
                                            {edu.gpa && (
                                                <>
                                                    <span className="text-xs text-muted-foreground/50">•</span>
                                                    <span className="text-xs font-mono font-bold text-muted-foreground">
                                                        GPA: {edu.gpa}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <p className="text-xs md:text-sm text-muted-foreground pt-1">{edu.major}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── SKILLS MATRIX ─── */}
                <div className="space-y-6 pt-4 text-left">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground">{tNav('skills')}</h2>

                    {/* Tech Stack */}
                    <div className="space-y-3">
                        <span className="text-[10px] font-mono font-black tracking-widest text-muted-foreground/60 uppercase">
                            Tech Stack
                        </span>
                        <div className="flex flex-wrap gap-2.5 justify-start">
                            {[
                                { name: 'Python', icon: 'python' },
                                { name: 'LangChain', icon: 'langchain' },
                                { name: 'TensorFlow', icon: 'tensorflow' },
                                { name: 'Pandas', icon: 'pandas' },
                                { name: 'PyTorch', icon: 'pytorch' },
                                { name: 'TypeScript', icon: 'typescript' },
                                { name: 'JavaScript', icon: 'javascript' },
                                { name: 'React', icon: 'react' },
                                { name: 'Next.js', icon: 'nextdotjs' },
                                { name: 'SQL', icon: 'mysql' },
                                { name: 'Java', icon: 'java' },
                                { name: 'YOLO', icon: 'yolo' },
                                { name: 'Azure AI', icon: 'azure' },
                                { name: 'Power BI', icon: '/powerbi.svg' },
                                { name: 'HTML/CSS', icon: 'html5' }
                            ].map((tech) => (
                                <div 
                                    key={tech.name} 
                                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-xs font-semibold text-foreground hover:scale-105 hover:shadow-md transition-all duration-300"
                                  >
                                    <img 
                                        src={techLogos[tech.name] || (tech.icon.startsWith('/') ? tech.icon : `https://cdn.simpleicons.org/${tech.icon}`)} 
                                        alt={tech.name} 
                                        className={cn(
                                            "w-4 h-4 object-contain",
                                            ['SQL', 'Pandas', 'VS Code', 'GitHub', 'Antigravity', 'Ollama'].includes(tech.name) && "dark:invert dark:brightness-200"
                                        )} 
                                    />
                                    <span>{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-mono font-black tracking-widest text-muted-foreground/60 uppercase">{tNav('tools')}</span>
                        <div className="flex flex-wrap gap-2.5">
                            {[
                                { name: 'VS Code', icon: 'visualstudiocode' },
                                { name: 'Jupyter', icon: 'jupyter' },
                                { name: 'Antigravity', icon: 'googlegemini' },
                                { name: 'MySQL Workbench', icon: 'mysql' },
                                { name: 'Git', icon: 'git' },
                                { name: 'GitHub', icon: 'github' },
                                { name: 'Hugging Face', icon: 'huggingface' },
                                { name: 'Figma', icon: 'figma' },
                                { name: 'Docker', icon: 'docker' },
                                { name: 'Ollama', icon: 'ollama' }
                            ].map((tool) => (
                                <div 
                                    key={tool.name} 
                                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-xs font-semibold text-foreground hover:scale-105 hover:shadow-md transition-all duration-300"
                                >
                                    <img 
                                        src={toolLogos[tool.name] || `https://cdn.simpleicons.org/${tool.icon}`} 
                                        alt={tool.name} 
                                        className={cn(
                                            "w-4 h-4 object-contain",
                                            ['VS Code', 'GitHub', 'Antigravity', 'Ollama'].includes(tool.name) && "dark:invert dark:brightness-200"
                                        )} 
                                    />
                                    <span>{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hard Skills */}
                    <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-mono font-black tracking-widest text-muted-foreground/60 uppercase">{tSkills('hard')}</span>
                        <div className="flex flex-wrap gap-2.5">
                            {[
                                { name: 'Data Science', border: 'border-emerald-400 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5' },
                                { name: 'Machine Learning', border: 'border-blue-400 dark:border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/5' },
                                { name: 'Deep Learning', border: 'border-blue-400 dark:border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/5' },
                                { name: 'NLP', border: 'border-blue-400 dark:border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/5' },
                                { name: 'Full Stack Developer', border: 'border-emerald-400 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5' },
                                { name: 'System Architecture', border: 'border-amber-400 dark:border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/5' }
                            ].map((skill) => (
                                <span 
                                    key={skill.name} 
                                    className={cn(
                                        "px-4 py-2 text-xs font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105",
                                        skill.border
                                    )}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Soft Skills */}
                    <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-mono font-black tracking-widest text-muted-foreground/60 uppercase">{tSkills('soft')}</span>
                        <div className="flex flex-wrap gap-2.5">
                            {translatedSoftSkills.map((skill) => (
                                <span 
                                    key={skill.name} 
                                    className="px-4 py-2 text-xs font-semibold rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm text-foreground hover:scale-105 hover:shadow-md transition-all duration-300"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* View All Skills button */}
                    <div className="flex justify-center pt-6">
                        <Link 
                            href="/skills" 
                            className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/50 hover:bg-muted/50 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 shadow-sm"
                        >
                            <span>View All Skills</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* ─── PROJECTS SECTION ─── */}
                <div className="space-y-6 pt-4 text-left">
                    <h2 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-muted-foreground">
                        Featured Projects
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {translatedProjects.map((project) => (
                            <div key={project.id} className="p-5 rounded-2xl bg-card border border-border/50 hover:border-blue-500/20 transition-colors group relative flex flex-col justify-between text-left">
                                <div className="space-y-2 text-left">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-foreground text-base group-hover:text-blue-500 transition-colors">{project.title}</h3>
                                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground">
                                            {project.category}
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed text-justify">
                                        {project.description}
                                    </p>
                                </div>
                                
                                {/* Tech Pills & Icon links */}
                                <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-border/30">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.techStack.slice(0, 4).map((tech) => (
                                            <span key={tech} className="px-2 py-0.5 text-[10px] font-mono rounded bg-foreground/5 text-foreground/70">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a href={githubLink} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                                            <Github className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── CERTIFICATIONS ─── */}
                <div className="space-y-4 pt-4 text-left">
                    <h2 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-muted-foreground">{tNav('certifications')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {translatedAchievements.map((ach) => (
                            <div key={ach.id} className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border/50 flex-row text-left">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                                    <Award className="w-4 h-4" />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-xs font-bold text-foreground leading-snug">{ach.title}</h4>
                                    <p className="text-[10px] text-muted-foreground">{ach.issuer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── INTERACTIVE TERMINAL ─── */}
                <div className="pt-4">
                    <DeveloperTerminal />
                </div>

            </div>

            {/* ─── FLOATING BOTTOM NAV BAR ─── */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] pointer-events-none w-fit">
                <div className="pointer-events-auto flex items-center gap-2 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/60 p-2 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                    {/* Group 1 */}
                    <div className="flex items-center gap-2">
                        <DockItem tooltip="Home" href="/#hero">
                            <Home className="w-5 h-5" />
                        </DockItem>
                        <DockItem tooltip="CV" href="/Osama_Shakaki_CV.pdf" external={true}>
                            <FileText className="w-5 h-5" />
                        </DockItem>
                    </div>

                    {/* Divider 1 */}
                    <div className="w-[1px] h-5 bg-zinc-200 dark:bg-zinc-800 mx-0.5 self-center" />

                    {/* Group 2 */}
                    <div className="flex items-center gap-2">
                        <DockItem tooltip="LinkedIn" href={linkedinLink} external={true}>
                            <Linkedin className="w-5 h-5" />
                        </DockItem>
                        <DockItem tooltip="X" href={twitterLink} external={true}>
                            <XIcon className="w-5 h-5" />
                        </DockItem>
                        <DockItem 
                            tooltip="Osama Ai" 
                            onClick={() => window.dispatchEvent(new CustomEvent('portfolio:toggle-chatbot'))}
                            hasNotification={true}
                            className="chatbot-toggle-btn"
                        >
                            <Bot className="w-5 h-5" />
                        </DockItem>
                        <DockItem tooltip="Email" href={`mailto:${personal.email}`}>
                            <Mail className="w-5 h-5" />
                        </DockItem>
                        {personal.phone && (
                            <DockItem tooltip="Phone" href={`tel:${personal.phone}`}>
                                <Phone className="w-5 h-5" />
                            </DockItem>
                        )}
                    </div>

                    {/* Divider 2 */}
                    <div className="w-[1px] h-5 bg-zinc-200 dark:bg-zinc-800 mx-0.5 self-center" />

                    {/* Group 3 */}
                    <div className="flex items-center gap-2">

                        <DockItem 
                            tooltip="Theme" 
                            onClick={() => setTheme(isDark ? 'light' : 'dark')}
                        >
                            {mounted && (isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
                        </DockItem>
                    </div>
                </div>
            </div>

            {/* Image Lightbox Modal */}
            <AnimatePresence>
                {isImageOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsImageOpen(false)}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        {/* Close button at the top right */}
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsImageOpen(false);
                            }}
                            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition-colors cursor-pointer z-50"
                            aria-label="Close"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        
                        {/* Enlarged Image container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative max-w-full max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-muted"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                src={personal.avatar} 
                                alt={personal.name}
                                className="max-w-[90vw] max-h-[80vh] md:max-w-[600px] object-contain rounded-3xl"
                                onError={(e) => {
                                    e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${personal.name}&backgroundColor=3b82f6`;
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

