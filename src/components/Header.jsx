'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Library, Archive, Feather, Flame, Sparkles, BookMarked } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Header() {
  const pathname = usePathname();
  const { isAudioMuted, toggleAudioMute } = useStore();

  const navLinks = [
    { href: '/', label: 'Setup Ritual', icon: Sparkles },
    { href: '/editor', label: 'Study Editor', icon: Feather },
    { href: '/study', label: 'Chronicles', icon: Flame },
    { href: '/folio', label: 'Journal Entries', icon: BookMarked },
    { href: '/inkwell', label: 'Inkwell', icon: Library },
    { href: '/archives', label: 'Archives', icon: Archive },
    { href: '/mood', label: 'Mood Check-in', icon: BookOpen },
  ];

  return (
    <header className="w-full z-40 bg-surface/80 backdrop-blur-md border-b-2 border-brass/40 shadow-sm sticky top-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-margin-page py-3 flex justify-between items-center">
        {/* Title */}
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex flex-col">
            <span className="font-display-md text-2xl md:text-3xl italic text-[#400a0c] tracking-tight group-hover:opacity-80 transition-opacity">
              Ambient Writing Room
            </span>
            <span className="h-px w-24 bg-brass/60 mt-0.5" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface-container/60 p-1.5 rounded-full border border-outline-variant/30">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-label-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#400a0c] text-white shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-[#400a0c] hover:bg-surface-variant/40'
                }`}
              >
                <Icon size={14} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions & Profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAudioMute}
            className={`px-3 py-1.5 rounded-full border text-xs font-label-sm transition-all flex items-center gap-1.5 ${
              isAudioMuted
                ? 'border-outline/30 text-outline'
                : 'border-brass/60 text-[#400a0c] bg-brass/10 font-bold'
            }`}
            title={isAudioMuted ? 'Unmute Ambience' : 'Mute Ambience'}
          >
            <span>{isAudioMuted ? '🔇 Muted' : '🔊 Sound On'}</span>
          </button>

          {/* Profile Wax Seal Avatar */}
          <div className="w-9 h-9 rounded-full border-2 border-brass/60 overflow-hidden shadow-sm p-0.5 bg-primary-container">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs0j21jH-1gBncQI3VXaP8D89qc0Bg3m0DEVxTwD4dLMsuSqSYHUnE6MBhqpc-vLhvdIldZMJopwk1uvra-uaQ2RXdszhueN0_fLn8j2uyHsbckutgMIkVjSx8F0XZqvTvx0m2yYAy33UGKmY-YUtj8rgi0kGg8M2JnYPGjkRVNKYdzNd62yNmM70SPC1NOxDQ4FxLfmUeqO0wF6lWT4xTMU7M6uI2EaoAswRmwOnXA_3hKWyKVik"
              alt="Wax seal insignia profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 bg-surface-container-low border-t border-outline-variant/20 no-scrollbar">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-label-sm whitespace-nowrap transition-colors ${
                isActive ? 'bg-[#400a0c] text-white font-bold' : 'text-on-surface-variant hover:bg-surface-variant/40'
              }`}
            >
              <Icon size={12} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
