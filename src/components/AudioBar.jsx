'use client';

import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { soundEngine } from '../lib/audioEngine';
import { Volume2, VolumeX, Flame, CloudRain, Coffee, Book, Trees, Music, Guitar, Disc } from 'lucide-react';

export default function AudioBar() {
  const { ambientVolumes, setAmbientVolume, isAudioMuted, toggleAudioMute } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Sync volumes with Web Audio API sound engine
    Object.entries(ambientVolumes).forEach(([type, vol]) => {
      soundEngine.setVolume(type, isAudioMuted ? 0 : vol);
    });
  }, [ambientVolumes, isAudioMuted]);

  const soundConfigs = [
    { key: 'rain', label: 'Rain', icon: CloudRain, color: 'text-blue-700' },
    { key: 'cafe', label: 'Café Chatter', icon: Coffee, color: 'text-amber-800' },
    { key: 'library', label: 'Library Hush', icon: Book, color: 'text-emerald-800' },
    { key: 'fireplace', label: 'Hearth Fire', icon: Flame, color: 'text-orange-700' },
    { key: 'forest', label: 'Forest Wind', icon: Trees, color: 'text-green-800' },
    { key: 'musicBox', label: 'Music Box Tune', icon: Music, color: 'text-purple-800' },
    { key: 'guitar', label: 'Acoustic Guitar', icon: Guitar, color: 'text-amber-700' },
    { key: 'piano', label: 'Grand Piano', icon: Disc, color: 'text-[#400a0c]' },
  ];

  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-2 font-label-sm">
      {/* Expanded Audio Mixer Panel */}
      {isOpen && (
        <div className="bg-surface-container/95 backdrop-blur-md p-4 rounded-xl border border-brass/40 shadow-lg w-80 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 max-h-[420px] overflow-y-auto">
          <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
            <span className="text-xs uppercase tracking-wider text-primary font-bold">Procedural Audio Synthesizer</span>
            <button
              onClick={toggleAudioMute}
              className="text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
            >
              {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              {isAudioMuted ? 'Unmute' : 'Mute All'}
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {soundConfigs.map(({ key, label, icon: Icon, color }) => (
              <div key={key} className="flex items-center gap-3">
                <Icon size={16} className={`${color} shrink-0`} />
                <div className="flex-1">
                  <div className="flex justify-between text-[11px] text-on-surface-variant mb-0.5">
                    <span>{label}</span>
                    <span>{ambientVolumes[key]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={ambientVolumes[key]}
                    onChange={(e) => setAmbientVolume(key, Number(e.target.value))}
                    className="w-full h-1.5 bg-outline-variant/30 rounded-lg appearance-none cursor-pointer accent-[#400a0c]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#400a0c] text-white px-3.5 py-2 rounded-full shadow-md hover:bg-primary-container transition-transform active:scale-95 border border-brass/50 font-bold"
      >
        {isAudioMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <span className="text-xs">Procedural Ambience</span>
      </button>
    </div>
  );
}
