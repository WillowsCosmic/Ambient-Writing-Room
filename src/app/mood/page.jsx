'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Frown, Smile, Sparkles, Send, Check } from 'lucide-react';

export default function MoodCheckInPage() {
  const router = useRouter();
  const { addMoodEntry } = useStore();

  const [selectedMood, setSelectedMood] = useState('Inspired');
  const [moodScore, setMoodScore] = useState(90);
  const [thought, setThought] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moods = [
    { id: 'Depleted', label: 'Depleted', score: 35, icon: Frown, color: 'text-slate-700' },
    { id: 'Peaceful', label: 'Peaceful', score: 75, icon: Smile, color: 'text-emerald-800' },
    { id: 'Inspired', label: 'Inspired', score: 95, icon: Sparkles, color: 'text-amber-700' },
  ];

  const handleSelectMood = (m) => {
    setSelectedMood(m.id);
    setMoodScore(m.score);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate double submission!

    setIsSubmitting(true);
    addMoodEntry({
      mood: selectedMood,
      score: moodScore,
      note: thought.trim() || `Reflected on feeling ${selectedMood.toLowerCase()} after this writing session.`,
    });

    setTimeout(() => {
      router.push('/folio'); // Navigates to Journal Entries gallery
    }, 600);
  };

  return (
    <div className="texture-bg min-h-screen py-12 px-4 md:px-margin-page flex items-center justify-center relative">
      <main className="w-full max-w-xl bg-surface/95 p-8 md:p-12 rounded-2xl border-2 border-brass/50 shadow-2xl relative z-10 font-label-sm">
        {/* Stamp watermark */}
        <div className="absolute top-4 right-4 text-xs font-writing-surface opacity-30 tracking-widest uppercase border border-outline p-1 rounded transform rotate-6">
          STAMP {new Date().getFullYear()}
        </div>

        <header className="text-center mb-8">
          <h1 className="font-display-md text-3xl md:text-4xl text-[#400a0c] font-bold mb-2">
            How does your heart feel after this session?
          </h1>
          <p className="font-writing-surface text-2xl text-on-surface-variant/80">
            Take a quiet moment to reflect.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Mood Selection Cards */}
          <div className="grid grid-cols-3 gap-4">
            {moods.map((m) => {
              const Icon = m.icon;
              const isSelected = selectedMood === m.id;
              return (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => handleSelectMood(m)}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-[#400a0c] text-white border-[#400a0c] shadow-md scale-105 font-bold'
                      : 'bg-surface-container-low border-outline-variant/40 text-on-surface hover:border-[#400a0c]'
                  }`}
                >
                  <Icon size={24} className={isSelected ? 'text-white' : m.color} />
                  <span className="font-writing-surface text-xl">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Optional Reflection Note */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider text-on-surface-variant/80 font-bold">
              A Brief Thought (Optional)
            </label>
            <textarea
              rows={3}
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder="Jot down a fleeting thought..."
              className="w-full bg-surface-container-low/80 border border-outline-variant/40 rounded-lg p-3 font-writing-surface text-2xl text-on-surface focus:outline-none focus:border-[#400a0c]"
            />
          </div>

          {/* Seal Journal Entry Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#400a0c] text-white rounded-full font-display-md text-lg italic flex items-center justify-center gap-2 shadow-lg hover:bg-primary-container transition-transform active:scale-95 disabled:opacity-50 font-bold"
          >
            {isSubmitting ? (
              <>
                <Check size={18} />
                <span>Journal Entry Sealed...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>SEAL JOURNAL ENTRY</span>
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
