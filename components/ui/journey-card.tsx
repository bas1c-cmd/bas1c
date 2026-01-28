import React from "react";
import "./journey-card.css";
import { LucideIcon } from "lucide-react";

interface JourneyCardProps {
    year: string;
    title: string;
    description: string[];
    image: string;
    className?: string;
}

export const JourneyCard: React.FC<JourneyCardProps> = ({ year, title, description, image, className }) => {
    return (
        <div className={`journey-card group ${className}`}>
            <div className="journey-card-border"></div>

            {/* Trail Animation Layer */}
            <div className="journey-card-trail"></div>

            <div className="journey-card-content flex flex-col h-full relative">

                {/* Background Image (faded) */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
                    <div
                        style={{ transform: "translateZ(50px)" }}
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    >
                        <img src={image} alt={title} className="w-full h-full object-cover opacity-20" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/90 to-black"></div>
                </div>

                {/* Text Content */}
                <div
                    className="relative z-10 p-8 h-full flex flex-col justify-end"
                    style={{ transform: "translateZ(75px)" }}
                >
                    <div className="mb-auto pt-4">
                        <span className="inline-block px-4 py-2 rounded-full bg-[#CD5C5C]/10 border border-[#CD5C5C]/50 text-[#CD5C5C] font-bold text-xl mb-4 shadow-[0_0_10px_rgba(205,92,92,0.3)]">
                            {year}
                        </span>
                        <h3 className="text-4xl font-bold text-white mb-2 leading-tight drop-shadow-lg">{title}</h3>
                    </div>

                    <div className="space-y-4 border-t border-white/10 pt-6">
                        <ul className="space-y-3">
                            {description.map((desc, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#CD5C5C] flex-shrink-0 shadow-[0_0_5px_#CD5C5C]"></span>
                                    <span className="text-sm md:text-base font-light">{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
