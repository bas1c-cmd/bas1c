import { useState, useEffect } from 'react';
import { ScrollExpandMedia } from './scroll-expand-project';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
    id: string;
    title: string;
    url: string;
    imageSrc: string;
    description: string;
    technologies: string[];
}

const projects: Project[] = [
    {
        id: '0',
        title: '9anoun.ai',
        url: 'https://9anouni-sigma.vercel.app',
        imageSrc: '/9anon.png',
        description: 'An AI-powered legal assistant designed to simplify complex legal information and provide instant answers to legal queries.',
        technologies: ['React', 'AI/LLM', 'Tailwind CSS', 'Vercel'],
    },
    {
        id: '1',
        title: 'Plant E',
        url: 'https://plant-e-project.netlify.app',
        imageSrc: '/project1.png',
        description: 'An innovative plant marketplace platform with AI-powered recommendations.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    },
    {
        id: '2',
        title: 'Eco Maroc',
        url: 'https://ecomaroc-project.netlify.app',
        imageSrc: '/project2.png',
        description: 'E-commerce platform promoting sustainable and eco-friendly products in Morocco.',
        technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    },
    {
        id: '3',
        title: '3alem O T3alem',
        url: 'https://3alem-o-t3alem.netlify.app',
        imageSrc: '/project3.png',
        description: 'Educational platform connecting students and teachers for online learning.',
        technologies: ['React', 'Express', 'PostgreSQL', 'WebRTC'],
    },
];

export const ProjectsSection = () => {
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const currentProject = projects[currentProjectIndex];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentProjectIndex]);

    const goToNext = () => {
        setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    };

    const goToPrevious = () => {
        setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <div className='min-h-screen bg-black'>
            {/* Project Navigation - Updated with arrows */}
            <div className='fixed top-20 right-4 z-50 flex flex-col gap-3'>
                {/* Previous Button */}
                <button
                    onClick={goToPrevious}
                    className='p-3 rounded-lg bg-[#8B0000]/80 text-white hover:bg-[#CD5C5C] transition-all shadow-lg shadow-[#8B0000]/30'
                    aria-label="Previous project"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Project Indicators */}
                {projects.map((project, index) => (
                    <button
                        key={project.id}
                        onClick={() => setCurrentProjectIndex(index)}
                        className={`px-4 py-2 rounded-lg transition-all ${currentProjectIndex === index
                            ? 'bg-[#CD5C5C] text-white shadow-lg shadow-[#CD5C5C]/50'
                            : 'bg-black/50 text-[#CD5C5C] border border-[#CD5C5C]/30 hover:bg-[#8B0000]/20'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={goToNext}
                    className='p-3 rounded-lg bg-[#8B0000]/80 text-white hover:bg-[#CD5C5C] transition-all shadow-lg shadow-[#8B0000]/30'
                    aria-label="Next project"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Animated Project Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentProject.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                >
                    <ScrollExpandMedia
                        mediaType='image'
                        mediaSrc={currentProject.imageSrc}
                        bgImageSrc='/projects-bg.png'
                        title={currentProject.title}
                        date='Featured Project'
                        scrollToExpand='Scroll to Explore'
                        textBlend={true}
                    >
                        <div className='max-w-4xl mx-auto text-white'>
                            <h2 className='text-3xl font-bold mb-6 text-[#CD5C5C]'>
                                About This Project
                            </h2>

                            <p className='text-lg mb-8 text-gray-300 leading-relaxed'>
                                {currentProject.description}
                            </p>

                            {/* Technologies */}
                            <div className='mb-8'>
                                <h3 className='text-xl font-semibold mb-4 text-[#CD5C5C]'>Technologies Used</h3>
                                <div className='flex flex-wrap gap-3'>
                                    {currentProject.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className='px-4 py-2 bg-[#8B0000]/20 border border-[#CD5C5C]/30 rounded-lg text-[#CD5C5C] font-medium'
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Visit Project Button */}
                            <a
                                href={currentProject.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center gap-2 px-6 py-3 bg-[#CD5C5C] text-white rounded-xl font-bold hover:bg-[#8B0000] transition-all transform hover:scale-105 shadow-lg shadow-[#CD5C5C]/30'
                            >
                                <ExternalLink className='w-5 h-5' />
                                Visit Live Project
                            </a>

                            {/* Project Details */}
                            <div className='mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm'>
                                <h3 className='text-xl font-semibold mb-4 text-[#CD5C5C]'>Key Features</h3>
                                <ul className='space-y-2 text-gray-300'>
                                    <li className='flex items-start gap-3'>
                                        <span className='mt-1.5 w-2 h-2 rounded-full bg-[#CD5C5C] flex-shrink-0'></span>
                                        <span>Responsive design optimized for all devices</span>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <span className='mt-1.5 w-2 h-2 rounded-full bg-[#CD5C5C] flex-shrink-0'></span>
                                        <span>Modern UI with smooth animations</span>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <span className='mt-1.5 w-2 h-2 rounded-full bg-[#CD5C5C] flex-shrink-0'></span>
                                        <span>Fast performance and optimized loading</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ScrollExpandMedia>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
