'use client';


import Link from 'next/link';
import { ArrowLeft, Linkedin, Github, Mail, Phone } from 'lucide-react';
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

export default function ContactPage() {
    const { personal } = portfolioData;

    const githubLink = personal.socialLinks.find(s => s.platform.toLowerCase() === 'github')?.url || 'https://github.com';
    const linkedinLink = personal.socialLinks.find(s => s.platform.toLowerCase() === 'linkedin')?.url || 'https://linkedin.com';
    const twitterLink = personal.socialLinks.find(s => s.platform.toLowerCase() === 'twitter' || s.platform.toLowerCase() === 'x')?.url || 'https://x.com';
    const discordLink = personal.socialLinks.find(s => s.platform.toLowerCase() === 'discord')?.url || 'https://discord.com/users/osama200_';

    const socials = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: linkedinLink,
            color: "text-zinc-900 dark:text-zinc-100 bg-zinc-500/5 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800"
        },
        {
            name: "GitHub",
            icon: Github,
            url: githubLink,
            color: "text-zinc-900 dark:text-zinc-100 bg-zinc-500/5 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800"
        },
        {
            name: "X",
            icon: XIcon,
            url: twitterLink,
            color: "text-zinc-900 dark:text-zinc-100 bg-zinc-500/5 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800"
        },
        {
            name: "Discord",
            icon: DiscordIcon,
            url: discordLink,
            color: "text-zinc-900 dark:text-zinc-100 bg-zinc-500/5 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800"
        },
        {
            name: "Email",
            icon: Mail,
            url: `mailto:${personal.email}`,
            color: "text-zinc-900 dark:text-zinc-100 bg-zinc-500/5 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800"
        }
    ];

    if (personal.phone) {
        socials.push({
            name: "Phone",
            icon: Phone,
            url: `tel:${personal.phone}`,
            color: "text-zinc-900 dark:text-zinc-100 bg-zinc-500/5 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800"
        });
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-center py-20 px-6 relative selection:bg-primary/20">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none z-0" />
            
            <div className="max-w-[760px] mx-auto w-full relative z-10 space-y-12">
                
                {/* Back to Home Button */}
                <div className="flex justify-start">
                    <Link href="/workspace">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 shadow-sm">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Home</span>
                        </button>
                    </Link>
                </div>

                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
                        Let's Connect
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed max-w-xl">
                        Find me on these platforms or send me a direct email.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {socials.map((social) => {
                        const isMailOrTel = social.url.startsWith('mailto:') || social.url.startsWith('tel:');
                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target={isMailOrTel ? undefined : "_blank"}
                                rel={isMailOrTel ? undefined : "noopener noreferrer"}
                                className="flex items-center gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 group"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${social.color}`}>
                                    <social.icon className="w-6 h-6" />
                                </div>
                                <span className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                    {social.name}
                                </span>
                            </a>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
