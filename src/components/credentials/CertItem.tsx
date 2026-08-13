import { useState } from 'react';

import type { Certification } from '../../data/cv';

/**
 * Certification badge + title + issuer.
 *
 * The <a> has a `title` attribute with the complete "<title> — <issuer>"
 * string. Many ATS systems (Workday, Greenhouse) harvest anchor titles
 * as secondary keyword sources in addition to visible text.
 *
 * A failed remote badge is replaced by the issuer name, so the card remains
 * recognizable without depending on a third-party image host.
 */
export function CertItem({ cert }: { cert: Certification }) {
    const [badgeFailed, setBadgeFailed] = useState(false);

    return (
        <li className="list-none">
            <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                title={`${cert.title} — ${cert.issuedBy}`}
                aria-label={`${cert.title}, issued by ${cert.issuedBy}`}
                className="flex items-start gap-3 p-2 rounded-lg avoid-break"
            >
                <div
                    className="w-10 h-10 rounded-sm bg-surface-container flex items-center justify-center border border-outline-variant/30 overflow-hidden shrink-0"
                    aria-hidden="true"
                >
                    {badgeFailed ? (
                        <span className="font-mono text-[9px] text-primary text-center leading-tight px-1">
                            {cert.issuedBy}
                        </span>
                    ) : (
                        <img
                            src={cert.badgeImage}
                            alt=""
                            className="w-full h-full object-contain p-1"
                            loading="eager"
                            onError={() => setBadgeFailed(true)}
                        />
                    )}
                </div>
                <div className="flex-1">
                    <div className="font-sans text-sm text-on-surface font-medium leading-tight">
                        {cert.title}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant mt-1">
                        {cert.issuedBy}
                    </div>
                </div>
            </a>
        </li>
    );
}
