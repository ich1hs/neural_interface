"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface HoldButtonProps {
    onComplete: () => void;
    holdDuration?: number;
    children: React.ReactNode;
}

export function HoldButton({
    onComplete,
    holdDuration = 2000,
    children,
}: HoldButtonProps) {
    const [isHolding, setIsHolding] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const progress = useMotionValue(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);
    const rafRef = useRef<number>(0);

    const strokeDashoffset = useTransform(
        progress,
        [0, 1],
        [283, 0] // Circumference of circle with r=45
    );

    const updateProgress = useCallback(() => {
        if (!isHolding) return;

        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min(elapsed / holdDuration, 1);
        progress.set(newProgress);

        if (newProgress < 1) {
            rafRef.current = requestAnimationFrame(updateProgress);
        } else {
            setIsComplete(true);
            onComplete();
        }
    }, [isHolding, holdDuration, progress, onComplete]);

    const handleStart = useCallback(() => {
        if (isComplete) return;
        setIsHolding(true);
        startTimeRef.current = Date.now();
        progress.set(0);
        rafRef.current = requestAnimationFrame(updateProgress);
    }, [isComplete, progress, updateProgress]);

    const handleEnd = useCallback(() => {
        setIsHolding(false);
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
        if (!isComplete) {
            // Reset progress with spring animation
            progress.set(0);
        }
    }, [isComplete, progress]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <motion.button
            className="relative w-48 h-48 rounded-full border border-border bg-neural-gray/50 flex items-center justify-center group"
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            data-cursor="hover"
        >
            {/* Progress Ring */}
            <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 100 100"
            >
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border"
                />
                {/* Progress circle */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    style={{ strokeDashoffset }}
                    className="text-signal-green"
                />
            </svg>

            {/* Content */}
            <div className="relative z-10 text-center">
                {isComplete ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-signal-green"
                    >
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    </motion.div>
                ) : (
                    <div className="space-y-2">
                        <div className="text-mono text-xs text-muted">
                            {isHolding ? "TRANSMITTING..." : "HOLD TO SEND"}
                        </div>
                        <div className="text-display text-lg group-hover:text-signal-green transition-colors">
                            {children}
                        </div>
                    </div>
                )}
            </div>

            {/* Particles on complete */}
            {isComplete && (
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                >
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-signal-green rounded-full"
                            style={{
                                left: "50%",
                                top: "50%",
                            }}
                            initial={{ x: 0, y: 0, opacity: 1 }}
                            animate={{
                                x: Math.cos((i / 12) * Math.PI * 2) * 100,
                                y: Math.sin((i / 12) * Math.PI * 2) * 100,
                                opacity: 0,
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                    ))}
                </motion.div>
            )}
        </motion.button>
    );
}
