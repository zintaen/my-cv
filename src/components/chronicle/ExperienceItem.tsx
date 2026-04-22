import { MapPin } from 'lucide-react';

import type { Experience } from '../../data/cv';

/**
 * A single experience entry as a proper <article>.
 *
 * DOM reading order (what the ATS sees):
 *   company → role → date → location → bullets[]
 * Visual order (CSS grid): date/location on the left, content on the right.
 *
 * Bullets are real <ul>/<li> — not fake spans. list-style is native `disc`
 * but we restyle it to a gold square dot to match the original visual.
 */
export function ExperienceItem({ exp }: { exp: Experience }) {
    return (
        <article className="flex flex-col md:flex-row gap-6 relative avoid-break">
            {/* Left column: date & location */}
            <div className="md:w-1/4 shrink-0 md:text-right relative pt-1">
                {exp.date && (
                    <div className="font-sans text-sm font-bold text-primary">
                        <time>{exp.date}</time>
                    </div>
                )}
                {exp.location && (
                    <div className="flex items-center md:justify-end gap-1.5 mt-1.5 text-on-surface-variant font-sans text-xs">
                        <MapPin aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                        <span>{exp.location}</span>
                    </div>
                )}
            </div>

            {/* Timeline divider (decorative only — not in DOM flow) */}
            <div
                aria-hidden="true"
                className="hidden md:flex flex-col items-center relative w-6 shrink-0"
            >
                <div className="w-px h-[calc(100%+3rem)] bg-outline-variant/30 absolute top-4" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary relative mt-1.5 ring-4 ring-surface" />
            </div>

            {/* Right column: heading + bullets */}
            <div className="md:w-[calc(75%-3rem)] md:pl-2">
                <h3 className="font-serif text-2xl font-bold text-primary mb-1">
                    {exp.company}
                </h3>
                <p className="font-sans text-lg font-bold text-white mb-4">
                    {exp.role}
                </p>

                <ul className="list-none p-0 m-0 space-y-3">
                    {exp.bullets.map((bullet, i) => (
                        <li
                            // eslint-disable-next-line react/no-array-index-key
                            key={i}
                            className="font-sans text-[15px] leading-relaxed text-on-surface-variant pl-4 relative"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute left-0 top-[0.6em] w-1 h-1 rounded-sm bg-primary/80"
                            />
                            {bullet}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}
