import Reveal from './Reveal'
import { profile, contact } from '../data/content'

export default function Contact() {
  return (
    <footer id="contact" className="px-6 md:px-10 py-28 md:py-40 border-t border-wire">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <span className="font-mono text-xs text-phosphor tracking-widest2 uppercase">06 / Contact</span>
          <h2 className="font-display text-6xl md:text-8xl uppercase mt-3 mb-6">{contact.heading}</h2>
          <p className="font-serif text-xl text-paper/80 max-w-xl mb-12">{contact.body}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-x-10 gap-y-4 font-mono text-sm uppercase tracking-widest">
            <a href={`mailto:${profile.email}`} className="text-signal hover:underline">
              {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-paper/70 hover:text-paper">
              GitHub ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-paper/70 hover:text-paper">
              LinkedIn ↗
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-paper/70 hover:text-paper">
              Résumé ↗
            </a>
          </div>
        </Reveal>

        <p className="mt-24 font-mono text-[10px] text-paper/30 tracking-widest uppercase">
          {profile.name} — {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
