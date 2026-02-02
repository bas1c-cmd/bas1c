import { ReactNode, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface RevealTextProps {
    children: ReactNode;
    variant?: 'fadeUp' | 'blurFade' | 'slideLeft' | 'slideRight' | 'scale';
    delay?: number;
    className?: string;
    once?: boolean;
}

const variants: Record<string, Variants> = {
    fadeUp: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    },
    blurFade: {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: { opacity: 1, filter: 'blur(0px)' },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
    },
    slideRight: {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
};

export function RevealText({
    children,
    variant = 'fadeUp',
    delay = 0,
    className = '',
    once = false,
}: RevealTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants[variant]}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export function SplitText({ text, className = '', delay = 0 }: SplitTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });
    const words = text.split(' ');

    return (
        <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block overflow-hidden mr-2">
                    <motion.span
                        initial={{ y: '100%', opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: delay + wordIndex * 0.05,
                            ease: [0.33, 1, 0.68, 1],
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </div>
    );
}
