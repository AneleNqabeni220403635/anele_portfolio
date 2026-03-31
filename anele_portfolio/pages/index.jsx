import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const USERNAME = "AneleNqabeni220403635";

const SKILLS = [
  { name: "HTML / CSS", level: 93 },
  { name: "JavaScript", level: 88 },
  { name: "PHP / MySQL", level: 85 },
  { name: "SQL", level: 82 },
  { name: "React / React Native", level: 80 },
  { name: "C# / .NET", level: 72 },
  { name: "Java / Spring Boot", level: 68 },
  { name: "Python", level: 65 },
];

const TICKER_TAGS = [
  "React", "PHP", "MySQL", "JavaScript", "C# .NET", "React Native",
  "Expo", "Railway", "REST APIs", "Git", "GitLab", "FileZilla",
  "Bootstrap", "Joomla", "KonsoleH", "Apache", "SQL", "Java", "Spring Boot", "Python",
  "HTML5", "CSS3", "VS Code", "Tailwind",
];

const PROJECTS = [
  {
    name: "iKhono",
    index: "01",
    tech: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "REST APIs"],
    period: "Jan 2026 – Present",
    badge: "LIVE",
    desc: "South African home services platform connecting artisans and clients, formalising the minor building works sector. Full platform: service discovery, booking flow, professional profiles, client and admin dashboards, and secure backend endpoints.",
    link: "https://ikhono.africa",
  },
  {
    name: "Metrolink",
    index: "02",
    tech: ["C# .NET", "React Native", "Expo", "Railway", "REST APIs"],
    period: "2025",
    badge: "STARTUP",
    desc: "Startup project with a C# .NET backend deployed on Railway and a React Native (Expo) mobile frontend. Contributed to backend API architecture and mobile integration.",
    link: null,
  },
  {
    name: "API Property",
    index: "03",
    tech: ["React", "Joomla", "JavaScript", "Bootstrap", "GitLab"],
    period: "Jul 2024 – Jul 2025",
    badge: "PRODUCTION",
    desc: "Commercial and industrial property management platform at Plum Systems. Frontend features, UI consistency, responsive design, and GitLab-based deployment pipeline.",
    link: null,
  },
  {
    name: "Officeplace",
    index: "04",
    tech: ["React", "Node.js", "SQL", "Firebase"],
    period: "Jul 2024 – Jul 2025",
    badge: "PRODUCTION",
    desc: "Office space management platform at Plum Systems. Contributed to data migration, backend integration, and ongoing live production support.",
    link: null,
  },
];

const TIMELINE = [
  {
    period: "Jan 2026 – Present",
    role: "Lead Developer Intern",
    org: "iKhono",
    location: "Durban, SA · Remote",
    type: "work",
    desc: "Leading full-stack development on iKhono, a platform formalising South Africa's minor building works and artisan services sector. Building client dashboards, booking systems, and backend integrations.",
  },
  {
    period: "Dec 2025 – Present",
    role: "Software Developer",
    org: "Metrolink",
    location: "Cape Town · Startup",
    type: "work",
    desc: "Actively contributing to the Metrolink startup. Building and optimising backend APIs using C# .NET on Railway, while integrating with a React Native (Expo) mobile frontend.",
  },
  {
    period: "Jan 2025 – Dec 2025",
    role: "Advanced Diploma — ICT Applications Development",
    org: "Cape Peninsula University of Technology",
    location: "Cape Town",
    type: "edu",
    desc: "Advanced software engineering, systems design, and development practices. Completed.",
  },
  {
    period: "Jul 2024 – Jul 2025",
    role: "Web Developer Intern",
    org: "Plum Systems",
    location: "Bellville, Cape Town",
    type: "work",
    desc: "Contributed to two live production commercial property platforms: API Property and Officeplace. Built frontend features with JavaScript and React, customised components via Joomla CMS, applied Bootstrap for responsive design, and shipped code through GitLab CI pipelines.",
  },
  {
    period: "Jan 2022 – Dec 2024",
    role: "Diploma — ICT Applications Development",
    org: "Cape Peninsula University of Technology",
    location: "Cape Town",
    type: "edu",
    desc: "Software development, databases, networking, and IT systems fundamentals. Completed.",
  },
  {
    period: "Jan 2021 – Dec 2021",
    role: "Higher Certificate — ICT",
    org: "Cape Peninsula University of Technology",
    location: "Cape Town",
    type: "edu",
    desc: "Foundational qualifications in ICT and information systems. Completed.",
  },
];

