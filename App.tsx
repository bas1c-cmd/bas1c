import React, { useState, useEffect } from "react";
import { ReactLenis } from "lenis/react";
import { MagneticText } from "./components/ui/magnetic-text";
import { AnimatedFolder, Project } from "./components/ui/animated-folder";
import { MythicCard } from "./components/ui/mythic-card";
import { Loader } from "./components/ui/loader";
import { TimelineSection } from "./components/ui/timeline-section";
import { SkillsSection } from "./components/ui/skills-section";
import { ProjectsSection } from "./components/ui/projects-section";
import { ContactCard } from "./components/ui/contact-card";
import { AnimeNavBar, NavItem } from "./components/ui/anime-navbar";
import { Home, User, Briefcase, FileDown, ArrowRight, Mail, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
    const [activeSection, setActiveSection] = useState("Home");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading sequence
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    const navItems: NavItem[] = [
        { name: "Home", url: "#", icon: Home },
        { name: "About", url: "#", icon: User },
        { name: "Projects", url: "#", icon: Briefcase },
    ];

    const handleNavChange = (name: string) => {
        if (name === activeSection) return;
        setActiveSection(name);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <ReactLenis root>
            <main className="bg-black font-sans selection:bg-indigo-500/30">

                {/* Transition Loader */}
                {isLoading && <Loader />}

                <AnimeNavBar
                    items={navItems}
                    defaultActive="Home"
                    activeTab={activeSection}
                    onTabChange={handleNavChange}
                />

                <div className="relative">

                    {/* --- HOME VIEW (Includes Hero, Nav Choices) --- */}
                    {activeSection === "Home" && (
                        <>
                            {/* SLIDE 1: HERO INTRO */}
                            <section className="sticky top-0 h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden z-0 shadow-2xl">
                                <div className="absolute inset-0 w-full h-full z-0">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                    >
                                        <source src="./hero-background.mp4" type="video/mp4" />
                                    </video>
                                </div>

                                <motion.div
                                    className="absolute top-1/2 left-10 -translate-y-1/2 z-10"
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <div className="relative">
                                        {/* Animated corner borders */}
                                        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-[#8B0000] animate-pulse"></div>
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-[#8B0000] animate-pulse"></div>

                                        {/* Glowing background */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/10 via-transparent to-transparent blur-xl"></div>

                                        {/* Content container */}
                                        <div className="relative px-8 py-6 border-l-2 border-[#8B0000]/50">
                                            {/* Main title */}
                                            <div className="relative mb-4">
                                                <MagneticText
                                                    text="bas1c"
                                                    hoverText="DEVELOPER"
                                                    className="text-[#8B0000] drop-shadow-[0_0_30px_rgba(139,0,0,0.8)]"
                                                />
                                                {/* Animated underline */}
                                                <motion.div
                                                    className="h-1 bg-gradient-to-r from-[#8B0000] to-transparent mt-2"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                                                ></motion.div>
                                            </div>

                                            {/* Subtitle with staggered animation */}
                                            <motion.div
                                                className="flex flex-col gap-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.8, duration: 0.6 }}
                                            >
                                                <div className="text-2xl font-bold tracking-[0.3em] text-[#CD5C5C] drop-shadow-[0_0_15px_rgba(205,92,92,0.6)] uppercase">
                                                    AI Engineer
                                                </div>
                                                <div className="text-lg tracking-[0.2em] text-[#CD5C5C]/80 font-medium">
                                                    Automation • Linux • Dev
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Download Resume Button */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2, duration: 0.5 }}
                                    className="absolute bottom-10 right-10 z-10"
                                >
                                    <a
                                        href="./resume.pdf"
                                        download
                                        className="group flex items-center gap-3 bg-[#4A0E0E] text-[#CD5C5C] px-6 py-3 rounded-2xl font-bold text-xl border border-[#8B0000]/30 cursor-pointer transition-all duration-300 hover:bg-[#8B0000] hover:text-white hover:border-[#CD5C5C] active:scale-95 shadow-[0_0_20px_rgba(139,0,0,0.3)]"
                                    >
                                        <div className="transition-transform duration-500 group-hover:scale-125">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="30"
                                                height="30"
                                                className="fill-[#CD5C5C] transition-all duration-300 group-hover:translate-x-5 group-hover:scale-110 group-hover:fill-white"
                                            >
                                                <path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z" />
                                            </svg>
                                        </div>
                                        <span className="transition-all duration-500 group-hover:opacity-0">Resume</span>
                                    </a>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1, duration: 1 }}
                                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#CD5C5C]/70 text-sm tracking-widest uppercase flex flex-col items-center gap-2"
                                >
                                    <span>Scroll to Explore</span>
                                    <motion.div
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="w-[1px] h-12 bg-gradient-to-b from-[#CD5C5C]/50 to-transparent"
                                    />
                                </motion.div>
                            </section>

                            {/* SLIDE 2: PORTFOLIO FOLDERS */}
                            <section className="sticky top-0 h-screen w-full bg-zinc-950 z-10 flex flex-col items-center justify-center rounded-t-[3rem] border-t border-white/10 overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#8B0000]/20 via-zinc-950 to-zinc-950"></div>

                                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col py-20">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="text-center mb-10"
                                    >
                                        <h2 className="text-3xl md:text-5xl font-bold text-[#CD5C5C] mb-2">Where to next?</h2>
                                        <p className="text-[#CD5C5C]/50">Explore my work</p>
                                    </motion.div>

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto items-center">
                                        <AnimatedFolder
                                            title="About Me"
                                            projects={[
                                                { id: "a1", image: "./about-journey.png", title: "Journey", description: "Aspiring AI Engineer specializing in automation and Linux systems" },
                                                { id: "a2", image: "./about-skills.png", title: "Skills", description: "Python, Machine Learning, Deep Learning, Linux, Automation, DevOps" },
                                                { id: "a3", image: "./about-experience.png", title: "Experience", description: "Building intelligent systems and automation solutions" },
                                            ] as Project[]}
                                            gradient="linear-gradient(135deg, #8B0000, #CD5C5C)"
                                            onClick={() => handleNavChange("About")}
                                        />
                                        <AnimatedFolder
                                            title="Projects"
                                            projects={[
                                                { id: "p1", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", title: "AI Dashboard", description: "Analytics platform" },
                                                { id: "p2", image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80", title: "Automation Tools", description: "Workflow automation" },
                                                { id: "p3", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80", title: "Linux Scripts", description: "System administration" },
                                                { id: "p4", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80", title: "Dev Tools", description: "Developer utilities" },
                                                { id: "p5", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80", title: "Web Apps", description: "Full-stack applications" },
                                            ] as Project[]}
                                            gradient="linear-gradient(135deg, #CD5C5C, #8B0000)"
                                            onClick={() => handleNavChange("Projects")}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* SLIDE 3: CONTACT */}
                            <section className="sticky top-0 h-screen w-full bg-[#0a0a0a] z-20 flex flex-col items-center justify-center rounded-t-[3rem] border-t border-white/10 overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.7)]">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#8B0000]/10 via-[#0a0a0a] to-[#0a0a0a]"></div>

                                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
                                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                                        <div className="text-center md:text-left max-w-lg">
                                            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                                                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CD5C5C] to-[#8B0000]">Connect</span>
                                            </h2>
                                            <p className="text-xl text-white/60 font-light leading-relaxed mb-8">
                                                I'm always open to discussing product design work or partnership opportunities. Let's create something amazing together.
                                            </p>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute -inset-4 bg-[#8B0000]/20 rounded-full blur-[100px] -z-10"></div>
                                            <ContactCard />
                                        </div>
                                    </div>

                                    <footer className="absolute bottom-8 w-full text-center text-white/20 text-sm font-light tracking-widest uppercase">
                                        © 2024 Dev Portfolio • Crafted with Passion
                                    </footer>
                                </div>
                            </section>
                        </>
                    )}

                    {/* --- MAIN CONTENT SECTIONS --- */}

                    {/* ABOUT SECTION VIEW */}
                    {activeSection === "About" && (
                        <div className="w-full bg-black">
                            <section className="h-screen relative flex items-center justify-center overflow-hidden bg-black">
                                {/* Video Background */}
                                <div className="absolute inset-0 w-full h-full z-0">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                    >
                                        <source src="./about-hero.mp4" type="video/mp4" />
                                    </video>
                                    {/* Subtle vignette instead of heavy overlay for 3D realism */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80"></div>
                                </div>

                                {/* Content Overlay */}
                                <div className="container mx-auto px-6 relative z-10 flex h-full items-center justify-end pt-20 pb-4">
                                    {/* Right Side Container for Text + Card */}
                                    <div className="md:w-1/2 w-full flex flex-col gap-4 pr-4 md:pr-12 justify-center h-full">

                                        {/* Title Section with Floating Animation */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                y: [0, -5, 0]
                                            }}
                                            transition={{
                                                opacity: { duration: 0.8 },
                                                x: { duration: 0.8 },
                                                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                                            }}
                                            className="text-right"
                                        >
                                            <h2 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl leading-none">
                                                Who is <br />
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CD5C5C] to-[#8B0000]">bas1c?</span>
                                            </h2>
                                        </motion.div>

                                        {/* Profile Card / Mythic Card */}
                                        <motion.div
                                            className="relative z-10 origin-right transform scale-90 md:scale-100"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.8 }}
                                        >
                                            <MythicCard />
                                        </motion.div>
                                    </div>
                                </div>
                            </section>
                            <TimelineSection />
                            <SkillsSection />
                        </div>
                    )}

                    {/* PROJECTS SECTION VIEW */}
                    {activeSection === "Projects" && (
                        <ProjectsSection />
                    )}

                </div>
            </main>
        </ReactLenis>
    );
}
