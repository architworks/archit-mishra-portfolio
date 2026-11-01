export const contact = {
  email: "architmishrapro@gmail.com",
  phone: "+91 9161251999",
  phoneHref: "tel:+919161251999",
  linkedin: "https://www.linkedin.com/in/marchit/",
  github: "https://github.com/architworks",
  // Whatever document is in this Drive folder is the resume. The newest file wins.
  resumeFolderId: "18Aa2DTh-_2sctaVyjnSh9FkRtV1zPGHq",
};

export const navLeft = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#resume", label: "Resume" },
];

export const navRight = [
  { href: "/projects", label: "Projects" },
  { href: "/photography", label: "Photography" },
  { href: "/#contact", label: "Contact" },
];

export const services = [
  {
    title: "Agent Systems",
    caption: "Multi-agent systems that plan, delegate, and stop to ask a person.",
    href: "/projects/kitch",
    linkLabel: "Open Kitch, a multi-agent project",
    highlights: [
      "Coordinators that delegate to least-privilege specialist agents.",
      "Governed MCP tools that agents reuse across every new workflow.",
      "Human approval for anything that matters, built into the toolset.",
    ],
  },
  {
    title: "Evaluation & Guardrails",
    caption: "Keeping prompts and agents honest with measurable yardsticks.",
    href: "/#resume",
    linkLabel: "See this work in the experience section",
    highlights: [
      "LLM-as-a-Judge evals in CI with RAGAS, DeepEval, and promptfoo.",
      "Policy-as-code checks with OPA and NeMo Guardrails.",
      "Agent tracing with LangSmith, Langfuse, and OpenTelemetry.",
    ],
  },
  {
    title: "Creative Side",
    caption: "Photography, and playful experiments that keep the work fun.",
    href: "/photography",
    linkLabel: "Open photography",
    highlights: [],
  },
];

export const roles = [
  {
    org: "Oracle · AI Features in OCI",
    when: "Bengaluru · Jul 2026 – Present",
    title: "Senior AI Engineer ·",
    focus: "Natural-Language Automation",
    summary:
      "Pitched and leading an enterprise “second brain” where business teams describe a policy change in plain English and get tested, production-ready automation.",
    readout: ["100k+ monthly RAG users", "LangGraph", "Policy-as-code guardrails"],
    current: true,
  },
  {
    org: "AB InBev · Global Risk Management",
    when: "Bengaluru · Aug 2022 – Jul 2026",
    title: "Data Scientist ·",
    focus: "GenAI Compliance Engine",
    summary:
      "Architected a modular GenAI engine that checks ERP data against internal policies and standards like IFRS, with human-in-the-loop feedback from auditors.",
    readout: ["5M+ transactions overnight", "$15M spend flagged", "50% lower inference cost"],
  },
  {
    org: "AB InBev · Internal Audit",
    when: "Same role, Global Risk Management",
    title: "Data Scientist ·",
    focus: "GenAI Audit Platform",
    summary:
      "Built a LangGraph multi-agent system with a plan-and-execute supervisor, specialist sub-agents, and text-to-SQL over terabytes of company data.",
    readout: ["Audit prep: 2 weeks to 2 days", "99.8% evaluated accuracy", "15K+ monthly queries"],
  },
  {
    org: "AB InBev · Procurement & Supply Chain",
    when: "Same role, Global Risk Management",
    title: "Data Scientist ·",
    focus: "Global Audits",
    summary:
      "Unified inventory data across 130+ countries with SAP-to-Databricks pipelines, and applied LLM-based checks across procurement spend.",
    readout: ["$13M cost savings realized", "$1B inventory reduction", "Reported to the Board"],
  },
];

export const hireStats = [
  { value: "$13M", label: "Cost savings realized" },
  { value: "$1B", label: "Inventory reduction driven" },
  { value: "99.8%", label: "Evaluated accuracy" },
  { value: "100k+", label: "Monthly users served" },
];

export const results = [
  {
    figure: "$15M",
    source: ["GenAI Compliance Engine", "AB InBev"],
    summary:
      "Business value from non-compliant procurement spend flagged across 5M+ SAP transactions processed overnight, plus $2.2M in improper payouts prevented.",
    readout: ["150k employees covered", "~40% fewer false positives"],
  },
  {
    figure: "$13M",
    source: ["Procurement Audits", "AB InBev"],
    summary:
      "Cost savings realized by LLM-based checks that caught payment-term mismatches and accounting errors manual sampling missed.",
    readout: ["$500M+ spend reviewed"],
  },
  {
    figure: "$1B",
    source: ["Supply Chain Audits", "AB InBev"],
    summary:
      "Inventory reduction and $60M of working capital, driven by surplus insights from $7B of unified inventory data and reported to the Board.",
    readout: ["130+ countries"],
  },
  {
    figure: "99.8%",
    source: ["GenAI Audit Platform", "AB InBev"],
    summary:
      "Evaluated accuracy across 15K+ monthly queries, cutting audit prep from 2 weeks to 2 days.",
    readout: ["RAGAS evals", "30% better precision"],
  },
];

export const skills = [
  "Agents",
  "LangGraph",
  "RAG",
  "MCP",
  "Evaluations",
  "Guardrails",
  "Azure OpenAI",
  "Gemini",
  "PySpark",
  "Next.js",
  "Photography",
];
