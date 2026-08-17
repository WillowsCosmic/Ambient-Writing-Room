'use client';

import Link from 'next/link';
import { useStore } from '../../store/useStore';
import { BookMarked, Sparkles, Plus, Heart, Feather, Calendar } from 'lucide-react';

export default function JournalEntriesPage() {
  const { journalEntries, getActiveAuthor } = useStore();
  const activeAuthor = getActiveAuthor();

  const getMoodBadgeColor = (mood) => {
    switch (mood) {
      case 'Inspired':
        return 'bg-amber-900/10 text-amber-900 border-amber-900/30';
      case 'Peaceful':
        return 'bg-emerald-900/10 text-emerald-900 border-emerald-900/30';
      case 'Depleted':
        return 'bg-slate-800/10 text-slate-800 border-slate-800/30';
      case 'Serene':
        return 'bg-blue-900/10 text-blue-900 border-blue-900/30';
      default:
        return 'bg-[#400a0c]/10 text-[#400a0c] border-[#400a0c]/30';
    }
  };

  return (
    <div className="texture-bg min-h-screen py-10 px-4 md:px-margin-page relative">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 relative z-10">
        {/* Header */}
        <header className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant/40 pb-6">
          <div>
            <div className="flex items-center gap-3 text-[#400a0c] mb-1">
              <BookMarked size={32} />
              <h1 className="font-display-lg text-4xl md:text-5xl font-bold">Journal Entries & Musings</h1>
              <span className="px-3 py-1 bg-brass/10 border border-brass/40 rounded-full text-xs font-label-sm text-[#400a0c] font-bold">
                🔒 Private Journal: {activeAuthor?.name || 'Author'}
              </span>
            </div>
            <p className="font-writing-surface text-2xl text-on-surface-variant/80">
              Sealed reflections & emotional heart-checks recorded after your writing sessions.
            </p>
          </div>

          <Link
            href="/mood"
            className="px-5 py-2.5 bg-[#400a0c] text-white rounded-full font-label-sm text-xs flex items-center gap-2 shadow-md hover:bg-primary-container font-bold"
          >
            <Plus size={16} />
            <span>Record New Journal Reflection</span>
          </Link>
        </header>

        {/* Journal Entries Gallery */}
        {journalEntries.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
            {journalEntries.map((entry) => (
              <article
                key={entry.id}
                className="p-6 bg-surface rounded-xl border border-brass/50 shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative group deckled-edge"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-center mb-3 border-b border-outline-variant/20 pb-2">
                    <span className="font-writing-surface text-lg text-on-surface-variant/80 flex items-center gap-1">
                      <Calendar size={14} />
                      {entry.date}
                    </span>

                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-label-sm font-bold border ${getMoodBadgeColor(
                        entry.mood
                      )}`}
                    >
                      {entry.mood} ({entry.score}%)
                    </span>
                  </div>

                  <h3 className="font-writing-surface text-2xl text-[#400a0c] font-bold mb-2">
                    Post-Session Reflection
                  </h3>

                  <p className="font-body-md text-base text-on-surface-variant leading-relaxed italic mb-4">
                    "{entry.note}"
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center border-t border-outline-variant/20 pt-3 text-xs font-label-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <Feather size={12} className="text-[#400a0c]" />
                    {entry.wordCount} words
                  </span>

                  <span className="font-writing-surface text-base text-[#400a0c] font-bold">
                    ~ Sealed Journal
                  </span>
                </div>
              </article>
            ))}
          </section>
        ) : (
          /* Empty State */
          <div className="py-20 flex flex-col items-center justify-center text-center bg-surface-container-low/60 rounded-2xl border-2 border-dashed border-outline-variant/40 p-8 my-4">
            <Heart size={48} className="text-outline-variant mb-4" />
            <h3 className="font-display-md text-2xl text-[#400a0c] font-bold mb-2">No Sealed Journal Entries Yet</h3>
            <p className="font-writing-surface text-2xl text-on-surface-variant max-w-md mb-6">
              Reflect on how your heart feels after a session in Mood Check-in to seal your journal entries here!
            </p>
            <Link
              href="/mood"
              className="px-5 py-2.5 bg-[#400a0c] text-white rounded-full font-label-sm text-xs flex items-center gap-2 shadow-md hover:bg-primary-container font-bold"
            >
              <Plus size={16} />
              <span>Go to Mood Check-in</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
