import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  Linkedin,
  ArrowDownRight,
  Zap,
  Bot,
  Mail,
  Phone,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

import gsap from "gsap";
import { ProfileCard } from "@/components/ui/profile-card";
import { Spotlight } from "@/components/ui/spotlight-new";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("../three/Scene3D").then(mod => ({ default: mod.Scene3D })), {
  ssr: false,
  loading: () => null,
});

export function HeroVisual({ isExiting }: { isExiting?: boolean }) {
  const { personal } = portfolioData;
  const [showProfile, setShowProfile] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const githubRef = useRef(null);
  const linkedinRef = useRef(null);
  const mailRef = useRef(null);
  const phoneRef = useRef(null);
  const zapRef = useRef(null);
  const zapSmallRef = useRef(null);
  const botRef = useRef(null);


  const tAbout = useTranslations('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsHeroVisible(window.scrollY < window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isExiting) return;

    const ctx = gsap.context(() => {
      // Reveal + Loop for GitHub
      gsap.fromTo(githubRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(githubRef.current, {
              y: -10,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              force3D: true
            });
          }
        }
      );

      // Reveal + Loop for LinkedIn
      gsap.fromTo(linkedinRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.1,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(linkedinRef.current, {
              y: 10,
              duration: 2.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              force3D: true
            });
          }
        }
      );

      // Reveal + Loop for Mail
      gsap.fromTo(mailRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(mailRef.current, {
              x: 10,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              force3D: true
            });
          }
        }
      );

      // Reveal + Loop for Phone
      if (phoneRef.current) {
        gsap.fromTo(phoneRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
            onComplete: () => {
              gsap.to(phoneRef.current, {
                y: -10,
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                force3D: true
              });
            }
          }
        );
      }

      // Zap pulsing - Energetic heartbeat effect
      gsap.to([zapRef.current, zapSmallRef.current], {
        scale: 1.2,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        force3D: true
      });

      // Bot floating - Responsive and smooth
      gsap.to(botRef.current, {
        rotation: 8,
        y: -10,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true
      });
    });

    return () => ctx.revert();
  }, [isExiting]);

  return (
    <motion.div
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen w-full flex flex-col bg-background text-foreground overflow-hidden selection:bg-primary/20"
    >
      {/* 3D Neural Network Visual Background */}
      <Scene3D paused={!isHeroVisible} />

      {/* Background Pattern */}
      <div className="w-full absolute h-full z-0 bg-[radial-gradient(circle,_#888_0.5px,_transparent_0.5px)] dark:bg-[radial-gradient(circle,_#444_0.5px,_transparent_0.5px)] opacity-20 [background-size:24px_24px]" />

      {/* Spotlight Effect - Dramatic lighting */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        <Spotlight
          duration={10}
          xOffset={120}
          translateY={-300}
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(220, 80%, 60%, .15) 0, hsla(220, 80%, 60%, .05) 50%, transparent 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(250, 80%, 60%, .1) 0, hsla(250, 80%, 60%, .02) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(220, 80%, 60%, .08) 0, hsla(220, 80%, 60%, 0) 80%, transparent 100%)"
        />
      </div>

      <main className="relative flex-1 flex flex-col justify-center pt-40 pb-20 z-10">
        <div className="flex relative gap-4 px-6 md:items-center w-full flex-col justify-center">

          {/* Line 1: AI & DATA */}
          <div className="md:flex gap-8 items-center relative">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[10px] md:text-xs text-muted-foreground text-left leading-relaxed max-w-[200px] md:max-w-[220px] font-medium uppercase tracking-[0.2em]"
            >
              {`Hi, I'm ${personal.name.split(' ')[0]}. I build scalable systems powered by intelligence.`}
            </motion.p>
            <div className="relative">
              <div ref={githubRef} className="absolute -top-4 right-0 md:right-2 text-primary/60 hover:text-primary z-20 opacity-0">
                <a
                  href={personal.socialLinks.find(s => s.platform === 'GitHub')?.url}
                  target="_blank"
                  className="block"
                >
                  <Github size={32} />
                </a>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,11vw,13rem)] font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-4"
              >
                {"AI & DATA"}
              </motion.h1>
            </div>
          </div>

          {/* Line 2: SOFT [ICON] WARE */}
          <div className="md:flex gap-8 items-center relative">
            <div className="relative">
              <div ref={linkedinRef} className="absolute -top-8 left-4 text-primary/60 hover:text-primary z-20 opacity-0">
                <a
                  href={personal.socialLinks.find(s => s.platform === 'LinkedIn')?.url}
                  target="_blank"
                  className="block"
                >
                  <Linkedin size={32} />
                </a>
              </div>
              <div ref={mailRef} className="absolute -bottom-12 right-24 md:right-36 text-primary/60 hover:text-primary z-20 opacity-0">
                <a
                  href={`mailto:${personal.email}`}
                  className="block"
                >
                  <Mail size={32} />
                </a>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,11vw,13rem)] md:flex items-center font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-4"
              >
                <span className="">SOFT</span>
                <div ref={zapRef} className="hidden lg:block mx-[0.05em]">
                  <Zap className="w-[0.8em] h-[0.8em] text-blue-500" strokeWidth={1.5} />
                </div>
                <div ref={zapSmallRef} className="block lg:hidden mx-[0.02em]">
                  <Zap className="w-[0.8em] h-[0.8em] text-blue-500" strokeWidth={2} />
                </div>
                <span className="">WARE</span>
              </motion.h1>
            </div>
          </div>

          {/* Line 3: EN [ICON] GINEER */}
          <div className="md:flex gap-8 items-center relative">
            <div className="relative">
              {personal.phone && (
                <div ref={phoneRef} className="absolute -bottom-10 left-8 md:left-20 text-primary/60 hover:text-primary z-20 opacity-0">
                  <a
                    href={`tel:${personal.phone}`}
                    className="block"
                  >
                    <Phone size={32} />
                  </a>
                </div>
              )}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,11vw,13rem)] md:flex items-center font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-4"
              >
                <span className="">EN</span>
                <div ref={botRef} className="mx-[0.05em] relative">
                  <Bot className="w-[0.85em] h-[0.85em] text-purple-500 fill-purple-500/10" />
                </div>
                <span className="">GINEER</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[10px] md:text-xs text-muted-foreground pt-4 md:pt-8 leading-relaxed max-w-[250px] md:max-w-[200px] font-medium uppercase tracking-widest"
            >
              {"Multi-award winning innovator. Open to all forms of collaboration."}
            </motion.p>
          </div>
        </div>

        {/* Separator Section */}
        <div className="mx-auto max-w-[105rem] w-full px-8 md:px-20 mt-12 md:mt-24">
          <div className="flex items-center gap-6">
            <Separator className="flex-1 h-[1px] bg-foreground/10 hidden md:block" />
            <div className="text-[10px] md:text-xs whitespace-nowrap font-bold tracking-[0.3em] text-muted-foreground uppercase">
              {"RIYADH, SA — 2026"}
            </div>
            <a
              href="#about"
              className="group flex items-center"
            >
              <motion.div
                className="relative flex items-center bg-zinc-100 dark:bg-white h-12 w-12 group-hover:w-44 rounded-full transition-all duration-500 ease-[0.23,1,0.32,1] overflow-hidden shadow-xl"
              >
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:delay-150 text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-black pl-6 pr-12">
                  {"Explore More"}
                </span>
                <div className="absolute right-0 flex items-center justify-center size-12 text-zinc-900 dark:text-black group-hover:rotate-45 transition-transform duration-500">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
              </motion.div>
            </a>
          </div>
        </div>

        {/* Award/Badge Vertical - MOVED TO LEFT */}
        <div
          className="absolute left-0 top-1/2 z-50 hidden md:flex items-center transform -translate-y-1/2 group/container"
          onMouseEnter={() => setShowProfile(true)}
          onMouseLeave={() => setShowProfile(false)}
        >
          {/* The Badge Trigger */}
          <div className="relative z-50">
            <motion.div
              whileHover={{ x: 10 }}
              className="bg-white text-black py-10 px-4 text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl rounded-r-3xl border-r border-y border-zinc-200 cursor-pointer"
            >
              <span className="rotate-0 [writing-mode:vertical-rl]">
                {"AVAILABLE FOR OPPORTUNITY"}
              </span>
            </motion.div>
          </div>

          {/* Profile Card Sidebar/Drawer Effect */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="pl-4 pointer-events-auto"
                style={{ width: 'max-content' }}
              >
                <ProfileCard
                  name={personal.name}
                  title="AI Engineer & Data Scientist"
                  description={tAbout('description')}
                  imageUrl={personal.avatar}
                  githubUrl={personal.socialLinks.find(s => s.platform.toLowerCase() === 'github')?.url}
                  linkedinUrl={personal.socialLinks.find(s => s.platform.toLowerCase() === 'linkedin')?.url}
                  twitterUrl={personal.socialLinks.find(s => s.platform.toLowerCase() === 'twitter' || s.platform.toLowerCase() === 'x')?.url}
                  phoneUrl={personal.socialLinks.find(s => s.platform.toLowerCase() === 'phone')?.url || (personal.phone ? `tel:${personal.phone}` : undefined)}
                  className="!max-w-4xl scale-[0.8] origin-left"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
}
