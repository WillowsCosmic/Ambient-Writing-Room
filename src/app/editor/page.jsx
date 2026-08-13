'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { exportManuscriptToPdf } from '../../lib/exportPdf';
import DeskCompanions from '../../components/DeskCompanions';
import {
  Download,
  Flame,
  Feather,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Sun,
  Sunset,
  Moon,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Archive,
  Volume2,
  VolumeX,
  FilePlus,
  FileMinus,
} from 'lucide-react';

export default function StudyEditorPage() {
  const {
    manuscript,
    setManuscript,
    addNewPageToManuscript,
    removePageFromManuscript,
    wordGoal,
    currentPaper,
    setPaper,
    currentPigment,
    currentFont,
    timeOfDay,
    setTimeOfDay,
    addArchiveEntry,
    sessionStartTime,
    startSession,
    duration,
    isWatchTicking,
    toggleWatchTicking,
  } = useStore();

  const [isExporting, setIsExporting] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [turnDirection, setTurnDirection] = useState('next'); // 'next' or 'prev'

  // Live Session Timer State
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Live Timer Counter Loop
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && sessionStartTime) {
      interval = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - sessionStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, sessionStartTime]);

  const formatTime = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const targetMinutes = {
    '30 Minutes': 30,
    '1 Hour': 60,
    '2 Hours': 120,
    'Until Finished': 180,
  }[duration] || 60;

  const remainingSeconds = Math.max(0, targetMinutes * 60 - elapsedSeconds);

  // Split manuscript by explicit page breaks or auto-chunks (~120 words per page)
  const pages = useMemo(() => {
    const rawChunks = manuscript.split('\n\n--- Page Break ---\n\n');
    const finalPages = [];

    rawChunks.forEach((chunk) => {
      const paragraphs = chunk.split('\n\n').filter((p) => p.trim());
      if (paragraphs.length === 0) {
        finalPages.push('');
        return;
      }

      let currentChunk = [];
      let currentWordCount = 0;

      paragraphs.forEach((p) => {
        const pWords = p.trim().split(/\s+/).length;
        if (currentWordCount + pWords > 120 && currentChunk.length > 0) {
          finalPages.push(currentChunk.join('\n\n'));
          currentChunk = [p];
          currentWordCount = pWords;
        } else {
          currentChunk.push(p);
          currentWordCount += pWords;
        }
      });

      if (currentChunk.length > 0) {
        finalPages.push(currentChunk.join('\n\n'));
      }
    });

    return finalPages.length > 0 ? finalPages : [''];
  }, [manuscript]);

  const totalPages = pages.length;

  useEffect(() => {
    if (activePageIndex >= totalPages) {
      setActivePageIndex(Math.max(0, totalPages - 1));
    }
  }, [totalPages, activePageIndex]);

  const wordCount = useMemo(() => {
    const trimmed = manuscript.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [manuscript]);

  const progressPercentage = Math.min(100, Math.round((wordCount / wordGoal) * 100));

  // High-Visibility Midnight Mode & Time Themes
  const timeOfDayThemes = {
    dawn: {
      outerBg: '#f4f1ea',
      vignetteClass: 'bg-radial from-blue-900/5 via-amber-900/5 to-slate-900/10',
      label: 'Dawn Morning Light',
    },
    midday: {
      outerBg: '#F4ECD8',
      vignetteClass: 'bg-radial from-transparent via-amber-900/5 to-black/20',
      label: 'Midday Cream Light',
    },
    dusk: {
      outerBg: '#eedec5',
      vignetteClass: 'bg-radial from-amber-500/10 via-orange-950/20 to-black/40',
      label: 'Dusk Golden Cast',
    },
    midnight: {
      outerBg: '#1e1814',
      vignetteClass: 'bg-radial from-amber-500/15 via-black/70 to-black/90',
      label: 'Midnight Candlelit (High Visibility)',
    },
  };

  const activeTimeTheme = timeOfDayThemes[timeOfDay] || timeOfDayThemes.midday;

  // Paper Styles Configuration
  const paperStyles = {
    parchment: {
      label: 'Parchment',
      outerBg: activeTimeTheme.outerBg,
      stack1Bg: timeOfDay === 'midnight' ? '#3a2e23' : '#eae2ce',
      stack2Bg: timeOfDay === 'midnight' ? '#44372b' : '#f0e8d4',
      textColor: timeOfDay === 'midnight' ? '#fff3d6' : currentPigment,
      style: {
        backgroundColor: timeOfDay === 'midnight' ? '#342a20' : '#fff9ee',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
      },
    },
    dotted: {
      label: 'Dotted',
      outerBg: activeTimeTheme.outerBg,
      stack1Bg: timeOfDay === 'midnight' ? '#3a2e23' : '#eae2ce',
      stack2Bg: timeOfDay === 'midnight' ? '#44372b' : '#f0e8d4',
      textColor: timeOfDay === 'midnight' ? '#fff3d6' : currentPigment,
      style: {
        backgroundColor: timeOfDay === 'midnight' ? '#33291f' : '#ffffff',
        backgroundImage: `radial-gradient(rgba(240, 216, 168, 0.35) 1.5px, transparent 1.5px)`,
        backgroundSize: '22px 22px',
      },
    },
    lined: {
      label: 'Lined',
      outerBg: activeTimeTheme.outerBg,
      stack1Bg: timeOfDay === 'midnight' ? '#3a2e23' : '#eae2ce',
      stack2Bg: timeOfDay === 'midnight' ? '#44372b' : '#f0e8d4',
      textColor: timeOfDay === 'midnight' ? '#fff3d6' : currentPigment,
      style: {
        backgroundColor: timeOfDay === 'midnight' ? '#352b21' : '#fffdf7',
        backgroundImage: `linear-gradient(to bottom, transparent 90%, rgba(240, 216, 168, 0.25) 100%)`,
        backgroundSize: '100% 32px',
      },
    },
    blank: {
      label: 'Blank',
      outerBg: activeTimeTheme.outerBg,
      stack1Bg: timeOfDay === 'midnight' ? '#3a2e23' : '#eae2ce',
      stack2Bg: timeOfDay === 'midnight' ? '#44372b' : '#f0e8d4',
      textColor: timeOfDay === 'midnight' ? '#fff3d6' : currentPigment,
      style: {
        backgroundColor: timeOfDay === 'midnight' ? '#342a20' : '#ffffff',
      },
    },
    pink: {
      label: 'Pastel Rose',
      outerBg: timeOfDay === 'midnight' ? '#2e1c23' : '#fbe8ee',
      stack1Bg: timeOfDay === 'midnight' ? '#422430' : '#f7d8e2',
      stack2Bg: timeOfDay === 'midnight' ? '#542d3d' : '#fae0e7',
      textColor: timeOfDay === 'midnight' ? '#ffe6ef' : currentPigment,
      style: {
        backgroundColor: timeOfDay === 'midnight' ? '#40222f' : '#fff0f4',
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)`,
      },
    },
  };

  const activePaperConfig = paperStyles[currentPaper] || paperStyles.parchment;

  // SAVE FIRST, THEN EXPORT TO PDF
  const handlePdfExportAndArchive = async () => {
    setIsExporting(true);
    // 1. Save first to Archives & Zustand state!
    addArchiveEntry();

    // 2. Export PDF with exact paper background color (Pastel Rose #fff0f4, Parchment #fff9ee, etc.)
    await exportManuscriptToPdf(
      'writing-canvas',
      'ambient_manuscript.pdf',
      activePaperConfig.style.backgroundColor || '#fff9ee'
    );

    setIsExporting(false);
  };

  const handlePageTextChange = (newText) => {
    const updatedPages = [...pages];
    updatedPages[activePageIndex] = newText;
    setManuscript(updatedPages.join('\n\n--- Page Break ---\n\n'));
  };

  const handleNextPage = () => {
    if (activePageIndex < totalPages - 1) {
      setTurnDirection('next');
      setActivePageIndex(activePageIndex + 1);
    } else {
      addNewPageToManuscript();
      setTurnDirection('next');
      setActivePageIndex(totalPages);
    }
  };

  const handlePrevPage = () => {
    if (activePageIndex > 0) {
      setTurnDirection('prev');
      setActivePageIndex(activePageIndex - 1);
    }
  };

  const handleAddPage = () => {
    addNewPageToManuscript();
    setTurnDirection('next');
    setActivePageIndex(totalPages);
  };

  const handleRemovePage = () => {
    if (totalPages <= 1) return;
    removePageFromManuscript(activePageIndex);
    if (activePageIndex > 0) {
      setTurnDirection('prev');
      setActivePageIndex(activePageIndex - 1);
    }
  };

  const fontClassMap = {
    'Caveat': 'font-writing-surface',
    'Homemade Apple': 'font-homemade-apple',
    'EB Garamond': 'font-display-md',
    'Playfair': 'font-playfair',
  };

  return (
    <div
      className="relative min-h-screen text-[#1f1c0f] py-8 px-4 md:px-margin-page overflow-x-hidden transition-colors duration-700"
      style={{ backgroundColor: activePaperConfig.outerBg }}
    >
      {/* Time of Day Lighting Overlay */}
      <div className={`fixed inset-0 pointer-events-none z-30 transition-all duration-700 ${activeTimeTheme.vignetteClass}`} />

      {/* CENTERED CONTROL TOOLBAR */}
      <header className="max-w-5xl mx-auto flex flex-col items-center justify-center mb-6 gap-3 relative z-40 text-center">
        {/* Title */}
        <div className="flex items-center gap-2">
          <Feather size={24} className={timeOfDay === 'midnight' ? 'text-[#f0d8a8]' : 'text-[#400a0c]'} />
          <h1 className={`font-display-md text-3xl md:text-4xl italic font-bold ${timeOfDay === 'midnight' ? 'text-[#fff3d6]' : 'text-[#400a0c]'}`}>
            Ambient Writing Room
          </h1>
        </div>

        {/* PROMINENT CENTERED LIVE SESSION TIMER WIDGET */}
        <div className={`flex flex-wrap items-center justify-center gap-3 px-5 py-2 rounded-full border shadow-md transition-all ${
          timeOfDay === 'midnight'
            ? 'bg-[#342a20] border-amber-400/50 text-[#fff3d6]'
            : 'bg-surface/90 border-brass/60 text-[#400a0c]'
        }`}>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-amber-500 animate-pulse" />
            <span className="font-mono text-base font-bold tracking-wider">
              {formatTime(elapsedSeconds)}
            </span>
            <span className="text-xs opacity-75 font-label-sm">
              ({formatTime(remainingSeconds)} remaining)
            </span>
          </div>

          <div className="flex items-center gap-2 border-l border-current/20 pl-3">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1.5 rounded-full hover:bg-black/10 transition-transform active:scale-95 flex items-center gap-1 text-xs font-bold"
              title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
            >
              {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
              <span>{isTimerRunning ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={startSession}
              className="p-1.5 rounded-full hover:bg-black/10 transition-transform active:scale-95 text-xs flex items-center gap-1"
              title="Reset Timer"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>

            <button
              onClick={toggleWatchTicking}
              className={`p-1.5 rounded-full border text-xs font-label-sm transition-all flex items-center gap-1 ${
                isWatchTicking
                  ? 'bg-amber-600 text-white border-transparent font-bold'
                  : 'border-current/30 text-current/70 hover:text-current'
              }`}
              title={isWatchTicking ? 'Mute Pocket Watch Tick Sound' : 'Enable Pocket Watch Tick Sound'}
            >
              {isWatchTicking ? <Volume2 size={12} /> : <VolumeX size={12} />}
              <span>{isWatchTicking ? 'Tick ON' : 'Tick OFF'}</span>
            </button>
          </div>
        </div>

        {/* CENTERED CONTROL TABS */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full mt-1">
          {/* Lighting Selector */}
          <div className="flex items-center gap-1 bg-surface-container/70 p-1 rounded-full border border-outline-variant/30">
            {[
              { id: 'dawn', icon: Sun, label: 'Dawn' },
              { id: 'midday', icon: Sun, label: 'Midday' },
              { id: 'dusk', icon: Sunset, label: 'Dusk' },
              { id: 'midnight', icon: Moon, label: 'Midnight' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setTimeOfDay(id)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-label-sm transition-all ${
                  timeOfDay === id
                    ? 'bg-[#400a0c] text-white shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-[#400a0c]'
                }`}
                title={`Switch to ${label} Lighting & Ambience`}
              >
                <Icon size={12} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Paper Canvas Selector */}
          <div className="flex items-center gap-1 bg-surface-container/70 p-1 rounded-full border border-outline-variant/30">
            {Object.entries(paperStyles).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setPaper(key)}
                className={`px-3 py-1 rounded-full text-xs font-label-sm transition-all ${
                  currentPaper === key
                    ? 'bg-[#400a0c] text-white shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-[#400a0c]'
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>

          {/* Add Page Button */}
          <button
            onClick={handleAddPage}
            className="px-3.5 py-1 rounded-full text-xs font-label-sm bg-emerald-900 text-white hover:bg-emerald-800 transition-all flex items-center gap-1.5 shadow-sm font-bold"
            title="Add a new blank page to the notebook stack"
          >
            <FilePlus size={14} />
            <span>+ Add Page</span>
          </button>

          {/* Remove Page Button */}
          {totalPages > 1 && (
            <button
              onClick={handleRemovePage}
              className="px-3 py-1 rounded-full text-xs font-label-sm bg-rose-900/90 text-white hover:bg-rose-800 transition-all flex items-center gap-1.5 shadow-sm font-bold"
              title="Delete the current page from the notebook stack"
            >
              <FileMinus size={14} />
              <span>- Remove Page</span>
            </button>
          )}

          {/* Save PDF Action Button (Saves to Archives first, then exports PDF) */}
          <button
            onClick={handlePdfExportAndArchive}
            disabled={isExporting}
            className="px-4 py-1 rounded-full text-xs font-label-sm bg-[#400a0c] text-white hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50 font-bold"
            title="Save to Archives first, then download PDF"
          >
            <Archive size={14} />
            <span>{isExporting ? 'Saving & Exporting...' : 'Save PDF'}</span>
          </button>
        </div>
      </header>

      {/* Skeuomorphic Desk Companions */}
      <DeskCompanions />

      {/* ENLARGED NOTEBOOK DESK CANVAS */}
      <main className="relative z-10 w-full max-w-4xl mx-auto mb-28 flex flex-col items-center" style={{ perspective: '1400px' }}>
        <div className="relative w-full">
          {/* Background Stacked Sheet 1 */}
          <div
            className="absolute inset-0 rounded-sm shadow-sm transform -rotate-1 translate-x-2 translate-y-2 border border-outline-variant/30 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: activePaperConfig.stack1Bg }}
          />
          {/* Background Stacked Sheet 2 */}
          <div
            className="absolute inset-0 rounded-sm shadow-sm transform rotate-1 -translate-x-2 -translate-y-1.5 border border-outline-variant/30 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: activePaperConfig.stack2Bg }}
          />

          {/* Active Dynamic Paper Surface */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentPaper}-${activePageIndex}-${timeOfDay}`}
              initial={{
                opacity: 0.2,
                rotateY: turnDirection === 'next' ? 75 : -75,
                scale: 0.95,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
              }}
              animate={{
                opacity: 1,
                rotateY: 0,
                scale: 1,
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.25)',
              }}
              exit={{
                opacity: 0.2,
                rotateY: turnDirection === 'next' ? -75 : 75,
                scale: 0.95,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
              }}
              transition={{
                duration: 0.45,
                ease: [0.25, 1, 0.5, 1],
              }}
              style={{
                ...activePaperConfig.style,
                transformOrigin: turnDirection === 'next' ? 'left center' : 'right center',
                transformStyle: 'preserve-3d',
              }}
              className="relative rounded-sm p-8 md:p-14 min-h-[750px] flex flex-col border border-outline-variant/40 deckled-edge transition-all duration-500"
            >
              {/* Left Margin Touch Zone */}
              {activePageIndex > 0 && (
                <div
                  onClick={handlePrevPage}
                  className="absolute left-0 top-0 bottom-0 w-16 group z-20 cursor-pointer flex items-center justify-start pl-2 hover:bg-gradient-to-r hover:from-black/10 hover:to-transparent transition-colors rounded-l-sm"
                  title="Click Left Side to Turn to Previous Page"
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[11px] px-2 py-1 rounded-r-md font-label-sm shadow-md flex items-center gap-1">
                    <ArrowLeft size={12} />
                    <span>Page {activePageIndex}</span>
                  </div>
                </div>
              )}

              {/* Right Margin Touch Zone */}
              <div
                onClick={handleNextPage}
                className="absolute right-0 top-0 bottom-0 w-16 group z-20 cursor-pointer flex items-center justify-end pr-2 hover:bg-gradient-to-l hover:from-black/10 hover:to-transparent transition-colors rounded-r-sm"
                title={activePageIndex < totalPages - 1 ? `Click Right Side to Turn to Page ${activePageIndex + 2}` : 'Click Right Side to Add & Turn to New Page'}
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[11px] px-2 py-1 rounded-l-md font-label-sm shadow-md flex items-center gap-1">
                  <span>{activePageIndex < totalPages - 1 ? `Page ${activePageIndex + 2}` : '+ New Page'}</span>
                  <ArrowRight size={12} />
                </div>
              </div>

              {/* Canvas Textarea Area (with whitespace-pre-wrap for 100% line break rendering!) */}
              <div id="writing-canvas" className="flex-grow flex flex-col relative z-10" style={{ backgroundColor: activePaperConfig.style.backgroundColor }}>
                <textarea
                  value={pages[activePageIndex] || ''}
                  onChange={(e) => handlePageTextChange(e.target.value)}
                  style={{ color: activePaperConfig.textColor }}
                  className={`w-full flex-grow bg-transparent border-none resize-none focus:outline-none focus:ring-0 ${
                    fontClassMap[currentFont] || 'font-writing-surface'
                  } text-2xl md:text-3xl leading-relaxed whitespace-pre-wrap selection:bg-amber-900/20`}
                  placeholder="Begin writing your manuscript here..."
                  spellCheck="false"
                />

                {/* Clean SVG Watermark */}
                <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none text-[#400a0c]">
                  <BookOpen size={95} />
                </div>
              </div>

              {/* Notebook Footer Controls */}
              <div className="mt-8 flex justify-between items-end border-t border-outline-variant/30 pt-4 relative z-10">
                <div className={`flex items-center gap-3 ${timeOfDay === 'midnight' ? 'text-amber-200' : 'text-on-surface-variant'}`}>
                  <button
                    onClick={handlePrevPage}
                    disabled={activePageIndex === 0}
                    className="hover:text-[#400a0c] transition-colors p-1.5 rounded-full hover:bg-black/5 disabled:opacity-30 flex items-center gap-1 font-label-sm text-xs"
                    title="Previous Page"
                  >
                    <ArrowLeft size={16} />
                    <span>Prev</span>
                  </button>

                  <span className="font-label-sm text-xs font-bold tracking-wider px-2 py-0.5 bg-black/5 rounded-full">
                    Page {activePageIndex + 1} of {totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    className="hover:text-[#400a0c] transition-colors p-1.5 rounded-full hover:bg-black/5 flex items-center gap-1 font-label-sm text-xs font-bold"
                    title={activePageIndex < totalPages - 1 ? 'Next Page' : 'Add New Page'}
                  >
                    <span>{activePageIndex < totalPages - 1 ? 'Next' : '+ Page'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`transition-colors p-1.5 ${
                    isBookmarked ? 'text-[#400a0c]' : 'text-on-surface-variant/40 hover:text-[#400a0c]'
                  }`}
                  title={isBookmarked ? 'Bookmarked' : 'Add Bookmark'}
                >
                  <Bookmark size={20} fill={isBookmarked ? '#400a0c' : 'none'} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Brass Goal Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-3 bg-black/20 z-40 border-t border-brass/40">
        <div
          className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-[#400a0c] transition-all duration-300 relative"
          style={{ width: `${progressPercentage}%` }}
        >
          {progressPercentage > 0 && (
            <div className="absolute right-0 -top-2 text-[#400a0c] transform translate-x-1/2">
              <Flame size={16} fill="#400a0c" />
            </div>
          )}
        </div>
      </div>

      {/* Minimal Word Count Indicator */}
      <div className="fixed bottom-6 right-6 z-40 font-display-md text-xs text-[#1f1c0f]/80 bg-surface/90 px-3.5 py-1.5 rounded-full border border-brass/40 backdrop-blur-sm flex items-center gap-2 shadow-sm font-bold">
        <Sparkles size={14} className="text-[#c9a24b]" />
        <span>
          {wordCount} / {wordGoal} words ({progressPercentage}%)
        </span>
      </div>
    </div>
  );
}
