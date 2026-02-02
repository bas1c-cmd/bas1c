import { useScroll, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ScrollProgressBarProps {
    sections: { name: string; color: string }[];
}

export function ScrollProgressBar({ sections }: ScrollProgressBarProps) {
    const { scrollYProgress } = useScroll();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            const sectionIndex = Math.floor(latest * sections.length);
            setActiveIndex(Math.min(sectionIndex, sections.length - 1));
        });

        return () => unsubscribe();
    }, [scrollYProgress, sections.length]);

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9998] hidden md:flex flex-col items-center gap-4">
            {/* Progress Bar */}
            <div className="relative w-1 h-64 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                    className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-[#CD5C5C] to-[#8B0000] shadow-[0_0_20px_rgba(205,92,92,0.5)]"
                    style={{
                        height: scrollYProgress,
                        transformOrigin: 'bottom',
                    }}
                />
            </div>

            {/* Section Markers */}
            <div className="flex flex-col gap-4">
                {sections.map((section, index) => (
                    <motion.div
                        key={section.name}
                        className="group relative flex items-center gap-3 cursor-pointer"
                        initial={false}
                        animate={{
                            scale: activeIndex === index ? 1.2 : 1,
                        }}
                        whileHover={{ scale: 1.3 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        {/* Dot */}
                        <motion.div
                            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeIndex === index
                                    ? 'bg-[#CD5C5C] border-[#CD5C5C] shadow-[0_0_15px_rgba(205,92,92,0.8)]'
                                    : 'bg-transparent border-white/30 group-hover:border-[#CD5C5C]/50'
                                }`}
                        />

                        {/* Label - Shows on hover */}
                        <motion.span
                            className="absolute left-full ml-3 px-3 py-1.5 bg-[#1a0505]/90 border border-[#8B0000]/30 backdrop-blur-md rounded-lg text-white text-sm font-semibold whitespace-nowrap"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: activeIndex === index ? 1 : 0, x: activeIndex === index ? 0 : -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {section.name}
                        </motion.span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
