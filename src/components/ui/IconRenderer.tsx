import {
    Activity,
    BarChart3,
    Braces,
    Brain,
    BrainCircuit,
    ChartNoAxesColumn,
    CircleDot,
    ClipboardCheck,
    Cloud,
    Code,
    Cpu,
    Database,
    DollarSign,
    Eye,
    FileSearch,
    FileText,
    FlaskConical,
    Gauge,
    GitBranch,
    Globe,
    GraduationCap,
    HeartPulse,
    LayoutGrid,
    Layers,
    Library,
    Link,
    Lock,
    MessageSquare,
    Network,
    Radio,
    RefreshCw,
    Repeat,
    Rocket,
    Search,
    Server,
    Settings,
    ShieldAlert,
    ShieldCheck,
    SlidersHorizontal,
    Smartphone,
    ScrollText,
    SquareTerminal,
    TestTube,
    UserCheck,
    Users,
    Workflow,
    Zap,
} from 'lucide-react';

import type { AppIcon } from '../../data/cv';

/**
 * LUCIDE_REGISTRY — every icon name referenced from cv.json must appear here.
 *
 * To add a new icon:
 *  1. Import it above.
 *  2. Add an entry below (key = the string used in cv.json, value = component).
 *  3. Done — no other files need touching.
 *
 * Keys intentionally cover both the cv.json name AND common legacy aliases so
 * old cv.json entries keep working without an edit cycle.
 */
const LUCIDE_REGISTRY = {
    // ── AI & Agentic skills ──────────────────────────────────────────────────
    Activity,
    BrainCircuit,
    ClipboardCheck,
    Cpu,
    Eye,
    MessageSquare,
    Network,
    RefreshCw,
    ScrollText,
    Search,
    TestTube,
    UserCheck,

    // ── ERP / BC ─────────────────────────────────────────────────────────────
    Code,
    Code2: Code,            // alias: cv.json may use "Code2"
    Database,
    FileText,
    FlaskConical,
    LayoutDashboard: LayoutGrid,  // alias
    LayoutGrid,
    Server,
    Settings,

    // ── Microsoft Ecosystem & Cloud ───────────────────────────────────────────
    BarChart3,
    ChartNoAxesColumn,
    Cloud,
    Globe,
    Smartphone,
    Workflow,
    Zap,

    // ── Engineering Leadership ────────────────────────────────────────────────
    GitBranch,
    GraduationCap,
    Layers,
    Link,
    Repeat,
    Rocket,
    Users,

    // ── Legacy / generic icons kept for backward compat ───────────────────────
    Braces,
    Brain,
    CircleDot,
    DollarSign,
    FileSearch,
    Gauge,
    HeartPulse,
    Library,
    Lock,
    Radio,
    ShieldAlert,
    ShieldCheck,
    SlidersHorizontal,
    SquareTerminal,
} as const;

/**
 * Pure decorative icon. Always marked aria-hidden so screen readers AND
 * ATS parsers skip it — the textual label is always provided separately.
 */
export function IconRenderer({ icon, className = '' }: { icon: AppIcon; className?: string }) {
    if (icon.type === 'lucide') {
        const Cmp = LUCIDE_REGISTRY[icon.name as keyof typeof LUCIDE_REGISTRY];
        if (!Cmp) return null;
        return <Cmp aria-hidden="true" className={className} />;
    }

    if (icon.type === 'svg') {
        const Cmp = icon.component;
        return <Cmp aria-hidden="true" className={className} />;
    }

    return null;
}
