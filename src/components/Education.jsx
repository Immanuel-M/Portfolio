import Reveal from './Reveal'
import { education } from '../data/content'

export default function Education() {
  return (
    <section id="education" className="px-6 md:px-10 py-28 md:py-36 border-t border-wire bg-celluloid/40">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20 items-start">
        <Reveal>
          <span className="font-mono text-xs text-phosphor tracking-widest2 uppercase">05 / Education</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl md:text-6xl uppercase mb-4">{education.school}</h2>
          <p className="font-serif text-xl text-paper/80 mb-2">{education.degree}</p>
          <p className="font-mono text-xs text-paper/50 uppercase tracking-widest mb-8">{education.years}</p>

          <div className="flex flex-wrap gap-3">
            {education.honors.map((h) => (
              <span
                key={h}
                className="font-mono text-xs uppercase tracking-widest px-4 py-2 border border-signal text-signal"
              >
                {h}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
