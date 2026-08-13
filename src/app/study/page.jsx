'use client';

import { useStore } from '../../store/useStore';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Flame, BookOpen, Sparkles, Feather, PlusCircle } from 'lucide-react';

export default function StudyDashboardPage() {
  const { streakDays, incrementStreak, moodLog, latestReflection } = useStore();

  return (
    <div className="texture-bg min-h-screen py-10 px-4 md:px-margin-page relative">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 relative z-10">
        {/* Header */}
        <header className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="font-display-lg text-4xl md:text-5xl text-[#400a0c] mb-2 font-bold">
              Chronicles of Focus
            </h1>
            <p className="font-body-lg text-lg text-on-surface-variant italic">
              A meticulous record of musings, moods, and maintained momentum.
            </p>
          </div>

          <button
            onClick={incrementStreak}
            className="px-4 py-2 bg-[#400a0c] text-white rounded-full font-label-sm text-xs flex items-center gap-1.5 shadow-md hover:bg-primary-container font-bold"
          >
            <PlusCircle size={16} />
            <span>Log Daily Writing Streak (+1 Day)</span>
          </button>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Streak Counter Widget (Left) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-8 bg-surface-container rounded-xl border border-brass/50 shadow-md relative overflow-hidden group">
            <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-outline/40" />
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-outline/40" />
            <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-outline/40" />
            <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-outline/40" />

            <h3 className="font-label-sm text-xs text-tertiary-container uppercase tracking-widest mb-4 font-bold">
              Unbroken Sequence
            </h3>

            {/* Candle Flame Flicker */}
            <div className="relative my-3 flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-[#400a0c] animate-pulse">
                candle
              </span>
              {streakDays > 0 && (
                <Flame size={22} className="absolute -top-2 text-amber-500 fill-amber-500 animate-bounce" />
              )}
            </div>

            <div className="font-display-lg text-6xl text-[#400a0c] font-bold my-1">{streakDays}</div>
            <div className="font-writing-surface text-2xl text-on-surface-variant">
              {streakDays === 0 ? 'Start your streak today' : 'Days illuminated'}
            </div>
          </div>

          {/* Recharts Mood Analytics with Actual Dynamic Days of the Week */}
          <div className="md:col-span-8 p-6 md:p-8 bg-surface-container-lowest rounded-xl border border-brass/50 shadow-md relative">
            <div className="flex justify-between items-start mb-4 border-b border-outline-variant/30 pb-3">
              <div>
                <h3 className="font-label-sm text-xs text-tertiary-container uppercase tracking-widest font-bold">
                  Botanical Disposition Chart (Past 7 Days Analytics)
                </h3>
                <p className="font-writing-surface text-lg text-on-surface-variant opacity-80">
                  Real-time sentiment & mood trajectory over the actual week...
                </p>
              </div>
              <Sparkles size={18} className="text-[#c9a24b]" />
            </div>

            <div className="w-full h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodLog} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#400a0c" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#400a0c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#867271" fontSize={12} tickLine={false} />
                  <YAxis stroke="#867271" fontSize={12} domain={[0, 100]} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff9ee',
                      borderColor: '#bc9640',
                      borderRadius: '8px',
                      fontFamily: 'Literata',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#400a0c"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorMood)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Real-Time Dynamic Reflection Note (Bottom Full Span) */}
          <div className="md:col-span-12 p-8 bg-surface-container-low rounded-xl border border-brass/40 shadow-sm flex flex-col md:flex-row items-start gap-6 relative">
            <div className="w-12 h-12 rounded-lg bg-surface border border-outline/30 flex items-center justify-center shrink-0 text-[#400a0c]">
              <BookOpen size={24} />
            </div>

            <div className="flex-grow">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Feather size={16} className="text-[#400a0c]" />
                  <h4 className="font-display-md text-xl text-[#400a0c] font-semibold">
                    {latestReflection?.title || 'Active Reflection'}
                  </h4>
                </div>
                <span className="font-label-sm text-xs text-on-surface-variant/60">
                  {latestReflection?.wordCount || 0} words
                </span>
              </div>

              <p className="font-body-md text-on-surface-variant leading-relaxed italic text-base">
                "{latestReflection?.excerpt || 'Write in the Study Editor to record your real-time reflection here...'}"
              </p>
              <p className="font-writing-surface text-outline mt-3 text-right text-lg">
                ~ {latestReflection?.date || 'Just Now'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
