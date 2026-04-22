import { Code2, Globe, Mail, Phone } from 'lucide-react';

import type { ProfileData, SkillGroup } from '../data/cv';

import { SkillBlock } from './sidebar/SkillBlock';

interface SidebarProps {
    profile: ProfileData;
    skillGroups: SkillGroup[];
    professionalSummary: string;
}

/**
 * Sidebar = profile header + contact block + professional summary + skills.
 *
 * Semantic structure:
 *   <aside>
 *     <header> ← identifies the person (h1 + role)
 *     <address> ← contact info (ATS parsers specifically hunt for <address>)
 *     <section aria-label="Professional Summary">
 *     <section aria-label="Technical Skills">
 *       <SkillBlock> × N
 */
export function Sidebar({ profile, skillGroups, professionalSummary }: SidebarProps) {
    const phoneDigits = profile.contact.phone.replace(/\D/g, '');

    return (
        <aside className="space-y-12 shrink-0">
            {/* Profile header */}
            <header className="space-y-6">
                <div className="flex items-center gap-5">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-full shadow-lg ring-1 ring-primary/30 ring-offset-4 ring-offset-surface bg-surface-container-low">
                        <img
                            src={profile.avatarUrl}
                            alt={`Photograph of ${profile.name}`}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>

                    <div>
                        <h1 className="font-serif text-2xl md:text-3xl font-bold leading-tight tracking-tight text-white">
                            {profile.name}
                        </h1>
                        <p className="font-mono text-primary tracking-widest text-[11px] font-semibold mt-2 uppercase">
                            {profile.title}
                        </p>
                    </div>
                </div>

                {/* <address> is the semantic element for contact — ATS loves it. */}
                <address className="not-italic space-y-3 font-sans text-sm text-on-surface-variant pr-4">
                    <div className="flex items-center gap-3">
                        <Mail aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                        <a href={`mailto:${profile.contact.email}`} className="hover:text-primary">
                            {profile.contact.email}
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                        <a
                            href={`https://wa.me/${phoneDigits}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary"
                        >
                            {profile.contact.phone}
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Globe aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                        <a
                            href={`https://${profile.contact.linkedin}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary"
                        >
                            {profile.contact.linkedin}
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Code2 aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                        <a
                            href={`https://${profile.contact.github}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary"
                        >
                            {profile.contact.github}
                        </a>
                    </div>
                </address>
            </header>

            {/* Professional Summary */}
            <section aria-label="Professional Summary" className="space-y-3 avoid-break">
                <h2 className="font-mono text-xs tracking-[0.2em] text-on-surface-variant uppercase text-center border-b border-outline-variant/50 pb-2">
                    Professional Summary
                </h2>
                <p className="font-sans text-xs leading-relaxed text-on-surface-variant">
                    {professionalSummary}
                </p>
            </section>

            {/* Technical Skills */}
            <section aria-label="Technical Skills" className="space-y-10">
                <h2 className="sr-only">Technical Skills</h2>
                {skillGroups.map((group) => (
                    <SkillBlock key={group.title} group={group} />
                ))}
            </section>
        </aside>
    );
}
