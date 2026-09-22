'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, X } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  routineTitle: string;
}

export function CelebrationModal({ isOpen, onClose, routineTitle }: CelebrationModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Trigger confetti celebration bursts
    const end = Date.now() + 1500;
    const colors = ['#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Sound fanfare using Web Audio API (subtle, non-intrusive triumph chord)
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const now = ctx.currentTime;
        // Triad notes: C5, E5, G5, C6
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.001, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.1 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.65);
        });
      }
    } catch {}

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-7 shadow-2xl text-center relative overflow-hidden transition-all scale-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/15 dark:bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Zamknij"
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Trophy Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 shadow-xs">
          <Trophy className="w-8 h-8 stroke-[2.2]" />
        </div>

        {/* Title & Message */}
        <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white mb-1.5 tracking-tight">
          Trening ukończony! 🎉
        </h3>
        <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 mb-2">
          Wszystkie serie w {routineTitle} odhaczone na 100%!
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-6 leading-relaxed">
          Znakomita robota. Czas na regenerację i uzupełnienie energii. Do zobaczenia na kolejnej sesji!
        </p>

        {/* Confirm Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 px-5 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold text-sm hover:opacity-90 active:scale-98 transition flex items-center justify-center gap-2 shadow-sm"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Dziękuję, zrobione!</span>
        </button>
      </div>
    </div>
  );
}
