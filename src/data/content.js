// ─────────────────────────────────────────────────────────────
// EDIT ME: every field below is placeholder content.
// Replace with your real details — nothing else in the app
// needs to change once this file is filled in.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Immanuel Morris',
  role: 'Software Developer / AI Developer',
  subRole: 'Formerly Lead VFX Supervisor',
  tagline:
    'I built visual effects pipelines for Avengers: Endgame, Black Panther, and Star Wars: Rise of Skywalker before I built software — now I bring the same discipline to code: every commit, every system, in service of the story.',
  location: 'Moreno Valley, CA',
  email: 'immanuel_morris@yahoo.com',
  github: 'https://github.com/immanuel-m', // TODO: add your real GitHub URL
  linkedin: 'https://linkedin.com/in/immanuel-morris-35a6611a', // TODO: add your real LinkedIn URL
  resumeUrl: '/ImmanuelMorris_Resume.pdf',
}

export const about = {
  paragraphs: [
    "I'm a software engineer focused on AI systems, automation, and full-stack development. Before returning to school for computer science, I spent more than a decade in post-production and visual effects, eventually serving as Lead VFX Supervisor on productions including Avengers: Endgame, Black Panther, and Star Wars: Rise of Skywalker. As my career evolved, I realized the work I enjoyed wasn't just creating visual effects, but solving technical problems, improving workflows, and building tools that helped people do their best work. That realization led me back to school and ultimately into software engineering, where I found the kind of problems I genuinely enjoy solving.",
    "While continuing to work full-time, I returned to school and spent several years earning three separate associate degrees in Computer Science, Mathematics, and Behavioral Science before completing my B.S. in Computer Science at California State University, San Bernardino in 2026. Looking back, the long nights and early mornings were worth it. They gave me the foundation and perspective to tackle increasingly complex engineering challenges. Today, I build AI applications, full-stack software, and automation tools that solve meaningful problems.",
  ],
}

export const education = {
  school: 'California State University, San Bernardino',
  degree: 'B.S. in Computer Science',
  years: '2024 — 2026',
  honors: [
    "Dean's List — Spring 2026",
    'GPA: 3.54',
    'A.S. Computer Science, Mathematics & Social/Behavioral Studies — Moreno Valley College',
  ],
}

export const skills = [
  {
    category: 'Languages',
    items: ['Python', 'JavaScript', 'C#', 'C++', 'Java', 'SQL', 'R', 'TCL'],
  },
  {
    category: 'AI / ML',
    items: [
      'Claude',
      'Gemini',
      'LLaMA 3 (Ollama)',
      'Deepgram STT/TTS',
      'Stable Diffusion / ComfyUI',
      'Prompt Engineering',
    ],
  },
  {
    category: 'Web & Systems',
    items: ['React', 'Next.js', 'Node.js', 'ASP.NET Core', 'Docker', 'Vercel'],
  },
  {
    category: 'From the Film Side',
    items: [
      'Pipeline automation (Python / TCL)',
      'Cross-studio delivery systems',
      'Technical leadership under deadline',
      'Nuke, Maya, After Effects, Mocha Pro',
      'Photoshop',
    ],
  },
]

export const projects = [
  {
    title: 'Makerspace AI Voice Assistant',
    tag: 'Conversational AI',
    description:
      'Designed and built a production voice AI assistant for the MVC Makerspace, giving students a fully conversational way to get real-time guidance on equipment use and troubleshooting instead of waiting on staff. Built end-to-end on Next.js with Deepgram for speech, Google Gemini 2.5 Flash for conversation, and persistent memory so the assistant holds context across a session.',
    stack: ['Next.js', 'Deepgram STT/TTS', 'Gemini 2.5 Flash', 'Vercel'],
    link: 'https://makerspace-voice-assistant.vercel.app',
    repo: '#',
  },
  {
    title: 'Containerized Multi-Modal AI Infrastructure',
    tag: 'AI Infrastructure',
    description:
      'Designed and deployed a self-hosted generative AI platform for the MVC Makerspace, giving 25+ staff members local access to LLMs (LLaMA 3, DeepSeek, Mistral) and Stable Diffusion image generation — no per-seat API costs, full data control. Built on containerized Docker infrastructure with role-based access and persistent storage, running network-wide.',
    stack: ['Docker', 'Python', 'Linux', 'Ollama', 'Stable Diffusion'],
    link: '#',
    repo: '#',
  },
  {
    title: 'Hotel Management System',
    tag: 'Full-Stack',
    description:
      'A production-grade, 3-tier enterprise application with full CRUD operations, a normalized database schema with referential integrity, RESTful API design, and an interactive React frontend. Delivered independently; earned 100/100.',
    stack: ['ASP.NET Core', 'React', 'C#', 'SQL Server', 'Entity Framework Core'],
    link: '#',
    repo: '#',
  },
  {
    title: 'Berkeley Humanoid Lite: Open-Source Robotics',
    tag: 'Robotics',
    description:
      'Led a student team through full hardware assembly, component fabrication via 3D printing, an Ubuntu Linux deployment pipeline, and an Isaac Lab reinforcement learning simulation environment for the open-source Berkeley Humanoid Lite robot.',
    stack: ['Ubuntu/Linux', 'Python', 'Isaac Lab', 'Fusion 360'],
    link: '#',
    repo: '#',
  },
]

export const filmCrossover = {
  heading: 'Before the Code',
  body:
    "My career in visual effects began in 2010 at Stereo D, working my way from stereoscopic roto artist to Depth artist. Up to that point I'd only known layer-based tools like After Effects and Photoshop, and node-based workflows in Nuke genuinely intimidated me at first, until something clicked. Thinking in nodes, in inputs and outputs and how data moved between them, was my first real taste of engineering logic, long before I ever called myself an engineer. Years of gig work across the industry eventually led me to Exceptional Minds, a studio built around mentoring young adults on the autism spectrum in compositing and post-production. That work earned me the role of Lead VFX Supervisor, directing technical teams of 15+ engineers and artists, and building custom pipeline automation tools in Python and TCL that cut manual processing time by 75%. None of that discipline disappeared when I moved into software; it's the same job, different render.",
  credits: [
    { role: 'Lead VFX Supervisor', project: 'Avengers: Endgame', year: '2019' },
    { role: 'Lead VFX Supervisor', project: 'Black Panther', year: '2018' },
    { role: 'Lead VFX Supervisor', project: 'Star Wars: Rise of Skywalker', year: '2019' },
  ],
  imdbUrl: 'https://www.imdb.com/name/nm4266504/',
}

export const contact = {
  heading: "Let's build something.",
  body: "Open to opportunities in software engineering and applied AI. Fastest way to reach me is email.",
}
