import * as React from 'react';
import * as LucideIcons from 'lucide-react';
import avatarImg from './my-pic.jpg';

import reactIcon from './icons/react.svg';
import typescriptIcon from './icons/typescript.svg';
import nodejsIcon from './icons/nodedotjs.svg';
import pythonIcon from './icons/python.svg';
import dockerIcon from './icons/docker.svg';
import kubernetesIcon from './icons/kubernetes.svg';
import gcpIcon from './icons/googlecloud.svg';
import awsIcon from './icons/aws.svg';
import rustIcon from './icons/rust.svg';
import nextjsIcon from './icons/nextdotjs.svg';
import angularIcon from './icons/angular.svg';
import graphqlIcon from './icons/graphql.svg';
import postgresqlIcon from './icons/postgresql.svg';
import webpackIcon from './icons/webpack.svg';
import reduxIcon from './icons/redux.svg';
import openaiIcon from './icons/openai.svg';
import pytorchIcon from './icons/pytorch.svg';
import nvidiaIcon from './icons/nvidia.svg';
import istioIcon from './icons/istio.svg';
import langchainIcon from './icons/langchain.svg';
import elasticsearchIcon from './icons/elasticsearch.svg';
import anthropicIcon from './icons/anthropic.svg';
import argoIcon from './icons/argo.svg';
import pineconeIcon from './icons/pinecone.svg';

export type AppIcon =
  | { type: 'lucide'; name: keyof typeof LucideIcons }
  | { type: 'url'; path: string };

export interface ProfileData {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  avatarUrl: string;
}

