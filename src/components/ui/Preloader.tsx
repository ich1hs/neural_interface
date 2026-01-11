"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrambleText } from "@/components/ui/ScrambleText";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void-black"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Logo/Brand */}
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="text-display text-4xl tracking-wider">
                            NEURAL<span className="text-signal-green">_</span>INTERFACE
                        </div>
                    </motion.div>

                    {/* Progress Bar */}
                    <div className="w-64 h-[2px] bg-border overflow-hidden">
                        <motion.div
                            className="h-full bg-signal-green"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ ease: "easeOut" }}
                        />
                    </div>

                    {/* Progress Text */}
                    <motion.div
                        className="mt-4 text-mono text-xs text-muted"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <ScrambleText
                            text={`INITIALIZING... ${Math.floor(Math.min(progress, 100))}%`}
                            scrambleOnMount={false}
                            scrambleOnHover={false}
                            duration={500}
                        />
                    </motion.div>

                    {/* Status Messages */}
                    <motion.div
                        className="mt-8 text-mono text-xs text-muted/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {progress < 30 && "> loading_neural_core()"}
                        {progress >= 30 && progress < 60 && "> initializing_synapses()"}
                        {progress >= 60 && progress < 90 && "> calibrating_interface()"}
                        {progress >= 90 && "> ready_for_deployment()"}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
