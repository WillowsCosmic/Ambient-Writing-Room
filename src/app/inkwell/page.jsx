'use client';

import { useStore } from '../../store/useStore';
import { PenTool, Check, Sparkles } from 'lucide-react';

export default function InkwellPage() {
  const { currentPigment, setPigment, currentFont, setFont } = useStore();

  const pigments = [
    { id: '#400a0c', name: 'Burgundy Reserve', hex: '#400a0c', desc: 'Rich deep wine pigment' },
    { id: '#3a4b3a', name: 'Forest Moss', hex: '#3a4b3a', desc: 'Verdant damp wood ink' },
    { id: '#1a1a1a', name: 'Iron Gall Ink', hex: '#1a1a1a', desc: 'Deep archival black' },
    { id: '#3d2b1f', name: 'Vintage Sepia', hex: '#3d2b1f', desc: 'Warm aged brown pigment' },
  ];

  const fonts = [
    { id: 'Caveat', name: 'Caveat Script', family: 'font-writing-surface', sample: 'The quick brown fox jumps over the lazy dog.' },
    { id: 'Homemade Apple', name: 'Homemade Apple', family: 'font-homemade-apple', sample: 'Quiet solitude of the countryside study.' },
    { id: 'EB Garamond', name: 'EB Garamond', family: 'font-display-md', sample: 'Vol. III — Rural Sketches & Essays.' },
    { id: 'Playfair', name: 'Playfair Display', family: 'font-playfair', sample: 'Classical authority for headlines.' },
  ];

  return (
    <div className="texture-bg min-h-screen py-10 px-4 md:px-margin-page relative">
      <div className="max-w-5xl mx-auto flex flex-col gap-10 relative z-10">
        <header className="text-center">
          <h1 className="font-display-lg text-4xl md:text-5xl text-[#400a0c] mb-2 font-bold">
            Inkwell — Your Collection
          </h1>
          <p className="font-display-md text-xl italic text-on-surface-variant/80">
            Some inks are earned, not chosen.
          </p>
          <div className="h-px w-32 bg-outline-variant mx-auto mt-6" />
        </header>

        {/* Current Pen & Font Live Preview Section */}
        <section className="w-full bg-surface-container-lowest rounded-xl shadow-md border border-brass/40 p-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 border-b md:border-b-0 md:border-r border-outline-variant/30 pb-6 md:pb-0 md:pr-8">
              <span className="font-label-sm text-xs text-on-surface-variant/60 uppercase tracking-widest block mb-4">
                Active Handwriting Preview
              </span>
              <p
                style={{ color: currentPigment }}
                className={`text-3xl md:text-4xl leading-relaxed ${
                  fonts.find((f) => f.id === currentFont)?.family || 'font-writing-surface'
                }`}
              >
                "The quick brown fox jumps over the lazy dog."
              </p>
            </div>

            <div className="flex flex-col items-center justify-center shrink-0">
              <PenTool size={48} style={{ color: currentPigment }} className="transform -rotate-45 mb-2" />
              <div className="flex items-center gap-2 mt-2">
                <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: currentPigment }} />
                <span className="font-label-sm text-xs text-on-surface-variant">
                  {pigments.find((p) => p.id === currentPigment)?.name}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pigment Selection Cards */}
        <section className="flex flex-col gap-4">
          <h2 className="font-display-md text-2xl text-[#400a0c]">Select Pigment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {pigments.map((p) => (
              <div
                key={p.id}
                onClick={() => setPigment(p.id)}
                className={`p-5 bg-surface rounded-lg border shadow-sm cursor-pointer transition-all ${
                  currentPigment === p.id ? 'border-[#400a0c] ring-2 ring-[#400a0c]/20 scale-105' : 'border-outline-variant/40 hover:border-outline'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-full shadow-inner" style={{ backgroundColor: p.hex }} />
                  {currentPigment === p.id && <Check size={18} className="text-[#400a0c]" />}
                </div>
                <h3 className="font-writing-surface text-xl text-[#400a0c] font-bold">{p.name}</h3>
                <p className="font-body-md text-xs text-on-surface-variant/70 mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Calligraphic Hands Specimen */}
        <section className="flex flex-col gap-4">
          <h2 className="font-display-md text-2xl text-[#400a0c]">Calligraphic Hands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fonts.map((f) => (
              <div
                key={f.id}
                onClick={() => setFont(f.id)}
                className={`p-6 bg-surface rounded-lg border shadow-sm cursor-pointer transition-all ${
                  currentFont === f.id ? 'border-[#400a0c] ring-2 ring-[#400a0c]/20' : 'border-outline-variant/40 hover:border-outline'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-label-sm text-xs text-[#400a0c] uppercase tracking-wider font-bold">
                    {f.name}
                  </span>
                  {currentFont === f.id && <Sparkles size={16} className="text-[#c9a24b]" />}
                </div>
                <p className={`${f.family} text-2xl text-on-surface leading-relaxed`}>{f.sample}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
