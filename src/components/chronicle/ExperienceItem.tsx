import { MapPin } from 'lucide-react';

const BULLET_REGEX = /^•\s*/;

export function ExperienceItem({ role, company, date, location, bullets }: { role: string; company: string; date: string; location?: string; bullets: string[] }) {
    return (
        <div className="flex flex-col md:flex-row gap-6 relative group">

            {/* Left Column: Date & Location */}
            <div className="md:w-1/4 shrink-0 md:text-right relative pt-1">
                {date && <div className="font-sans text-sm font-bold text-primary">{date}</div>}
                {location && (
                    <div className="flex items-center md:justify-end gap-1.5 mt-1.5 text-on-surface-variant font-sans text-xs">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{location}</span>
                    </div>
                )}
            </div>

            {/* Timeline Divider */}
            <div className="hidden md:flex flex-col items-center relative w-6 shrink-0">
                <div className="w-px h-[calc(100%+3rem)] bg-outline-variant/30 absolute top-4" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary relative mt-1.5 ring-4 ring-surface" />
            </div>

            {/* Right Column: Content */}
            <div className="md:w-[calc(75%-3rem)] md:pl-2">
                {company && <h3 className="font-serif text-2xl font-bold text-primary mb-1">{company}</h3>}
                {role && <h4 className="font-sans text-lg font-bold text-white mb-4">{role}</h4>}

                <ul className="space-y-4">
                    {bullets.map((bullet, i) => {
                        const text = bullet.replace(BULLET_REGEX, '');
                        return (
                            // eslint-disable-next-line react/no-array-index-key -- static data, bullets have no stable ID
                            <li key={i} className="font-sans text-[15px] leading-relaxed text-on-surface-variant pl-4 relative">
                                <span className="absolute left-0 top-[0.6em] w-1 h-1 rounded-sm bg-primary/80" />
                                {text}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
