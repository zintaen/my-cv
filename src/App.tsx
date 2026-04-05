import { Chronicle } from './components/Chronicle';
import { Credentials } from './components/Credentials';
import { Sidebar } from './components/Sidebar';
import { cvData } from './data/cv';

export default function App() {
    return (
        <div className="min-h-screen bg-surface text-on-surface selection:bg-primary-container/30 [-webkit-print-color-adjust:exact] [print-color-adjust:exact]">

            {/* Main Layout Grid */}
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

                {/* Global Header */}
                <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-outline-variant pb-6 mb-8 gap-4 print:hidden">
                    <h2 className="font-mono text-sm tracking-widest text-on-surface-variant uppercase">
                        Resume
                    </h2>
                    <a
                        href="/Stephen_Cheng_CV.pdf"
                        download="Stephen_Cheng_CV.pdf"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm bg-gradient-to-r from-primary to-primary-container text-surface hover:opacity-90 font-mono font-bold text-sm tracking-wide shadow-[0_0_24px_rgba(242,202,80,0.15)] transition-all cursor-pointer print:hidden"
                    >
                        DOWNLOAD PDF
                    </a>
                </header>

                <div id="cv-grid" className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-x-12 gap-y-16">

                    {/* LEFT SIDEBAR (30%) */}
                    <Sidebar profile={cvData.profile} skillGroups={cvData.skillGroups} professionalSummary={cvData.professionalSummary} />

                    {/* RIGHT CONTENT (70%) */}
                    <main className="space-y-16">
                        <Chronicle experiences={cvData.experiences} />
                        <Credentials academic={cvData.academic} certifications={cvData.certifications} />
                    </main>

                </div>
            </div>
        </div>
    );
}
