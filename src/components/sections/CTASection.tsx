"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { Mail, MessageCircle, ArrowUpRight, Phone } from "lucide-react";
import { InfiniteRibbon } from "@/components/ui/infinite-ribbon";
import { portfolioData } from "@/data/portfolio";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const ContactForm = () => {
    const tForm = useTranslations('contact.form');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setStatus('error');
            setStatusMessage('Please fill in all required fields.');
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, subject: `Website Message from ${name}` }),
            });

            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setName('');
                setEmail('');
                setMessage('');
                setStatusMessage(tForm('success'));
            } else {
                setStatus('error');
                setStatusMessage(data.error || tForm('error'));
            }
        } catch (error) {
            setStatus('error');
            setStatusMessage(tForm('error'));
        }
    };

    // Auto-dismiss success/error message after 5 seconds
    useEffect(() => {
        if (status === 'success' || status === 'error') {
            const timer = setTimeout(() => {
                setStatus('idle');
                setStatusMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-12 bg-card/30 dark:bg-zinc-950/30 backdrop-blur-md border border-border/50 p-6 md:p-8 rounded-3xl space-y-6 shadow-xl hover:border-blue-500/20 transition-all duration-500 relative group/form text-left">
            {/* Ambient subtle glow behind form */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover/form:opacity-100 blur-lg transition-opacity duration-700 pointer-events-none" />
            
            <h4 className="text-lg font-black uppercase tracking-wider text-foreground mb-2 flex items-center gap-2 relative z-10">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                <span>Direct Message</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">{tForm('name')}</label>
                    <input 
                        type="text" 
                        placeholder="Osama Shakaki"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-border/40 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 outline-none text-sm text-foreground transition-all duration-300"
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">{tForm('email')}</label>
                    <input 
                        type="email" 
                        placeholder="osama@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-border/40 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 outline-none text-sm text-foreground transition-all duration-300"
                        required
                    />
                </div>
            </div>

            <div className="space-y-1.5 relative z-10">
                <label className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">{tForm('message')}</label>
                <textarea 
                    placeholder={tForm('messagePlaceholder')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-border/40 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 outline-none text-sm text-foreground transition-all duration-300 h-28 resize-none"
                    required
                />
            </div>

            {status !== 'idle' && (
                <p className={`text-xs font-mono font-bold uppercase tracking-wider relative z-10 ${status === 'success' ? 'text-green-500' : status === 'error' ? 'text-red-500' : 'text-blue-500'}`}>
                    {status === 'loading' ? 'Sending...' : statusMessage}
                </p>
            )}

            <AnimatePresence>
                {status !== 'idle' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={`relative z-10 flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-md ${
                            status === 'success'
                                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                : status === 'error'
                                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                                : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                        }`}
                    >
                        {status === 'success' && (
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            </span>
                        )}
                        {status === 'error' && (
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20">
                                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                            </span>
                        )}
                        {status === 'loading' && (
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 animate-pulse">
                                <svg className="w-4 h-4 text-blue-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            </span>
                        )}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider">
                                {status === 'loading' ? tForm('sending') : status === 'success' ? tForm('sent') : tForm('error')}
                            </p>
                            {status !== 'loading' && (
                                <p className="text-[10px] font-mono mt-0.5 opacity-70">
                                    {statusMessage}
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 pt-4 border-t border-border/30">
                <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
                    <a 
                        href={`mailto:${portfolioData.personal.email}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-blue-500 transition-colors uppercase tracking-wider"
                    >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Email Client</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    {portfolioData.personal.phone && (
                        <a 
                            href={`tel:${portfolioData.personal.phone}`}
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-blue-500 transition-colors uppercase tracking-wider"
                        >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call Phone</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    )}
                </div>

                <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-foreground text-background font-bold text-xs tracking-wide uppercase transition-all duration-300 hover:bg-blue-600 hover:text-white flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <span>{status === 'loading' ? tForm('sending') : tForm('send')}</span>
                </button>
            </div>
        </form>
    );
};

export default function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const t = useTranslations('ctaSection');


    const words = [t('words.amazing'), t('words.innovative'), t('words.intelligent'), t('words.creative')];
    const [currentWord, setCurrentWord] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [words.length]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.cta-content',
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" ref={sectionRef} className="relative py-12 lg:py-16 overflow-hidden bg-background">
            {/* Infinite Ribbons - Moved from Stats Section */}
            <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden pointer-events-none mb-10">
                <InfiniteRibbon rotation={6} className="z-10 py-5 border-y border-blue-200 dark:border-white/5 shadow-xl" background="bg-white dark:bg-zinc-900" textColor="text-blue-700 dark:text-zinc-400 font-mono tracking-tighter">
                    {t('ribbon1')}
                </InfiniteRibbon>
                <InfiniteRibbon rotation={-6} reverse={true} className="z-20 py-5 border-y border-white/40 dark:border-white/10 shadow-2xl" background="bg-blue-600 dark:bg-black" textColor="text-white font-bold tracking-widest uppercase">
                    {t('ribbon2')}
                </InfiniteRibbon>
            </div>



            <div className="max-w-[1600px] mx-auto relative z-10 px-6 md:px-12 lg:px-24 text-center cta-content">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-12">
                    {t('title')}
                    <br />
                    <span className="inline-grid place-items-center">
                        {/* Invisible longest word ensures the container NEVER changes width/height */}
                        <span className="col-start-1 row-start-1 invisible pointer-events-none text-gradient mx-2">
                            {words.reduce((a, b) => a.length > b.length ? a : b, "")}
                        </span>
                        <AnimatePresence>
                            <motion.span
                                key={words[currentWord]}
                                initial={{ y: 50, opacity: 0, rotateX: -90 }}
                                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                exit={{ y: -50, opacity: 0, rotateX: 90 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="col-start-1 row-start-1 inline-block text-gradient mx-2"
                            >
                                {words[currentWord]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                    <span className="whitespace-nowrap">{t('together')}</span>
                </h2>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
                    {t('subtitle')}
                </p>

                <ContactForm />
            </div>
        </section>
    );
}
