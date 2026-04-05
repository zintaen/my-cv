import { Code2, Globe, Mail, Phone } from 'lucide-react';

import type { ProfileData, SkillGroup } from '../data/cv';

import { SkillBlock } from './sidebar/SkillBlock';
import { SkillCard } from './sidebar/SkillCard';

interface SidebarProps {
    profile: ProfileData;
    skillGroups: SkillGroup[];
    professionalSummary: string;
}

export function Sidebar({ profile, skillGroups, professionalSummary }: SidebarProps) {
    return (
        <aside className="space-y-12 shrink-0">
            {/* Profile Info */}
            <div className="space-y-6">
                <div className="flex items-center gap-5">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-full shadow-lg ring-1 ring-primary/30 ring-offset-4 ring-offset-surface bg-surface-container-low">
                        <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover rounded-full" />
                    </div>

                    <div>
                        <h1 className="font-serif text-2xl md:text-3xl font-bold leading-tight tracking-tight text-white">
                            {profile.name}
                        </h1>
                        <p className="font-mono text-primary tracking-widest text-[11px] font-semibold mt-2">
                            {profile.title}
                        </p>
                    </div>
                </div>

                <div className="space-y-3 font-sans text-sm text-on-surface-variant pr-4">
                    <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        <a href={`mailto:${profile.contact.email}`} aria-label={`Email ${profile.contact.email}`} className="hover:text-primary transition-colors">{profile.contact.email}</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-primary shrink-0" />
                        <a href={`https://wa.me/${profile.contact.phone.replace(/\\D/g, '')}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${profile.contact.phone}`} className="hover:text-primary transition-colors">{profile.contact.phone}</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-primary shrink-0" />
                        <a href={`https://${profile.contact.linkedin}`} target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className="hover:text-primary transition-colors">{profile.contact.linkedin}</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Code2 className="w-4 h-4 text-primary shrink-0" />
                        <a href={`https://${profile.contact.github}`} target="_blank" rel="noreferrer" aria-label="GitHub Profile" className="hover:text-primary transition-colors">{profile.contact.github}</a>
                    </div>
                </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-3">
                <h3 className="font-mono text-xs tracking-[0.2em] text-on-surface-variant uppercase text-center border-b border-outline-variant/50 pb-2">
                    Professional Summary
                </h3>
                <p className="font-sans text-xs leading-relaxed text-on-surface-variant">
                    {professionalSummary}
                </p>
            </div>

            {/* Skills Grid Collections */}
            <div className="space-y-10">
                {skillGroups.map(group => (
                    <SkillBlock key={group.title} title={group.title}>
                        {group.skills.map(skill => (
                            <SkillCard
                                key={skill.title}
                                icon={skill.icon}
                                title={skill.title}
                                subtitle={skill.subtitle}
                                url={skill.url}
                            />
                        ))}
                    </SkillBlock>
                ))}
            </div>
        </aside>
    );
}
