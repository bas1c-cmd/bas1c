import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, forwardRef } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

// --- Interfaces & Constants ---

export interface Project {
    id: string;
    image: string;
    title: string;
    description?: string;
}

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200";

// --- Internal Components ---

interface ProjectCardProps {
    image: string;
    title: string;
    delay: number;
    isVisible: boolean;
    index: number;
    totalCount: number;
    onClick: () => void;
    isSelected: boolean;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
    ({ image, title, delay, isVisible, index, totalCount, onClick, isSelected }, ref) => {
        const middleIndex = (totalCount - 1) / 2;
        const factor = totalCount > 1 ? (index - middleIndex) / middleIndex : 0;

        const rotation = factor * 25;
        const translationX = factor * 85;
        const translationY = Math.abs(factor) * 12;

        return (
            <div
                ref={ref}
                className={cn(
                    "absolute w-20 h-28 cursor-pointer group/card",
                    isSelected && "opacity-0",
                )}
                style={{
                    transform: isVisible
                        ? `translateY(calc(-100px + ${translationY}px)) translateX(${translationX}px) rotate(${rotation}deg) scale(1)`
                        : "translateY(0px) translateX(0px) rotate(0deg) scale(0.4)",
                    opacity: isSelected ? 0 : isVisible ? 1 : 0,
                    transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                    zIndex: 10 + index,
                    left: "-40px",
                    top: "-56px",
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
            >
                <div className={cn(
                    "w-full h-full rounded-lg overflow-hidden shadow-xl bg-[#1a0505] border border-[#8B0000]/20 relative",
                    "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    "group-hover/card:-translate-y-6 group-hover/card:shadow-2xl group-hover/card:shadow-[#8B0000]/40 group-hover/card:ring-2 group-hover/card:ring-[#CD5C5C] group-hover/card:scale-125"
                )}>
                    <img
                        src={image || PLACEHOLDER_IMAGE}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-[#8B0000]/20 to-transparent" />
                    <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] font-black uppercase tracking-tighter text-white truncate drop-shadow-md">
                        {title}
                    </p>
                </div>
            </div>
        );
    }
);
ProjectCard.displayName = "ProjectCard";

interface ImageLightboxProps {
    projects: Project[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    sourceRect: DOMRect | null;
    onCloseComplete?: () => void;
    onNavigate: (index: number) => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
    projects,
    currentIndex,
    isOpen,
    onClose,
    sourceRect,
    onCloseComplete,
    onNavigate,
}) => {
    const [animationPhase, setAnimationPhase] = useState<"initial" | "animating" | "complete">("initial");
    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [internalIndex, setInternalIndex] = useState(currentIndex);
    const [isSliding, setIsSliding] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const totalProjects = projects.length;
    const hasNext = internalIndex < totalProjects - 1;
    const hasPrev = internalIndex > 0;
    const currentProject = projects[internalIndex];

    useEffect(() => {
        if (isOpen && currentIndex !== internalIndex && !isSliding) {
            setIsSliding(true);
            const timer = setTimeout(() => {
                setInternalIndex(currentIndex);
                setIsSliding(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, isOpen, internalIndex, isSliding]);

    useEffect(() => {
        if (isOpen) {
            setInternalIndex(currentIndex);
            setIsSliding(false);
        }
    }, [isOpen, currentIndex]);

    const navigateNext = useCallback(() => {
        if (internalIndex >= totalProjects - 1 || isSliding) return;
        onNavigate(internalIndex + 1);
    }, [internalIndex, totalProjects, isSliding, onNavigate]);

    const navigatePrev = useCallback(() => {
        if (internalIndex <= 0 || isSliding) return;
        onNavigate(internalIndex - 1);
    }, [internalIndex, isSliding, onNavigate]);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        onClose();
        setTimeout(() => {
            setIsClosing(false);
            setShouldRender(false);
            setAnimationPhase("initial");
            onCloseComplete?.();
        }, 500);
    }, [onClose, onCloseComplete]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowRight") navigateNext();
            if (e.key === "ArrowLeft") navigatePrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        if (isOpen) document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, handleClose, navigateNext, navigatePrev]);

    useLayoutEffect(() => {
        if (isOpen && sourceRect) {
            setShouldRender(true);
            setAnimationPhase("initial");
            setIsClosing(false);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimationPhase("animating");
                });
            });
            const timer = setTimeout(() => {
                setAnimationPhase("complete");
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [isOpen, sourceRect]);

    const handleDotClick = (idx: number) => {
        if (isSliding || idx === internalIndex) return;
        onNavigate(idx);
    };

    if (!shouldRender || !currentProject) return null;

    const getInitialStyles = (): React.CSSProperties => {
        if (!sourceRect) return {};
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const targetWidth = Math.min(800, viewportWidth - 64);
        const targetHeight = Math.min(viewportHeight * 0.85, 600);
        const targetX = (viewportWidth - targetWidth) / 2;
        const targetY = (viewportHeight - targetHeight) / 2;
        const scaleX = sourceRect.width / targetWidth;
        const scaleY = sourceRect.height / targetHeight;
        const scale = Math.max(scaleX, scaleY);
        const translateX = sourceRect.left + sourceRect.width / 2 - (targetX + targetWidth / 2) + window.scrollX;
        const translateY = sourceRect.top + sourceRect.height / 2 - (targetY + targetHeight / 2) + window.scrollY;
        return {
            transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
            opacity: 0.5,
            borderRadius: "12px",
        };
    };

    const getFinalStyles = (): React.CSSProperties => ({
        transform: "translate(0, 0) scale(1)",
        opacity: 1,
        borderRadius: "24px",
    });

    const currentStyles = animationPhase === "initial" && !isClosing ? getInitialStyles() : getFinalStyles();

    return (
        <div
            className={cn("fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 md:p-8")}
            onClick={handleClose}
            style={{
                opacity: isClosing ? 0 : 1,
                transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                style={{
                    opacity: (animationPhase === "initial" && !isClosing) ? 0 : 1,
                    transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            />
            <button
                onClick={(e) => { e.stopPropagation(); handleClose(); }}
                className={cn(
                    "absolute top-4 right-4 md:top-6 md:right-6 z-[10001] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#4A0E0E]/80 backdrop-blur-xl border border-[#8B0000]/30 shadow-2xl text-[#CD5C5C] hover:bg-[#8B0000] hover:text-white transition-all duration-300 cursor-pointer",
                )}
                style={{
                    opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
                    transform: animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(-30px)",
                    transition: "opacity 400ms ease-out 400ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms",
                    pointerEvents: animationPhase === "complete" && !isClosing ? "auto" : "none",
                }}
            >
                <X className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); navigatePrev(); }}
                disabled={!hasPrev || isSliding}
                className={cn(
                    "absolute left-2 md:left-10 z-[200] w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#4A0E0E]/80 backdrop-blur-xl border border-[#8B0000]/30 text-[#CD5C5C] hover:scale-110 hover:bg-[#8B0000] hover:text-white active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none shadow-2xl cursor-pointer",
                )}
                style={{
                    opacity: animationPhase === "complete" && !isClosing && hasPrev ? 1 : 0,
                    transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(-40px)",
                    transition: "opacity 400ms ease-out 600ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 600ms",
                    pointerEvents: animationPhase === "complete" && !isClosing && hasPrev ? "auto" : "none",
                }}
            >
                <ChevronLeft className="w-6 h-6" strokeWidth={3} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); navigateNext(); }}
                disabled={!hasNext || isSliding}
                className={cn(
                    "absolute right-2 md:right-10 z-[200] w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#4A0E0E]/80 backdrop-blur-xl border border-[#8B0000]/30 text-[#CD5C5C] hover:scale-110 hover:bg-[#8B0000] hover:text-white active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none shadow-2xl cursor-pointer",
                )}
                style={{
                    opacity: animationPhase === "complete" && !isClosing && hasNext ? 1 : 0,
                    transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(40px)",
                    transition: "opacity 400ms ease-out 600ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 600ms",
                    pointerEvents: animationPhase === "complete" && !isClosing && hasNext ? "auto" : "none",
                }}
            >
                <ChevronRight className="w-6 h-6" strokeWidth={3} />
            </button>
            <div
                ref={containerRef}
                className="relative z-10 w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
                style={{
                    ...currentStyles,
                    transform: isClosing ? "translate(0, 0) scale(0.92)" : currentStyles.transform,
                    transition: animationPhase === "initial" && !isClosing ? "none" : "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease-out, border-radius 700ms ease",
                    transformOrigin: "center center",
                }}
            >
                <div className={cn("relative overflow-hidden rounded-[inherit] bg-[#1a0505] border border-[#8B0000]/30 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]")}>
                    <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10]">
                        <div
                            className="flex w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{
                                transform: `translateX(-${internalIndex * 100}%)`,
                                transition: isSliding ? "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
                            }}
                        >
                            {projects.map((project) => (
                                <div key={project.id} className="min-w-full h-full relative">
                                    <img
                                        src={project.image || PLACEHOLDER_IMAGE}
                                        alt={project.title}
                                        className="w-full h-full object-cover select-none"
                                        onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE; }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className={cn("px-4 py-5 md:px-8 md:py-7 bg-[#1a0505]/90 border-t border-[#8B0000]/20")}
                        style={{
                            opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
                            transform: animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(40px)",
                            transition: "opacity 500ms ease-out 500ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 500ms",
                        }}
                    >
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg md:text-2xl font-bold text-[#CD5C5C] tracking-tight truncate">{currentProject?.title}</h3>
                                {currentProject?.description && (
                                    <p className="text-sm text-[#CD5C5C]/70 mt-2">{currentProject.description}</p>
                                )}
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#4A0E0E]/50 rounded-full border border-[#8B0000]/20">
                                        {projects.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleDotClick(idx)}
                                                className={cn("w-1.5 h-1.5 rounded-full transition-all duration-500", idx === internalIndex ? "bg-[#CD5C5C] scale-150" : "bg-[#CD5C5C]/30 hover:bg-[#CD5C5C]/60")}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#CD5C5C]/60">{internalIndex + 1} / {totalProjects}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface AnimatedFolderProps {
    title: string;
    projects: Project[];
    className?: string;
    gradient?: string;
    onClick?: () => void;
}

export const AnimatedFolder: React.FC<AnimatedFolderProps> = ({ title, projects, className, gradient, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);
    const [hiddenCardId, setHiddenCardId] = useState<string | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const previewProjects = projects.slice(0, 5);

    const handleProjectClick = (project: Project, index: number) => {
        const cardEl = cardRefs.current[index];
        if (cardEl) setSourceRect(cardEl.getBoundingClientRect());
        setSelectedIndex(index);
        setHiddenCardId(project.id);
    };

    const handleCloseLightbox = () => { setSelectedIndex(null); setSourceRect(null); };
    const handleCloseComplete = () => { setHiddenCardId(null); };
    const handleNavigate = (newIndex: number) => { setSelectedIndex(newIndex); setHiddenCardId(projects[newIndex]?.id || null); };

    const backBg = gradient || "linear-gradient(135deg, #8B0000 0%, #4A0E0E 100%)";
    const tabBg = gradient || "#8B0000";
    const frontBg = gradient || "linear-gradient(135deg, #CD5C5C 0%, #8B0000 100%)";

    return (
        <>
            <div
                className={cn("relative flex flex-col items-center justify-center p-8 rounded-2xl cursor-pointer bg-[#1a0505]/50 border border-[#8B0000]/20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-[#8B0000]/20 hover:border-[#CD5C5C]/40 group", className)}
                style={{ minWidth: "240px", minHeight: "280px", perspective: "1200px", transform: isHovered ? "scale(1.04) rotate(-1.5deg)" : "scale(1) rotate(0deg)" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick}
            >
                <div
                    className="absolute inset-0 rounded-2xl transition-opacity duration-700"
                    style={{ background: `radial-gradient(circle at 50% 70%, #8B0000 0%, transparent 70%)`, opacity: isHovered ? 0.12 : 0 }}
                />
                <div className="relative flex items-center justify-center mb-4" style={{ height: "160px", width: "200px" }}>
                    <div className="absolute w-32 h-24 rounded-lg shadow-md border border-[#8B0000]/20" style={{ background: backBg, transformOrigin: "bottom center", transform: isHovered ? "rotateX(-20deg) scaleY(1.05)" : "rotateX(0deg) scaleY(1)", transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)", zIndex: 10 }} />
                    <div className="absolute w-12 h-4 rounded-t-md border-t border-x border-[#8B0000]/20" style={{ background: tabBg, top: "calc(50% - 48px - 12px)", left: "calc(50% - 64px + 16px)", transformOrigin: "bottom center", transform: isHovered ? "rotateX(-30deg) translateY(-3px)" : "rotateX(0deg) translateY(0)", transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)", zIndex: 10 }} />
                    <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 20 }}>
                        {previewProjects.map((project, index) => (
                            <ProjectCard key={project.id} ref={(el) => { cardRefs.current[index] = el; }} image={project.image} title={project.title} delay={index * 50} isVisible={isHovered} index={index} totalCount={previewProjects.length} onClick={() => handleProjectClick(project, index)} isSelected={hiddenCardId === project.id} />
                        ))}
                    </div>
                    <div className="absolute w-32 h-24 rounded-lg shadow-lg border border-[#CD5C5C]/30" style={{ background: frontBg, top: "calc(50% - 48px + 4px)", transformOrigin: "bottom center", transform: isHovered ? "rotateX(35deg) translateY(12px)" : "rotateX(0deg) translateY(0)", transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)", zIndex: 30 }} />
                    <div className="absolute w-32 h-24 rounded-lg overflow-hidden pointer-events-none" style={{ top: "calc(50% - 48px + 4px)", background: "linear-gradient(135deg, rgba(205,92,92,0.3) 0%, transparent 60%)", transformOrigin: "bottom center", transform: isHovered ? "rotateX(35deg) translateY(12px)" : "rotateX(0deg) translateY(0)", transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)", zIndex: 31 }} />
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-bold text-[#CD5C5C] mt-4 transition-all duration-500" style={{ transform: isHovered ? "translateY(2px)" : "translateY(0)", letterSpacing: isHovered ? "-0.01em" : "0" }}>{title}</h3>
                    <p className="text-sm font-medium text-[#CD5C5C]/60 transition-all duration-500" style={{ opacity: isHovered ? 0.8 : 1 }}>{projects.length} {projects.length === 1 ? 'item' : 'items'}</p>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#CD5C5C]/50 transition-all duration-500" style={{ opacity: isHovered ? 0 : 1, transform: isHovered ? "translateY(10px)" : "translateY(0)" }}>
                    <span>Hover</span>
                </div>
            </div>
            <ImageLightbox projects={projects} currentIndex={selectedIndex ?? 0} isOpen={selectedIndex !== null} onClose={handleCloseLightbox} sourceRect={sourceRect} onCloseComplete={handleCloseComplete} onNavigate={handleNavigate} />
        </>
    );
};
