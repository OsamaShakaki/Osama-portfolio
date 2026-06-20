"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from "@/data/portfolio";
import {
  Users, Brain, Users2, MessageSquare, Puzzle,
  RefreshCw, BookOpen, LineChart, Search
} from "lucide-react";

const skillIcons: Record<string, any> = {
  'Problem Solving': Puzzle,
  'Team Collaboration': Users2,
  'Communication': MessageSquare,
  'Critical Thinking': Brain,
  'Rapid Learning': BookOpen,
  'Adaptability': RefreshCw,
  'Time Management': LineChart,
  'Self learning': Search,
};

export const HorizontalScrollCarousel = () => {
  const softSkills = portfolioData.softSkills;

  return (
    <section id="soft-skills" className="w-full py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Title Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/80 font-bold block">
              Strategic Directives
            </span>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground">
              Interpersonal Capabilities
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl pt-2">
              Engineered for high-impact leadership and systemic problem solving in complex environments.
            </p>
          </motion.div>
        </div>

        {/* Soft Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {softSkills.map((skill, index) => {
            const Icon = skillIcons[skill.name] || Users;
            const cardNumber = String(index + 1).padStart(2, '0');

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative p-6 bg-card border border-border/50 rounded-2xl hover:border-blue-500/20 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[220px]"
              >
                {/* Background Interactive Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/[0.02] group-hover:to-purple-500/[0.02] transition-colors duration-500 pointer-events-none" />

                {/* Top Row: Icon and Number */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/50 tracking-wider">
                    #{cardNumber}
                  </span>
                </div>

                {/* Bottom Row: Text content */}
                <div className="space-y-2 mt-4">
                  <h3 className="font-bold text-foreground text-base group-hover:text-blue-500 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
