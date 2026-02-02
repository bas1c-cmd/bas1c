import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  defaultActive?: string
  activeTab?: string
  onTabChange?: (name: string) => void
}

export function AnimeNavBar({ items, className, defaultActive = "Home", activeTab: controlledActiveTab, onTabChange }: NavBarProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [internalActiveTab, setInternalActiveTab] = useState<string>(defaultActive)

  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={cn("fixed top-5 left-0 right-0 z-[9999]", className)}>
      <div className="flex justify-center pt-6">
        <motion.div
          className="flex items-center gap-3 bg-[#1a0505]/80 border border-[#8B0000]/20 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg relative shadow-[#8B0000]/20"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <div className="pr-4 border-r border-white/10 mr-1">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-cover rounded-full" />
          </div>
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const isHovered = hoveredTab === item.name

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault()
                  if (onTabChange) {
                    onTabChange(item.name)
                  } else {
                    setInternalActiveTab(item.name)
                  }
                  // Handle smooth scroll manually if it's an anchor link
                  if (item.url.startsWith('#')) {
                    const element = document.querySelector(item.url);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                  "text-white/70 hover:text-white no-underline flex items-center",
                  isActive && "text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="absolute inset-0 bg-[#8B0000]/25 rounded-full blur-md" />
                    <div className="absolute inset-[-4px] bg-[#8B0000]/20 rounded-full blur-xl" />
                    <div className="absolute inset-[-8px] bg-[#8B0000]/15 rounded-full blur-2xl" />
                    <div className="absolute inset-[-12px] bg-[#8B0000]/5 rounded-full blur-3xl" />

                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/0 via-[#8B0000]/20 to-[#8B0000]/0"
                      style={{
                        animation: "shine 3s ease-in-out infinite"
                      }}
                    />
                  </motion.div>
                )}

                <motion.span
                  className="hidden md:inline relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
                <motion.span
                  className="md:hidden relative z-10"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </motion.span>

                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    />
                  )}
                </AnimatePresence>

                {isActive && (
                  <motion.div
                    layoutId="anime-mascot"
                    className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="relative w-12 h-12">
                      <motion.div
                        className="absolute w-10 h-10 bg-white rounded-full left-1/2 -translate-x-1/2"
                        animate={
                          hoveredTab ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, -5, 5, 0],
                            transition: {
                              duration: 0.5,
                              ease: "easeInOut"
                            }
                          } : {
                            y: [0, -3, 0],
                            transition: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }
                        }
                      >
                        {/* Eyes */}
                        <motion.div
                          className="absolute w-2 h-2 bg-black rounded-full"
                          style={{ left: '25%', top: '40%' }}
                        />
                        <motion.div
                          className="absolute w-2 h-2 bg-black rounded-full"
                          style={{ right: '25%', top: '40%' }}
                        />
                        {/* Blush */}
                        <motion.div
                          className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                          style={{ left: '15%', top: '55%' }}
                        />
                        <motion.div
                          className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                          style={{ right: '15%', top: '55%' }}
                        />

                        {/* Mouth */}
                        <motion.div
                          className="absolute w-4 h-2 border-b-2 border-black rounded-full"
                          animate={
                            hoveredTab ? { scaleY: 1.5, y: -1 } : { scaleY: 1, y: 0 }
                          }
                          style={{ left: '30%', top: '60%' }}
                        />
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-1 left-1/2 w-4 h-4 -translate-x-1/2"
                        animate={{
                          y: [0, 2, 0],
                          transition: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                        }}
                      >
                        <div className="w-full h-full bg-white rotate-45 transform origin-center" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </a>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}