"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
}

export function GlowCard({ children, className = "" }: GlowCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
        stiffness: 150,
        damping: 20,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
        stiffness: 150,
        damping: 20,
    });

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative ${className}`}
        >
            {/* Glow effect */}
            <motion.div
                className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(
            300px circle at calc(var(--mouse-x, 50%) * 100%) calc(var(--mouse-y, 50%) * 100%),
            rgba(0, 255, 148, 0.15),
            transparent 40%
          )`,
                }}
            />

            {/* Card content */}
            <div
                className="relative border border-border bg-neural-gray/50 p-6 h-full"
                style={{ transform: "translateZ(20px)" }}
            >
                {children}
            </div>
        </motion.div>
    );
}
