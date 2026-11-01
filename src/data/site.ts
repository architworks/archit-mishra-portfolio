export const contact = {
  email: "architmishrapro@gmail.com",
  phone: "+91 9161251999",
  phoneHref: "tel:+919161251999",
  linkedin: "https://www.linkedin.com/in/marchit/",
  resume: "/archit-mishra-resume.pdf",
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
    title: "Agent Lab",
    caption: "Prototyping multi-agent flows that reason, debate, and self-heal.",
    href: "/projects/agentic-research-notebook",
    highlights: [
      "LangGraph experiment harness with visual state playback.",
      "Custom tool registry for search, policy lookup, and SQL drafting.",
      "Red-team pack that stress tests hallucinations and tool misuse.",
    ],
  },
  {
    title: "Evaluation Bench",
    caption: "Keeping prompts and agents honest with measurable yardsticks.",
    href: "/projects/prompt-ops-lab",
    highlights: [
      "PromptOps Lab CLI for reproducible regression suites.",
      "LLM-as-a-judge plus rule-based guardrails wired into CI.",
      "Latency + cost profilers for multi-model comparison charts.",
    ],
  },
  {
    title: "Creative Stack",
    caption: "Blending photography, audio, and narrative generation.",
    href: "/projects/lens-to-language",
    highlights: [],
  },
];

export const roles = [
  {
    org: "AB InBev · Global Risk Management",
    when: "Bengaluru · Feb 2024 – Present",
    title: "Data Scientist ·",
    focus: "IntelX Audit Copilot",
    summary:
      "Led a 3–5 person squad to design and deliver IntelX, an audit-grade agentic copilot on Azure microservices.",
    readout: ["100+ auditors", "3K+ questions a month", "99.8% evaluated accuracy"],
    current: true,
  },
  {
    org: "AB InBev · Global Procurement Audits",
    when: "Bengaluru + global S2P teams · Jun 2023 – Feb 2024",
    title: "Data Scientist ·",
    focus: "Source-to-Pay Analytics",
    summary:
      "Built GenAI anomaly detection using policy-grounded LLM reasoning on Source-to-Pay transactions.",
    readout: ["$500M+ reviewed", "$13M leakage recovered"],
  },
  {
    org: "AB InBev · Global Inventory Analytics",
    when: "Bengaluru · Aug 2022 – Jun 2023",
    title: "Associate Data Scientist ·",
    focus: "Supply Chain",
    summary:
      "Automated SAP RFC to Airflow to Azure Analysis Services pipelines and executive KPI packs for SteerCo.",
    readout: ["$7B inventory covered", "$1B reduction", "$60M working capital"],
  },
];

export const hireStats = [
  { value: "4K+", label: "Hours saved yearly" },
  { value: "$13M", label: "Leakage recovered" },
  { value: "99.8%", label: "Evaluated accuracy" },
  { value: "130", label: "Markets supported" },
];

export const results = [
  {
    figure: "99.8%",
    source: ["IntelX Audit Copilot", "AB InBev Global Risk"],
    summary:
      "Evaluated accuracy across 3K+ monthly questions from 100+ auditors, saving about 4K people-hours every year.",
    readout: ["130 markets", "1TB+ evidence"],
  },
  {
    figure: "$13M",
    source: ["Source-to-Pay Analytics", "AB InBev Procurement Audits"],
    summary:
      "Leakage recovered across payment-term mismatches, early-payment costs, credit recoveries, and contract gaps.",
    readout: ["$500M+ transactions"],
  },
  {
    figure: "$1B",
    source: ["Inventory Analytics", "AB InBev Supply Chain"],
    summary:
      "Surplus and overbuy reduction across $7B of global inventory, with $60M of working capital recovered.",
    readout: ["Monthly SteerCo"],
  },
];

export const skills = [
  "RAG",
  "LangGraph",
  "Prompt Ops",
  "Azure OpenAI",
  "Evaluations",
  "PyTorch",
  "Airflow",
  "PySpark",
  "Next.js",
  "Photography",
];
