import type { Experience } from '../data/cv';

import { ExperienceItem } from './chronicle/ExperienceItem';

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
                {experiences.map(exp => (
                    <ExperienceItem
                        key={exp.company}
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
