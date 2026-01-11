"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Zap, Brain, TrendingUp, Globe, Package, Plug, MoveRight } from "lucide-react";

const FEATURES = [
    {
        id: "01",
        title: "REAL-TIME INFERENCE",
        description: "Process millions of predictions per second with our optimized ML pipeline. Built for speed, designed for scale.",
        icon: Zap,
        color: "signal-green",
    },
    {
        id: "02",
        title: "NEURAL NETWORKS",
        description: "Train and deploy custom neural networks with our intuitive interface. From CNNs to Transformers, we've got you covered.",
        icon: Brain,
        color: "aether-blue",
    },
    {
        id: "03",
        title: "AUTO SCALING",
        description: "Scale from zero to millions of requests automatically. Pay only for what you use, scale infinitely when you need it.",
        icon: TrendingUp,
        color: "synapse-white",
    },
    {
        id: "04",
        title: "EDGE DEPLOYMENT",
        description: "Deploy models to the edge for ultra-low latency. Run inference closer to your users, anywhere in the world.",
        icon: Globe,
        color: "signal-green",
    },
    {
        id: "05",
        title: "MODEL VERSIONING",
        description: "Track experiments, compare results, and roll back instantly. Full version control for your ML workflows.",
        icon: Package,
        color: "aether-blue",
    },
    {
        id: "06",
        title: "API FIRST",
        description: "Simple REST APIs and SDKs for every language. Integrate AI into your stack in minutes, not months.",
        icon: Plug,
        color: "synapse-white",
    },
];

function FeatureCard({
    feature,
    index,
}: {
    feature: (typeof FEATURES)[0];
    index: number;
}) {
    const Icon = feature.icon;

    return (
        <motion.div
            className="group relative border border-border bg-neural-gray/30 p-8 hover:border-signal-green/50 transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
        >
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-signal-green opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-signal-green opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-signal-green opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-signal-green opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Feature number */}
            <div className="text-mono text-xs text-muted mb-4">
                [ {feature.id} ]
            </div>

            {/* Icon */}
            <div className="mb-4 text-synapse-white group-hover:text-signal-green transition-colors">
                <Icon size={32} strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h3 className={`text-xl font-bold mb-3 text-${feature.color} group-hover:text-signal-green transition-colors`}>
                {feature.title}
            </h3>

            {/* Description */}
            <p className="text-synapse-white/60 leading-relaxed">
                {feature.description}
            </p>
        </motion.div>
    );
}

export function FeaturesSection() {
    return (
        <section id="features" className="relative min-h-screen w-full bg-void-black py-32">
            {/* Grid background */}
            <div className="absolute inset-0 grid-bg opacity-10" />

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="text-label mb-4">
                        <ScrambleText text="[ CAPABILITIES ]" duration={800} />
                    </div>
                    <h2 className="text-display text-[clamp(2.5rem,8vw,6rem)] mb-6">
                        BUILT FOR <span className="text-signal-green">SCALE</span>
                    </h2>
                    <p className="text-muted max-w-lg mx-auto">
                        Everything you need to build, train, and deploy machine learning
                        models at any scale. From prototype to production.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {FEATURES.map((feature, index) => (
                        <FeatureCard key={feature.id} feature={feature} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-center gap-2 text-mono text-sm text-muted group cursor-pointer hover:text-signal-green transition-colors">
                        <span>AND MANY MORE FEATURES</span>
                        <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
