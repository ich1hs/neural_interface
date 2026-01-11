"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { HoldButton } from "@/components/ui/HoldButton";
import { MagneticButton } from "@/components/ui/MagneticButton";

import { ArrowUpRight } from "lucide-react";

const PRODUCT_LINKS = [
    { name: "DOCS", href: "#" },
    { name: "GITHUB", href: "https://github.com/ich1hs" },
    { name: "TWITTER", href: "https://twitter.com" },
];

// Pre-computed particle positions to avoid hydration mismatch
const PARTICLES = [
    { left: 5, top: 10, delay: 0, duration: 3 },
    { left: 15, top: 80, delay: 0.5, duration: 4 },
    { left: 25, top: 30, delay: 1, duration: 3.5 },
    { left: 35, top: 60, delay: 1.5, duration: 4.5 },
    { left: 45, top: 20, delay: 0.3, duration: 3.2 },
    { left: 55, top: 90, delay: 0.8, duration: 4.2 },
    { left: 65, top: 45, delay: 1.2, duration: 3.8 },
    { left: 75, top: 70, delay: 0.2, duration: 4.8 },
    { left: 85, top: 15, delay: 0.6, duration: 3.3 },
    { left: 95, top: 55, delay: 1.8, duration: 4.1 },
    { left: 10, top: 40, delay: 0.4, duration: 3.6 },
    { left: 30, top: 85, delay: 1.1, duration: 4.4 },
    { left: 50, top: 25, delay: 0.7, duration: 3.9 },
    { left: 70, top: 50, delay: 1.4, duration: 4.6 },
    { left: 90, top: 75, delay: 0.9, duration: 3.4 },
];

// CSS-animated floating particles for 60fps performance
function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-30px); opacity: 0.6; }
        }
        .particle {
          animation: float var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }
      `}</style>
            {PARTICLES.map((p, i) => (
                <div
                    key={i}
                    className="particle absolute w-1 h-1 bg-signal-green/30 rounded-full"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        ["--delay" as string]: `${p.delay}s`,
                        ["--duration" as string]: `${p.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}

export function ContactSection() {
    const handleEmailSend = () => {
        window.location.href = "mailto:hello@example.com?subject=Collaboration Inquiry";
    };

    return (
        <section
            id="contact"
            className="relative min-h-screen w-full bg-void-black flex flex-col items-center justify-center py-32 overflow-hidden"
        >
            {/* Grid Background */}
            <div className="absolute inset-0 grid-bg opacity-15" />

            {/* Floating Particles */}
            <FloatingParticles />

            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-signal-green/5 via-transparent to-transparent opacity-50" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* Section Label */}
                <motion.div
                    className="mb-8 text-label"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <ScrambleText text="[ GET IN TOUCH ]" duration={800} />
                </motion.div>

                {/* Main Typography */}
                <motion.h2
                    className="text-display text-[clamp(3rem,12vw,10rem)] leading-[0.85] mb-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.span className="block">START</motion.span>
                    <motion.span
                        className="block text-signal-green"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        BUILDING
                    </motion.span>
                </motion.h2>

                <motion.p
                    className="text-muted max-w-lg mx-auto mb-12 text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Ready to build the future of AI? Start your free trial today
                    or get in touch with our team.
                </motion.p>

                {/* Hold Button */}
                <motion.div
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <HoldButton onComplete={handleEmailSend}>
                        [ INITIATE ]
                    </HoldButton>
                </motion.div>

                {/* Instructions */}
                <motion.div
                    className="text-mono text-xs text-muted mb-12 flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        ◌
                    </motion.span>
                    HOLD 2 SECONDS TO TRANSMIT
                </motion.div>

                {/* Divider with animation */}
                <motion.div
                    className="relative w-48 h-px mx-auto mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="absolute inset-0 bg-border" />
                    <motion.div
                        className="absolute inset-0 bg-signal-green"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: [0, 1, 0] }}
                        transition={{ delay: 1.2, duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                </motion.div>

                {/* Info Grid */}
                <motion.div
                    className="grid gap-8 md:grid-cols-3 max-w-2xl mx-auto text-mono text-sm mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="p-4 border border-border/50 bg-neural-gray/30"
                        whileHover={{ borderColor: "rgba(0, 255, 148, 0.5)" }}
                    >
                        <div className="text-label mb-2">COORDINATES</div>
                        <div className="text-synapse-white">INDONESIA</div>
                    </motion.div>
                    <motion.div
                        className="p-4 border border-border/50 bg-neural-gray/30"
                        whileHover={{ borderColor: "rgba(0, 255, 148, 0.5)" }}
                    >
                        <div className="text-label mb-2">RESPONSE TIME</div>
                        <div className="text-synapse-white">~24 HOURS</div>
                    </motion.div>
                    <motion.div
                        className="p-4 border border-border/50 bg-neural-gray/30"
                        whileHover={{ borderColor: "rgba(0, 255, 148, 0.5)" }}
                    >
                        <div className="text-label mb-2">STATUS</div>
                        <div className="status-online text-synapse-white">AVAILABLE</div>
                    </motion.div>
                </motion.div>

                {/* Social Links with Magnetic effect */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {PRODUCT_LINKS.map((link, index) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <MagneticButton href={link.href} strength={0.2}>
                                <span className="flex items-center gap-2">
                                    {link.name} <ArrowUpRight size={14} />
                                </span>
                            </MagneticButton>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Footer */}
            <motion.div
                className="absolute bottom-8 left-0 right-0 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="text-mono text-xs text-muted/60 mb-2">
                    DESIGNED & BUILT WITH
                </div>
                <div className="text-mono text-xs text-muted flex items-center justify-center gap-4">
                    <span>NEXT.JS</span>
                    <span className="text-signal-green">•</span>
                    <span>R3F</span>
                    <span className="text-signal-green">•</span>
                    <span>GSAP</span>
                    <span className="text-signal-green">•</span>
                    <span>FRAMER</span>
                </div>
                <div className="text-mono text-xs text-muted/40 mt-4">
                    © 2026 NEURAL_INTERFACE • [ BY ICH1HS ]
                </div>
            </motion.div>
        </section>
    );
}
