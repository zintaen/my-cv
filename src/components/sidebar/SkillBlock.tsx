import type { SkillGroup } from '../../data/cv';

import { SkillCard } from './SkillCard';

/**
 * A category of skills.
 *
 * Uses a proper <section> + <h3> for the category and renders cards as a
 * real <ul>/<li>. ATS parsers see a clean bulleted list structure:
 *   "AI & Automation: Agentic OS, RAG, Vector Databases, ..."
 */
export function SkillBlock({ group }: { group: SkillGroup }) {
    return (
        <section className="space-y-4 avoid-break" aria-label={`Skills: ${group.title}`}>
            <h3 className="font-mono text-xs tracking-[0.2em] text-on-surface-variant uppercase text-center border-b border-outline-variant/50 pb-2">
                {group.title}
            </h3>
            <ul className="grid grid-cols-3 gap-2 list-none p-0 m-0">
                {group.skills.map((s) => (
                    <li key={s.title} className="list-none">
                        <SkillCard skill={s} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
