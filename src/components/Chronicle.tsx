import type { Experience } from '../data/cv';

import { ExperienceItem } from './chronicle/ExperienceItem';

/**
 * Professional Experience section — the #1 thing ATS parsers score on.
 * Wrapped as a proper <section> with an <h2> they can anchor to.
 */
export function Chronicle({ experiences }: { experiences: Experience[] }) {
    return (
        <section aria-labelledby="experience-heading">
            <div className="border-b border-outline-variant pb-4 mb-8">
                <h2 id="experience-heading" className="font-mono text-sm tracking-widest text-on-surface-variant uppercase">
                    Professional
                    <span className="block font-serif text-4xl text-primary font-bold tracking-tight mt-2 capitalize">
                        Experience
                    </span>
                </h2>
            </div>

            <div className="space-y-12">
                {experiences.map((exp) => (
                    <ExperienceItem key={`${exp.company}-${exp.date}`} exp={exp} />
                ))}
            </div>
        </section>
    );
}
