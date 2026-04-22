import type { Academic, Certification } from '../data/cv';

import { CertItem } from './credentials/CertItem';

/**
 * Education + certifications.
 *
 * Education sits in its own <section aria-labelledby="education-heading">
 * with explicit "Institution / Program / Degree" text — ATS engines look
 * for the words "Bachelor", "Master", institution names specifically.
 *
 * Certifications is a <ul> of <li><a> — list structure is preserved in
 * tagged PDFs so ATS reads them as enumerable items, not prose.
 */
export function Credentials({
    academic,
    certifications,
}: {
    academic: Academic;
    certifications: Certification[];
}) {
    return (
        <section aria-labelledby="credentials-heading">
            <div className="border-b border-outline-variant pb-4 mb-8">
                <h2
                    id="credentials-heading"
                    className="font-serif text-3xl text-primary font-bold uppercase tracking-tight"
                >
                    Credentials &amp; Academic
                </h2>
            </div>

            {/* Education */}
            <section aria-labelledby="education-heading" className="mb-8 avoid-break">
                <h3 id="education-heading" className="sr-only">Education</h3>
                <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-sm bg-red-900/40 text-red-400 border border-red-900/50 flex flex-col items-center justify-center text-[8px] font-mono leading-none tracking-tighter shrink-0 text-center whitespace-pre-line overflow-hidden p-1">
                        {academic.iconImage ? (
                            <img
                                src={academic.iconImage}
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            academic.iconText
                        )}
                    </div>
                    <div>
                        <p className="font-sans font-semibold text-lg text-white">
                            {academic.institution}
                        </p>
                        <p className="font-sans text-on-surface-variant text-sm mt-0.5">
                            {academic.program}
                        </p>
                        <p className="font-sans text-on-surface-variant text-sm">
                            {academic.degree}
                        </p>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section aria-labelledby="certs-heading">
                <h3
                    id="certs-heading"
                    className="font-sans font-medium text-sm text-on-surface-variant mb-4"
                >
                    Certifications
                </h3>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3 list-none p-0 m-0">
                    {certifications.map((c) => (
                        <CertItem key={c.url} cert={c} />
                    ))}
                </ul>
            </section>
        </section>
    );
}
