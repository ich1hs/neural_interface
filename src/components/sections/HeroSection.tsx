"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NeuralCore } from "@/components/canvas/NeuralCore";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-void-black"
        >
            {/* Grid Background */}
            <div className="absolute inset-0 grid-bg opacity-30" />

            {/* 3D Neural Core */}
            <NeuralCore />

            {/* Content Overlay */}
            <motion.div
                className="relative z-10 flex h-full flex-col items-center justify-center px-6"
                style={{ opacity, scale, y }}
            >
                {/* Version Label */}
                <motion.div
                    className="mb-8 text-label"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <ScrambleText text="[ NEXT-GEN AI PLATFORM ]" duration={1000} />
                </motion.div>

                {/* Main Title */}
                <div className="text-center">
                    <motion.h1
                        className="text-display text-[clamp(3rem,15vw,12rem)] leading-[0.85]"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <span className="block">NEURAL</span>
                        <span className="block text-signal-green">INTERFACE</span>
                    </motion.h1>
                </div>

                {/* Tagline */}
                <motion.p
                    className="mt-8 text-lg text-synapse-white/70 max-w-md text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    The future of human-AI collaboration. Build smarter systems with
                    our cutting-edge machine learning infrastructure.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="mt-12 flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <MagneticButton href="#features">
                        EXPLORE FEATURES
                    </MagneticButton>
                    <MagneticButton href="#demo" className="bg-transparent">
                        VIEW DEMO
                    </MagneticButton>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="mt-16 flex items-center gap-12 text-mono text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <div className="text-center">
                        <div className="text-2xl font-bold text-signal-green">99.9%</div>
                        <div className="text-muted">UPTIME</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-synapse-white">10ms</div>
                        <div className="text-muted">LATENCY</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-aether-blue">∞</div>
                        <div className="text-muted">SCALE</div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
            >
                <motion.div
                    className="flex flex-col items-center gap-2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <span className="text-label">SCROLL</span>
                    <svg
                        width="16"
                        height="24"
                        viewBox="0 0 16 24"
                        fill="none"
                        className="text-muted"
                    >
                        <path
                            d="M8 0v20M1 13l7 7 7-7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Corner HUD Elements */}
            <div className="absolute top-6 left-6 text-label">
                <ScrambleText text="[ V2.0.26 ]" duration={800} />
            </div>
            <div className="absolute top-6 right-6 text-label">
                <span className="status-online">● LIVE</span>
            </div>
        </section>
    );
}
