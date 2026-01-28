import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

interface ThreeDCardProps {
    children: React.ReactNode;
    className?: string;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({ children, className }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left);
        y.set(clientY - top);

        // Calculate rotation based on mouse position
        const rotateX = ((clientY - top) - height / 2) / 20;
        const rotateY = ((clientX - left) - width / 2) / 20;

        // Check if setRotation exists on the ref (it won't, we need a separate state or motion value for rotation if we want to spring it too, 
        // but for now let's just use the values directly in the style or separate motion values)
        // Actually simpler:
        xRotation.set(rotateX);
        yRotation.set(rotateY);
    }

    const xRotation = useMotionValue(0);
    const yRotation = useMotionValue(0);

    const rotateX = useSpring(xRotation, { stiffness: 500, damping: 100 });
    const rotateY = useSpring(yRotation, { stiffness: 500, damping: 100 });

    function onMouseLeave() {
        x.set(0);
        y.set(0);
        xRotation.set(0);
        yRotation.set(0);
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
            }}
            className={`relative group/card ${className}`}
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#CD5C5C]/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-xl"
            />
            {children}
        </motion.div>
    );
};
