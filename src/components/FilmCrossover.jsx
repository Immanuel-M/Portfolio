import Reveal from './Reveal'
import { filmCrossover } from '../data/content'

export default function FilmCrossover() {
  return (
    <section id="film" className="relative px-6 md:px-10 py-28 md:py-36 border-t border-wire overflow-hidden">
      {/* sprocket rails top & bottom, framing this section like a filmstrip */}
      <div className="absolute top-0 left-0 right-0 h-3 sprocket-rail opacity-20" />
      <div className="absolute bottom-0 left-0 right-0 h-3 sprocket-rail opacity-20" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20">
        <Reveal>
          <span className="font-mono text-xs text-signal tracking-widest2 uppercase">04 / Before</span>
          <h2 className="font-display text-4xl md:text-6xl uppercase mt-3">{filmCrossover.heading}</h2>
        </Reveal>

        <div className="space-y-10">
          <Reveal>
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-paper/85">
              {filmCrossover.body}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {filmCrossover.credits.map((c, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between border-b border-wire pb-3 font-mono text-sm uppercase tracking-wide"
                >
                  <span className="text-paper/90">{c.role}</span>
                  <span className="text-paper/50">{c.project}</span>
                  <span className="text-phosphor">{c.year}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <a
              href={filmCrossover.imdbUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-paper/60 hover:text-paper hover:underline"
            >
              IMDb ↗
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
