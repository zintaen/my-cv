import type { ElementType } from 'react';

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

const LUCIDE_ICONS: Record<string, ElementType> = {
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
};

interface IconRendererProps {
    icon: AppIcon;
    className?: string;
}

export function IconRenderer({ icon, className = '' }: IconRendererProps) {
    if (icon.type === 'lucide') {
        const IconComponent = LUCIDE_ICONS[icon.name];
        if (!IconComponent)
            return null;
        return <IconComponent className={className} />;
    }

    if (icon.type === 'url') {
        return <img src={icon.path} alt="icon" className={`object-contain ${className}`} />;
    }

    if (icon.type === 'svg') {
        const SvgComponent = icon.component;
        return <SvgComponent className={className} />;
    }

    return null;
}
