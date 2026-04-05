import type { Certification } from '../../data/cv';

export function CertItem({ cert }: { cert: Certification }) {
    return (
        <a
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`View certification: ${cert.title} by ${cert.issuedBy}`}
            className="flex items-start gap-3 p-2 rounded-lg"
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
