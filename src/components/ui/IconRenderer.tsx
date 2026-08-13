import {
    Activity,
    BarChart3,
    Braces,
    Brain,
    Cloud,
    Code2,
    Database,
    DollarSign,
    FileSearch,
    FileText,
    Gauge,
    GitBranch,
    Globe,
    HeartPulse,
    Layers,
    LayoutDashboard,
    LayoutGrid,
    Library,
    Lock,
    Radio,
    Rocket,
    Server,
    Settings,
    ShieldAlert,
    ShieldCheck,
    SlidersHorizontal,
    Smartphone,
    SquareTerminal,
    TestTube,
    Users,
    Workflow,
} from 'lucide-react';

import type { AppIcon } from '../../data/cv';

const LUCIDE_REGISTRY = {
    Activity,
    BarChart3,
    Braces,
    Brain,
    Cloud,
    Code2,
    Database,
    DollarSign,
    FileSearch,
    FileText,
    Gauge,
    GitBranch,
    Globe,
    HeartPulse,
    Layers,
    LayoutDashboard,
    LayoutGrid,
    Library,
    Lock,
    Radio,
    Rocket,
    Server,
    Settings,
    ShieldAlert,
    ShieldCheck,
    SlidersHorizontal,
    Smartphone,
    SquareTerminal,
    TestTube,
    Users,
    Workflow,
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
