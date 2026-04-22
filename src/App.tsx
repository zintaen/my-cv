import { Chronicle } from './components/Chronicle';
import { Credentials } from './components/Credentials';
import { Sidebar } from './components/Sidebar';
import { cvData } from './data/cv';

/**
 * Top-level layout.
 *
 * Visual: a two-column grid (30% sidebar / 70% main) — pixel-identical to
 * the original PDF.
 *
 * ATS reading order (DOM order):
 *   1.  Sidebar: name, role, <address> contact block, summary, skills
 *   2.  Main:    Professional Experience
 *   3.  Main:    Credentials & Academic
 *
 * This is a valid CV reading order for every major ATS. The key fix vs.
 * the original is that the DOM now uses <header>/<section>/<address>/
 * <h1>–<h3>/<ul>/<li>, and there's no CSS zoom distorting glyph extraction.
 */
export default function App() {
    return (
        <div
            id="cv-root"
            className="min-h-screen bg-surface text-on-surface selection:bg-primary-container/30 [-webkit-print-color-adjust:exact] [print-color-adjust:exact]"
        >
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Web-only header. Hidden in PDF via `print-hidden`. */}
                <header className="print-hidden flex flex-col sm:flex-row sm:items-center justify-between border-b border-outline-variant pb-6 mb-8 gap-4">
                    <p className="font-mono text-sm tracking-widest text-on-surface-variant uppercase">
                        Resume
                    </p>
                    <a
                        href="/Stephen_Cheng_CV.pdf"
                        download="Stephen_Cheng_CV.pdf"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm bg-gradient-to-r from-primary to-primary-container text-surface hover:opacity-90 font-mono font-bold text-sm tracking-wide shadow-[0_0_24px_rgba(242,202,80,0.15)]"
                    >
                        DOWNLOAD PDF
                    </a>
                </header>

                <div
                    id="cv-grid"
                    className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-x-12 gap-y-16"
                >
                    <Sidebar
                        profile={cvData.profile}
                        skillGroups={cvData.skillGroups}
                        professionalSummary={cvData.professionalSummary}
                    />

                    <main className="space-y-16">
                        <Chronicle experiences={cvData.experiences} />
                        <Credentials
                            academic={cvData.academic}
                            certifications={cvData.certifications}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}
