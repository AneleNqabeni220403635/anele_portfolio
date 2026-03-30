import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const USERNAME = "ARCHMASTER-leo";

const SKILLS = [
  { name: "JavaScript", level: 90 },
  { name: "React / React Native", level: 88 },
  { name: "Node.js", level: 82 },
  { name: "Firebase", level: 85 },
  { name: "Python", level: 72 },
  { name: "SQL (PostgreSQL)", level: 75 },
  { name: "Java", level: 65 },
  { name: "HTML / CSS", level: 92 },
];

const TAGS = [
  "React", "React Native", "Node.js", "Firebase", "JavaScript",
  "Python", "Java", "SQL", "PostgreSQL", "Google Cloud Platform",
  "REST APIs", "Git", "GitHub Actions", "VS Code", "Mobile Dev",
];

const TIMELINE = [
 
  {
    year: "Jun 2024 – Present",
    role: "Junior Software Developer",
    place: "Plum Systems · Bellville, Cape Town",
    desc: "Building full-stack web and mobile applications using React, React Native, Node.js, and Firebase. Developed scalable REST APIs, integrated AI-powered workflows, and contributed to two production platforms — API Property and Officeplace — used by commercial property clients. Served as Junior Team Lead on Officeplace.",
  },
   {
    year: "Jan 2025 – Jan 2026",
    role: "Advanced Diploma in Information Technology",
    place: "Cape Peninsula University of Technology · Cape Town",
    desc: "Deepening expertise in software engineering, systems design, and advanced development practices.",
  },
  {
    year: "Jan 2022 – Jan 2025",
    role: "Diploma in Information Technology",
    place: "Cape Peninsula University of Technology · Cape Town",
    desc: "Studied software development, databases, networking and IT systems fundamentals.",
  },
  {
    year: "2021",
    role: "Higher Certificate in ICT + Google IT Support Certificate",
    place: "CPUT · Coursera",
    desc: "Foundational qualifications in ICT and IT support. Google IT Support Professional Certificate via Coursera.",
  },
];

const PROJECTS = [
  {
    name: "API Property",
    tech: "React · React Native · Node.js · SQL · Firebase",
    period: "Jun 2024 – Present",
    desc: "Production commercial and industrial property management platform available on both mobile and web. Built scalable REST APIs using Firebase Functions and contributed to frontend and backend architecture.",
  },
  {
    name: "Officeplace",
    tech: "React · React Native · Node.js · SQL · Firebase",
    period: "Jun 2024 – Present",
    desc: "Production mobile and web application for office space management. Acted as Junior Team Lead — contributed to data migration, backend integration, and ongoing production support.",
  },
];

// ── Typing effect ──────────────────────────────────────────────────────────
function Typewriter({ lines, speed = 38 }) {
  const [displayed, setDisplayed] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIdx >= lines.length) { setDone(true); return; }
    if (charIdx <= lines[lineIdx].length) {
      const t = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[lineIdx] = lines[lineIdx].slice(0, charIdx);
          return next;
        });
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineIdx((l) => l + 1); setCharIdx(0); }, 320);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, lines, speed]);

  return (
    <div className="font-mono text-sm leading-7">
      {lines.map((line, i) => (
        <div key={i} className="flex items-start gap-2 min-h-7">
          {(i < lineIdx || (i === lineIdx && charIdx > 0)) && (
            <>
              <span className="text-emerald-400 select-none shrink-0">$</span>
              <span className="text-slate-100 whitespace-pre-wrap">{displayed[i] ?? ""}</span>
              {i === lineIdx && !done && (
                <span className="animate-pulse text-emerald-400">▋</span>
              )}
            </>
          )}
        </div>
      ))}
      {done && <span className="animate-pulse text-emerald-400">▋</span>}
    </div>
  );
}

// ── Skill bar ──────────────────────────────────────────────────────────────
function SkillBar({ name, level }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1.5 font-mono text-xs">
        <span className="text-emerald-400">{name}</span>
        <span className="text-slate-600">{level}%</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    </div>
  );
}

// ── Section heading ────────────────────────────────────────────────────────
function SectionHead({ cmd, label }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs text-slate-600 mb-1">
        <span className="text-emerald-600">~/portfolio</span>{" "}
        <span className="text-slate-600">on</span>{" "}
        <span className="text-purple-500">main</span>
      </p>
      <p className="font-mono text-sm text-slate-500 mb-3">
        <span className="text-emerald-400">$</span> {cmd}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-white">{label}</h2>
      <div className="mt-2 h-px w-16 bg-emerald-500/60" />
    </div>
  );
}

