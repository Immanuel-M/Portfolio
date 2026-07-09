import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import { projects } from '../data/content'

export default function Projects() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="projects" className="px-6 md:px-10 py-28 md:py-36 border-t border-wire">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <span className="font-mono text-xs text-phosphor tracking-widest2 uppercase">03 / Work</span>
          <h2 className="font-display text-5xl md:text-7xl uppercase mt-3 mb-16">Selected Projects</h2>
        </Reveal>

        <div className="divide-y divide-wire border-t border-b border-wire">
          {projects.map((project, i) => {
            const isOpen = openIndex === i
            return (
              <Reveal key={project.title} delay={i * 0.06}>
                <div>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-baseline gap-4 md:gap-8">
                      <span className="font-mono text-xs text-paper/40 w-6">0{i + 1}</span>
                      <span className="font-display text-3xl md:text-5xl uppercase group-hover:text-signal transition-colors">
                        {project.title}
                      </span>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-paper/50 hidden sm:inline">
                      {project.tag}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-10 md:pl-14 max-w-2xl">
                          <p className="font-serif text-lg text-paper/80 mb-5">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-5">
                            {project.stack.map((s) => (
                              <span
                                key={s}
                                className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-wire text-phosphor"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-5 font-mono text-xs uppercase tracking-widest">
                            <a href={project.link} className="text-signal hover:underline">
                              Live →
                            </a>
                            <a href={project.repo} className="text-paper/60 hover:text-paper hover:underline">
                              Source →
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
