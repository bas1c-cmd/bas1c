import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThreeDCard } from "./three-d-card";
import { JourneyCard } from "./journey-card";
import { SpotlightContainer } from "./spotlight-container";

const timelineData = [
    {
        year: "2024",
        title: "Foundations & Exploration",
        description: [
            "Début structuré dans le domaine de l’AI automation et de la technologie.",
            "Auto-formation en informatique de base, Linux (ligne de commande) et logique de programmation.",
            "Découverte et premières expérimentations en vibe coding et en automatisation no-code / low-code.",
            "Obtention d’un certificat en informatique de base, consolidant les fondamentaux techniques."
        ],
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
    },
    {
        year: "2025",
        title: "AI Automation & Real Projects",
        description: [
            "Approfondissement de l’AI automation avec n8n à travers des projets concrets.",
            "Création et lancement d’une micro-agency personnelle pendant les vacances scolaires.",
            "Conception et livraison de workflows automatisés pour des clients locaux.",
            "Développement de compétences clés : analyse des besoins, configuration, tests, et communication client."
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
        year: "2026",
        title: "Growth & Professional Direction",
        description: [
            "Consolidation du profil en AI automation developer orienté solutions pratiques.",
            "Optimisation et montée en complexité des workflows n8n (APIs, logique conditionnelle, automatisations intelligentes).",
            "Positionnement clair vers une carrière en intelligence artificielle appliquée et automatisation.",
            "Objectif : projets plus avancés, collaborations professionnelles et intégration dans un environnement technique stimulant."
        ],
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80"
    }
];

export function TimelineSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black">
            <SpotlightContainer className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-20 px-20">
                    {/* Header Card */}
                    <div className="flex-shrink-0 w-[400px] flex flex-col justify-center">
                        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
                            My <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CD5C5C] to-[#8B0000]">Journey</span>
                        </h2>
                        <p className="text-white/60 text-xl">From foundations to professional mastery. Scroll to explore.</p>
                        <div className="mt-8 flex gap-2">
                            <div className="w-12 h-1 bg-[#8B0000]"></div>
                            <div className="w-24 h-1 bg-[#CD5C5C]/30"></div>
                        </div>
                    </div>

                    {timelineData.map((item, index) => (
                        <ThreeDCard
                            key={item.year}
                            className="group relative h-[70vh] w-[80vw] md:w-[600px] flex-shrink-0"
                        >
                            <JourneyCard
                                year={item.year}
                                title={item.title}
                                description={item.description}
                                image={item.image}
                                className="h-full w-full"
                            />
                        </ThreeDCard>
                    ))}
                </motion.div>
            </SpotlightContainer>
        </section>
    );
}
