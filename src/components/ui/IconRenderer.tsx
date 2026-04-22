import {
    Activity,
    BarChart3,
    Braces,
    Brain,
    DollarSign,
    FileSearch,
    Gauge,
    Globe,
    HeartPulse,
    LayoutGrid,
    Library,
    Lock,
    Radio,
    Rocket,
    ShieldAlert,
    ShieldCheck,
    SlidersHorizontal,
    SquareTerminal,
    TestTube,
    Users,
} from 'lucide-react';

import type { AppIcon } from '../../data/cv';

const LUCIDE_REGISTRY = {
    Activity,
    BarChart3,
    Braces,
    Brain,
    DollarSign,
    FileSearch,
    Gauge,
    Globe,
    HeartPulse,
    LayoutGrid,
    Library,
    Lock,
    Radio,
    Rocket,
    ShieldAlert,
    ShieldCheck,
    SlidersHorizontal,
    SquareTerminal,
    TestTube,
    Users,
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