export interface Skill {
  title: string;
  icon: AppIcon;
  subtitle?: string;
  url?: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export interface Experience {
  role: string;
  company: string;
  date: string;
  location?: string;
  bullets: string[];
}

export interface Academic {
  institution: string;
  program: string;
  degree: string;
  iconText?: string; // The short text in the box
  iconImage?: string; // Base64 or URL for the icon
}

export interface Certification {
  title: string;
  badgeImage: string;
  issuedBy: string;
  url: string;
}

export interface CVData {
  profile: ProfileData;
  professionalSummary: string;
  skillGroups: SkillGroup[];
  experiences: Experience[];
  academic: Academic;
  certifications: Certification[];
}

export const cvData: CVData = {
  profile: {
    name: "Stephen Cheng",
    title: "AI-FIRST SOLUTION ARCHITECT",
    contact: {
      email: "zintaen@gmail.com",
      phone: "+84906878091",
      linkedin: "linkedin.com/in/zintaen",
      github: "github.com/zintaen"
    },
    avatarUrl: avatarImg
  },

  professionalSummary: "Certified AI-First Solution Architect with 10+ years of experience designing and deploying highly scalable, fault-tolerant enterprise systems across global cloud environments (GCP, AWS). Specialized in architecting Agentic AI workflows, RAG pipelines, and low-latency microservices that bridge advanced machine learning capabilities with measurable organizational ROI. Proven track record of reducing infrastructure costs by up to 35%, optimizing inference latency by 60%+, and leading teams to implement strict data privacy, RBAC, and Human-in-the-Loop (HITL) governance frameworks. Holder of elite 2026 credentials including the Claude Certified Architect — Foundations (Anthropic) and Microsoft Certified: Agentic AI Business Solutions Architect.",

  // ─── Skills: 6-category ATS-optimized taxonomy ───────────────────────
  skillGroups: [
    {
      title: "AI & AUTOMATION",
      skills: [
        { title: "Agentic OS", icon: { type: 'lucide', name: 'Brain' } },
        { title: "RAG", subtitle: "Retrieval-Augmented Generation", icon: { type: 'lucide', name: 'FileSearch' } },
        { title: "Vector Databases", subtitle: "(Pinecone)", icon: { type: 'url', path: pineconeIcon }, url: "https://www.pinecone.io/" },
        { title: "LangChain", icon: { type: 'url', path: langchainIcon }, url: "https://www.langchain.com/" },
        { title: "LlamaIndex", icon: { type: 'lucide', name: 'Library' }, url: "https://www.llamaindex.ai/" },
        { title: "Model Fine-Tuning", subtitle: "(LoRA)", icon: { type: 'lucide', name: 'SlidersHorizontal' } },
        { title: "Prompt Engineering", icon: { type: 'lucide', name: 'SquareTerminal' } },
        { title: "Anthropic /", subtitle: "OpenAI APIs", icon: { type: 'url', path: anthropicIcon }, url: "https://www.anthropic.com/" },
        { title: "OpenAI", icon: { type: 'url', path: openaiIcon }, url: "https://openai.com/" },
      ]
    },
    {
      title: "PERFORMANCE & MLOPS",
      skills: [
        { title: "Rust", subtitle: "(kornia-rs)", icon: { type: 'url', path: rustIcon }, url: "https://www.rust-lang.org/" },
        { title: "Python", subtitle: "(PyTorch)", icon: { type: 'url', path: pythonIcon }, url: "https://www.python.org/" },
        { title: "PyTorch", icon: { type: 'url', path: pytorchIcon }, url: "https://pytorch.org/" },
        { title: "Vertex AI", icon: { type: 'url', path: gcpIcon }, url: "https://cloud.google.com/vertex-ai" },
        { title: "TensorRT", icon: { type: 'url', path: nvidiaIcon }, url: "https://developer.nvidia.com/tensorrt" },
        { title: "Model Drift", subtitle: "Detection", icon: { type: 'lucide', name: 'Activity' } },
        { title: "Inference Latency", subtitle: "Optimization", icon: { type: 'lucide', name: 'Gauge' } },
        { title: "GPU Workload", subtitle: "Shaping", icon: { type: 'lucide', name: 'BarChart3' } },
      ]
    },
    {
      title: "CLOUD INFRASTRUCTURE",
      skills: [
        { title: "GCP", subtitle: "Google Cloud Platform", icon: { type: 'url', path: gcpIcon }, url: "https://cloud.google.com/" },
        { title: "AWS", icon: { type: 'url', path: awsIcon }, url: "https://aws.amazon.com/" },
        { title: "Kubernetes", subtitle: "(GKE)", icon: { type: 'url', path: kubernetesIcon }, url: "https://kubernetes.io/" },
        { title: "Docker", icon: { type: 'url', path: dockerIcon }, url: "https://www.docker.com/" },
        { title: "Anthos", subtitle: "Service Mesh", icon: { type: 'url', path: gcpIcon }, url: "https://cloud.google.com/anthos" },
        { title: "Istio", icon: { type: 'url', path: istioIcon }, url: "https://istio.io/" },
        { title: "Argo Workflows", icon: { type: 'url', path: argoIcon }, url: "https://argoproj.github.io/" },
        { title: "High Availability", subtitle: "(HA)", icon: { type: 'lucide', name: 'HeartPulse' } },
        { title: "Disaster Recovery", subtitle: "(DR)", icon: { type: 'lucide', name: 'ShieldAlert' } },
      ]
    },
    {
      title: "BACKEND & INTEGRATION",
      skills: [
        { title: "Node.js", subtitle: "(NestJS, Fastify)", icon: { type: 'url', path: nodejsIcon }, url: "https://nodejs.org/" },
        { title: "TypeScript", icon: { type: 'url', path: typescriptIcon }, url: "https://www.typescriptlang.org/" },
        { title: "Event-Driven", subtitle: "Architecture", icon: { type: 'lucide', name: 'Radio' } },
        { title: "Cloud Pub/Sub", icon: { type: 'url', path: gcpIcon }, url: "https://cloud.google.com/pubsub" },
        { title: "RESTful APIs", icon: { type: 'lucide', name: 'Globe' } },
        { title: "Semantic APIs", icon: { type: 'lucide', name: 'Braces' } },
        { title: "GraphQL", icon: { type: 'url', path: graphqlIcon }, url: "https://graphql.org/" },
        { title: "PostgreSQL", icon: { type: 'url', path: postgresqlIcon }, url: "https://www.postgresql.org/" },
        { title: "Elasticsearch", icon: { type: 'url', path: elasticsearchIcon }, url: "https://www.elastic.co/" },
      ]
    },
    {
      title: "ADVANCED FRONTEND",
      skills: [
        { title: "React 19", icon: { type: 'url', path: reactIcon }, url: "https://react.dev/" },
        { title: "Next.js", icon: { type: 'url', path: nextjsIcon }, url: "https://nextjs.org/" },
        { title: "Angular", icon: { type: 'url', path: angularIcon }, url: "https://angular.io/" },
        { title: "Webpack Module", subtitle: "Federation", icon: { type: 'url', path: webpackIcon }, url: "https://webpack.js.org/" },
        { title: "Micro-frontends", icon: { type: 'lucide', name: 'LayoutGrid' } },
        { title: "State Management", subtitle: "(Redux)", icon: { type: 'url', path: reduxIcon }, url: "https://redux.js.org/" },
        { title: "Core Web Vitals", subtitle: "Optimization", icon: { type: 'lucide', name: 'Gauge' } },
      ]
    },
    {
      title: "METHODOLOGIES & GOVERNANCE",
      skills: [
        { title: "Agile / Scrum", icon: { type: 'lucide', name: 'Users' } },
        { title: "TDD", subtitle: "Test-Driven Development", icon: { type: 'lucide', name: 'TestTube' } },
        { title: "CI/CD", subtitle: "Automation", icon: { type: 'lucide', name: 'Rocket' } },
        { title: "FinOps", subtitle: "Cloud Financial Ops", icon: { type: 'lucide', name: 'DollarSign' } },
        { title: "AI Guardrails", icon: { type: 'lucide', name: 'ShieldCheck' } },
        { title: "Data Privacy", subtitle: "Compliance (PII)", icon: { type: 'lucide', name: 'Lock' } },
      ]
    }
  ],

  // ─── Experiences: ATS-optimized bullet points ────────────────────────
  experiences: [
    {
      company: "Independent Consulting",
      role: "Consulting AI Architect",
      date: "01/2026 – Present",
      location: "Ho Chi Minh City, Vietnam",
      bullets: [
        "Delivered commercial-grade Agentic AI and RAG architectural blueprints for enterprise clients, defining integration patterns across GCP and Azure.",
        "Engineered production-grade RAG pipelines processing 50K+ document chunks with vector database integrations (Pinecone, Milvus), establishing standardized Human-in-the-Loop (HITL) safety patterns and Model Context Protocol (MCP) tool orchestration.",
        "Designed end-to-end Agentic AI workflows incorporating FinOps cost governance, SOC 2-aligned data residency controls, and automated threat modeling—optimized to reduce enterprise cloud spend by up to 25%.",
        "Core Technologies: RAG Architecture, Agentic Workflows, Milvus, Pinecone, GCP, Azure."
      ]
    },
    {
      company: "CADDi",
      role: "Senior Full Stack Engineer",
      date: "01/2023 – 11/2025",
      location: "Ho Chi Minh City, Vietnam",
      bullets: [
        "Resolved bottlenecks in the industrial design process by architecting a high-performance similarity search system that enabled real-time geometric analysis across 3M+ complex manufacturing drawings.",
        "Ensured enterprise reliability by designing fault-tolerant, event-driven microservices for data extraction, achieving a 99.95% uptime SLA across 12 production services.",
        "Optimized AI inference models and strategic GPU workload shaping to resolve high computational overhead, driving a 60% reduction in latency and saving ~$180K annually in cloud infrastructure costs.",
        "Accelerated development cycles by leading a micro-frontends migration that reduced build times by 40%, simultaneously deploying secure AI context planes incorporating Human-in-the-Loop (HITL) safety guardrails.",
        "Core Technologies: Rust, Python, PyTorch, OpenCV, TensorRT, GCP, Kubernetes, Anthos Service Mesh, Cloud Pub/Sub, Webpack Module Federation."
      ]
    },
    {
      company: "Kydon Group",
      role: "Front End Lead",
      date: "09/2020 – 08/2022",
      location: "Singapore",
      bullets: [
        "Spearheaded the core infrastructure for an intelligent, adaptive learning platform, orchestrating multi-agent AI systems that dynamically generated personalized learning pathways for 10K+ concurrent enterprise learners with sub-200ms response times.",
        "Engineered backend services linking enterprise knowledge bases via semantic API integrations, establishing architectural patterns analogous to modern Model Context Protocols (MCP).",
        "Established an enterprise-wide Design System and optimized Event-Driven Architecture patterns, reducing cross-team development overhead by 30% while ensuring high-availability data flows.",
        "Core Technologies: React, TypeScript, Semantic APIs, RESTful APIs, WebSockets, LLM Resource Schedulers."
      ]
    },
    {
      company: "Vincere.io",
      role: "Senior Web Developer",
      date: "09/2019 – 09/2020",
      location: "Vietnam",
      bullets: [
        "Orchestrated scalable backend microservices for a high-volume recruitment CRM serving 2K+ global recruitment firms, ensuring seamless data synchronization across candidate pipelines with zero system degradation under peak load.",
        "Led integration of a proprietary machine-learning recommendation engine (internally dubbed 'CoPilot'), automating candidate data entry and accelerating candidate-to-role matching speed by 5x—reducing average placement cycle from 14 days to 3 days.",
        "Migrated legacy monolith to cloud-native multi-tenant infrastructure with advanced Role-Based Access Control (RBAC), establishing a unified high-availability platform achieving 99.9% uptime SLA for global recruitment operations.",
        "Core Technologies: Node.js, React, Cloud-Native Infrastructure, RBAC, Microservices."
      ]
    },
    {
      company: "Spirit Labs",
      role: "Full Stack Engineer | Distributed Systems & Security",
      date: "12/2018 – 08/2019",
      location: "Vietnam",
      bullets: [
        "Pioneered fault-tolerant distributed system architectures across cryptographic networks, guaranteeing safe decentralized data handling for 500+ daily transactions with zero security incidents.",
        "Conducted rigorous formal verification and penetration testing on 15+ cryptographic protocols, establishing advanced access control boundaries essential for preventing data leakage and injection vulnerabilities.",
        "Bridged distributed backend infrastructure with responsive mobile/web interfaces (sub-100ms latency), maintaining zero-regression deployment cycles through strict test-driven development (95%+ coverage).",
        "Core Technologies: Node.js, TypeScript, Distributed Systems, Cryptography, Formal Verification, TDD."
      ]
    },
    {
      company: "ekino Vietnam",
      role: "Frontend Developer",
      date: "08/2017 – 12/2018",
      location: "Vietnam",
      bullets: [
        "Developed responsive single-page applications (SPAs) for global enterprise clients including major French media and e-commerce brands, integrating with 20+ backend microservices.",
        "Optimized front-end rendering pathways and implemented aggressive caching strategies, reducing page load latency by 45% and improving end-user engagement metrics by 22% across omnichannel platforms.",
        "Implemented CI/CD pipelines within Agile delivery pods, automating testing and deployment to achieve zero-downtime releases for applications serving 500K+ monthly active users.",
        "Core Technologies: React, Angular, CI/CD, Agile/Scrum, RESTful APIs, SPA Architecture."
      ]
    },
    {
      company: "Ministry of Natural Resources and Environment",
      role: "Junior Web Developer | Data Systems Engineer",
      date: "04/2016 – 08/2017",
      location: "Vietnam",
      bullets: [
        "Engineered a massive data ingestion pipeline for the Multi-Purpose Land Information System (MPLIS), structuring 50K+ highly complex, unstructured datasets into a centralized relational framework serving 12 provincial nodes.",
        "Designed complex querying schemas supporting multidimensional demographic tracking, enabling automated statistical reporting that reduced manual record analysis time by 70% for government auditors.",
        "Developed secure data-sharing protocols connecting provincial networks to central infrastructure, establishing the foundational data prerequisite required for modern geospatial pattern recognition.",
        "Core Technologies: Relational Databases, SQL, Data Ingestion Pipelines, Geospatial Data."
      ]
    }
  ],
  academic: {
    institution: "Carnegie Mellon University",
    program: "Joint Program with Van Lang University",
    degree: "Bachelor of Engineering, Computer Software Engineering (2010 - 2016)",
    iconText: "Carnegie\nMellon\nUniversity",
    iconImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJuOghkXj0XKxdE5TIUdRS96UANq_tASUgOA&s"
  },
  certifications: [
    // Elite AI Architecture Credentials (highest market value)
    { badgeImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPsCP0_NG-S10g4EQ8HIdxm6RJWS8AvZsPVw&s", title: "Claude Certified Architect – Foundations (CCA-F)", issuedBy: "Anthropic Education", url: "https://verify.skilljar.com/c/4dhjr6apfgpd" },

    { badgeImage: "https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-expert-badge.svg", title: "Microsoft Certified: Agentic AI Business Solutions Architect", issuedBy: "Microsoft", url: "https://learn.microsoft.com/en-us/users/zintaen/credentials/2dd159c1a8721db6" },

    // Enterprise Data & Analytics
    { badgeImage: "https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-associate-badge.svg", title: "Microsoft Certified: Fabric Analytics Engineer Associate", issuedBy: "Microsoft", url: "https://learn.microsoft.com/en-us/users/zintaen/credentials/a8b4d8cd658949ac" },

    // AI Productivity & Transformation
    { badgeImage: "https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/publication/logo/faa6a747-8c1c-43c1-8155-91aa43268f01/Ad_9_2.png", title: "AI Workplace Proficiency Certification", issuedBy: "Superhuman", url: "https://education.superhuman.ai/certificates/lvsyyjlokr" },

    { badgeImage: "https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-associate-badge.svg", title: "Microsoft Certified: Dynamics 365 Business Central Functional Consultant Associate", issuedBy: "Microsoft", url: "https://learn.microsoft.com/en-us/users/zintaen/credentials/30a639686d5425f0" },

    { badgeImage: "https://learn.microsoft.com/media/learn/certification/badges/ai-transformation-leader.svg", title: "Microsoft Certified: AI Transformation Leader", issuedBy: "Microsoft", url: "https://learn.microsoft.com/en-us/users/zintaen/credentials/317ca0f98deaa138" },

    // Google Education & AI
    { badgeImage: "https://templates.images.credential.net/16231102294348353124512105608042.png", title: "Google Certified Educator Level 2", issuedBy: "Google for Education", url: "https://edu.google.accredible.com/74b9ea5e-165f-4871-a522-fff61a35080c" },

    { badgeImage: "https://templates.images.credential.net/16231100289992143103707929119847.png", title: "Google Certified Educator Level 1", issuedBy: "Google for Education", url: "https://edu.google.accredible.com/77a264c2-6f20-42dc-99cd-61a7bee8ce69" },

    { badgeImage: "https://templates.images.credential.net/17623509539731834497776877118523.png", title: "Gemini Certified University Student", issuedBy: "Google for Education", url: "https://edu.google.accredible.com/5306f0c9-aa46-4787-8927-73632427da3b#acc.WEAdOFey" },

    { badgeImage: "https://templates.images.credential.net/17623508841472301218508369911196.png", title: "Gemini Certified Educator", issuedBy: "Google for Education", url: "https://edu.google.accredible.com/bf8e301f-6e38-4b54-9d1e-0c29a6579273" },
  ]
};
