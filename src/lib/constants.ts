export const SITE_CONFIG = {
  name: "Anshul Deewan",
  title: "Anshul Deewan — AI Engineer & Full Stack Developer",
  description:
    "Computer Science undergraduate at VIT specializing in AI-assisted full-stack development, Python, quantitative analytics, and modern web applications.",
  url: "https://anshuldeewan.dev",
  ogImage: "/og.png",
  github: "https://github.com/anshuldeewan",
  linkedin: "https://www.linkedin.com/in/anshul-deewan/",
  email: "asharma800077@gmail.com",
  phone: "+91 91666 97613",
  location: "Jaipur, Rajasthan, India",
  resume: "/resume.pdf",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const ROLES = [
  "AI Engineer",
  "Full Stack Developer",
  "Quantitative Analyst",
  "Python Developer",
];

export const EXPERIENCES = [
  {
    id: "axxela",
    role: "Market Analyst Intern",
    company: "Axxela Research & Analytics",
    location: "Mumbai, India",
    period: "Jan 2026 – Jul 2026",
    duration: "7 months",
    type: "Internship",
    description:
      "Monitored and traded 5 actively traded futures markets (Live Cattle, Feeder Cattle, Lean Hogs, Gold, Silver). Built a Python quantitative analytics dashboard applying Z-Score, regression (Beta), R², rolling mean, and standard deviation to generate automated trading signals and evaluate commodity spread strategies.",
    bullets: [
      "Monitored & traded 5 futures markets: Live Cattle (LE), Feeder Cattle (GF), Lean Hogs (HE), Gold (GC), Silver (SI)",
      "Analyzed and executed spread, butterfly (D-Fly), and multi-leg trading strategies using market structure and price action",
      "Developed Python quantitative analytics dashboard calculating Z-Score, regression (Beta), R², and rolling volatility",
      "Investigated fills, monitored execution anomalies, and troubleshot algorithmic trading systems in real time",
      "Tracked fundamental market drivers including USDA reports, supply-demand dynamics, and macroeconomic events"
    ],
    tech: ["Python", "Pandas", "NumPy", "Z-Score", "Regression", "Trading Technologies (TT)", "Spread Trading"],
    color: "#8b5cf6",
    icon: "📊",
  },
  {
    id: "aletheions",
    role: "Remote Tech Intern",
    company: "Aletheions",
    location: "US-Based FinTech Company",
    period: "Jul 2025 – Dec 2025",
    duration: "6 months",
    type: "Internship",
    description:
      "Developed and enhanced the Aletheions India website using React.js, JavaScript, and Tailwind CSS. Integrated REST APIs, optimized website performance and SEO, and leveraged Generative AI to accelerate development workflows.",
    bullets: [
      "Developed React.js and Tailwind CSS user interfaces with 15+ reusable components",
      "Integrated frontend components with REST APIs for dynamic content delivery and seamless business workflows",
      "Leveraged Generative AI & prompt engineering techniques to accelerate debugging, feature delivery, and docs",
      "Optimized website performance, Core Web Vitals, SEO structure, and mobile responsiveness"
    ],
    tech: ["React.js", "JavaScript", "Tailwind CSS", "REST APIs", "Generative AI", "Performance Optimization"],
    color: "#3b82f6",
    icon: "💻",
  },
];

export const PROJECTS = [
  {
    id: "rideplus",
    title: "RidePlus",
    tagline: "AI-Powered RO Water Purifier Booking Platform",
    description:
      "Production RO water purifier booking platform built with React.js, Tailwind CSS, Supabase, and Vercel featuring role-based admin panel, RLS database, and AI-accelerated development.",
    longDescription:
      "Built a full-stack booking platform from zero to production deployment on Vercel. Features include 15+ reusable React UI components, Supabase authentication & Row Level Security, role-based Admin Panel with CRUD operations and multi-image uploads (up to 4), SEO optimization via dynamic product slugs, and a 45% reduction in dev time via GenAI workflows.",
    tech: ["React.js", "JavaScript", "Tailwind CSS", "Supabase", "Vercel", "Generative AI", "PostgreSQL"],
    github: "https://github.com/anshuldeewan/RideplusRO.git",
    live: "https://rideplusro.com/",
    color: "#8b5cf6",
    accent: "#a78bfa",
    category: "Full Stack",
    featured: true,
    image: "/projects/rideplus.png",
    stats: [
      { label: "Dev Efficiency", value: "+45%" },
      { label: "UI Components", value: "15+" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    id: "upi-risk",
    title: "UPI Risk Predictor",
    tagline: "ML Transaction Fraud Detection System",
    description:
      "Machine learning fraud prediction system trained on 10,000+ UPI transaction records, achieving 92% accuracy, 90% precision, and 88% recall with Flask backend.",
    longDescription:
      "Engineered an end-to-end machine learning pipeline for real-time UPI transaction fraud classification. Trained models on 10K+ transaction samples using Scikit-Learn and Pandas, engineering irregularity and temporal features to achieve 92% accuracy, 90% precision, and 88% recall. Includes a responsive Flask web interface for instant risk evaluation.",
    tech: ["Python", "Scikit-Learn", "Flask", "Pandas", "NumPy", "Machine Learning"],
    github: "https://github.com/anshuldeewan/upi-risk",
    live: "#",
    color: "#3b82f6",
    accent: "#60a5fa",
    category: "Machine Learning",
    featured: true,
    image: "/projects/upi.png",
    stats: [
      { label: "Accuracy", value: "92%" },
      { label: "Precision", value: "90%" },
      { label: "Recall", value: "88%" },
    ],
  },
];

export const SKILLS = {
  languages: [
    { name: "Python", level: 94, color: "#3b82f6" },
    { name: "JavaScript", level: 90, color: "#8b5cf6" },
    { name: "TypeScript", level: 82, color: "#06b6d4" },
    { name: "SQL", level: 80, color: "#8b5cf6" },
    { name: "Bash", level: 70, color: "#3b82f6" },
  ],
  frameworks: [
    { name: "React.js", level: 90, color: "#06b6d4" },
    { name: "Next.js", level: 85, color: "#8b5cf6" },
    { name: "Flask", level: 88, color: "#3b82f6" },
    { name: "Node.js", level: 75, color: "#06b6d4" },
    { name: "Tailwind CSS", level: 92, color: "#8b5cf6" },
  ],
  ai: [
    { name: "Generative AI", level: 92, color: "#8b5cf6" },
    { name: "Prompt Engineering", level: 95, color: "#3b82f6" },
    { name: "LLM Applications", level: 90, color: "#06b6d4" },
    { name: "AI Agents & MCP", level: 88, color: "#8b5cf6" },
    { name: "Scikit-Learn", level: 85, color: "#3b82f6" },
  ],
  tools: [
    { name: "Supabase & Postgres", level: 88, color: "#06b6d4" },
    { name: "Git & GitHub", level: 90, color: "#8b5cf6" },
    { name: "Vercel", level: 92, color: "#06b6d4" },
    { name: "Pandas & NumPy", level: 88, color: "#8b5cf6" },
    { name: "Trading Tech (TT)", level: 80, color: "#3b82f6" },
  ],
  quant: [
    { name: "Futures Trading", level: 85, color: "#3b82f6" },
    { name: "Spread & D-Fly Trading", level: 82, color: "#8b5cf6" },
    { name: "Z-Score & Beta Reg", level: 88, color: "#06b6d4" },
    { name: "Rolling Volatility", level: 85, color: "#3b82f6" },
    { name: "Market Structure Analysis", level: 86, color: "#8b5cf6" },
  ],
};

export const CERTIFICATIONS = [
  "Claude 101",
  "Claude Code",
  "Claude Platform",
  "Claude API",
  "Claude Cowork",
  "Model Context Protocol (MCP)",
  "AI Agents",
  "Subagents",
  "Agent Skills",
  "Claude with Google Vertex AI",
  "Claude with Amazon Bedrock",
  "AI Fluency",
];

export const TERMINAL_COMMANDS: Record<string, string> = {
  help: `Available commands:
  about      - Learn about Anshul
  skills     - View technical skills
  experience - Work history
  projects   - View projects
  certs      - View Anthropic certifications
  contact    - Get in touch
  resume     - Download resume PDF
  github     - Open GitHub profile
  clear      - Clear terminal
  whoami     - Who is Anshul?`,
  
  about: `Anshul Deewan — AI Engineer & Full Stack Developer
  ──────────────────────────────────────────────────
  CS undergraduate at Vellore Institute of Technology (CGPA: 7.87)
  Jaipur, Rajasthan, India
  
  Specializing in AI systems, LLM applications,
  quantitative analytics, and production software.
  
  Currently: Open to full-time AI/ML & Full-Stack roles`,

  certs: `Anthropic AI Certifications (12+ Completed)
  ──────────────────────────────────────────────────
  • Claude 101 & Claude Code & Claude Platform
  • Claude API & Model Context Protocol (MCP)
  • AI Agents, Subagents & Agent Skills
  • Claude with Google Vertex AI & Amazon Bedrock
  • Claude Cowork & AI Fluency`,
  
  skills: `Technical Arsenal
  ──────────────────────────────────────────────────
  Languages:   Python, JavaScript, SQL, Bash
  Frontend:    React.js, Next.js, HTML5, CSS3, Tailwind CSS
  Backend:     Flask, Node.js, REST APIs
  Databases:   Supabase, PostgreSQL, MySQL, SQLite
  AI/ML:       LLMs, AI Agents, MCP, Scikit-learn, Prompt Eng
  Quant:       Futures Trading, Spread Trading, Z-Score, Beta Reg
  Tools:       Git, GitHub, Vercel, Trading Technologies (TT)`,
  
  experience: `Work Experience
  ──────────────────────────────────────────────────
  📊 Market Analyst Intern @ Axxela Research & Analytics
     Jan 2026 – Jul 2026 | Mumbai
     Futures markets (5 commodities), Python quantitative dashboard
     Z-Score, Beta regression, rolling volatility
   
  💻 Remote Tech Intern @ Aletheions
     Jul 2025 – Dec 2025 | US FinTech
     React.js, REST APIs, Tailwind CSS, GenAI acceleration`,
  
  projects: `Featured Projects
  ──────────────────────────────────────────────────
  🚀 RidePlus
     AI-powered RO water purifier booking platform
     Stack: React.js, Supabase, Vercel, GenAI
     Features: Role-based Admin Panel, RLS, SEO
   
  🤖 UPI Risk Predictor
     ML transaction fraud prediction system (10K+ records)
     Metrics: 92% accuracy, 90% precision, 88% recall
     Stack: Python, Scikit-Learn, Flask, Pandas`,
  
  contact: `Contact Anshul Deewan
  ──────────────────────────────────────────────────
  Email:    asharma800077@gmail.com
  Phone:    +91 91666 97613
  Location: Jaipur, Rajasthan, India
  GitHub:   github.com/anshuldeewan
  LinkedIn: linkedin.com/in/anshul-deewan`,
  
  resume: `Opening official resume PDF...
  → /resume.pdf`,
  
  github: `Opening GitHub profile...
  → github.com/anshuldeewan`,
  
  whoami: `┌─────────────────────────────────────────┐
│  Anshul Deewan                          │
│  AI Engineer · ML · Full Stack · Quant  │
│  VIT CSE · CGPA 7.87 · Jaipur, India    │
│  12+ Anthropic AI Certifications        │
│  "Building intelligent systems"         │
└─────────────────────────────────────────┘`,
};

