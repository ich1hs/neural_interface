"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    ReactNode,
} from "react";

interface CursorContextType {
    x: number;
    y: number;
    isHovering: boolean;
    setIsHovering: (value: boolean) => void;
}

const CursorContext = createContext<CursorContextType>({
    x: 0,
    y: 0,
    isHovering: false,
    setIsHovering: () => { },
});

export function useCursor() {
    return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: ReactNode }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);

    // 60fps RAF loop for smooth cursor movement
    useEffect(() => {
        const lerp = (start: number, end: number, factor: number) =>
            start + (end - start) * factor;

        const animate = () => {
            // Smooth interpolation (adjust 0.15 for more/less smoothing)
            currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.15);
            currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.15);

            if (cursorRef.current) {
                // Use transform for GPU acceleration
                cursorRef.current.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate(-50%, -50%)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetRef.current = { x: e.clientX, y: e.clientY };
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        const handleElementHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = Boolean(
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.dataset.cursor === "hover"
            );
            setIsHovering(isInteractive);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mouseover", handleElementHover, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mouseover", handleElementHover);
        };
    }, [isVisible]);

    return (
        <CursorContext.Provider
            value={{
                x: position.x,
                y: position.y,
                isHovering,
                setIsHovering,
            }}
        >
            {children}
            <div
                ref={cursorRef}
                className={`cursor ${isHovering ? "hover" : ""}`}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: isHovering ? 48 : 16,
                    height: isHovering ? 48 : 16,
                    border: `1px solid ${isHovering ? "#E8E8E8" : "#00FF94"}`,
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 99999,
                    opacity: isVisible ? 1 : 0,
                    transition: "width 0.2s, height 0.2s, border-color 0.2s, opacity 0.2s",
                    willChange: "transform",
                    mixBlendMode: "difference",
                }}
            />
        </CursorContext.Provider>
    );
}
