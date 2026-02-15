import React, { useEffect, useRef } from "react";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";

export const MouseSpotlight = ({ className = "" }: { className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // We need to attach the event listener to the parent container
    // Ideally, this component is placed INSIDE a container with 'group' or we just pass the handler up
    // But a cleaner way for a global or section-specific spotlight is to just track mouse on the parent ref
    // For simplicity here, we'll assume this component renders a div that fills the parent and captures mouse, 
    // OR we rely on the parent already capturing mouse.

    // Actually, let's make this component just be the *effect* and the parent handles the event, 
    // OR we make this a wrapper. Let's make it a wrapper.

    return (
        <div
            className={`relative w-full h-full overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(205, 92, 92, 0.15),
                transparent 80%
                )
            `,
                }}
            />
            {/* We can also just render the light without needing children if we put it as a sibling overlay */}
        </div>
    );
};

// Alternative: A hook or absolute overlay that just needs coordinates. 
// Let's go with a simpler "SpotlightOverlay" that expects to be inside a relative container.
export const SpotlightEffect = () => {
    const mouseX = useMotionValue(-1000); // Start off screen
    const mouseY = useMotionValue(-1000);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // This tracks global window mouse, which might be easier for large sections
            // But we want it relative to the section usually.
            // Let's stick to the container-based approach in the actual section files for better performance/scoping.
            return;
        };
        // window.addEventListener("mousemove", handleMouseMove);
        // return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return null;
}

// Final Decision: I will implement the logic directly in the sections or create a "SpotlightContainer" wrapper.
// Let's create a "SpotlightContainer" wrapper.

export const SpotlightContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div className={`group/spotlight ${className}`} onMouseMove={onMouseMove}>
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 transition duration-300 opacity-0 group-hover/spotlight:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(205, 92, 92, 0.10),
                            transparent 80%
                        )
                    `,
                }}
            />
            {children}
        </div>
    );
}
