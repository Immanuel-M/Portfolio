import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import FilmCrossover from './components/FilmCrossover'
import Education from './components/Education'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <FilmCrossover />
      <Education />
      <Contact />
    </div>
  )
}
