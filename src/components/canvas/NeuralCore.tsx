"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useCursor } from "@/components/providers/CursorProvider";

// Particle system for the neural core
function NeuralParticles({ count = 2000 }: { count?: number }) {
    const pointsRef = useRef<THREE.Points>(null);
    const { x, y } = useCursor();
    const { viewport } = useThree();
    const mouseRef = useRef({ x: 0, y: 0 });

    // Generate initial positions in a sphere
    const [positions, originalPositions] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const origPos = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            const radius = 2 + Math.random() * 0.5;

            const px = radius * Math.cos(theta) * Math.sin(phi);
            const py = radius * Math.sin(theta) * Math.sin(phi);
            const pz = radius * Math.cos(phi);

            pos[i * 3] = px;
            pos[i * 3 + 1] = py;
            pos[i * 3 + 2] = pz;

            origPos[i * 3] = px;
            origPos[i * 3 + 1] = py;
            origPos[i * 3 + 2] = pz;
        }

        return [pos, origPos];
    }, [count]);

    // Update mouse position in normalized coordinates
    useEffect(() => {
        if (typeof window !== "undefined") {
            mouseRef.current = {
                x: (x / window.innerWidth) * 2 - 1,
                y: -(y / window.innerHeight) * 2 + 1,
            };
        }
    }, [x, y]);

    // Animate particles
    useFrame((state) => {
        if (!pointsRef.current) return;

        const positions = pointsRef.current.geometry.attributes.position
            .array as Float32Array;
        const time = state.clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const ox = originalPositions[i3];
            const oy = originalPositions[i3 + 1];
            const oz = originalPositions[i3 + 2];

            // Organic breathing motion
            const breathe = Math.sin(time * 0.5 + i * 0.01) * 0.1;

            // Mouse influence
            const mouseInfluence = 0.3;
            const dx = mouseRef.current.x * viewport.width * 0.5;
            const dy = mouseRef.current.y * viewport.height * 0.5;
            const dist = Math.sqrt(
                Math.pow(ox - dx, 2) + Math.pow(oy - dy, 2)
            );
            const influence = Math.max(0, 1 - dist / 3) * mouseInfluence;

            positions[i3] = ox + ox * breathe + (dx - ox) * influence * 0.2;
            positions[i3 + 1] = oy + oy * breathe + (dy - oy) * influence * 0.2;
            positions[i3 + 2] = oz + oz * breathe;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y = time * 0.05;
        pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
            <PointMaterial
                transparent
                color="#00FF94"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

// Connection lines between nearby particles
function NeuralConnections() {
    const linesRef = useRef<THREE.LineSegments>(null);

    useFrame((state) => {
        if (!linesRef.current) return;
        linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    });

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions: number[] = [];
        const nodeCount = 50;

        // Create nodes on sphere
        const nodes: THREE.Vector3[] = [];
        for (let i = 0; i < nodeCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / nodeCount);
            const theta = Math.sqrt(nodeCount * Math.PI) * phi;
            const radius = 2;
            nodes.push(
                new THREE.Vector3(
                    radius * Math.cos(theta) * Math.sin(phi),
                    radius * Math.sin(theta) * Math.sin(phi),
                    radius * Math.cos(phi)
                )
            );
        }

        // Connect nearby nodes
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const dist = nodes[i].distanceTo(nodes[j]);
                if (dist < 1.2) {
                    positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
                    positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
                }
            }
        }

        geo.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(positions, 3)
        );
        return geo;
    }, []);

    return (
        <lineSegments ref={linesRef} geometry={geometry}>
            <lineBasicMaterial
                color="#4D7CFF"
                transparent
                opacity={0.15}
                blending={THREE.AdditiveBlending}
            />
        </lineSegments>
    );
}

// Inner glow sphere
function CoreGlow() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
        meshRef.current.scale.setScalar(scale);
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial
                color="#00FF94"
                transparent
                opacity={0.1}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

// Main NeuralCore component
export function NeuralCore() {
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Viewport detection for performance
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0">
            {isVisible && (
                <Canvas
                    camera={{ position: [0, 0, 6], fov: 50 }}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 2]}
                >
                    <ambientLight intensity={0.5} />
                    <NeuralParticles count={1500} />
                    <NeuralConnections />
                    <CoreGlow />
                </Canvas>
            )}
        </div>
    );
}
