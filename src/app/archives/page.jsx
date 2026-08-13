'use client';

import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { exportManuscriptToPdf } from '../../lib/exportPdf';
import { Archive, Download, Feather, Clock, Bookmark, Sparkles, PlusCircle } from 'lucide-react';

export default function ArchivesPage() {
  const { historyEntries, addArchiveEntry, setManuscript } = useStore();
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownloadPdf = async (entry) => {
    setDownloadingId(entry.id);
    if (entry.content) {
      setManuscript(entry.content);
    }
    await exportManuscriptToPdf('writing-canvas', `${entry.title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
    setDownloadingId(null);
  };

  return (
    <div className="texture-bg min-h-screen py-10 px-4 md:px-margin-page relative">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 relative z-10">
        {/* Header */}
        <header className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant/40 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#400a0c] mb-1">
              <Archive size={28} />
              <h1 className="font-display-lg text-4xl md:text-5xl font-bold">Session History Archives</h1>
            </div>
            <p className="font-writing-surface text-2xl text-on-surface-variant/80">
              Your real manuscript endeavors, dynamically filed & saved to PDF.
            </p>
          </div>

          <button
            onClick={() => addArchiveEntry()}
            className="px-4 py-2 bg-[#400a0c] text-white rounded-full font-label-sm text-xs flex items-center gap-1.5 shadow-md hover:bg-primary-container font-bold"
          >
            <PlusCircle size={16} />
            <span>Archive Current Editor Draft</span>
          </button>
        </header>

        {/* Dynamic Card Catalog Grid */}
        {historyEntries.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
            {historyEntries.map((entry) => (
              <article
                key={entry.id}
                className="p-6 bg-surface rounded-xl border border-brass/50 shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex justify-between items-center mb-3 border-b border-outline-variant/20 pb-2">
                    <span className="font-writing-surface text-lg text-on-surface-variant/80">{entry.date}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-brass/10 border border-brass/30 text-[#400a0c] font-label-sm text-[10px] uppercase font-bold">
                      FILED
                    </span>
                  </div>

                  <h3 className="font-display-md text-2xl text-[#400a0c] font-bold mb-2 group-hover:text-primary-container">
                    {entry.title}
                  </h3>

                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed line-clamp-3 italic mb-4">
                    "{entry.excerpt}"
                  </p>
                </div>

                {/* Card Footer: Metadata & Dynamic PDF Download Button */}
                <div className="flex justify-between items-center border-t border-outline-variant/20 pt-3 text-xs font-label-sm text-on-surface-variant">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Feather size={12} className="text-[#400a0c]" />
                      {entry.wordCount} wds
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {entry.duration}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDownloadPdf(entry)}
                    disabled={downloadingId === entry.id}
                    className="px-3 py-1 bg-[#400a0c] text-white rounded-full text-xs font-bold hover:bg-primary-container transition-all flex items-center gap-1 shadow-sm disabled:opacity-50"
                    title="Export styled PDF file of this session"
                  >
                    <Download size={12} />
                    <span>{downloadingId === entry.id ? 'Exporting...' : 'PDF'}</span>
                  </button>
                </div>
              </article>
            ))}
          </section>
        ) : (
          /* Clean Empty State when user hasn't saved work yet */
          <div className="py-20 flex flex-col items-center justify-center text-center bg-surface-container-low/60 rounded-2xl border-2 border-dashed border-outline-variant/40 p-8 my-4">
            <Archive size={48} className="text-outline-variant mb-4" />
            <h3 className="font-display-md text-2xl text-[#400a0c] font-bold mb-2">No Archived Sessions Yet</h3>
            <p className="font-writing-surface text-2xl text-on-surface-variant max-w-md mb-6">
              Write your manuscript in the Study Editor and click "Save PDF" or "Archive Current Editor Draft" to file your real work here!
            </p>
            <button
              onClick={() => addArchiveEntry()}
              className="px-5 py-2.5 bg-[#400a0c] text-white rounded-full font-label-sm text-xs flex items-center gap-2 shadow-md hover:bg-primary-container font-bold"
            >
              <PlusCircle size={16} />
              <span>Archive Current Draft Now</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
