import Reveal from './Reveal'
import { skills } from '../data/content'

export default function Skills() {
  return (
    <section id="skills" className="px-6 md:px-10 py-28 md:py-36 border-t border-wire bg-celluloid/40">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <span className="font-mono text-xs text-phosphor tracking-widest2 uppercase">02 / Stack</span>
          <h2 className="font-display text-5xl md:text-7xl uppercase mt-3 mb-16">What I Build With</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-wire border border-wire">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08} className="bg-ink p-6 md:p-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-paper/85 font-serif text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
