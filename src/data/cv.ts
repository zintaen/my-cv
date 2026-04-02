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
  alias: string;
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
  skillGroups: SkillGroup[];
  experiences: Experience[];
  academic: Academic;
  certifications: Certification[];
}

export const cvData: CVData = {
  profile: {
    name: "Stephen Cheng",
    alias: "(Trịnh Thái Anh)",
    title: "AI-FIRST SOLUTION ARCHITECT",
    contact: {
      email: "zintaen@gmail.com",
      phone: "+84906878091",
      linkedin: "linkedin.com/in/zintaen",
      github: "github.com/zintaen"
    },
    avatarUrl: avatarImg
  },

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
      company: "AI-First Solution Architect — Professional Sabbatical",
      role: "Advanced AI Architecture Specialization",
      date: "January 2026 - Present",
      location: "Ho Chi Minh City, Vietnam",
      bullets: [
        "Consolidated expertise in Enterprise AI Architecture by securing advanced credentials across Google Cloud (Machine Learning Engineer) and Microsoft Azure ecosystems through intensive, lab-based examinations.",
        "Architected comprehensive RAG pipelines and vector database integrations, establishing standardized Human-in-the-Loop (HITL) safety patterns to govern the secure deployment of enterprise-grade Large Language Models (LLMs).",
        "Synthesized technological execution with organizational strategy, leveraging AI Transformation frameworks to drive change management and optimize cloud financial operations (FinOps) for autonomous AI deployments."
      ]
    },
    {
      company: "CADDi",
      role: "Senior Full Stack Engineer",
      date: "January 2023 - November 2025",
      location: "Ho Chi Minh City, Vietnam",
      bullets: [
        "Engineered high-performance machine vision pipelines utilizing Rust and Python (PyTorch, OpenCV) to power patented similarity search algorithms, enabling the real-time geometric analysis of millions of complex manufacturing drawings.",
        "Designed and maintained robust microservices architecture using Node.js and TypeScript on GCP, orchestrated via Kubernetes and Anthos Service Mesh to ensure fault-tolerant, scalable data extraction from massive enterprise data lakes.",
        "Optimized inference latency and computational throughput for complex AI models, significantly reducing procurement search times and infrastructure costs through strategic workload shaping and asynchronous processing (Cloud Pub/Sub).",
        "Executed seamless transition to micro-frontends utilizing Webpack Module Federation, while deploying secure AI context planes with Human-in-the-Loop (HITL) safety Guardrails to ensure responsible enterprise LLM integration."
      ]
    },
    {
      company: "Kydon Group",
      role: "Front End Lead",
      date: "September 2020 - August 2022",
      location: "Singapore",
      bullets: [
        "Designed and implemented the core front-end architecture for an Agentic Learning OS, orchestrating multi-agent AI systems to dynamically generate personalized learning pathways and real-time skill-matching graphs.",
        "Engineered secure, low-latency semantic APIs to connect LLM resource schedulers with enterprise knowledge bases, enabling automated, conversational query resolution and just-in-time learning delivery.",
        "Optimized Event-Driven UI patterns and established an enterprise-wide Design System, reducing development overhead by 30% while ensuring seamless REST API integration for high-availability data flows."
      ]
    },
    {
      company: "Vincere.io",
      role: "Senior Web Developer",
      date: "September 2019 - September 2020",
      location: "Vietnam",
      bullets: [
        "Architected scalable backend microservices utilizing Node.js and ReactJS for a high-volume recruitment CRM, ensuring seamless data synchronization across candidate pipelines and external APIs without system degradation.",
        "Led the technical integration of AI-driven parsing and recommendation engines (CoPilot), automating data entry processes and significantly accelerating candidate-to-role matching algorithms.",
        "Optimized multi-tenant cloud infrastructure and implemented advanced Role-Based Access Control (RBAC) to eliminate disparate legacy architectures, establishing a unified, high-availability platform serving global recruitment professionals."
      ]
    },
    {
      company: "Spirit Labs",
      role: "Full Stack Engineer",
      date: "December 2018 - August 2019",
      location: "Vietnam",
      bullets: [
        "Spearheaded the engineering of decentralized applications (DApps) and secure wallet integrations utilizing Ethereum and EOS blockchain protocols, ensuring high-throughput transaction processing.",
        "Developed and audited smart contracts, implementing rigorous security mitigation strategies to protect distributed ledgers against unauthorized access and transactional vulnerabilities.",
        "Bridged Web3 backend infrastructure with modern Web2 interfaces, utilizing React Native and Node.js to deliver seamless, low-latency mobile and web applications while maintaining zero-regression deployment cycles via strict TDD."
      ]
    },
    {
      company: "ekino Vietnam",
      role: "Frontend Developer",
      date: "August 2017 - December 2018",
      location: "Vietnam",
      bullets: [
        "Architected responsive, high-performance single-page applications (SPAs) utilizing ReactJS and AngularJS, integrating with complex backend microservices via RESTful APIs for global enterprise clients.",
        "Optimized front-end rendering pathways and implemented aggressive caching strategies, significantly reducing page load latency and improving end-user engagement metrics across omnichannel platforms.",
        "Collaborated within Agile delivery pods to implement CI/CD pipelines, automating testing and deployment processes to ensure zero-downtime releases for high-traffic media and e-commerce applications."
      ]
    },
    {
      company: "Ministry of Natural Resources and Environment",
      role: "Junior Web Developer",
      date: "April 2016 - August 2017",
      location: "Vietnam",
      bullets: [
        "Engineered the structural foundation for the Multi-Purpose Land Information System (MPLIS), migrating unstructured physical registries into a centralized relational database serving provincial administrative nodes.",
        "Designed complex querying schemas to support multidimensional demographic tracking, enabling automated statistical reporting and reducing manual record analysis time.",
        "Contributed to national e-government interoperability standards by developing secure data-sharing protocols between localized provincial networks and the central ministry data center."
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
    { badgeImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPsCP0_NG-S10g4EQ8HIdxm6RJWS8AvZsPVw&s", title: "Claude Certified Architect – Foundations Certification", issuedBy: "Anthropic Education", url: "https://verify.skilljar.com/c/4dhjr6apfgpd" },

    { badgeImage: "https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/publication/logo/faa6a747-8c1c-43c1-8155-91aa43268f01/Ad_9_2.png", title: "AI Workplace Proficiency Certification", issuedBy: "Superhuman", url: "https://education.superhuman.ai/certificates/lvsyyjlokr" },

    { badgeImage: "https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-expert-badge.svg", title: "Microsoft Certified: Agentic AI Business Solutions Architect", issuedBy: "Microsoft", url: "https://learn.microsoft.com/en-us/users/zintaen/credentials/2dd159c1a8721db6" },

    { badgeImage: "https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-associate-badge.svg", title: "Microsoft Certified: Dynamics 365 Business Central Functional Consultant Associate", issuedBy: "Microsoft", url: "https://learn.microsoft.com/en-us/users/zintaen/credentials/30a639686d5425f0" },

    { badgeImage: "https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-associate-badge.svg", title: "Microsoft Certified: Fabric Analytics Engineer Associate", issuedBy: "Microsoft", url: "https://learn.microsoft.com/en-us/users/zintaen/credentials/a8b4d8cd658949ac" },

    { badgeImage: "https://learn.microsoft.com/media/learn/certification/badges/ai-transformation-leader.svg", title: "Microsoft Certified: AI Transformation Leader", issuedBy: "Microsoft", url: "https://learn.microsoft.com/en-us/users/zintaen/credentials/317ca0f98deaa138" },

    { badgeImage: "https://templates.images.credential.net/16231102294348353124512105608042.png", title: "Google Certified Educator Level 2", issuedBy: "Google for Education", url: "https://edu.google.accredible.com/74b9ea5e-165f-4871-a522-fff61a35080c" },

    { badgeImage: "https://templates.images.credential.net/16231100289992143103707929119847.png", title: "Google Certified Educator Level 1", issuedBy: "Google for Education", url: "https://edu.google.accredible.com/77a264c2-6f20-42dc-99cd-61a7bee8ce69" },

    { badgeImage: "https://templates.images.credential.net/17623509539731834497776877118523.png", title: "Gemini Certified University Student", issuedBy: "Google for Education", url: "https://edu.google.accredible.com/5306f0c9-aa46-4787-8927-73632427da3b#acc.WEAdOFey" },

    { badgeImage: "https://templates.images.credential.net/17623508841472301218508369911196.png", title: "Gemini Certified Educator", issuedBy: "Google for Education", url: "https://edu.google.accredible.com/bf8e301f-6e38-4b54-9d1e-0c29a6579273" },
  ]
};
