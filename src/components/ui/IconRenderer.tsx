import * as LucideIcons from 'lucide-react';
import * as React from 'react';

import type { AppIcon } from '../../data/cv';

interface IconRendererProps {
    icon: AppIcon;
    className?: string;
}

export function IconRenderer({ icon, className = '' }: IconRendererProps) {
    if (icon.type === 'lucide') {
        const IconComponent = LucideIcons[icon.name] as React.ElementType;
        if (!IconComponent) {
            console.warn(`Lucide icon "${icon.name}" not found.`);
            return null;
        }
        return <IconComponent className={className} />;
    }

    if (icon.type === 'url') {
        return <img src={icon.path} alt="icon" className={`object-contain ${className}`} />;
    }

    return null;
}