// ── Repo card ──────────────────────────────────────────────────────────────
function RepoCard({ r }) {
  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: "0 0 0 1px #10b98133, 0 8px 32px #10b98118" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-3 group"
    >
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
      </div>
      <div className="font-mono text-xs text-slate-600">
        <span className="text-emerald-500">repo</span> /{r.name}
      </div>
      <h3 className="text-base font-semibold text-slate-100 truncate group-hover:text-emerald-400 transition-colors">
        {r.name}
      </h3>
      <p className="text-sm text-slate-500 line-clamp-2 flex-1">
        {r.description || "// No description provided."}
      </p>
      <div className="flex items-center gap-4 text-xs font-mono text-slate-600 mt-1">
        {r.language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
            {r.language}
          </span>
        )}
        <span>★ {r.stargazers_count}</span>
        <span>⑂ {r.forks_count}</span>
      </div>
      <div className="flex gap-2 pt-2 border-t border-slate-800">
        <a
          href={r.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex-1 text-center text-xs font-mono py-1.5 rounded border border-slate-700 text-slate-400 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
        >
          &lt;/&gt; code
        </a>
        {r.homepage && (
          <a
            href={r.homepage}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center text-xs font-mono py-1.5 rounded bg-emerald-600/20 border border-emerald-600/40 text-emerald-400 hover:bg-emerald-600/40 transition-colors"
          >
            ↗ live
          </a>
        )}
      </div>
    </motion.article>
  );
}

