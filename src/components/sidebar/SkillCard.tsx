import type { Skill } from '../../data/cv';

import { IconRenderer } from '../ui/IconRenderer';
import { SrOnly } from '../ui/SrOnly';

/**
 * A single skill tile.
 *
 * Visual: icon + title + optional subtitle (unchanged from v1).
 * ATS:    a single clean label in an SrOnly span so parsers read
 *         "Vector Databases (Pinecone, Milvus)" instead of stitched
 *         fragments "Vector Databases" + "(Pinecone)".
 *
 * When the skill has a `url`, we render as an <a> so the PDF includes a
 * clickable link — but with a `title` attribute holding the ATS label
 * (Workday/Greenhouse read link titles).
 */
export function SkillCard({ skill }: { skill: Skill }) {
    const body = (
        <div className="flex flex-col items-center justify-start text-center p-3 h-full rounded-lg bg-surface-container border border-outline-variant/30 text-surface-tint">
            <div className="flex items-center justify-center w-7 h-7 mb-2 opacity-90 shrink-0">
                <IconRenderer icon={skill.icon} className="w-full h-full object-contain" />
            </div>
            <div className="font-sans font-medium text-[10px] leading-tight text-white mb-0.5 px-1">
                {skill.title}
            </div>
            {skill.subtitle && (
                <div className="font-mono text-[8px] leading-tight text-on-surface-variant opacity-80 mt-0.5 px-1">
                    {skill.subtitle}
                </div>
            )}
            <SrOnly>{skill.ats}</SrOnly>
        </div>
    );

    if (skill.url) {
        return (
            <a
                href={skill.url}
                target="_blank"
                rel="noreferrer"
                title={skill.ats}
                aria-label={skill.ats}
                className="block h-full rounded-lg"
            >
                {body}
            </a>
        );
    }

    return (
        <div title={skill.ats} aria-label={skill.ats} className="h-full">
            {body}
        </div>
    );
}
