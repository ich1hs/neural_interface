"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ScrambleTextProps {
    text: string;
    className?: string;
    scrambleOnHover?: boolean;
    scrambleOnMount?: boolean;
    duration?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

export function ScrambleText({
    text,
    className = "",
    scrambleOnHover = true,
    scrambleOnMount = true,
    duration = 1500,
}: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const frameRef = useRef(0);

    const scramble = useCallback(() => {
        if (isScrambling) return;
        setIsScrambling(true);
        frameRef.current = 0;

        const totalFrames = Math.floor(duration / 30);
        const originalText = text.toUpperCase();

        intervalRef.current = setInterval(() => {
            frameRef.current++;
            const progress = frameRef.current / totalFrames;

            const newText = originalText
                .split("")
                .map((char, index) => {
                    if (char === " ") return " ";

                    // Characters reveal progressively
                    const revealThreshold = index / originalText.length;
                    if (progress > revealThreshold + 0.3) {
                        return char;
                    }

                    // Random character during scramble
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join("");

            setDisplayText(newText);

            if (frameRef.current >= totalFrames) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(originalText);
                setIsScrambling(false);
            }
        }, 30);
    }, [text, duration, isScrambling]);

    // Scramble on mount
    useEffect(() => {
        if (scrambleOnMount) {
            const timeout = setTimeout(scramble, 500);
            return () => clearTimeout(timeout);
        }
    }, [scrambleOnMount, scramble]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <span
            className={`${className} font-mono`}
            onMouseEnter={scrambleOnHover ? scramble : undefined}
            data-cursor="hover"
        >
            {displayText}
        </span>
    );
}
