import React from 'react';
import type { Academic, Certification } from '../data/cv';

interface CredentialsProps {
  academic: Academic;
  certifications: Certification[];
}

export function Credentials({ academic, certifications }: CredentialsProps) {
  return (
    <section>
      <div className="border-b border-outline-variant pb-4 mb-8">
        <h2 className="font-serif text-3xl text-primary font-bold uppercase tracking-tight">
          Credentials & Academic
        </h2>
      </div>

      <div className="space-y-8">
        {/* Academic */}
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-sm bg-red-900/40 text-red-400 border border-red-900/50 flex flex-col items-center justify-center text-[8px] font-mono leading-none tracking-tighter shrink-0 text-center whitespace-pre-line overflow-hidden p-1">
            {academic.iconImage ? (
              <img src={academic.iconImage} alt={academic.institution} className="w-full h-full object-contain" />
            ) : (
              academic.iconText
            )}
          </div>
          <div>
            <h3 className="font-sans font-semibold text-lg text-white">{academic.institution}</h3>
            <p className="font-sans text-on-surface-variant text-sm mt-0.5">{academic.program}</p>
            <p className="font-sans text-on-surface-variant text-sm">{academic.degree}</p>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h4 className="font-sans font-medium text-sm text-on-surface-variant mb-4">Certifications</h4>
          <div className="space-y-4">
            {certifications.map((cert, i) => (
              <CertItem key={i} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Subcomponents --- */

function CertItem({ cert }: { cert: Certification }) {
  return (
    <a 
      href={cert.url} 
      target="_blank" 
      rel="noreferrer" 
      className="flex items-center gap-4 p-2 -mx-2 rounded-lg"
    >
      <div className="w-10 h-10 rounded-sm bg-surface-container flex items-center justify-center border border-outline-variant/30 overflow-hidden shrink-0 relative">
        <img 
          src={cert.badgeImage} 
          alt={cert.issuedBy} 
          className="w-full h-full object-contain p-1" 
        />
      </div>
      <div className="flex-1">
        <div className="font-sans text-sm text-white font-medium leading-tight">
          {cert.title}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant mt-1">
          {cert.issuedBy}
        </div>
      </div>
    </a>
  );
}
