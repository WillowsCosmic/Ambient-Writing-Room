'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import {
  Sun,
  Sunset,
  Moon,
  CloudRain,
  Coffee,
  Book,
  Flame,
  Trees,
  Music,
  Guitar,
  Disc,
  Check,
  Lock,
  ArrowDown,
  Clock,
} from 'lucide-react';

export default function SetupRitualPage() {
  const router = useRouter();
  const {
    timeOfDay,
    setTimeOfDay,
    currentPaper,
    setPaper,
    currentPigment,
    setPigment,
    currentFont,
    setFont,
    intention,
    setIntention,
    duration,
    setDuration,
    deskCompanions,
    toggleCompanion,
    ambientVolumes,
    setAmbientVolume,
  } = useStore();

  const [isStamping, setIsStamping] = useState(false);

  const handleBegin = () => {
    setIsStamping(true);
    setTimeout(() => {
      router.push('/editor');
    }, 750);
  };

  const papers = [
    { id: 'parchment', label: 'Parchment', bg: 'bg-[#Ecdbb6]' },
    { id: 'lined', label: 'Lined', bg: 'bg-surface-container-highest' },
    { id: 'dotted', label: 'Dotted', bg: 'bg-surface-container-highest' },
    { id: 'blank', label: 'Blank', bg: 'bg-surface-container-highest' },
    { id: 'pink', label: 'Pastel Rose', bg: 'bg-[#fbe8ee]' },
  ];

  const pigments = [
    { id: '#400a0c', name: 'Burgundy Reserve', class: 'bg-[#400a0c]' },
    { id: '#3a4b3a', name: 'Forest Moss', class: 'bg-[#3a4b3a]' },
    { id: '#1a1a1a', name: 'Iron Gall Ink', class: 'bg-[#1a1a1a]' },
    { id: '#3d2b1f', name: 'Vintage Sepia', class: 'bg-[#3d2b1f]' },
  ];

  const fonts = [
    { id: 'Caveat', name: 'Caveat Script', family: 'font-writing-surface' },
    { id: 'Homemade Apple', name: 'Homemade Apple', family: 'font-homemade-apple' },
    { id: 'EB Garamond', name: 'EB Garamond', family: 'font-display-md' },
    { id: 'Playfair', name: 'Playfair Display', family: 'font-playfair' },
  ];

  const audioControls = [
    { key: 'rain', label: 'Rain on Glass', icon: CloudRain, color: 'text-blue-700' },
    { key: 'cafe', label: 'Café Chatter', icon: Coffee, color: 'text-amber-800' },
    { key: 'library', label: 'Library Hush', icon: Book, color: 'text-emerald-800' },
    { key: 'fireplace', label: 'Hearth Fire', icon: Flame, color: 'text-orange-700' },
    { key: 'forest', label: 'Forest Wind', icon: Trees, color: 'text-green-800' },
    { key: 'musicBox', label: 'Music Box Tune', icon: Music, color: 'text-purple-800' },
    { key: 'guitar', label: 'Acoustic Guitar', icon: Guitar, color: 'text-amber-700' },
    { key: 'piano', label: 'Grand Piano', icon: Disc, color: 'text-[#400a0c]' },
  ];

  return (
    <div className="texture-bg min-h-screen py-10 px-4 md:px-margin-page relative">
      <main className="w-full max-w-3xl mx-auto flex flex-col gap-14 relative z-10">
        {/* Title Banner */}
        <header className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display-lg text-4xl md:text-5xl text-[#400a0c] mb-2 font-bold"
          >
            The Setup Ritual
          </motion.h1>
          <p className="font-writing-surface text-2xl text-on-surface-variant/80">
            Prepare your tools. Settle the mind.
          </p>
        </header>

        {/* I. Time of Day (Sundial Arc) */}
        <section className="flex flex-col items-center gap-6">
          <h2 className="font-display-md text-2xl md:text-3xl text-tertiary-container">I. Time of Day</h2>
          <div className="sundial-arc mt-4 flex justify-between items-end pb-2 px-4">
            <button
              onClick={() => setTimeOfDay('dawn')}
              className={`flex flex-col items-center gap-1 -ml-6 -mb-4 group transition-transform ${
                timeOfDay === 'dawn' ? 'scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#fdf5e6] border-2 border-outline/50 flex items-center justify-center shadow-sm">
                <Sun size={20} className="text-amber-600" />
              </div>
              <span className="font-writing-surface text-on-surface-variant text-sm">Dawn</span>
            </button>

            <button
              onClick={() => setTimeOfDay('midday')}
              className={`flex flex-col items-center gap-1 -mb-6 group transition-transform ${
                timeOfDay === 'midday' ? 'scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-[#fffdd0] border-2 border-[#400a0c] flex items-center justify-center shadow-[0_0_15px_rgba(255,253,208,0.8)]">
                <Sun size={24} className="text-yellow-600" />
              </div>
              <span className="font-writing-surface text-[#400a0c] font-bold text-base">Midday</span>
            </button>

            <button
              onClick={() => setTimeOfDay('dusk')}
              className={`flex flex-col items-center gap-1 -mr-6 -mb-4 group transition-transform ${
                timeOfDay === 'dusk' ? 'scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#e6c280] border-2 border-outline/50 flex items-center justify-center shadow-sm">
                <Sunset size={20} className="text-orange-700" />
              </div>
              <span className="font-writing-surface text-on-surface-variant text-sm">Dusk</span>
            </button>
          </div>

          <button
            onClick={() => setTimeOfDay('midnight')}
            className={`mt-2 flex flex-col items-center gap-1 transition-opacity ${
              timeOfDay === 'midnight' ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-100'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-[#1a1b41] border-2 border-outline/50 flex items-center justify-center shadow-sm text-white">
              <Moon size={16} />
            </div>
            <span className="font-writing-surface text-on-surface-variant text-xs">Midnight</span>
          </button>
        </section>

        <div className="w-4/5 mx-auto h-px bg-gradient-to-r from-transparent via-outline to-transparent my-2" />

        {/* II. The Folio Canvas */}
        <section className="flex flex-col items-center gap-6">
          <h2 className="font-display-md text-2xl md:text-3xl text-tertiary-container">II. The Folio Canvas</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full">
            {papers.map((p) => (
              <motion.button
                key={p.id}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPaper(p.id)}
                className={`h-40 ${p.bg} torn-edge border border-outline-variant/60 shadow-md flex flex-col items-center justify-center relative p-2 transition-all ${
                  currentPaper === p.id ? 'ring-2 ring-[#400a0c] shadow-lg scale-105' : 'opacity-80'
                }`}
              >
                <span className="font-writing-surface text-xl text-[#400a0c] font-bold">{p.label}</span>
                {currentPaper === p.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-[#400a0c] text-white rounded-full flex items-center justify-center">
                    <Check size={12} />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </section>

        <div className="w-4/5 mx-auto h-px bg-gradient-to-r from-transparent via-outline to-transparent my-2" />

        {/* III. Web Audio Ambience (Guitar & Piano included) */}
        <section className="flex flex-col items-center gap-6">
          <h2 className="font-display-md text-2xl md:text-3xl text-tertiary-container">
            III. Web Audio Procedural Ambience
          </h2>
          <p className="font-writing-surface text-lg text-on-surface-variant text-center -mt-3">
            Real-time synthesized audio nodes — including Acoustic Guitar & Grand Piano!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl bg-surface-container-low/70 p-6 rounded-xl border border-outline-variant/40">
            {audioControls.map(({ key, label, icon: Icon, color }) => (
              <div key={key} className="flex items-center gap-4 bg-surface/50 p-3 rounded-lg border border-outline-variant/30">
                <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center shrink-0 border border-outline-variant/40">
                  <Icon size={20} className={color} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-label-sm mb-1">
                    <span className="text-on-surface">{label}</span>
                    <span className="text-on-surface-variant font-bold">{ambientVolumes[key]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={ambientVolumes[key]}
                    onChange={(e) => setAmbientVolume(key, Number(e.target.value))}
                    className="w-full h-1.5 bg-outline-variant/40 rounded-lg appearance-none cursor-pointer accent-[#400a0c]"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Action */}
        <section className="flex flex-col items-center mt-6 mb-20">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            animate={isStamping ? { scale: [1, 1.2, 0.9, 1] } : {}}
            onClick={handleBegin}
            className="w-36 h-36 wax-seal rounded-full flex flex-col items-center justify-center text-white shadow-xl border-2 border-brass/60 group cursor-pointer"
          >
            <span className="font-display-md text-xl tracking-widest uppercase font-bold">Begin</span>
            <ArrowDown size={18} className="opacity-70 group-hover:translate-y-1 transition-transform" />
          </motion.button>
          <p className="font-writing-surface text-on-surface-variant text-xl mt-4 opacity-70">
            Seal your intent to enter the Study
          </p>
        </section>
      </main>
    </div>
  );
}
