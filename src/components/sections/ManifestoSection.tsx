"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrambleText } from "@/components/ui/ScrambleText";

const SKILLS = [
    { name: "Python", level: 85, category: "core" },
    { name: "React", level: 78, category: "web" },
    { name: "ML/AI", level: 72, category: "ai" },
    { name: "Data Science", level: 75, category: "ai" },
    { name: "TypeScript", level: 70, category: "web" },
    { name: "Next.js", level: 75, category: "web" },
];

const RUNTIME_LOGS = [
    "> init_neural_network()",
    "> load_frameworks('react', 'tensorflow')",
    "> compile_knowledge_base()",
    "> status: ACQUIRING_DATA...",
    "> optimize_learning_path()",
    "> deploy_skills(production=True)",
];

function SkillBar({
    name,
    level,
    index,
}: {
    name: string;
    level: number;
    index: number;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="mb-1 flex items-center justify-between text-mono text-xs">
                <span className="text-synapse-white group-hover:text-signal-green transition-colors">
                    ▸ {name}
                </span>
                <motion.span
                    className="text-muted"
                    animate={{ color: isHovered ? "#00FF94" : "#888888" }}
                >
                    {level}%
                </motion.span>
            </div>
            <div className="h-1.5 w-full bg-border overflow-hidden relative">
                <motion.div
                    className="h-full bg-gradient-to-r from-signal-green/60 to-signal-green"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                />
                {/* Animated shimmer on hover */}
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                )}
            </div>
        </motion.div>
    );
}

function RuntimeLog() {
    return (
        <div className="space-y-1 font-mono text-xs h-32 overflow-hidden relative">
            {/* Scrolling animation */}
            <motion.div
                className="space-y-1"
                animate={{ y: [0, -80, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                {[...RUNTIME_LOGS, ...RUNTIME_LOGS].map((log, index) => (
                    <motion.div
                        key={index}
                        className="text-muted hover:text-signal-green transition-colors cursor-default"
                        whileHover={{ x: 4 }}
                    >
                        {log}
                    </motion.div>
                ))}
            </motion.div>
            {/* Fade overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-neural-gray/50 to-transparent pointer-events-none" />
        </div>
    );
}

// Animated border card
function HUDPanel({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            className={`relative group ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            viewport={{ once: true }}
        >
            {/* Animated border on hover */}
            <div className="absolute inset-0 border border-border group-hover:border-signal-green/50 transition-colors duration-300" />

            {/* Corner brackets that animate on hover */}
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-signal-green opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-signal-green opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-signal-green opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-signal-green opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Content */}
            <div className="relative p-6 bg-neural-gray/50 backdrop-blur-sm">
                {children}
            </div>
        </motion.div>
    );
}

export function ManifestoSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const leftY = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section
            ref={containerRef}
            id="about"
            className="relative min-h-screen w-full bg-void-black py-32"
        >
            {/* Subtle grid background */}
            <div className="absolute inset-0 grid-bg opacity-10" />

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="grid gap-16 lg:grid-cols-2">
                    {/* Left Column - Narrative */}
                    <motion.div className="lg:sticky lg:top-32 lg:h-fit" style={{ y: leftY }}>
                        {/* Section Label */}
                        <motion.div
                            className="mb-8 text-label"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <ScrambleText text="[ ABOUT ME ]" duration={800} />
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h2
                            className="text-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <motion.span
                                className="block"
                                initial={{ x: -50 }}
                                whileInView={{ x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                WHO I
                            </motion.span>
                            <motion.span
                                className="block text-muted"
                                initial={{ x: -50 }}
                                whileInView={{ x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                AM
                            </motion.span>
                        </motion.h2>

                        {/* Manifesto Text */}
                        <div className="space-y-6 text-lg text-synapse-white/80 leading-relaxed max-w-lg">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                Hey! I'm a student developer from Indonesia who's obsessed with
                                making computers <span className="text-signal-green font-medium">actually smart</span>.
                                I spend most of my time building web apps and tinkering with
                                <span className="text-aether-blue font-medium"> machine learning</span> models.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                Right now I'm deep into neural networks, React/Next.js, and
                                figuring out how to make data actually useful. Still learning,
                                still breaking things, still having fun.
                            </motion.p>
                        </div>

                        {/* Decorative element */}
                        <motion.div
                            className="mt-12 flex items-center gap-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-12 h-px bg-signal-green" />
                            <span className="text-mono text-xs text-muted">SCROLL FOR MORE</span>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - System HUD */}
                    <div className="space-y-6">
                        {/* Status Panel */}
                        <HUDPanel delay={0}>
                            <div className="mb-4 text-label flex items-center justify-between">
                                <span>[ SYSTEM STATUS ]</span>
                                <span className="status-online text-xs">ACTIVE</span>
                            </div>

                            <div className="grid gap-4 text-mono text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted">Neural Load:</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-1 bg-border overflow-hidden">
                                            <motion.div
                                                className="h-full bg-signal-green"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "87%" }}
                                                transition={{ duration: 1, delay: 0.3 }}
                                                viewport={{ once: true }}
                                            />
                                        </div>
                                        <span className="text-signal-green">87%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">Active Threads:</span>
                                    <span>14</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">Current Objective:</span>
                                    <span className="text-aether-blue">Mastering Fullstack</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">Uptime:</span>
                                    <span className="text-signal-green/80">99.9%</span>
                                </div>
                            </div>
                        </HUDPanel>

                        {/* Core Competencies */}
                        <HUDPanel delay={0.2}>
                            <div className="mb-6 text-label">
                                [ CORE COMPETENCIES ]
                            </div>

                            <div className="space-y-4">
                                {SKILLS.map((skill, index) => (
                                    <SkillBar
                                        key={skill.name}
                                        name={skill.name}
                                        level={skill.level}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </HUDPanel>

                        {/* Runtime Log */}
                        <HUDPanel delay={0.4}>
                            <div className="mb-4 text-label flex items-center justify-between">
                                <span>[ RUNTIME LOG ]</span>
                                <motion.span
                                    className="text-xs text-signal-green"
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    ● LIVE
                                </motion.span>
                            </div>
                            <RuntimeLog />
                        </HUDPanel>
                    </div>
                </div>
            </div>
        </section>
    );
}
