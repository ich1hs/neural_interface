"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { href: "#hero", label: "HOME" },
    { href: "#features", label: "FEATURES" },
    { href: "#demo", label: "DEMO" },
    { href: "#contact", label: "CONTACT" },
];

export function Navigation() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Show nav after scrolling past hero
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > window.innerHeight * 0.5);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-signal-green z-[100] origin-left"
                style={{ scaleX }}
            />

            {/* Navigation Bar */}
            <AnimatePresence>
                {isVisible && (
                    <motion.nav
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-[99] px-6 py-3 border border-border bg-void-black/90 backdrop-blur-md"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="flex items-center gap-8">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className={`bracket-link text-xs ${activeSection === link.href.slice(1)
                                            ? "text-signal-green"
                                            : ""
                                            }`}
                                        data-cursor="hover"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Side Scroll Indicator */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[98] hidden lg:flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="group flex items-center gap-2"
                        data-cursor="hover"
                    >
                        <span
                            className={`w-2 h-2 rounded-full border transition-all duration-300 ${activeSection === link.href.slice(1)
                                ? "bg-signal-green border-signal-green scale-125"
                                : "border-muted group-hover:border-synapse-white"
                                }`}
                        />
                        <span
                            className={`text-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity ${activeSection === link.href.slice(1) ? "text-signal-green" : "text-muted"
                                }`}
                        >
                            {link.label}
                        </span>
                    </a>
                ))}
            </div>
        </>
    );
}
