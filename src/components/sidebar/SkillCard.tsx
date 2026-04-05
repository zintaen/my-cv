import type { AppIcon } from '../../data/cv';

import { IconRenderer } from '../ui/IconRenderer';

export function SkillCard({ icon, title, subtitle, url }: { icon: AppIcon; title: string; subtitle?: string; url?: string }) {
    const content = (
        <div className={`flex flex-col items-center justify-start text-center p-3 h-full rounded-lg bg-surface-container border border-outline-variant/30 text-surface-tint transition-all ${url ? 'group-hover:bg-surface-bright group-hover:border-primary/50 shadow-sm group-hover:shadow-md' : 'hover:bg-surface-bright hover:border-primary/50'}`}>
            <div className="flex items-center justify-center w-7 h-7 mb-2 opacity-90 shrink-0">
                <IconRenderer icon={icon} className="w-full h-full object-contain" />
            </div>
            <div className="font-sans font-medium text-[10px] leading-tight text-white mb-0.5 px-1">{title}</div>
            {subtitle && <div className="font-mono text-[8px] leading-tight text-on-surface-variant opacity-80 mt-0.5 px-1">{subtitle}</div>}
        </div>
    );

    if (url) {
        return (
            <a href={url} target="_blank" rel="noreferrer" aria-label={`Learn more about ${title}`} className="group block outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary h-full hover:-translate-y-1 transition-transform">
                {content}
            </a>
        );
    }

    return <div className="h-full">{content}</div>;
}
