"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { ScrambleText } from "@/components/ui/ScrambleText";

// Animated 3D cube for demo
function AnimatedCube() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2, 2, 2]} />
            <meshBasicMaterial color="#00FF94" wireframe />
        </mesh>
    );
}

// Terminal demo component
function TerminalDemo() {
    const [lines, setLines] = useState<string[]>([]);
    const terminalLines = [
        "$ neural init --model transformer",
        "> Initializing NEURAL_INTERFACE v2.0.26...",
        "> Loading pre-trained weights...",
        "> Model loaded: 175B parameters",
        "> Optimizing for inference...",
        "$ neural predict --input 'Hello, world!'",
        "> Processing input tokens...",
        "> Running forward pass...",
        "> Output: { confidence: 0.98, latency: 8ms }",
        "$ neural deploy --env production",
        "> Deploying to edge nodes...",
        "> ✓ Deployed to 142 regions",
        "> Status: LIVE",
    ];

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < terminalLines.length) {
                setLines((prev) => [...prev, terminalLines[index]]);
                index++;
            } else {
                index = 0;
                setLines([]);
            }
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-sm space-y-1 h-64 overflow-hidden">
            {lines.map((line, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${(line || "").startsWith("$")
                        ? "text-signal-green"
                        : (line || "").startsWith("> ✓")
                            ? "text-signal-green"
                            : (line || "").includes("Error")
                                ? "text-red-500"
                                : "text-synapse-white/70"
                        }`}
                >
                    {line}
                </motion.div>
            ))}
            <motion.span
                className="inline-block w-2 h-4 bg-signal-green"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
            />
        </div>
    );
}

export function DemoSection() {
    const [activeTab, setActiveTab] = useState<"visual" | "code">("visual");

    return (
        <section id="demo" className="relative min-h-screen w-full bg-void-black py-32">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="text-label mb-4">
                        <ScrambleText text="[ LIVE DEMO ]" duration={800} />
                    </div>
                    <h2 className="text-display text-[clamp(2.5rem,8vw,6rem)] mb-6">
                        SEE IT IN <span className="text-signal-green">ACTION</span>
                    </h2>
                    <p className="text-muted max-w-lg mx-auto">
                        Experience the power of NEURAL_INTERFACE. Real-time inference,
                        instant deployment, infinite scale.
                    </p>
                </motion.div>

                {/* Tab Switcher */}
                <motion.div
                    className="flex justify-center gap-4 mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <button
                        onClick={() => setActiveTab("visual")}
                        className={`px-6 py-3 text-mono text-sm border transition-colors ${activeTab === "visual"
                            ? "border-signal-green text-signal-green bg-signal-green/10"
                            : "border-border text-muted hover:border-synapse-white"
                            }`}
                        data-cursor="hover"
                    >
                        [ VISUAL ]
                    </button>
                    <button
                        onClick={() => setActiveTab("code")}
                        className={`px-6 py-3 text-mono text-sm border transition-colors ${activeTab === "code"
                            ? "border-signal-green text-signal-green bg-signal-green/10"
                            : "border-border text-muted hover:border-synapse-white"
                            }`}
                        data-cursor="hover"
                    >
                        [ TERMINAL ]
                    </button>
                </motion.div>

                {/* Demo Content */}
                <motion.div
                    className="relative border border-border bg-neural-gray/30 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* Window Header */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-neural-gray/50">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        <span className="text-mono text-xs text-muted ml-4">
                            neural_interface_demo
                        </span>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 min-h-[400px]">
                        {activeTab === "visual" ? (
                            <div className="h-[350px]">
                                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                                    <ambientLight intensity={0.5} />
                                    <pointLight position={[10, 10, 10]} />
                                    <AnimatedCube />
                                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                                </Canvas>
                            </div>
                        ) : (
                            <TerminalDemo />
                        )}
                    </div>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center p-6 border border-border bg-neural-gray/30">
                        <div className="text-3xl font-bold text-signal-green mb-2">1M+</div>
                        <div className="text-mono text-xs text-muted">REQUESTS/SEC</div>
                    </div>
                    <div className="text-center p-6 border border-border bg-neural-gray/30">
                        <div className="text-3xl font-bold text-aether-blue mb-2">142</div>
                        <div className="text-mono text-xs text-muted">EDGE NODES</div>
                    </div>
                    <div className="text-center p-6 border border-border bg-neural-gray/30">
                        <div className="text-3xl font-bold text-synapse-white mb-2">8ms</div>
                        <div className="text-mono text-xs text-muted">AVG LATENCY</div>
                    </div>
                    <div className="text-center p-6 border border-border bg-neural-gray/30">
                        <div className="text-3xl font-bold text-signal-green mb-2">99.99%</div>
                        <div className="text-mono text-xs text-muted">SLA UPTIME</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
