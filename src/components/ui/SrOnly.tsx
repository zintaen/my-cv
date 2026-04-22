import type { ReactNode } from 'react';

/**
 * Renders text that is invisible to sighted readers but IS extracted by
 * ATS parsers and screen readers. Used for the clean ATS label on every
 * skill card (which visually shows tiny fragmented text).
 *
 * The `aria-hidden="false"` is explicit: some very aggressive ATS engines
 * respect ARIA tree hints. Tag name `span` to stay inline-safe.
 */
export function SrOnly({ children }: { children: ReactNode }) {
    return (
        <span className="sr-only" aria-hidden="false">
            {children}
        </span>
    );
}