function Ticker() {
  const repeated = [...TICKER_TAGS, ...TICKER_TAGS, ...TICKER_TAGS];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(34,211,238,0.12)", borderBottom: "1px solid rgba(34,211,238,0.12)", padding: "12px 0", background: "#071229" }}>
      <motion.div
        style={{ display: "flex", gap: "0", whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((tag, i) => (
          <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", color: "#dbe4ff", textTransform: "uppercase", padding: "0 24px" }}>
            {tag} <span style={{ color: "#7dd3fc", margin: "0 8px" }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SkillBar({ name, level }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#22d3ee", letterSpacing: "0.05em" }}>{name}</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#4a6080" }}>{level}%</span>
      </div>
      <div style={{ height: "6px", background: "#0d1a36", borderRadius: "999px", position: "relative", overflow: "hidden" }}>
        <motion.div
          style={{ position: "absolute", top: 0, left: 0, height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #22d3ee, #7dd3fc)" }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
      </div>
    </div>
  );
}

function RepoCard({ r }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={r.html_url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        padding: "20px",
        background: "#081327",
        border: `1px solid ${hovered ? "#7dd3fc" : "#0d1a36"}`,
        textDecoration: "none",
        transition: "border-color 0.15s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", gap: "8px" }}>
        <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: hovered ? "#22d3ee" : "#ccc", transition: "color 0.15s", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {r.name}
        </h3>
        <span style={{ color: "#22d3ee", fontSize: "11px", opacity: hovered ? 1 : 0, transition: "opacity 0.15s", flexShrink: 0 }}>↗</span>
      </div>
      <p style={{ fontSize: "11px", color: "#9db9da", lineHeight: 1.7, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: "16px" }}>
        {r.description || "No description."}
      </p>
      <div style={{ display: "flex", gap: "16px", fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "#a8c1eb" }}>
        {r.language && (
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22d3ee" }} />
            {r.language}
          </span>
        )}
        <span>★ {r.stargazers_count}</span>
        <span>⑂ {r.forks_count}</span>
      </div>
    </a>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#081327",
        border: `1px solid ${hovered ? "#22d3ee44" : "#0d1a36"}`,
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "border-color 0.2s, transform 0.2s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "3px 10px", border: `1px solid ${project.badge === "LIVE" ? "#22d3ee" : "#0c1d3d"}`, color: project.badge === "LIVE" ? "#22d3ee" : "#9cb2ff" }}>
          {project.badge}
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "#2a3a5a" }}>{project.period}</span>
      </div>
      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1, color: "#fff" }}>{project.name}</h3>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "#9ecbff", letterSpacing: "0.08em" }}>{project.tech.join("  ·  ")}</p>
      <p style={{ fontSize: "12px", color: "#97b1d2", lineHeight: 1.85, fontWeight: 300, flex: 1 }}>{project.desc}</p>
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer"
          style={{ alignSelf: "flex-start", padding: "8px 16px", border: "1px solid #22d3ee", color: "#22d3ee", fontSize: "8px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.15s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#22d3ee"; e.currentTarget.style.color = "#000"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#22d3ee"; }}>
          Visit ↗
        </a>
      )}
    </motion.div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const links = ["about", "skills", "projects", "timeline", "contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all 0.3s",
      background: scrolled ? "rgba(3, 13, 35, 0.96)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(34,211,238,0.18)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(18px)" : "none",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", letterSpacing: "0.25em", color: "#22d3ee" }}>AN</span>
        <div className="nav-links" style={{ display: "flex", gap: "32px" }}>
          {links.map((l) => (
            <button key={l} onClick={() => scroll(l)}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9acafc", background: "none", border: "none", cursor: "pointer", transition: "color 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#ffffff"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#9acafc"}
            >{l}</button>
          ))}
        </div>
        <a href="/Anele-Nqabeni-Resume.pdf" download style={{
          fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
          padding: "8px 16px", border: "1px solid rgba(34,211,238,0.4)", color: "#22d3ee",
          textDecoration: "none", transition: "all 0.2s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#22d3ee"; e.currentTarget.style.color = "#020617"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#22d3ee"; }}
        >CV ↓</a>
      </div>
    </nav>
  );
}

export default function Home() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 140]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch("api/github");
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!ignore && Array.isArray(data)) setRepos(data.filter((r) => !r.fork));
      } catch {
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  return (
    <div style={{ background: "#040b1c", color: "#e5e5e5", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #040b1c; color: #e5e5e5; }
        html { scroll-behavior: smooth; }
        ::selection { background: #22d3ee; color: #000; }
        body::after {
          content: '';
          position: fixed; inset: 0;
          pointer-events: none; z-index: 9998; opacity: 0.08;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }
        .hero-grid {
          background: radial-gradient(circle at top left, rgba(34,211,238,0.18), transparent 22%),
                      radial-gradient(circle at 88% 10%, rgba(59,130,246,0.18), transparent 18%),
                      linear-gradient(180deg, rgba(3,12,32,1) 0%, rgba(4,8,24,1) 100%);
        }
        .hero-panel { background: rgba(6,16,44,0.88); border: 1px solid rgba(34,211,238,0.2); box-shadow: 0 40px 120px rgba(0,0,0,0.36); }
        .soft-text { color: #96c8ef; }
        .hero-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 10vw, 120px);
          line-height: 0.9;
          margin-bottom: 24px;
          color: #fff;
        }
        .glow-text {
          text-shadow: 0 0 18px rgba(56,189,248,0.22), 0 0 54px rgba(59,130,246,0.24);
        }
        .text-sky-400 { color: #38bdf8; }
        @media (max-width: 768px) {
          .hero-heading { font-size: 52px !important; line-height: 1 !important; }
          .nav-links { display: none !important; }
          .hero-image-wrap {
            justify-content: flex-start !important;
            margin-top: 24px !important;
            flex-direction: row !important;
            gap: 16px !important;
          }
          .hero-image-wrap > div:first-child {
            width: 160px !important;
            height: 160px !important;
          }
          .terminal-block { display: none !important; }
          .hero-mobile-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>

      <Nav />

      {/* HERO */}
      <section className="hero-grid" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "80px 0", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(34,211,238,0.12)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 2 }}>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
            className="hero-mobile-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "48px", alignItems: "center" }}>

            {/* Left: text content */}
            <div>
              <h1 className="hero-heading glow-text">
                ANELE<br />
                <span className="text-sky-400">NQABENI</span>
              </h1>
              <p style={{ maxWidth: "520px", color: "#8aa0d2", fontSize: "14px", lineHeight: 1.75, fontWeight: 300, marginBottom: "32px" }}>
                Lead Developer Intern at <span style={{ color: "#cdd7ff", fontWeight: 500 }}>iKhono</span>, building the platform that formalises South Africa's artisan economy. Working remotely from Cape Town.
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
                <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  style={{ padding: "13px 28px", background: "#7dd3fc", color: "#020617", fontSize: "10px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.18em", textTransform: "uppercase", border: "none", cursor: "pointer", fontWeight: 500 }}>
                  View Work
                </button>
                <a href="/Anele-Nqabeni-Resume.pdf" download
                  style={{ padding: "13px 28px", background: "transparent", color: "#9ecbff", fontSize: "10px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.18em", textTransform: "uppercase", border: "1px solid rgba(125,211,252,0.3)", cursor: "pointer", textDecoration: "none", display: "inline-block" }}>
                  Download CV
                </a>
              </div>

              <div style={{ display: "flex", gap: "36px", flexWrap: "wrap" }}>
                {[["1+", "Years Exp."], ["4", "Projects"], ["8+", "Languages"]].map(([val, label]) => (
                  <div key={label} style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "44px", lineHeight: 1, color: "#22d3ee" }}>{val}</p>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "8px", letterSpacing: "0.22em", color: "#9ecbff", textTransform: "uppercase", marginTop: "4px" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: photo + terminal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="hero-image-wrap"
              style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "24px", marginTop: "-60px" }}
            >
              <div style={{ width: "260px", height: "260px", borderRadius: "50%", padding: "10px", background: "linear-gradient(135deg, rgba(34,211,238,0.25), rgba(99,102,241,0.2))", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 40px 80px rgba(0,0,0,0.25)" }}>
                <img src="/anele.jpeg" alt="Anele Nqabeni" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", background: "#0b1226" }} />
              </div>

              {/* Terminal block */}
              <div className="terminal-block" style={{ width: "300px", background: "#0d1117", border: "1px solid #1a2a4a", borderRadius: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 14px", background: "#161b22", borderBottom: "1px solid #1a2a4a", borderRadius: "12px 12px 0 0" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#4a6080", marginLeft: "8px" }}>anele@ikhono ~ zsh</span>
                </div>
                <div style={{ padding: "16px", fontFamily: "'DM Mono', monospace", fontSize: "10px", lineHeight: 1.9 }}>
                  {[
                    ["whoami", null],
                    ["Anele Nqabeni — Lead Dev Intern @ iKhono", "output"],
                    ["ls ~/stack", null],
                    ["PHP  MySQL  React  JavaScript  C#  SQL", "output"],
                    ["cat status.txt", null],
                    ["Building real products for real people ✓", "output"],
                    ["git log --oneline -1", null],
                    ["feat: launched ikhono.africa platform", "output"],
                  ].map(([line, type], i) => (
                    <div key={i} style={{ display: "flex", gap: "8px" }}>
                      {type !== "output" && <span style={{ color: "#22d3ee", flexShrink: 0 }}>$</span>}
                      {type === "output" && <span style={{ width: "12px", flexShrink: 0 }} />}
                      <span style={{ color: type === "output" ? "#4a6080" : "#e5e5e5" }}>{line}</span>
                    </div>
                  ))}
                  <span style={{ display: "inline-block", width: "8px", height: "14px", background: "#22d3ee", marginTop: "4px", animation: "pulse 1s infinite" }} />
                </div>
              </div>

            </motion.div>
            {/* END right column */}

          </motion.div>
          {/* END hero grid row */}

        </div>
        {/* END maxWidth container */}

      </section>
      {/* END HERO */}

      <Ticker />

      {/* ABOUT */}
      <section id="about" style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "#22d3ee", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "4px" }}>
            ~/portfolio <span style={{ color: "#4a6080" }}>on</span> <span style={{ color: "#a78bfa" }}>main</span>
          </p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#4a6080", marginBottom: "20px" }}>
            <span style={{ color: "#22d3ee" }}>$</span> cat about.md
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>About Me</h2>
          <div style={{ width: "48px", height: "2px", background: "#22d3ee" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <p style={{ color: "#8aa0d2", fontSize: "14px", lineHeight: 1.85, fontWeight: 300 }}>
              I'm <span style={{ color: "#22d3ee", fontWeight: 600 }}>Anele Nqabeni</span>, a Junior Software Developer currently interning as Lead Developer at <span style={{ color: "#e5e5e5", fontWeight: 600 }}>iKhono</span> in Durban, SA, building the platform that formalises South Africa's artisan economy, working remotely from Cape Town.
            </p>
            <p style={{ color: "#8aa0d2", fontSize: "14px", lineHeight: 1.85, fontWeight: 300 }}>
              <p style={{ color: "#8aa0d2", fontSize: "14px", lineHeight: 1.85, fontWeight: 300 }}>
                Day to day I work across the full stack at iKhono: building PHP/MySQL backends, shipping features that real clients depend on, and crafting React frontends at Metrolink. Previously interned at <span style={{ color: "#e5e5e5", fontWeight: 600 }}>Plum Systems</span> on two live commercial property platforms.
              </p>
            </p>
            <p style={{ color: "#8aa0d2", fontSize: "14px", lineHeight: 1.85, fontWeight: 300 }}>
              I hold an Advanced Diploma in ICT Applications Development from CPUT. My drive is simple: write clean code, collaborate well, and keep improving.
            </p>
          </div>

          <div style={{ background: "#081327", border: "1px solid #0d1a36", borderRadius: "12px", padding: "24px", fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
            <p style={{ color: "#4a6080", marginBottom: "16px" }}>{"// anele.config.json"}</p>
            {[
              ["name", '"Anele Nqabeni"', "#c084fc"],
              ["role", '"Lead Developer Intern"', "#fbbf24"],
              ["company", '"iKhono"', "#fbbf24"],
              ["location", '"Cape Town, ZA"', "#fbbf24"],
              ["email", '"anele.nqabeni01@gmail.com"', "#fbbf24"],
              ["phone", '"+27 67 876 2327"', "#fbbf24"],
              ["status", '"open to entry level opportunities "', "#fbbf24"],
              ["education", '"Advanced Dip. ICT — CPUT"', "#fbbf24"],
            ].map(([k, v, color]) => (
              <div key={k} style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "6px" }}>
                <span style={{ color: "#c084fc" }}>{k}</span>
                <span style={{ color: "#4a6080" }}>:</span>
                <span style={{ color }}>{v}</span>
                <span style={{ color: "#4a6080" }}>,</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: "#081327", borderTop: "1px solid #0d1a36", borderBottom: "1px solid #0d1a36" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "64px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "#22d3ee", textTransform: "uppercase", flexShrink: 0 }}>02 — Skills</span>
            <div style={{ flex: 1, height: "1px", background: "#12213a" }} />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "72px", color: "#7b94ce", lineHeight: 1, flexShrink: 0 }}>STACK</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px 80px", marginBottom: "48px" }}>
            {SKILLS.map((s) => <SkillBar key={s.name} {...s} />)}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {TICKER_TAGS.map((tag) => (
              <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.12em", padding: "6px 14px", border: "1px solid #0d1a36", color: "#7b96c5", textTransform: "uppercase", background: "#061027", cursor: "default" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "64px" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "#22d3ee", textTransform: "uppercase", flexShrink: 0 }}>03 — Projects</span>
          <div style={{ flex: 1, height: "1px", background: "#12213a" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "#0d1a36" }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
        </div>

        <div style={{ marginTop: "72px" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "#7b96c5", textTransform: "uppercase", marginBottom: "28px" }}>
            Personal and Open Source Repos
          </p>
          {loading ? (
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#7b96c5" }}>fetching repos...</p>
          ) : repos.length === 0 ? (
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#7b96c5" }}>No public repositories found.</p>
          ) : (
            <motion.div
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1px", background: "#091a2c" }}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
            >
              {repos.map((r) => (
                <motion.div key={r.id} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                  <RepoCard r={r} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" style={{ background: "#081327", borderTop: "1px solid #0d1a36", borderBottom: "1px solid #0d1a36" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "64px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "#22d3ee", textTransform: "uppercase", flexShrink: 0 }}>04 — Timeline</span>
            <div style={{ flex: 1, height: "1px", background: "#12213a" }} />
          </div>
          <div style={{ position: "relative", paddingLeft: "32px", borderLeft: "1px solid #0d1a36" }}>
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ position: "relative", marginBottom: "48px" }}
              >
                <div style={{ position: "absolute", left: "-40px", top: "4px", width: "14px", height: "14px", borderRadius: "50%", border: `2px solid ${item.type === "work" ? "#22d3ee" : "#7dd3fc"}`, background: "#081327" }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "#22d3ee", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {item.period}
                </span>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#e5e5e5", margin: "8px 0 4px", lineHeight: 1.3 }}>{item.role}</h3>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#444", marginBottom: "10px" }}>
                  {item.org} · {item.location}
                </p>
                <p style={{ fontSize: "12px", color: "#7b96c5", lineHeight: 1.85, fontWeight: 300, maxWidth: "600px" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "48px" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "#22d3ee", textTransform: "uppercase", flexShrink: 0 }}>05 — Contact</span>
          <div style={{ flex: 1, height: "1px", background: "#12213a" }} />
        </div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", color: "#fff", marginBottom: "16px" }}>
          Contact
        </motion.h2>
        <div style={{ width: "48px", height: "2px", background: "#22d3ee", marginBottom: "32px" }} />

        <p style={{ color: "#8aa0d2", fontSize: "13px", lineHeight: 1.85, maxWidth: "440px", fontWeight: 300, marginBottom: "48px" }}>
          I'm open to new opportunities, collaborations, or just a good conversation about tech. Reach out and I'll respond fast.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {[
            { icon: "@", label: "Email", value: "anele.nqabeni01@gmail.com", href: "mailto:anele.nqabeni01@gmail.com" },
            { icon: "⌥", label: "GitHub", value: "AneleNqabeni220403635", href: "https://github.com/AneleNqabeni220403635" },
            { icon: "in", label: "LinkedIn", value: "anele-nqabeni-b719691aa", href: "https://www.linkedin.com/in/anele-nqabeni-b719691aa" },
            { icon: "☎", label: "Phone", value: "+27 67 876 2327", href: "tel:+27678762327" },
          ].map(({ icon, label, value, href }) => (
            <a key={label} href={href}
              target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "14px", padding: "20px", background: "#081327", border: "1px solid #0d1a36", textDecoration: "none", transition: "border-color 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#22d3ee55"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#0d1a36"}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#22d3ee", width: "20px", textAlign: "center", flexShrink: 0 }}>{icon}</span>
              <div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "8px", color: "#4a6080", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "4px" }}>{label}</p>
                <p style={{ fontSize: "12px", color: "#8aa0d2" }}>{value}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #0d1a36", padding: "28px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "8px", letterSpacing: "0.2em", color: "#1e2a4b", textTransform: "uppercase" }}>
            © {new Date().getFullYear()} Anele Nqabeni · Cape Town, SA
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "8px", letterSpacing: "0.2em", color: "#162d57", textTransform: "uppercase" }}>
            Built with Next.js · Deployed on Netlify
          </span>
        </div>
      </footer>
    </div>
  );
}