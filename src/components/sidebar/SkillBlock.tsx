import type { ReactNode } from 'react';

export function SkillBlock({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="space-y-4">
            <h3 className="font-mono text-xs tracking-[0.2em] text-on-surface-variant uppercase text-center border-b border-outline-variant/50 pb-2">
                {title}
            </h3>
            <div className="grid grid-cols-3 gap-2">
                {children}
            </div>
        </div>
    );
}
