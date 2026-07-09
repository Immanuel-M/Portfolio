import Reveal from './Reveal'
import { about } from '../data/content'

export default function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-28 md:py-36 border-t border-wire">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20">
        <Reveal>
          <span className="font-mono text-xs text-phosphor tracking-widest2 uppercase">01 / About</span>
        </Reveal>
        <div className="space-y-6">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="font-serif text-2xl md:text-3xl leading-snug text-paper/90">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
