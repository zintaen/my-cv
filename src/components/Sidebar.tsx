import React from 'react';
import { Mail, Phone, Globe, Code2 } from 'lucide-react';
import type { ProfileData, SkillGroup } from '../data/cv';
import { IconRenderer } from './ui/IconRenderer';

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
            <a href={`mailto:${profile.contact.email}`} className="hover:text-primary transition-colors">{profile.contact.email}</a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-primary shrink-0" />
            <a href={`https://wa.me/${profile.contact.phone.replace(/\\D/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">{profile.contact.phone}</a>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-primary shrink-0" />
            <a href={`https://${profile.contact.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">{profile.contact.linkedin}</a>
          </div>
          <div className="flex items-center gap-3">
            <Code2 className="w-4 h-4 text-primary shrink-0" />
            <a href={`https://${profile.contact.github}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">{profile.contact.github}</a>
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
        {skillGroups.map((group, i) => (
          <SkillBlock key={i} title={group.title}>
            {group.skills.map((skill, j) => (
              <SkillCard 
                key={j} 
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

/* --- Subcomponents --- */

const SkillBlock: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
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

const SkillCard: React.FC<{ icon: import('../data/cv').AppIcon; title: string; subtitle?: string; url?: string }> = ({ icon, title, subtitle, url }) => {
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
      <a href={url} target="_blank" rel="noreferrer" className="group block outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary h-full hover:-translate-y-1 transition-transform">
        {content}
      </a>
    );
  }

  return <div className="h-full">{content}</div>;
};
