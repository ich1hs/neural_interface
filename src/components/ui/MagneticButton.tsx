"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
    strength?: number;
}

export function MagneticButton({
    children,
    className = "",
    onClick,
    href,
    strength = 0.3,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * strength);
        y.set(distanceY * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const Component = href ? motion.a : motion.button;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{ x, y }}
            className="inline-block"
        >
            <Component
                href={href}
                target={href ? "_blank" : undefined}
                rel={href ? "noopener noreferrer" : undefined}
                onClick={onClick}
                className={`relative inline-flex items-center justify-center px-8 py-4 border border-border bg-neural-gray/50 text-synapse-white transition-colors hover:border-signal-green hover:text-signal-green group ${className}`}
                data-cursor="hover"
                whileTap={{ scale: 0.98 }}
            >
                {/* Background fill animation */}
                <motion.span
                    className="absolute inset-0 bg-signal-green/10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                />

                {/* Content */}
                <span className="relative z-10 text-mono text-sm tracking-wider">
                    {children}
                </span>

                {/* Corner accents */}
                <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-current opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-0 right-0 w-2 h-2 border-r border-t border-current opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-current opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-current opacity-0 group-hover:opacity-100 transition-opacity" />
            </Component>
        </motion.div>
    );
}
