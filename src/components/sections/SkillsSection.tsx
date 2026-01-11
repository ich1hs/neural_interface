"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/ScrambleText";

interface Skill {
    name: string;
    category: "core" | "web" | "ai";
    position: [number, number, number];
    connections: string[];
}

const SKILLS: Skill[] = [
    // Core
    { name: "Python", category: "core", position: [-2, 1.5, 0], connections: ["TensorFlow", "PyTorch", "Pandas"] },
    { name: "Java", category: "core", position: [-2.5, -0.5, 1], connections: [] },
    { name: "C++", category: "core", position: [-2, -1.5, -0.5], connections: [] },

    // Web
    { name: "Next.js", category: "web", position: [0, 2, 1], connections: ["React", "TypeScript"] },
    { name: "React", category: "web", position: [0.5, 0.5, 2], connections: ["TypeScript", "Next.js"] },
    { name: "TypeScript", category: "web", position: [1, -1, 1.5], connections: ["React", "Next.js"] },

    // AI/Data
    { name: "TensorFlow", category: "ai", position: [2, 1, -0.5], connections: ["Python", "PyTorch"] },
    { name: "PyTorch", category: "ai", position: [2.5, -0.5, -1], connections: ["Python", "TensorFlow"] },
    { name: "Pandas", category: "ai", position: [1.5, -1.5, 0], connections: ["Python"] },
];

const CATEGORY_COLORS = {
    core: "#E8E8E8",
    web: "#4D7CFF",
    ai: "#00FF94",
};

// Individual skill node
function SkillNode({
    skill,
    hoveredSkill,
    setHoveredSkill,
}: {
    skill: Skill;
    hoveredSkill: string | null;
    setHoveredSkill: (name: string | null) => void;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    const isHovered = hoveredSkill === skill.name;
    const isConnected = hoveredSkill
        ? SKILLS.find((s) => s.name === hoveredSkill)?.connections.includes(skill.name)
        : false;
    const isActive = isHovered || isConnected;

    useFrame((state) => {
        if (!meshRef.current) return;
        const scale = isActive ? 1.5 : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);

        // Subtle float animation
        meshRef.current.position.y =
            skill.position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + skill.position[0]) * 0.08;
    });

    return (
        <group position={skill.position}>
            {/* Node sphere */}
            <mesh
                ref={meshRef}
                onPointerEnter={() => setHoveredSkill(skill.name)}
                onPointerLeave={() => setHoveredSkill(null)}
            >
                <sphereGeometry args={[0.15, 24, 24]} />
                <meshBasicMaterial
                    color={isActive ? CATEGORY_COLORS[skill.category] : "#444"}
                    transparent
                    opacity={isActive ? 1 : 0.7}
                />
            </mesh>

            {/* Glow effect when active */}
            {isActive && (
                <mesh>
                    <sphereGeometry args={[0.25, 16, 16]} />
                    <meshBasicMaterial
                        color={CATEGORY_COLORS[skill.category]}
                        transparent
                        opacity={0.3}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            )}
        </group>
    );
}

// Connection lines between skills
function ConnectionLines({ hoveredSkill }: { hoveredSkill: string | null }) {
    const linesRef = useRef<THREE.LineSegments>(null);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions: number[] = [];

        SKILLS.forEach((skill) => {
            skill.connections.forEach((connName) => {
                const connSkill = SKILLS.find((s) => s.name === connName);
                if (connSkill) {
                    positions.push(...skill.position);
                    positions.push(...connSkill.position);
                }
            });
        });

        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        return geo;
    }, []);

    const isHighlighted = hoveredSkill !== null;

    return (
        <lineSegments ref={linesRef} geometry={geometry}>
            <lineBasicMaterial
                color={isHighlighted ? "#00FF94" : "#333"}
                transparent
                opacity={isHighlighted ? 0.8 : 0.3}
            />
        </lineSegments>
    );
}

// Main 3D scene
function SkillsScene({
    hoveredSkill,
    setHoveredSkill,
}: {
    hoveredSkill: string | null;
    setHoveredSkill: (name: string | null) => void;
}) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002;
        }
    });

    return (
        <>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />

            <group ref={groupRef}>
                <ConnectionLines hoveredSkill={hoveredSkill} />
                {SKILLS.map((skill) => (
                    <SkillNode
                        key={skill.name}
                        skill={skill}
                        hoveredSkill={hoveredSkill}
                        setHoveredSkill={setHoveredSkill}
                    />
                ))}
            </group>

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
            />
        </>
    );
}

// HTML overlay for skill labels
function SkillLabels({ hoveredSkill }: { hoveredSkill: string | null }) {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="relative w-[500px] h-[500px]">
                {SKILLS.map((skill) => {
                    const isActive = hoveredSkill === skill.name ||
                        (hoveredSkill && SKILLS.find(s => s.name === hoveredSkill)?.connections.includes(skill.name));

                    // Project 3D positions to 2D (simplified)
                    const x = 250 + skill.position[0] * 50;
                    const y = 250 - skill.position[1] * 50;

                    return (
                        <div
                            key={skill.name}
                            className={`absolute text-mono text-xs transition-all duration-200 ${isActive ? "text-signal-green scale-110" : "text-muted"
                                }`}
                            style={{
                                left: x,
                                top: y,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            {skill.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function SkillsSection() {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Ensure client-side only rendering for Canvas
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <section id="skills" className="relative min-h-screen w-full bg-void-black py-32">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="mb-4 text-label">
                        <ScrambleText text="[ SYNAPSE MAP ]" duration={800} />
                    </div>
                    <h2 className="text-display text-[clamp(2.5rem,6vw,5rem)]">
                        SKILL <span className="text-signal-green">CONSTELLATION</span>
                    </h2>
                    <p className="mt-4 text-muted max-w-md mx-auto">
                        Hover over nodes to explore connections. Drag to rotate.
                    </p>
                </motion.div>

                {/* 3D Canvas */}
                <div ref={containerRef} className="relative h-[60vh] w-full">
                    {isClient && (
                        <Canvas
                            camera={{ position: [0, 0, 7], fov: 45 }}
                            dpr={[1, 2]}
                            style={{ background: "transparent" }}
                        >
                            <SkillsScene
                                hoveredSkill={hoveredSkill}
                                setHoveredSkill={setHoveredSkill}
                            />
                        </Canvas>
                    )}

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 flex gap-6 text-mono text-xs">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-synapse-white" />
                            <span>CORE</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-aether-blue" />
                            <span>WEB</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-signal-green" />
                            <span>AI/DATA</span>
                        </div>
                    </div>

                    {/* Hovered Skill Info */}
                    {hoveredSkill && (
                        <motion.div
                            className="absolute top-4 right-4 border border-signal-green bg-neural-gray/95 px-6 py-3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="text-mono text-xs text-muted mb-1">SELECTED NODE</div>
                            <div className="text-xl font-bold text-signal-green">{hoveredSkill}</div>
                            {SKILLS.find(s => s.name === hoveredSkill)?.connections.length ? (
                                <div className="text-mono text-xs text-muted mt-2">
                                    → {SKILLS.find(s => s.name === hoveredSkill)?.connections.join(", ")}
                                </div>
                            ) : null}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
