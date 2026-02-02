import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface ScrollProgressProps {
    sections?: string[];
}

export function ScrollProgress({ sections = ["Home", "About", "Projects"] }: ScrollProgressProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            const index = Math.min(
                Math.floor(latest * sections.length),
                sections.length - 1
            );
            setActiveIndex(index);
        });
    }, [scrollYProgress, sections.length]);

    return (
        <div className="fixed top-0 left-0 right-0 z-[9998] pointer-events-none">
            {/* Progress Bar */}
            <motion.div
                style={{ scaleX }}
                className="h-1 bg-gradient-to-r from-[#8B0000] via-[#CD5C5C] to-[#8B0000] origin-left shadow-lg shadow-[#CD5C5C]/50"
            />

            {/* Section Indicators */}
            <div className="absolute top-4 right-8 flex flex-col gap-2 pointer-events-auto">
                {sections.map((section, index) => (
                    <motion.div
                        key={section}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <span
                            className={`text-sm font-medium transition-all duration-300 ${activeIndex === index
                                    ? "text-[#CD5C5C] opacity-100"
                                    : "text-white/40 opacity-60"
                                }`}
                        >
                            {section}
                        </span>
                        <motion.div
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index
                                    ? "bg-[#CD5C5C] shadow-lg shadow-[#CD5C5C]/50"
                                    : "bg-white/20"
                                }`}
                            animate={{
                                scale: activeIndex === index ? [1, 1.3, 1] : 1,
                            }}
                            transition={{
                                repeat: activeIndex === index ? Infinity : 0,
                                duration: 2,
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
