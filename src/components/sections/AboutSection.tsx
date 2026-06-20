"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { portfolioData } from "@/data/portfolio";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import {
  Brain,
  Trophy,
  GraduationCap,
  Code2,
  Sparkles,
  Briefcase,
  Award,
  Cpu,
  Database,
  Bot,
  Layers,
} from "lucide-react";
import Testimonial1 from "@/components/ui/testimonial-1";

// --- Utility: Slide Reveal ---
const SlideReveal = ({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, y }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
            duration: 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1],
            scale: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }}
    >
        {children}
    </motion.div>
);

// --- Project Card ---
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const isAward = project.highlights?.some((h: string) => h.includes("1st Place"));
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-card border border-border/50 rounded-2xl p-6 md:p-8 hover:border-blue-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5"
        >
            {/* Award badge */}
            {isAward && (
                <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg z-10">
                    🏆 1st Place
                </div>
            )}

            {/* Category badge */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-500 font-bold">
                    {project.category || 'Project'}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-foreground mb-3 group-hover:text-blue-500 transition-colors duration-300">
                {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                {project.longDescription || project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 5).map((tech: string) => (
                    <span
                        key={tech}
                        className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full bg-foreground/5 text-foreground/70 border border-foreground/10"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {/* Highlights */}
            {project.highlights && (
                <div className="flex flex-wrap gap-2">
                    {project.highlights.slice(0, 3).map((h: string) => (
                        <span key={h} className="text-[10px] font-medium text-blue-500/80">
                            ✦ {h}
                        </span>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

// --- Skill Pill ---
const SkillPill = ({ skill, index }: { skill: any; index: number }) => {
    const levelColors: Record<string, string> = {
        expert: "bg-blue-500/5 text-blue-600 dark:text-blue-400 border-blue-500/20",
        advanced: "bg-purple-500/5 text-purple-600 dark:text-purple-400 border-purple-500/20",
        intermediate: "bg-green-500/5 text-green-600 dark:text-green-400 border-green-500/20",
        beginner: "bg-zinc-500/5 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
    };

    const getSlug = (name: string) => {
        const mapping: Record<string, string> = {
            'c++': 'cplusplus',
            'c#': 'csharp',
            'node.js': 'nodedotjs',
            'express.js': 'express',
            'next.js': 'nextdotjs',
            'three.js': 'threedotjs',
            'socket.io': 'socketdotio',
            'scikit-learn': 'scikitlearn',
            'power bi': 'powerbi',
            'html': 'html5',
            'css': 'css3',
            'vs code': 'visualstudiocode',
            'jupyter notebook': 'jupyter',
            'github': 'github',
            'gemini': 'googlegemini',
            'claude': 'anthropic',
            'mcp': 'anthropic',
            'langsmith': 'langchain',
            'langgraph': 'langchain',
            'faiss': 'meta',
            'autogen': 'microsoft',
            'crewai': 'ai',
            'llamaindex': 'llamaindex',
            'n8n': 'n8n',
            'dify': 'dify',
            'groq': 'groq',
            'ollama': 'ollama',
            'mistral': 'mistral',
            'chromadb': 'chromadb',
            'pinecone': 'pinecone',
            'qdrant': 'qdrant',
            'milvus': 'milvus',
            'weaviate': 'weaviate',
            'huggingface': 'huggingface',
            'azure ai': 'azure'
        };
        const normalized = name.toLowerCase().trim();
        return mapping[normalized] || normalized.replace(/[^a-z0-9]/g, '');
    };

    const techIcon = portfolioData.techStack?.find(
        (t) => t.name.toLowerCase() === skill.name.toLowerCase()
    )?.icon || (getSlug(skill.name) === 'azure' ? 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' : `https://cdn.simpleicons.org/${getSlug(skill.name)}`);

    const isDarkLogo = [
        'sql',
        'mysql',
        'pandas',
        'ollama',
        'express',
        'express.js',
        'claude',
        'anthropic',
        'crewai',
        'figma',
        'github'
    ].includes(skill.name.toLowerCase().trim());

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all hover:scale-105 shadow-sm bg-background/50",
                levelColors[skill.level || 'intermediate']
            )}
        >
            {techIcon && (
                <img 
                    src={techIcon} 
                    alt={skill.name} 
                    className={cn(
                        "w-4 h-4 object-contain flex-shrink-0",
                        isDarkLogo && "dark:invert dark:brightness-200"
                    )}
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            )}
            <span>{skill.name}</span>
        </motion.div>
    );
};

// --- Certificate Card ---
const CertCard = ({ cert, index }: { cert: any; index: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-blue-500/20 transition-all group"
    >
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
            <Award className="w-5 h-5 text-blue-500" />
        </div>
        <div>
            <h4 className="font-bold text-foreground text-sm">{cert.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
        </div>
    </motion.div>
);



// ==================== MAIN ABOUT SECTION ====================
export default function AboutSection() {
    const t = useTranslations('about');
    const tNav = useTranslations('navigation');
    const tData = useTranslations('data');
    const { projects, hardSkills, softSkills, achievements, experiences, education } = portfolioData;
    const containerRef = useRef<HTMLElement>(null);

    const translate = (key: string, fallback: string): string => {
        try {
            return tData.has(key) ? tData(key) : fallback;
        } catch {
            return fallback;
        }
    };

    const translateArray = (key: string, fallback: string[]): string[] => {
        try {
            return tData.has(key) ? tData.raw(key) : fallback;
        } catch {
            return fallback;
        }
    };

    // Translate dynamic lists
    const translatedProjects = projects.map(project => ({
        ...project,
        title: translate(`projects.${project.id}.title`, project.title),
        description: translate(`projects.${project.id}.description`, project.description),
        longDescription: translate(`projects.${project.id}.longDescription`, project.longDescription || project.description),
        category: translate(`projects.${project.id}.category`, project.category || ''),
        role: translate(`projects.${project.id}.role`, project.role || ''),
        team: translate(`projects.${project.id}.team`, project.team || ''),
        highlights: translateArray(`projects.${project.id}.highlights`, project.highlights || [])
    }));

    const translatedExperiences = experiences.map(exp => ({
        ...exp,
        company: translate(`experiences.${exp.id}.company`, exp.company),
        position: translate(`experiences.${exp.id}.position`, exp.position),
        description: translate(`experiences.${exp.id}.description`, exp.description),
        location: translate(`experiences.${exp.id}.location`, exp.location || ''),
        responsibilities: translateArray(`experiences.${exp.id}.responsibilities`, exp.responsibilities || []),
        skills: translateArray(`experiences.${exp.id}.skills`, exp.skills || [])
    }));

    const translatedEducation = education.map(edu => ({
        ...edu,
        institution: translate(`education.${edu.id}.institution`, edu.institution),
        degree: translate(`education.${edu.id}.degree`, edu.degree),
        major: translate(`education.${edu.id}.major`, edu.major),
        gpa: translate(`education.${edu.id}.gpa`, edu.gpa || ''),
        achievements: translateArray(`education.${edu.id}.achievements`, edu.achievements || [])
    }));

    const translatedAchievements = achievements.map(cert => ({
        ...cert,
        title: translate(`achievements.${cert.id}.title`, cert.title),
        issuer: translate(`achievements.${cert.id}.issuer`, cert.issuer),
        description: translate(`achievements.${cert.id}.description`, cert.description || '')
    }));

    const translatedSoftSkills = softSkills.map(s => ({
        ...s,
        name: translate(`softSkills.${s.name}.name`, s.name),
        description: translate(`softSkills.${s.name}.description`, s.description || '')
    }));

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative bg-background text-foreground transition-colors duration-500"
        >
            {/* ─── SECTION 1: About Lead-in ─── */}
            <div className="relative py-24 md:py-40 overflow-hidden">
                {/* Background grid */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,_#00000008_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                    {/* Quote Section */}
                    <SlideReveal>
                        <div className="relative w-full bg-white dark:bg-black border border-blue-500/20 dark:border-blue-500/30 p-6 md:p-12 lg:p-16 overflow-hidden shadow-xl dark:shadow-2xl">
                            {/* Corner tabs */}
                            <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-blue-500 -translate-x-1 translate-y-[-50%] z-10" />
                            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 translate-x-1 translate-y-[-50%] z-10" />
                            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-blue-500 -translate-x-1 translate-y-[50%] z-10" />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-blue-500 translate-x-1 translate-y-[50%] z-10" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6 md:mb-10">
                                    <span className="text-blue-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">I BELIEVE IN</span>
                                    <span className="text-zinc-400 dark:text-zinc-600 text-[9px] font-mono tracking-widest uppercase hidden md:block">AI ENGINEER</span>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    className="mb-8 md:mb-14"
                                >
                                    <h2 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[76px] xl:text-[88px] font-bold tracking-tight leading-[0.92] text-zinc-900 dark:text-white">
                                        <span className="text-zinc-300 dark:text-zinc-700 mr-2">&quot;</span>
                                        {t('leadIn.applied')} <span className="text-zinc-400 dark:text-zinc-500 font-medium">{t('leadIn.intelligence')}</span> <br className="hidden md:block" />
                                        <span className="text-zinc-900 dark:text-white">because</span> {t('leadIn.production')} <span className="font-serif italic font-normal text-zinc-900 dark:text-white lowercase opacity-90">{t('leadIn.engineering')}</span>
                                        <span className="text-zinc-300 dark:text-zinc-700 ml-1">..&quot;</span>
                                    </h2>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-zinc-100 dark:border-zinc-900 pt-8 md:pt-12">
                                    <div className="md:col-span-5">
                                        <p className="text-base md:text-lg lg:text-xl font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed tracking-tight text-justify">
                                            <>I engineer <strong className="text-foreground">AI systems</strong> that don&apos;t just perform — they <em>transform</em>. From converting <strong className="text-foreground">EEG brain signals to Arabic</strong> with 94% accuracy to building <strong className="text-foreground">multi-agent platforms</strong> that won 1st place at Agenticthon.</>
                                        </p>
                                    </div>
                                    <div className="md:col-span-7 flex flex-col sm:flex-row gap-8 text-[13px]">
                                        <div className="flex-1 space-y-3">
                                            <span className="text-zinc-800 dark:text-zinc-200 font-bold uppercase tracking-widest block border-b border-zinc-100 dark:border-zinc-900 pb-3">Scope & Platform</span>
                                            <p className="text-zinc-500 leading-relaxed">
                                                {'Machine Learning, Deep Learning, NLP, Multi-Agent AI, RAG Systems, Full-Stack Development'}
                                            </p>
                                            <p className="text-blue-500/80 font-medium italic">
                                                {t('leadIn.bridging')}
                                            </p>
                                        </div>
                                        <div className="flex-1 space-y-3 flex flex-col">
                                            <span className="text-zinc-800 dark:text-zinc-200 font-bold uppercase tracking-widest block border-b border-zinc-100 dark:border-zinc-900 pb-3">Integration</span>
                                            <p className="text-zinc-500 leading-relaxed">
                                                {'Python, TensorFlow, LangChain, PyTorch, Scikit-learn — building AI that works at scale.'}
                                            </p>
                                            <div className="mt-6 md:mt-auto pt-4">
                                                <span className="text-3xl lg:text-4xl font-signature text-zinc-900 dark:text-white/90">{t('leadIn.signature')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SlideReveal>
                </div>
            </div>

            {/* ─── SECTION 2: Stats (Interactive Testimonial) ─── */}
            <Testimonial1 />

            {/* ─── SECTION 3: Projects Showcase ─── */}
            <div id="projects" className="py-24 md:py-40">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <SlideReveal>
                        <div className="mb-16 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-px bg-blue-500/50" />
                                <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.3em] text-blue-500 font-bold">
                                    Featured Work
                                </span>
                            </div>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                                <span className="text-foreground">Projects</span>{" "}
                                <span className="text-foreground/45 dark:text-foreground/35">& Innovations</span>
                            </h3>
                        </div>
                    </SlideReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {translatedProjects.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── SECTION 4: Skills & Expertise ─── */}
            <div id="skills" className="py-24 md:py-40 bg-card/30">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <SlideReveal>
                        <div className="mb-16 space-y-4 text-left">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-px bg-purple-500/50" />
                                <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.3em] text-purple-500 font-bold">
                                    Technical Arsenal
                                </span>
                            </div>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                                <span className="text-foreground">{tNav('skills')}</span>{" "}
                                <span className="text-foreground/45 dark:text-foreground/35">& Expertise</span>
                            </h3>
                        </div>
                    </SlideReveal>

                    {/* Skill Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                        {[
                            {
                                id: 'languages',
                                title: 'Languages',
                                icon: Code2,
                                color: 'border-t-teal-500',
                                glow: 'hover:shadow-teal-500/5'
                            },
                            {
                                id: 'ai_agents',
                                title: 'AI Orchestration & Agents',
                                icon: Bot,
                                color: 'border-t-blue-600',
                                glow: 'hover:shadow-blue-600/5'
                            },
                            {
                                id: 'llms',
                                title: 'LLM APIs & Inference',
                                icon: Brain,
                                color: 'border-t-indigo-500',
                                glow: 'hover:shadow-indigo-500/5'
                            },
                            {
                                id: 'vector_dbs',
                                title: 'Vector Databases & RAG',
                                icon: Database,
                                color: 'border-t-cyan-500',
                                glow: 'hover:shadow-cyan-500/5'
                            },
                            {
                                id: 'ai',
                                title: 'ML / DL Frameworks',
                                icon: Sparkles,
                                color: 'border-t-blue-400',
                                glow: 'hover:shadow-blue-400/5'
                            },
                            {
                                id: 'backend',
                                title: 'Backend Development',
                                icon: Cpu,
                                color: 'border-t-purple-500',
                                glow: 'hover:shadow-purple-500/5'
                            },
                            {
                                id: 'frontend',
                                title: 'Frontend Development',
                                icon: Layers,
                                color: 'border-t-pink-500',
                                glow: 'hover:shadow-pink-500/5'
                            },
                            {
                                id: 'data',
                                title: 'Data Science & BI',
                                icon: Sparkles,
                                color: 'border-t-orange-500',
                                glow: 'hover:shadow-orange-500/5'
                            },
                            {
                                id: 'other',
                                title: 'Tools & DevOps',
                                icon: Briefcase,
                                color: 'border-t-emerald-500',
                                glow: 'hover:shadow-emerald-500/5'
                            },
                            {
                                id: 'soft',
                                title: 'Soft Skills',
                                icon: Trophy,
                                color: 'border-t-yellow-500',
                                glow: 'hover:shadow-yellow-500/5',
                                isSoft: true
                            }
                        ].map((cat) => {
                            let catSkills = [];
                            if (cat.isSoft) {
                                catSkills = translatedSoftSkills.map((s: any) => ({ name: s.name, category: 'soft' }));
                            } else {
                                catSkills = hardSkills.filter((s: any) => s.category === cat.id);
                            }

                            if (catSkills.length === 0) return null;

                            const Icon = cat.icon;

                            return (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6 }}
                                    className={cn(
                                        "group relative bg-card border border-border/50 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:border-foreground/10 dark:hover:border-white/10 border-t-4",
                                        cat.color,
                                        cat.glow,
                                        cat.id === 'soft' && "md:col-span-2 lg:col-span-3"
                                    )}
                                >
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/30">
                                        <div className="p-2 rounded-xl bg-foreground/5 text-foreground/80 dark:bg-white/5 dark:text-white/80">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <h4 className="text-sm font-black uppercase tracking-wider text-foreground">
                                            {cat.title}
                                        </h4>
                                    </div>

                                    {/* Skills flex list */}
                                    <div className="flex flex-wrap gap-2.5">
                                        {catSkills.map((skill: any, i: number) => (
                                            <SkillPill key={skill.name} skill={skill} index={i} />
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ─── SECTION 5: Education, Experience & Certifications ─── */}
            <div className="py-24 md:py-40 space-y-24 md:space-y-36">
                {/* 1. Education */}
                <div id="education" className="max-w-[1400px] mx-auto px-6 md:px-12 scroll-mt-24">
                    <SlideReveal>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 border-b border-border/20 pb-16">
                            <div className="lg:col-span-1">
                                <div className="flex items-center gap-3 mb-4 lg:mb-0">
                                    <GraduationCap className="w-6 h-6 text-blue-500" />
                                    <h3 className="text-xl font-bold uppercase tracking-wider text-foreground">{tNav('education')}</h3>
                                </div>
                            </div>
                            <div className="lg:col-span-2 space-y-6">
                                {translatedEducation.map((edu) => (
                                    <div key={edu.id} className="p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-blue-500/20 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start group/card">
                                        {edu.logo && (
                                            <div className="relative group/logo flex-shrink-0 self-center sm:self-start">
                                                {/* Ambient Glow */}
                                                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-md group-hover/logo:opacity-50 group-hover/card:opacity-45 transition-opacity duration-500" />
                                                {/* Gradient Border Frame */}
                                                <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 group-hover/logo:from-blue-500 group-hover/logo:to-indigo-500 group-hover/card:from-blue-400 group-hover/card:to-indigo-400 transition-all duration-500 shadow-lg shadow-black/5">
                                                    {/* Logo Base Container */}
                                                    <div className="w-16 h-16 rounded-[15px] bg-white dark:bg-zinc-950 p-2.5 flex items-center justify-center transition-colors duration-500">
                                                        <img 
                                                            src={edu.logo} 
                                                            alt={edu.institution} 
                                                            className="w-full h-full object-contain filter drop-shadow-sm group-hover/logo:scale-110 group-hover/card:scale-105 transition-transform duration-500" 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex-1 space-y-1">
                                            <h4 className="text-xl md:text-2xl font-black text-foreground">{edu.degree}</h4>
                                            <p className="text-blue-500 font-bold mt-1 text-base">{edu.institution}</p>
                                            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                                                {edu.gpa && <span className="font-mono font-bold bg-foreground/5 px-2.5 py-0.5 rounded">GPA: {edu.gpa}</span>}
                                                <span>•</span>
                                                <span>{edu.major}</span>
                                            </div>
                                            {edu.achievements && (
                                                <div className="mt-6 space-y-2">
                                                    {edu.achievements.map((a) => (
                                                        <div key={a} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                                                            <span className="text-yellow-500 flex-shrink-0 mt-0.5">✦</span>
                                                            <span className="leading-relaxed font-medium">{a}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SlideReveal>
                </div>

                {/* 2. Experience */}
                {translatedExperiences.length > 0 && (
                    <div id="experience" className="max-w-[1400px] mx-auto px-6 md:px-12 scroll-mt-24">
                        <SlideReveal delay={0.1}>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 border-b border-border/20 pb-16">
                                <div className="lg:col-span-1">
                                    <div className="flex items-center gap-3 mb-4 lg:mb-0">
                                        <Briefcase className="w-6 h-6 text-purple-500" />
                                        <h3 className="text-xl font-bold uppercase tracking-wider text-foreground">{tNav('experience')}</h3>
                                    </div>
                                </div>
                                <div className="lg:col-span-2 space-y-6">
                                    {translatedExperiences.map((exp) => (
                                        <div key={exp.id} className="p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-purple-500/20 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start group/card">
                                            {exp.logo && (
                                                <div className="relative group/logo flex-shrink-0 self-center sm:self-start">
                                                    {/* Ambient Glow */}
                                                    <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 opacity-20 blur-md group-hover/logo:opacity-50 group-hover/card:opacity-45 transition-opacity duration-500" />
                                                    {/* Gradient Border Frame */}
                                                    <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 group-hover/logo:from-purple-500 group-hover/logo:to-indigo-500 group-hover/card:from-purple-400 group-hover/card:to-indigo-400 transition-all duration-500 shadow-lg shadow-black/5">
                                                        {/* Logo Base Container */}
                                                        <div className="w-16 h-16 rounded-[15px] bg-white dark:bg-zinc-950 p-2.5 flex items-center justify-center transition-colors duration-500">
                                                            <img 
                                                                src={exp.logo} 
                                                                alt={exp.company} 
                                                                className="w-full h-full object-contain filter drop-shadow-sm group-hover/logo:scale-110 group-hover/card:scale-105 transition-transform duration-500" 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex-1 space-y-1">
                                                <h4 className="text-xl md:text-2xl font-black text-foreground">{exp.position}</h4>
                                                <p className="text-blue-500 font-bold mt-1 text-base">{exp.company}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{exp.location}</p>
                                                <p className="text-sm md:text-base text-muted-foreground mt-4 leading-relaxed">{exp.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SlideReveal>
                    </div>
                )}

                {/* 3. Certifications */}
                <div id="certifications" className="max-w-[1400px] mx-auto px-6 md:px-12 scroll-mt-24">
                    <SlideReveal delay={0.2}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
                            <div className="lg:col-span-1">
                                <div className="flex items-center gap-3 mb-4 lg:mb-0">
                                    <Award className="w-6 h-6 text-blue-500" />
                                    <h3 className="text-xl font-bold uppercase tracking-wider text-foreground">{tNav('certifications')}</h3>
                                </div>
                            </div>
                            <div className="lg:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {translatedAchievements.map((cert, i) => (
                                        <CertCard key={cert.id} cert={cert} index={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SlideReveal>
                </div>
            </div>
        </section>
    );
};
