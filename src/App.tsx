import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Award, Briefcase, Code2, GraduationCap, FileDown } from 'lucide-react';

export default function App() {
  const avatarUrl = "/avatar.jpg";

  return (
    <div className="min-h-screen bg-brown-950 text-brown-100 selection:bg-gold-500/30 [-webkit-print-color-adjust:exact] [print-color-adjust:exact]">

      {/* Floating PDF Export Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => window.print()}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-brown-950 font-semibold text-sm shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer print:hidden"
        title="Export as PDF"
      >
        <FileDown className="w-4.5 h-4.5" />
        Export PDF
      </motion.button>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 print:!grid print:!grid-cols-12 gap-12">

          {/* Left Column - Fixed on Desktop */}
          <div className="lg:col-span-4 print:!col-span-4 space-y-8">
            <div className="lg:sticky lg:top-12 space-y-8">

              {/* Avatar - hidden on print for ATS */}
              <div className="relative rounded-2xl overflow-hidden bg-brown-800 aspect-square border border-gold-500/20 shadow-2xl shadow-gold-500/5">
                <img src={avatarUrl} alt="Stephen Cheng" className="w-full h-full object-cover" />
              </div>

              {/* Contact Info */}
              <div className="space-y-6 bg-brown-900/50 p-8 rounded-2xl border border-gold-500/10">
                <h1 className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 print:bg-none print:text-gold-500 print:[-webkit-text-fill-color:currentColor]">
                  TRỊNH THÁI ANH
                </h1>
                <h2 className="text-xl font-light tracking-wide text-gold-400">
                  (STEPHEN CHENG)
                </h2>
                <p className="text-lg font-medium text-brown-100/80 border-b border-gold-500/20 pb-6">
                  AI-First Solution Architect
                </p>

                <div className="space-y-4 pt-2">
                  <a href="mailto:zintaen@gmail.com" className="flex items-center gap-4 text-brown-100/70 hover:text-gold-400 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-brown-800 flex items-center justify-center border border-gold-500/20 shrink-0">
                      <Mail aria-hidden="true" className="w-4 h-4" />
                    </div>
                    <span className="text-sm"><span className="inline-block w-[1px] opacity-0 text-[1px] overflow-hidden select-all whitespace-pre">Email: </span>zintaen@gmail.com</span>
                  </a>
                  <a href="tel:+84906878091" className="flex items-center gap-4 text-brown-100/70 hover:text-gold-400 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-brown-800 flex items-center justify-center border border-gold-500/20 shrink-0">
                      <Phone aria-hidden="true" className="w-4 h-4" />
                    </div>
                    <span className="text-sm"><span className="inline-block w-[1px] opacity-0 text-[1px] overflow-hidden select-all whitespace-pre">Phone: </span>+84 906 878 091</span>
                  </a>
                  <div className="flex items-center gap-4 text-brown-100/70">
                    <div className="w-10 h-10 rounded-full bg-brown-800 flex items-center justify-center border border-gold-500/20 shrink-0">
                      <MapPin aria-hidden="true" className="w-4 h-4" />
                    </div>
                    <span className="text-sm"><span className="inline-block w-[1px] opacity-0 text-[1px] overflow-hidden select-all whitespace-pre">Location: </span>Ho Chi Minh City, Vietnam</span>
                  </div>
                  <a href="https://linkedin.com/in/zintaen" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-brown-100/70 hover:text-gold-400 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-brown-800 flex items-center justify-center border border-gold-500/20 shrink-0">
                      <Linkedin aria-hidden="true" className="w-4 h-4" />
                    </div>
                    <span className="text-sm truncate"><span className="inline-block w-[1px] opacity-0 text-[1px] overflow-hidden select-all whitespace-pre">LinkedIn: https://</span>linkedin.com/in/zintaen</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Scrollable Content */}
          <div className="lg:col-span-8 print:!col-span-8 space-y-12">

            {/* Executive Summary */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-brown-100/80 font-light">
                AI-First Solution Architect with <strong className="text-gold-400 font-medium">8+ years</strong> of enterprise software engineering experience. Directed frontend architecture for platforms supporting <strong className="text-gold-400 font-medium">50k+ Daily Active Users (DAU)</strong>, reducing PR review cycles by <strong className="text-gold-400 font-medium">35%</strong> through AI-assisted development workflows. Specializes in the intersection of <strong className="text-gold-400 font-medium">Enterprise-Scale React/Next.js/TypeScript Ecosystems</strong>, <strong className="text-gold-400 font-medium">AI & Agentic Orchestration (LLM, RAG, HITL)</strong>, and <strong className="text-gold-400 font-medium">Cross-Regional Technical Leadership</strong> across Vietnam and Singapore. Data-driven approach to Core Web Vitals optimization (40% LCP reduction, INP &lt; 200ms).
              </p>
            </motion.section>

            {/* Core Competencies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 border-b border-gold-500/20 pb-4">
                <Code2 aria-hidden="true" className="w-6 h-6 text-gold-500" />
                <h3 className="text-2xl font-serif font-semibold text-gold-400">Core Competencies & Technologies</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CompetencyCard
                  title="Modern Frontend"
                  skills={["React (Server Components, RSC)", "Next.js (App Router)", "TypeScript", "TanStack Query", "Micro-frontends (Webpack Module Federation)", "WebAssembly (WASM)"]}
                />
                <CompetencyCard
                  title="AI & Automation"
                  skills={["AI-First Architecture", "Agentic UI Design", "LLM Orchestration", "Retrieval-Augmented Generation (RAG)", "Vector Databases (Pinecone/Milvus)", "LangChain", "Human-in-the-Loop (HITL) Architecture", "GitHub Copilot", "Cursor", "Prompt Engineering"]}
                />
                <CompetencyCard
                  title="Performance & Infra"
                  skills={["Edge Computing", "Server-Side Rendering (SSR)", "Cloud-Native Architecture", "Edge Runtimes", "INP Optimization", "Large-Scale Bundle Optimization", "Docker", "AWS Ecosystem", "CI/CD Pipeline Design"]}
                />
                <CompetencyCard
                  title="Backend & Integration"
                  skills={["Node.js", "NestJS", "RESTful APIs", "BFF (Backend for Frontend) Pattern", "GraphQL", "Multi-tenant Database Schema Design (MySQL, MongoDB)"]}
                />
                <CompetencyCard
                  title="Methodologies"
                  skills={["DORA Metrics", "SPACE Framework", "Rigorous TDD", "Component-Driven Development", "Engineering Leadership & Mentorship", "Enterprise UX/UI Strategy", "Scalable System Design"]}
                  className="md:col-span-2"
                />
              </div>
            </motion.section>

            {/* Professional Experience */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 border-b border-gold-500/20 pb-4">
                <Briefcase aria-hidden="true" className="w-6 h-6 text-gold-500" />
                <h3 className="text-2xl font-serif font-semibold text-gold-400">Professional Experience</h3>
              </div>

              <div className="space-y-12">

                <ExperienceItem
                  company="AI-First Solution Architect — Professional Sabbatical"
                  role="Advanced AI Architecture Specialization"
                  location="Ho Chi Minh City, Vietnam"
                  date="January 2026 - Present"
                  bullets={[
                    "Completed rigorous certification programs across Anthropic, Microsoft, and Google ecosystems, earning the Claude Certified Architect, AI Transformation Leader, and Fabric Analytics Engineer (DP-600, Score: 942) credentials through intensive lab-based examination.",
                    "Designed and prototyped AI-First solution architectures incorporating RAG pipelines, vector database integration, and Human-in-the-Loop (HITL) safety patterns for enterprise LLM deployments.",
                    "Attained AI Transformation Leader certification, validating expertise in organizational AI adoption strategy and change management."
                  ]}
                />

                <ExperienceItem
                  company="CADDi"
                  role="Senior Full Stack Engineer"
                  location="Ho Chi Minh City, Vietnam"
                  date="January 2023 - November 2025"
                  bullets={[
                    "Directed the frontend architecture for core enterprise platforms supporting 50k+ Daily Active Users (DAU), optimizing strict Core Web Vitals to reduce LCP by 40% and maintain INP under 200ms — contributing to measurable improvements in user engagement and session retention across the platform.",
                    "Championed the adoption of AI coding assistants (Cursor, Copilot) across a 15+ engineer organization, improving DORA metrics by reducing Change Lead Time and decreasing PR review cycles by 35%.",
                    "Architected transition from legacy monolithic state to Micro-frontends via Webpack Module Federation, enabling independent team deployments and cutting build times by 50%.",
                    "Designed an AI control plane for safe LLM execution within production workflows, implementing Guardrails, dynamic permission checks, and HITL approval flows to ensure responsible AI integration.",
                    "Engineered BFF (Backend for Frontend) layers and utilized Docker for containerization, orchestrating CI/CD pipelines for zero-downtime Edge deployments.",
                    "Established enterprise testing standards achieving 90% coverage across all frontend repositories, significantly reducing the Change Failure Rate (CFR) and enabling confident continuous deployment."
                  ]}
                />

                <ExperienceItem
                  company="Kydon Group"
                  role="Front End Lead"
                  location="Singapore"
                  date="September 2020 - August 2022"
                  bullets={[
                    "Led a cross-functional team of 8 frontend developers to architect interactive, highly scalable applications using ReactJS and Angular across 4 flagship enterprise products.",
                    "Created a unified, enterprise-wide Design System through strict Component-Driven Development, establishing reusable component libraries that reduced UI development time by 30% and ensured visual consistency at scale.",
                    "Implemented Event-Driven UI patterns to achieve system resilience and decoupled backend dependencies, ensuring seamless REST API integration and high-availability data flow with backend microservices."
                  ]}
                />

                <ExperienceItem
                  company="Vincere.io"
                  role="Senior Web Developer"
                  location="Vietnam"
                  date="September 2019 - September 2020"
                  bullets={[
                    "Architected scalable frontend interfaces and secure, multi-tenant database schemas (MySQL) for a high-traffic recruitment SaaS platform, implementing advanced Role-Based Access Control (RBAC) mechanisms across ReactJS and Node.js/NestJS microservices."
                  ]}
                />

                <ExperienceItem
                  company="Spirit Labs"
                  role="Full Stack Engineer"
                  location="Vietnam"
                  date="December 2018 - August 2019"
                  bullets={[
                    "Engineered high-availability Web/SaaS applications (ReactJS, Node.js, MongoDB) and enforced strict Test-Driven Development (TDD) pipelines within an Agile framework to guarantee zero-regression deployment cycles."
                  ]}
                />

                <ExperienceItem
                  company="ekino Vietnam"
                  role="Frontend Developer"
                  location="Vietnam"
                  date="August 2017 - December 2018"
                  bullets={[
                    "Developed and maintained enterprise web applications with a focus on performance optimization, responsive design, and cross-browser compatibility."
                  ]}
                />

                <ExperienceItem
                  company="Ministry of Natural Resources and Environment"
                  role="Junior Web Developer"
                  location="Vietnam"
                  date="April 2016 - August 2017"
                  bullets={[
                    "Built internal government web systems for environmental data management, establishing foundational full-stack development skills across frontend and backend technologies."
                  ]}
                />

              </div>
            </motion.section>

            {/* Education & Certifications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 border-b border-gold-500/20 pb-4">
                <GraduationCap aria-hidden="true" className="w-6 h-6 text-gold-500" />
                <h3 className="text-2xl font-serif font-semibold text-gold-400">Education & Certifications</h3>
              </div>

              {/* Education - CMU Dominant */}
              <div className="p-6 rounded-xl bg-brown-800/50 border border-gold-500/10 print-break-avoid">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0">
                    <GraduationCap aria-hidden="true" className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-gold-300 text-xl">Carnegie Mellon University</h4>
                    <p className="text-gold-400/80 text-sm mt-0.5">Joint Program with Van Lang University</p>
                    <p className="text-brown-100/70 mt-1">Bachelor of Engineering, Computer Software Engineering (2010 – 2016)</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CertItem
                  title="Claude Certified Architect - Foundations (Early Adopter)"
                  subtitle="Anthropic • 03/2026"
                />
                <CertItem
                  title="Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)"
                  subtitle="Microsoft • 02/2026"
                />
                <CertItem
                  title="Microsoft Certified: AI Transformation Leader"
                  subtitle="Microsoft • 02/2026"
                />
                <CertItem
                  title="Microsoft Applied Skills: Generate reports with AI research agents"
                  subtitle="Microsoft • 02/2026"
                />
                <CertItem
                  title="Google Certified Educator Level 1 & Level 2"
                  subtitle="Google for Education • 12/2025"
                />
                <CertItem
                  title="Gemini Certified Educator & University Student"
                  subtitle="Google for Education • 12/2025"
                />
              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </div>
  );
}

function CompetencyCard({ title, skills, className = "" }: { title: string, skills: string[], className?: string }) {
  return (
    <div className={`p-6 rounded-xl bg-brown-900/40 border border-gold-500/10 hover:border-gold-500/30 transition-colors print-break-avoid ${className}`}>
      <h4 className="text-gold-300 font-semibold mb-4 text-lg">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <React.Fragment key={i}>
            <span className="px-3 py-1.5 text-sm rounded-md bg-brown-800 text-brown-100/80 border border-gold-500/5">
              {skill}
            </span>
            {i < skills.length - 1 && (
              <span className="inline-block w-[1px] opacity-0 text-[1px] overflow-hidden select-all whitespace-pre">
                ,{" "}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ExperienceItem({ company, role, location, date, bullets }: { company: string, role: string, location: string, date: string, bullets: string[] }) {
  return (
    <div className="relative pl-8 md:pl-0 group">
      <div className="md:hidden absolute left-0 top-2 w-2 h-2 rounded-full bg-gold-500 ring-4 ring-brown-950" />

      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Date & Location */}
        <div className="md:w-1/3 shrink-0 md:text-right pt-1">
          <div className="text-gold-400 font-semibold">{date}</div>
          <div className="text-brown-100/50 text-sm flex items-center md:justify-end gap-1 mt-1">
            <MapPin className="w-3 h-3" /> {location}
          </div>
        </div>

        {/* Timeline Line & Dot (Desktop) */}
        <div className="hidden md:flex flex-col items-center relative">
          <div className="w-3 h-3 rounded-full bg-gold-500 ring-4 ring-brown-950 z-10 mt-1.5 group-hover:scale-125 transition-transform" />
          <div className="absolute top-3 bottom-[-3rem] w-px bg-gradient-to-b from-gold-500/50 to-gold-500/10" />
        </div>

        {/* Content */}
        <div className="md:w-2/3 pb-12">
          <h4 className="text-2xl font-serif font-bold text-gold-300 mb-1">{company}</h4>
          <div className="text-lg font-medium text-brown-100 mb-4">{role}</div>
          <ul className="space-y-3">
            {bullets.map((bullet, i) => (
              <li key={i} className="text-brown-100/80 text-sm leading-relaxed flex items-start gap-3">
                <span aria-hidden="true" className="text-gold-500 mt-1.5 text-[10px] shrink-0">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CertItem({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="p-4 rounded-xl bg-brown-900/40 border border-gold-500/10 flex items-start gap-3 print-break-avoid">
      <Award aria-hidden="true" className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
      <div>
        <span className="text-brown-100/80 text-sm leading-relaxed">{title}</span>
        {subtitle && (
          <p className="text-brown-100/50 text-xs mt-1 leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
