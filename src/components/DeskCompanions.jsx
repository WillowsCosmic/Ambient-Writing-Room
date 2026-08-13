'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Flame, Coffee, Trees, Watch, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function DeskCompanions() {
  const {
    deskCompanions,
    toggleCompanion,
    duration,
    setDuration,
    sessionStartTime,
    streakDays,
    isWatchTicking,
    toggleWatchTicking,
  } = useStore();

  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionStartTime) {
        const diffMs = Date.now() - sessionStartTime;
        setElapsedMinutes(Math.floor(diffMs / (1000 * 60)));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [sessionStartTime]);

  // Target duration in minutes
  const targetMinutes = {
    '30 Minutes': 30,
    '1 Hour': 60,
    '2 Hours': 120,
    'Until Finished': 180,
  }[duration] || 60;

  // Candle wax height percentage (100% full down to 10% guttering)
  const candleWaxHeight = Math.max(10, Math.round(100 - (elapsedMinutes / targetMinutes) * 90));
  const isCandleGuttered = elapsedMinutes >= targetMinutes;

  // Teacup steams for first 3 minutes
  const isSteaming = elapsedMinutes <= 3;

  // Fern Growth Stage
  const getFernStage = (streak) => {
    if (streak >= 15) return { label: 'Grand Blooming Fern', scale: 1.25, fronds: 5 };
    if (streak >= 8) return { label: 'Lush Cottage Fern', scale: 1.1, fronds: 4 };
    if (streak >= 4) return { label: 'Emerging Frond', scale: 0.9, fronds: 3 };
    return { label: 'Young Sprout', scale: 0.75, fronds: 2 };
  };

  const fernStage = getFernStage(streakDays);

  // Cycle Duration by winding Pocket Watch
  const cycleDuration = () => {
    const options = ['30 Minutes', '1 Hour', '2 Hours', 'Until Finished'];
    const currentIdx = options.indexOf(duration);
    const nextOption = options[(currentIdx + 1) % options.length];
    setDuration(nextOption);
  };

  return (
    <aside aria-label="Interactive Desk Companions" className="w-full max-w-3xl mx-auto my-4 flex items-center justify-center gap-6 md:gap-10 p-4 bg-surface-container/60 backdrop-blur-sm rounded-xl border border-brass/40 shadow-sm relative z-30">
      {/* 1. CANDLE: Dynamic Wax Burning & Flame Flicker */}
      {deskCompanions.candle && (
        <div className="flex flex-col items-center group cursor-pointer" onClick={() => toggleCompanion('candle')}>
          <div className="relative w-12 flex flex-col items-center justify-end h-28">
            {/* Flickering Flame */}
            {!isCandleGuttered ? (
              <motion.div
                animate={{
                  scale: [1, 1.15, 0.95, 1.05, 1],
                  opacity: [0.85, 1, 0.9, 1, 0.85],
                  rotate: [-2, 2, -1, 1, -2],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative -mb-1"
              >
                <Flame size={24} className="text-amber-500 fill-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
              </motion.div>
            ) : (
              // Guttered Smoke Effect
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -20 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-outline text-xs italic mb-1 font-label-sm"
              >
                💨
              </motion.div>
            )}

            {/* Candle Body with Dynamic Wax Height */}
            <div
              style={{ height: `${candleWaxHeight}%` }}
              className="w-8 bg-gradient-to-b from-[#fffdd0] via-[#f5edd9] to-[#eae2ce] border-2 border-brass/60 rounded-t-sm shadow-md transition-all duration-1000 flex flex-col justify-between items-center p-1"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-800/30" />
            </div>
          </div>
          <span className="font-writing-surface text-sm text-[#400a0c] mt-1 group-hover:underline">
            {isCandleGuttered ? 'Guttered Out' : `Candle (${candleWaxHeight}%)`}
          </span>
        </div>
      )}

      {/* 2. TEACUP: Steaming Flow Indicator */}
      {deskCompanions.tea && (
        <div className="flex flex-col items-center group cursor-pointer" onClick={() => toggleCompanion('tea')}>
          <div className="relative w-14 h-20 flex flex-col items-center justify-end">
            {/* Animated Steam Particles */}
            <AnimatePresence>
              {isSteaming && (
                <div className="absolute -top-6 flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.2, y: 0, scale: 0.8 }}
                      animate={{ opacity: [0.2, 0.7, 0], y: -16, scale: 1.2 }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      className="w-1.5 h-4 bg-white/40 rounded-full blur-[1px]"
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Teacup Graphic */}
            <div className="w-12 h-10 bg-gradient-to-b from-[#fff9ee] to-[#e1dac6] border-2 border-brass/60 rounded-b-xl shadow-md relative flex items-center justify-center">
              <Coffee size={20} className={isSteaming ? 'text-amber-800 animate-pulse' : 'text-amber-950'} />
              <div className="absolute -right-2 top-2 w-3 h-4 border-2 border-brass/60 rounded-r-full" />
            </div>
          </div>
          <span className="font-writing-surface text-sm text-[#400a0c] mt-1 group-hover:underline">
            {isSteaming ? 'Steaming Tea' : 'Still Warm Tea'}
          </span>
        </div>
      )}

      {/* 3. FERN: Dynamic Streak Growth */}
      {deskCompanions.plant && (
        <div
          className="flex flex-col items-center group cursor-pointer"
          onClick={() => toggleCompanion('plant')}
          title={`Streak Growth: ${fernStage.label}`}
        >
          <div className="relative w-14 h-20 flex flex-col items-center justify-end">
            <motion.div
              style={{ transform: `scale(${fernStage.scale})` }}
              className="transition-transform duration-500"
            >
              <Trees size={32} className="text-emerald-800 drop-shadow-sm" />
            </motion.div>
            {/* Terracotta Pot */}
            <div className="w-10 h-6 bg-gradient-to-b from-amber-700 to-amber-900 border-2 border-brass/50 rounded-b-md shadow-sm" />
          </div>
          <span className="font-writing-surface text-sm text-emerald-900 mt-1 group-hover:underline">
            Fern ({streakDays}d streak)
          </span>
        </div>
      )}

      {/* 4. POCKET WATCH: Interactive Winding Session Timer & Ticking */}
      {deskCompanions.watch && (
        <div className="flex flex-col items-center group">
          <div className="relative w-16 h-20 flex flex-col items-center justify-end">
            {/* Winding Top Loop */}
            <div
              onClick={cycleDuration}
              className="w-4 h-4 rounded-full border-2 border-brass bg-amber-200/80 cursor-pointer hover:rotate-45 transition-transform"
              title="Click to Wind Watch (Set Duration)"
            />

            {/* Watch Casing */}
            <div
              onClick={cycleDuration}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border-2 border-brass shadow-md flex items-center justify-center cursor-pointer hover:scale-105 transition-transform relative"
            >
              <Watch size={20} className="text-[#400a0c]" />
              <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-1 mt-1">
            <span
              onClick={cycleDuration}
              className="font-writing-surface text-sm text-[#400a0c] cursor-pointer group-hover:underline font-bold"
            >
              {duration}
            </span>
            <button
              onClick={toggleWatchTicking}
              className="text-[#400a0c] hover:scale-110 transition-transform p-0.5"
              title={isWatchTicking ? 'Mute Pocket Watch Tick' : 'Enable Pocket Watch Tick'}
            >
              {isWatchTicking ? <Volume2 size={12} /> : <VolumeX size={12} />}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
