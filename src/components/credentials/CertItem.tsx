import type { Certification } from '../../data/cv';

/**
 * Certification badge + title + issuer.
 *
 * The <a> has a `title` attribute with the complete "<title> — <issuer>"
 * string. Many ATS systems (Workday, Greenhouse) harvest anchor titles
 * as secondary keyword sources in addition to visible text.
 *
 * Badge image has `onError` fallback handling done via CSS — if the remote
 * image fails, the card still shows text.
 */
export function CertItem({ cert }: { cert: Certification }) {
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
                <div className="w-10 h-10 rounded-sm bg-surface-container flex items-center justify-center border border-outline-variant/30 overflow-hidden shrink-0">
                    <img
                        src={cert.badgeImage}
                        alt=""
                        className="w-full h-full object-contain p-1"
                        loading="eager"
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
        </li>
    );
}
