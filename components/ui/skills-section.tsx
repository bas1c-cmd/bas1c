import React from "react";
import { motion } from "framer-motion";
import { Lock, Hourglass, Award, CheckCircle2 } from "lucide-react";
import { SpotlightContainer } from "./spotlight-container";

interface Skill {
    name: string;
    percentage: number;
}

const skills: Skill[] = [
    { name: "n8n", percentage: 89 },
    { name: "vibecode", percentage: 80 },
    { name: "AI Automation", percentage: 85 },
    { name: "Linux Fundamentals", percentage: 60 },
    { name: "Python", percentage: 20 },
];

const futureLearning = [
    "Advanced Python",
    "TensorFlow",
    "TypeScript",
    "Docker & Kubernetes",
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function SkillsSection() {
    return (
        <SpotlightContainer className="relative min-h-screen py-20 bg-black text-white overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
                        Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CD5C5C] to-[#8B0000]">Certificates</span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto">
                        My technical arsenal and the roadmap for my future growth.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                >

                    {/* COLUMN 1: CURRENT SKILLS */}
                    <motion.div variants={itemVariants} className="bg-zinc-900/30 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-[#CD5C5C]/30 transition-colors duration-500">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-full bg-[#CD5C5C]/10 border border-[#CD5C5C]/20 text-[#CD5C5C]">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold">Technical Proficiency</h3>
                        </div>

                        <div className="space-y-6">
                            {skills.map((skill, index) => (
                                <div key={skill.name}>
                                    <div className="flex justify-between mb-2 text-sm font-medium text-gray-400">
                                        <span>{skill.name}</span>
                                        <span>{skill.percentage}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.percentage}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                                            className="h-full bg-gradient-to-r from-[#CD5C5C] to-[#8B0000] shadow-[0_0_10px_#CD5C5C]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* COLUMN 2: FUTURE LEARNING */}
                    <motion.div variants={itemVariants} className="bg-zinc-900/30 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-indigo-500/30 transition-colors duration-500">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                <Hourglass className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold">Future Learning</h3>
                        </div>

                        <div className="space-y-4">
                            {futureLearning.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (index * 0.1) }}
                                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
                                >
                                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{item}</span>
                                    <Lock className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 rounded-xl bg-[#CD5C5C]/5 border border-[#CD5C5C]/10 text-sm text-[#CD5C5C]/80 leading-relaxed">
                            "I am constantly evolving. My roadmap is focused on mastering deep learning architectures and scalable backend systems."
                        </div>
                    </motion.div>

                    {/* COLUMN 3: CERTIFICATES */}
                    <motion.div variants={itemVariants} className="bg-zinc-900/30 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-yellow-500/30 transition-colors duration-500">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold">Certifications</h3>
                        </div>

                        <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-black">

                            <div className="p-1 bg-gradient-to-br from-blue-400 via-cyan-400 to-transparent opacity-20 absolute inset-0 group-hover:opacity-40 transition-opacity"></div>

                            <div className="relative p-6 flex flex-col items-center text-center py-10">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png"
                                        alt="Cisco"
                                        className="w-10"
                                    />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Computer Hardware Basics</h4>
                                <p className="text-cyan-400 font-medium text-sm mb-4">Cisco Networking Academy</p>
                                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs text-white/60 font-mono">
                                    Issued: 17 Jan 2026
                                </span>
                            </div>

                            {/* Hover Reveal Details */}
                            <div className="absolute inset-0 bg-zinc-950/90 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-gray-300 text-sm">
                                    Comprehensive training in computer hardware, assembly, and system maintenance.
                                </p>
                                <div className="mt-4 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </SpotlightContainer>
    );
}