// ── Production project card ────────────────────────────────────────────────
function ProdCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-6 flex flex-col gap-3 transition-colors"
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
          production
        </span>
        <span className="font-mono text-xs text-slate-600">{project.period}</span>
      </div>
      <h3 className="text-xl font-bold text-white">{project.name}</h3>
      <p className="font-mono text-xs text-slate-600">{project.tech}</p>
      <p className="text-sm text-slate-400 leading-relaxed">{project.desc}</p>
    </motion.div>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
  const links = ["about", "skills", "projects", "timeline", "contact"];
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-mono text-sm font-bold text-emerald-400 tracking-widest">
          LS<span className="text-slate-700">.dev</span>
        </span>
        <div className="hidden sm:flex gap-1">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scroll(l)}
              className="px-3 py-1 font-mono text-xs rounded text-slate-500 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
            >
              ./{l}
            </button>
          ))}
        </div>
        <a
          href="/Luyolo-Skoma-Junior-Dev-Resume.pdf"
          download
          className="font-mono text-xs px-3 py-1.5 rounded border border-emerald-700/50 text-emerald-400 hover:bg-emerald-600/20 transition-colors"
        >
          ↓ cv.pdf
        </a>
      </div>
    </nav>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function Home() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  let ignore = false;

  const fetchRepos = async () => {
    try {
      const res = await fetch(
        "api/github"
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      if (!ignore && Array.isArray(data)) {
        setRepos(data.filter(repo => !repo.fork)); // optional: hide forks
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (!ignore) setLoading(false);
    }
  };

  fetchRepos();

  return () => {
    ignore = true;
  };
}, []);



  const terminalLines = [
    `whoami`,
    `Luyolo Skoma — Junior Software Developer @ Plum Systems`,
    `ls ~/stack`,
    `React  React-Native  Node.js  Firebase  SQL  GCP`,
    `cat status.txt`,
    `Building production apps used by real businesses ✓`,
    `git log --oneline -1`,
    `feat: integrated AI workflows into web platform`,
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@400;700;800&display=swap');
        * { font-family: 'Syne', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        html { scroll-behavior: smooth; }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.035) 2px, rgba(0,0,0,0.035) 4px
          );
          pointer-events: none;
          z-index: 9999;
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(16,185,129,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.035) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .glow-text { text-shadow: 0 0 40px rgba(16,185,129,0.3); }
      `}</style>

      <Nav />

      {/* ── HERO ── */}
      <section className="grid-bg min-h-screen flex items-center relative overflow-hidden pt-14">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/4 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-24 w-full grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-4 block">
                // junior software developer
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-none tracking-tight glow-text">
                Luyolo
                <br />
                <span className="text-emerald-400">Skoma</span>
              </h1>
              <p className="mt-5 text-slate-400 text-lg max-w-sm leading-relaxed">
                Full-stack developer at <span className="text-slate-200 font-semibold">Plum Systems</span> — shipping production web & mobile apps with React, Node.js and Firebase.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-mono text-sm hover:bg-emerald-500 transition-colors"
              >
                ./view-projects
              </button>
              <a
                href="/Luyolo-Skoma-Junior-Dev-Resume.pdf"
                download
                className="px-5 py-2.5 rounded-lg border border-slate-700 text-slate-300 font-mono text-sm hover:border-emerald-500 hover:text-emerald-400 transition-colors"
              >
                ↓ download cv
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="mt-10 flex gap-8"
            >
              {[["1+", "yr experience"], ["2", "production apps"], ["5+", "languages"]].map(([val, label]) => (
                <div key={label}>
                  <p className="text-2xl font-extrabold text-emerald-400 glow-text">{val}</p>
                  <p className="font-mono text-xs text-slate-600 mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* terminal */}
          <motion.div
            initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-800">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="font-mono text-xs text-slate-500 ml-2">luyolo@plum-systems ~ zsh</span>
            </div>
            <div className="p-6 min-h-56">
              <Typewriter lines={terminalLines} speed={36} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHead cmd="cat about.md" label="About Me" />
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3 space-y-4 text-slate-400 leading-relaxed">
            <p>
              I'm <span className="text-emerald-400 font-semibold">Luyolo Skoma</span>, a Junior Software Developer at{" "}
              <span className="text-slate-200 font-semibold">Plum Systems</span> in Bellville, Cape Town — building production commercial property platforms since June 2024.
            </p>
            <p>
              Day to day I work across the full stack: crafting React and React Native UIs, designing REST APIs with Firebase Functions, integrating AI-powered automations, and shipping features that real business clients depend on. I've also served as Junior Team Lead on one of our production platforms.
            </p>
            <p>
              I hold a Diploma in IT from CPUT and I'm currently completing my Advanced Diploma. My drive is simple — write clean code, collaborate well, and keep improving.
            </p>
          </div>

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 font-mono text-xs space-y-1.5">
            <p className="text-slate-600 mb-3">{"// luyolo.config.json"}</p>
            {[
              ["name", '"Luyolo Skoma"'],
              ["role", '"Junior Software Developer"'],
              ["company", '"Plum Systems"'],
              ["location", '"Cape Town, ZA"'],
              ["email", '"luyoloskoma@gmail.com"'],
              ["phone", '"072 094 5186"'],
              ["status", '"open to opportunities ✓"'],
              ["studying", '"Advanced Dip. IT — CPUT"'],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2 flex-wrap">
                <span className="text-purple-400">{k}</span>
                <span className="text-slate-600">:</span>
                <span className="text-amber-300">{v}</span>
                <span className="text-slate-600">,</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="bg-slate-900/40 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHead cmd="cat skills.json | jq" label="Tech Stack" />
          <div className="grid sm:grid-cols-2 gap-x-16">
            {SKILLS.map((s) => <SkillBar key={s.name} {...s} />)}
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1 rounded-full border border-slate-800 text-slate-500 bg-slate-900 hover:border-emerald-500/40 hover:text-slate-300 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHead cmd={`gh repo list ${USERNAME} --limit 100`} label="Projects" />

        <div className="mb-12">
          <p className="font-mono text-xs text-slate-600 mb-5">// production applications @ Plum Systems</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {PROJECTS.map((p) => <ProdCard key={p.name} project={p} />)}
          </div>
        </div>

        <p className="font-mono text-xs text-slate-600 mb-5">// open source & personal repos</p>
        {loading ? (
          <p className="font-mono text-sm text-slate-600 animate-pulse">
            <span className="text-emerald-400">$</span> fetching repos...
          </p>
        ) : repos.length === 0 ? (
          <p className="font-mono text-sm text-slate-700">// No public repositories found.</p>
        ) : (
          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {repos.map((r) => (
              <motion.div
                key={r.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <RepoCard r={r} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ── TIMELINE ── */}
      <section id="timeline" className="bg-slate-900/40 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHead cmd="git log --oneline --all --graph" label="Experience & Education" />
          <div className="relative pl-8 border-l border-slate-800 space-y-12">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[2.35rem] top-1.5 w-4 h-4 rounded-full border-2 border-emerald-500 bg-slate-950" />
                <span className="font-mono text-xs text-emerald-500">{item.year}</span>
                <h3 className="text-lg font-bold text-white mt-1">{item.role}</h3>
                <p className="font-mono text-xs text-slate-600 mb-2">{item.place}</p>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHead cmd="open mailto:luyoloskoma@gmail.com" label="Contact" />
        <p className="text-slate-400 max-w-md mb-10 leading-relaxed">
          I'm open to new opportunities, collaborations, or just a good conversation about tech. Reach out — I respond fast.
        </p>
        <div className="flex flex-wrap gap-4">
          {[
            { label: "luyoloskoma@gmail.com", href: "mailto:luyoloskoma@gmail.com", icon: "@", sub: "Email" },
            { label: "github.com/ARCHMASTER-leo", href: "https://github.com/ARCHMASTER-leo", icon: "⌥", sub: "GitHub" },
            { label: "linkedin.com/in/luyolo-skoma", href: "https://linkedin.com/in/luyolo-skoma", icon: "in", sub: "LinkedIn" },
            { label: "072 094 5186", href: "tel:0720945186", icon: "☎", sub: "Phone" },
          ].map(({ label, href, icon, sub }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 font-mono text-sm transition-all group"
            >
              <span className="text-emerald-500 group-hover:scale-110 transition-transform w-5 text-center">{icon}</span>
              <div>
                <p className="text-xs text-slate-600 mb-0.5">{sub}</p>
                <p className="text-sm">{label}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-slate-700">
            © {new Date().getFullYear()} Luyolo Skoma · Cape Town, South Africa
          </span>
          <span className="font-mono text-xs text-slate-800">
            <span className="text-emerald-900">exit</span> 0
          </span>
        </div>
      </footer>
    </div>
  );
}