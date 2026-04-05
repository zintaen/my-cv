import { MapPin } from 'lucide-react';

import type { Experience } from '../data/cv';

const BULLET_REGEX = /^•\s*/;

interface ChronicleProps {
    experiences: Experience[];
}

export function Chronicle({ experiences }: ChronicleProps) {
    return (
        <section>
            <div className="border-b border-outline-variant pb-4 mb-8">
                <h2 className="font-mono text-sm tracking-widest text-on-surface-variant uppercase">
                    Professional
                    <span className="block font-serif text-4xl text-primary font-bold tracking-tight mt-2 capitalize">
                        EXPERIENCE
                    </span>
                </h2>
            </div>

            <div className="relative space-y-12">
                {experiences.map((exp, i) => (
                    <ExperienceItem
                        key={i}
                        role={exp.role}
                        company={exp.company}
                        date={exp.date}
                        location={exp.location}
                        bullets={exp.bullets}
                    />
                ))}
            </div>
        </section>
    );
}

/* --- Subcomponents --- */

function ExperienceItem({ role, company, date, location, bullets }: { role: string; company: string; date: string; location?: string; bullets: string[] }) {
    return (
        <div className="flex flex-col md:flex-row gap-6 relative group">

            {/* Left Column: Date & Location */}
            <div className="md:w-1/4 shrink-0 md:text-right relative pt-1">
                {date && <div className="font-sans text-sm font-bold text-primary">{date}</div>}
                {location && (
                    <div className="flex items-center md:justify-end gap-1.5 mt-1.5 text-on-surface-variant font-sans text-xs">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{location}</span>
                    </div>
                )}
            </div>

            {/* Timeline Divider */}
            <div className="hidden md:flex flex-col items-center relative w-6 shrink-0">
                <div className="w-px h-[calc(100%+3rem)] bg-outline-variant/30 absolute top-4" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary relative mt-1.5 ring-4 ring-surface" />
            </div>

            {/* Right Column: Content */}
            <div className="md:w-[calc(75%-3rem)] md:pl-2">
                {company && <h3 className="font-serif text-2xl font-bold text-primary mb-1">{company}</h3>}
                {role && <h4 className="font-sans text-lg font-bold text-white mb-4">{role}</h4>}

                <ul className="space-y-4">
                    {bullets.map((bullet, i) => {
                        const text = bullet.replace(BULLET_REGEX, '');
                        return (
                            <li key={i} className="font-sans text-[15px] leading-relaxed text-on-surface-variant pl-4 relative">
                                <span className="absolute left-0 top-[0.6em] w-1 h-1 rounded-sm bg-primary/80" />
                                {text}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
