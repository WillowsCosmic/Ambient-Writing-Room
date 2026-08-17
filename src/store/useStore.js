import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Helper to compute actual days of the week for the past 7 days ending today
const getActualPast7Days = () => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push({
      day: i === 0 ? 'Today' : dayNames[d.getDay()],
      score: i === 0 ? 85 : Math.floor(40 + Math.random() * 50),
      mood: i === 0 ? 'Inspired' : 'Peaceful',
    });
  }
  return days;
};

export const useStore = create(
  persist(
    (set, get) => ({
      // Multi-Author Privacy State
      authors: [
        {
          id: 'author_default',
          name: 'Primary Author',
          pin: null, // optional 4-digit passcode
          createdAt: Date.now(),
        },
      ],
      activeAuthorId: 'author_default',
      authorVaults: {
        author_default: {
          manuscript: `The autumn leaves tumbled past the study window, carrying with them the scent of woodsmoke and damp earth. I pulled my shawl tighter around my shoulders, adjusting the brass wick-trimmer beside my inkwell.`,
          historyEntries: [],
          journalEntries: [],
          streakDays: 0,
          lastWritingDate: null,
          latestReflection: null,
          moodLog: getActualPast7Days(),
        },
      },

      // Active Session State
      manuscript: `The autumn leaves tumbled past the study window, carrying with them the scent of woodsmoke and damp earth. I pulled my shawl tighter around my shoulders, adjusting the brass wick-trimmer beside my inkwell.`,
      wordGoal: 1000,
      currentPaper: 'parchment', // lined, dotted, blank, parchment, pink
      currentFont: 'Caveat', // Caveat, Homemade Apple, EB Garamond, Playfair
      currentPigment: '#400a0c', // Burgundy, Forest Green (#3a4b3a), Iron Gall Ink (#1a1a1a), Sepia (#3d2b1f)
      
      // Setup Ritual State
      timeOfDay: 'midday', // dawn, midday, dusk, midnight
      intention: 'Prepare your tools. Settle the mind.',
      duration: '1 Hour', // 30 Minutes, 1 Hour, 2 Hours, Until Finished
      sessionStartTime: Date.now(),
      deskCompanions: { candle: true, tea: true, plant: true, watch: true },
      
      // Pocket Watch Ticking Sound: OFF by default
      isWatchTicking: false,

      // Procedural Audio Synthesizer Volumes (0-100)
      ambientVolumes: {
        rain: 20,
        cafe: 0,
        library: 30,
        fireplace: 10,
        forest: 15,
        musicBox: 20,
        ticking: 0,
        guitar: 35,
        piano: 40,
      },
      isAudioMuted: false,

      // Real User Streak Data
      lastWritingDate: null,
      streakDays: 0,
      latestReflection: null,

      // Dynamic Real User Session Archives (Private to active author)
      historyEntries: [],

      // Sealed Journal Entries from Mood Store (Private to active author)
      journalEntries: [],

      // Mood Log with Dynamic Actual Days of Week
      moodLog: getActualPast7Days(),

      // Privacy & Author Actions
      getActiveAuthor: () => {
        const authors = get().authors || [];
        const activeId = get().activeAuthorId || 'author_default';
        return authors.find((a) => a.id === activeId) || authors[0] || { id: 'author_default', name: 'Primary Author' };
      },

      createAuthorProfile: ({ name, pin }) => {
        const trimmedName = name.trim() || 'Anonymous Author';
        const newAuthorId = `author_${Date.now()}`;
        const newAuthor = {
          id: newAuthorId,
          name: trimmedName,
          pin: pin || null,
          createdAt: Date.now(),
        };

        const defaultManuscript = `A fresh parchment in ${trimmedName}'s private vault. Write your musings in quiet solitude...`;

        const newVault = {
          manuscript: defaultManuscript,
          historyEntries: [],
          journalEntries: [],
          streakDays: 0,
          lastWritingDate: null,
          latestReflection: null,
          moodLog: getActualPast7Days(),
        };

        // Save current active author's vault before switching
        const currentActiveId = get().activeAuthorId;
        const currentVaults = { ...get().authorVaults };
        currentVaults[currentActiveId] = {
          manuscript: get().manuscript,
          historyEntries: get().historyEntries,
          journalEntries: get().journalEntries,
          streakDays: get().streakDays,
          lastWritingDate: get().lastWritingDate,
          latestReflection: get().latestReflection,
          moodLog: get().moodLog,
        };

        currentVaults[newAuthorId] = newVault;

        set({
          authors: [...(get().authors || []), newAuthor],
          authorVaults: currentVaults,
          activeAuthorId: newAuthorId,
          manuscript: newVault.manuscript,
          historyEntries: newVault.historyEntries,
          journalEntries: newVault.journalEntries,
          streakDays: newVault.streakDays,
          lastWritingDate: newVault.lastWritingDate,
          latestReflection: newVault.latestReflection,
          moodLog: newVault.moodLog,
        });

        return newAuthor;
      },

      switchAuthorProfile: (targetAuthorId, enteredPin) => {
        const targetAuthor = (get().authors || []).find((a) => a.id === targetAuthorId);
        if (!targetAuthor) return { success: false, error: 'Author profile not found' };

        // Verify PIN if set
        if (targetAuthor.pin && targetAuthor.pin !== enteredPin) {
          return { success: false, error: 'Incorrect Passcode PIN' };
        }

        const currentActiveId = get().activeAuthorId;
        const currentVaults = { ...get().authorVaults };

        // Save active state into current vault
        currentVaults[currentActiveId] = {
          manuscript: get().manuscript,
          historyEntries: get().historyEntries,
          journalEntries: get().journalEntries,
          streakDays: get().streakDays,
          lastWritingDate: get().lastWritingDate,
          latestReflection: get().latestReflection,
          moodLog: get().moodLog,
        };

        const targetVault = currentVaults[targetAuthorId] || {
          manuscript: `Welcome back to your private sanctuary, ${targetAuthor.name}.`,
          historyEntries: [],
          journalEntries: [],
          streakDays: 0,
          lastWritingDate: null,
          latestReflection: null,
          moodLog: getActualPast7Days(),
        };

        set({
          authorVaults: currentVaults,
          activeAuthorId: targetAuthorId,
          manuscript: targetVault.manuscript || '',
          historyEntries: targetVault.historyEntries || [],
          journalEntries: targetVault.journalEntries || [],
          streakDays: targetVault.streakDays || 0,
          lastWritingDate: targetVault.lastWritingDate || null,
          latestReflection: targetVault.latestReflection || null,
          moodLog: targetVault.moodLog || getActualPast7Days(),
        });

        return { success: true };
      },

      setAuthorPin: (authorId, newPin) => {
        const authors = (get().authors || []).map((a) =>
          a.id === authorId ? { ...a, pin: newPin || null } : a
        );
        set({ authors });
      },

      deleteAuthorProfile: (authorId) => {
        const authors = get().authors || [];
        if (authors.length <= 1) return false;

        const updatedAuthors = authors.filter((a) => a.id !== authorId);
        const currentVaults = { ...get().authorVaults };
        delete currentVaults[authorId];

        set({ authors: updatedAuthors, authorVaults: currentVaults });

        // If deleted author was active, switch to first available author
        if (get().activeAuthorId === authorId) {
          get().switchAuthorProfile(updatedAuthors[0].id, updatedAuthors[0].pin);
        }
        return true;
      },

      // Actions
      setManuscript: (text) => {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const excerpt = text.slice(0, 140) + (text.length > 140 ? '...' : '');

        const today = new Date().toISOString().split('T')[0];
        const lastDate = get().lastWritingDate;
        let newStreak = get().streakDays;

        if (words > 0 && lastDate !== today) {
          newStreak = newStreak === 0 ? 1 : newStreak + 1;
        }

        const activeId = get().activeAuthorId;
        const currentVaults = { ...get().authorVaults };
        if (currentVaults[activeId]) {
          currentVaults[activeId].manuscript = text;
          currentVaults[activeId].lastWritingDate = today;
          currentVaults[activeId].streakDays = newStreak;
        }

        set({
          manuscript: text,
          lastWritingDate: today,
          streakDays: newStreak,
          authorVaults: currentVaults,
          latestReflection: {
            title: text.split('\n')[0] || 'Active Manuscript',
            excerpt: excerpt || 'Quiet solitude of the writing room...',
            date: 'Just Now',
            wordCount: words,
          },
        });
      },

      // Add a new blank page to the manuscript
      addNewPageToManuscript: () => {
        const currentText = get().manuscript;
        const updatedText = currentText + '\n\n--- Page Break ---\n\n';
        get().setManuscript(updatedText);
      },

      // Remove a specific page from manuscript
      removePageFromManuscript: (pageIndex) => {
        const currentText = get().manuscript;
        const chunks = currentText.split('\n\n--- Page Break ---\n\n');
        if (chunks.length <= 1) return;

        chunks.splice(pageIndex, 1);
        get().setManuscript(chunks.join('\n\n--- Page Break ---\n\n'));
      },

      // DEDUPLICATED Archive Entry Handler (Saves EXACTLY 1 time!)
      addArchiveEntry: (customEntry) => {
        const text = get().manuscript;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const title = customEntry?.title || text.split('\n')[0] || 'Untitled Manuscript';
        const excerpt = customEntry?.excerpt || text.slice(0, 140) + '...';

        const existingEntries = get().historyEntries;
        const lastEntry = existingEntries[0];

        // Strict 10-second debounce check to prevent duplicate double/triple saves
        if (
          lastEntry &&
          lastEntry.title === title &&
          lastEntry.excerpt === excerpt &&
          Date.now() - (lastEntry.timestamp || 0) < 10000
        ) {
          console.warn('Duplicate archive entry ignored.');
          return;
        }

        const newEntry = {
          id: `h_${Date.now()}`,
          authorId: get().activeAuthorId,
          timestamp: Date.now(),
          date: 'Just Now',
          month: 'Active Session',
          title,
          excerpt,
          wordCount: words,
          duration: get().duration,
          paper: get().currentPaper,
          pigment: get().currentPigment,
          isPdfAvailable: true,
          content: text,
        };

        const updatedEntries = [newEntry, ...existingEntries];
        const activeId = get().activeAuthorId;
        const currentVaults = { ...get().authorVaults };
        if (currentVaults[activeId]) {
          currentVaults[activeId].historyEntries = updatedEntries;
        }

        set({
          historyEntries: updatedEntries,
          authorVaults: currentVaults,
        });
      },

      setWordGoal: (goal) => set({ wordGoal: goal }),
      setPaper: (paper) => set({ currentPaper: paper }),
      setFont: (font) => set({ currentFont: font }),
      setPigment: (pigment) => set({ currentPigment: pigment }),
      
      setTimeOfDay: (time) => {
        const defaults = {
          dawn: { forest: 45, guitar: 35, rain: 20, piano: 15, cafe: 0, library: 0, fireplace: 0 },
          midday: { cafe: 40, library: 30, piano: 30, guitar: 20, rain: 0, forest: 10, fireplace: 0 },
          dusk: { fireplace: 50, guitar: 40, musicBox: 30, piano: 20, rain: 25, forest: 0, cafe: 0 },
          midnight: { fireplace: 75, piano: 50, library: 40, musicBox: 30, guitar: 20, rain: 0, cafe: 0 },
        };

        const smartAmbience = defaults[time] || defaults.midday;

        set((state) => ({
          timeOfDay: time,
          ambientVolumes: {
            ...state.ambientVolumes,
            ...smartAmbience,
          },
        }));
      },

      setIntention: (intention) => set({ intention }),
      setDuration: (duration) => set({ duration, sessionStartTime: Date.now() }),
      startSession: () => set({ sessionStartTime: Date.now() }),

      toggleCompanion: (companion) =>
        set((state) => ({
          deskCompanions: {
            ...state.deskCompanions,
            [companion]: !state.deskCompanions[companion],
          },
        })),

      toggleWatchTicking: () =>
        set((state) => ({
          isWatchTicking: !state.isWatchTicking,
          ambientVolumes: {
            ...state.ambientVolumes,
            ticking: !state.isWatchTicking ? 30 : 0,
          },
        })),

      setAmbientVolume: (type, value) =>
        set((state) => ({
          ambientVolumes: {
            ...state.ambientVolumes,
            [type]: value,
          },
        })),

      toggleAudioMute: () => set((state) => ({ isAudioMuted: !state.isAudioMuted })),

      // Sealed Journal Entry Handler
      addMoodEntry: (entry) => {
        const words = get().manuscript.trim() ? get().manuscript.trim().split(/\s+/).length : 0;
        const noteText = entry.note || `Reflected on feeling ${entry.mood.toLowerCase()} during this session.`;

        const existingEntries = get().journalEntries;
        const lastEntry = existingEntries[0];
        if (lastEntry && lastEntry.mood === entry.mood && lastEntry.note === noteText && Date.now() - (lastEntry.timestamp || 0) < 5000) {
          console.warn('Duplicate mood entry ignored');
          return;
        }

        const newJournalItem = {
          id: `j_${Date.now()}`,
          authorId: get().activeAuthorId,
          timestamp: Date.now(),
          date: 'Just Now',
          mood: entry.mood,
          score: entry.score,
          note: noteText,
          wordCount: words,
        };

        const currentLog = get().moodLog;
        const updatedLog = [...currentLog.slice(1), { day: 'Today', score: entry.score, mood: entry.mood }];
        const updatedJournalEntries = [newJournalItem, ...existingEntries];

        const activeId = get().activeAuthorId;
        const currentVaults = { ...get().authorVaults };
        if (currentVaults[activeId]) {
          currentVaults[activeId].journalEntries = updatedJournalEntries;
          currentVaults[activeId].moodLog = updatedLog;
        }

        set({
          journalEntries: updatedJournalEntries,
          moodLog: updatedLog,
          authorVaults: currentVaults,
          latestReflection: {
            title: `Journal Reflection (${entry.mood})`,
            excerpt: newJournalItem.note,
            date: 'Just Now',
            wordCount: words,
          },
        });
      },

      incrementStreak: () => set((state) => ({ streakDays: state.streakDays + 1 })),
      resetStreakToZero: () => set({ streakDays: 0 }),
      clearArchives: () => {
        const activeId = get().activeAuthorId;
        const currentVaults = { ...get().authorVaults };
        if (currentVaults[activeId]) {
          currentVaults[activeId].historyEntries = [];
        }
        set({ historyEntries: [], authorVaults: currentVaults });
      },
    }),
    {
      name: 'stitch-ambient-writing-room-store-v8', // Incremented to v8 for clean private author structure
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : null)),
    }
  )
);
