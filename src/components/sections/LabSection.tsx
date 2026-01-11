"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleText } from "@/components/ui/ScrambleText";

gsap.registerPlugin(ScrollTrigger);

interface Experiment {
    id: string;
    title: string;
    subtitle: string;
    status: "CONCEPT" | "IN PROGRESS" | "COMPLETE";
    domain: string;
    description: string;
    visual: "image" | "chart" | "meta";
}

const EXPERIMENTS: Experiment[] = [
    {
        id: "001",
        title: "NEURAL",
        subtitle: "STYLE TRANSFER",
        status: "CONCEPT",
        domain: "COMPUTER VISION",
        description: "Applying artistic styles to images using convolutional neural networks and deep learning techniques.",
        visual: "image",
    },
    {
        id: "002",
        title: "ALGORITHMIC",
        subtitle: "TRADING BOT",
        status: "IN PROGRESS",
        domain: "QUANTITATIVE FINANCE",
        description: "Real-time market analysis and automated trading decisions using machine learning models.",
        visual: "chart",
    },
    {
        id: "003",
        title: "3D PORTFOLIO",
        subtitle: "ENVIRONMENT",
        status: "COMPLETE",
        domain: "WEB DEVELOPMENT",
        description: "This website itself — a demonstration of React Three Fiber, GSAP, and modern web technologies.",
        visual: "meta",
    },
];

// Animated chart for trading bot
function MiniChart() {
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (!pathRef.current) return;

        const animate = () => {
            const points: number[] = [];
            for (let i = 0; i <= 20; i++) {
                points.push(50 + Math.sin(Date.now() * 0.002 + i * 0.5) * 30 + Math.random() * 10);
            }

            const path = points
                .map((y, i) => `${i === 0 ? "M" : "L"} ${i * 10} ${y}`)
                .join(" ");

            if (pathRef.current) {
                pathRef.current.setAttribute("d", path);
            }
        };

        const interval = setInterval(animate, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <svg
            viewBox="0 0 200 100"
            className="w-full h-24"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00FF94" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00FF94" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                ref={pathRef}
                fill="none"
                stroke="#00FF94"
                strokeWidth="2"
                d="M 0 50 L 200 50"
            />
        </svg>
    );
}

// Experiment card component
function ExperimentCard({ experiment, index }: { experiment: Experiment; index: number }) {
    return (
        <motion.div
            className="flex-shrink-0 w-[400px] h-[500px] border border-border bg-neural-gray/50 flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ borderColor: "#00FF94", scale: 1.02 }}
            data-cursor="hover"
        >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
                <span className="text-mono text-xs text-muted">[ EXPERIMENT {experiment.id} ]</span>
                <span
                    className={`text-mono text-xs ${experiment.status === "COMPLETE"
                            ? "text-signal-green"
                            : experiment.status === "IN PROGRESS"
                                ? "text-warning-amber"
                                : "text-muted"
                        }`}
                >
                    ● {experiment.status}
                </span>
            </div>

            {/* Visual Area */}
            <div className="flex-1 p-6 flex items-center justify-center border-b border-border bg-void-black/50">
                {experiment.visual === "image" && (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl text-signal-green/20">🧠</div>
                    </div>
                )}
                {experiment.visual === "chart" && <MiniChart />}
                {experiment.visual === "meta" && (
                    <div className="text-center">
                        <div className="text-mono text-xs text-muted mb-2">[ YOU ARE HERE ]</div>
                        <div className="w-16 h-16 border border-signal-green mx-auto animate-pulse" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div>
                    <h3 className="text-display text-2xl leading-tight">
                        {experiment.title}
                        <br />
                        <span className="text-signal-green">{experiment.subtitle}</span>
                    </h3>
                </div>

                <div className="text-mono text-xs text-muted">
                    ◌ DOMAIN: {experiment.domain}
                </div>

                <p className="text-sm text-synapse-white/70 leading-relaxed">
                    {experiment.description}
                </p>
            </div>
        </motion.div>
    );
}

export function LabSection() {
    const containerRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Horizontal scroll with GSAP
    useEffect(() => {
        if (!containerRef.current || !sliderRef.current) return;

        const slider = sliderRef.current;
        const totalWidth = slider.scrollWidth - window.innerWidth;

        const ctx = gsap.context(() => {
            gsap.to(slider, {
                x: -totalWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${totalWidth}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="lab" className="relative bg-void-black overflow-hidden">
            {/* Section Header */}
            <div className="absolute top-8 left-6 z-10">
                <div className="text-label mb-2">
                    <ScrambleText text="[ R&D LAB ]" duration={800} />
                </div>
                <h2 className="text-display text-2xl">
                    ACTIVE <span className="text-signal-green">EXPERIMENTS</span>
                </h2>
            </div>

            {/* Horizontal Slider */}
            <div
                ref={sliderRef}
                className="flex gap-8 pl-6 pt-32 pb-16 items-start"
                style={{ width: "fit-content" }}
            >
                {/* Intro Card */}
                <div className="flex-shrink-0 w-[300px] h-[500px] flex flex-col justify-center pr-8">
                    <h3 className="text-display text-[clamp(2rem,4vw,3rem)] mb-6">
                        MICRO
                        <br />
                        <span className="text-muted">EXPERIMENTS</span>
                    </h3>
                    <p className="text-synapse-white/60 leading-relaxed">
                        Explorations in artificial intelligence, data science, and modern web development.
                        Each experiment pushes the boundaries of what&apos;s possible.
                    </p>
                </div>

                {/* Experiment Cards */}
                {EXPERIMENTS.map((experiment, index) => (
                    <ExperimentCard key={experiment.id} experiment={experiment} index={index} />
                ))}

                {/* End Card */}
                <div className="flex-shrink-0 w-[300px] h-[500px] flex flex-col justify-center items-center border border-dashed border-border">
                    <div className="text-mono text-xs text-muted mb-4">[ MORE COMING ]</div>
                    <div className="text-6xl text-border">+</div>
                </div>
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mono text-xs text-muted">
                SCROLL TO EXPLORE →
            </div>
        </section>
    );
}
