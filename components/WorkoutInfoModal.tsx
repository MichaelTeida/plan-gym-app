'use client';

import React, { useEffect } from 'react';
import { X, Info, CheckCircle2, AlertTriangle, ShieldAlert, Lightbulb } from 'lucide-react';

interface WorkoutInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkoutInfoModal({ isOpen, onClose }: WorkoutInfoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-300/80 dark:border-neutral-800 p-5 sm:p-6 shadow-2xl transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-800 dark:text-neutral-200">
              <Info className="w-4 h-4" />
            </div>
            <h2
              id="info-dialog-title"
              className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white"
            >
              O treningu & uwagi
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij"
            className="w-8 h-8 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Sections */}
        <div className="py-4 space-y-4 text-xs sm:text-sm">
          {/* Główne zasady programu */}
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/60">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Główne zasady programu</span>
            </div>
            <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-300 pl-6 list-disc list-outside leading-relaxed">
              <li>Trening całego ciała 3x w tygodniu</li>
              <li>Równowaga ruchów push (pchanie) i pull (ciągnięcie)</li>
              <li>Elastyczny dobór wariantów pod swój sprzęt i budowę</li>
              <li>Ćwiczenia akcesoryjne wzmacniające słabe punkty</li>
            </ul>
          </div>

          {/* Najczęstsze błędy */}
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/60">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
              <span>Najczęstsze błędy</span>
            </div>
            <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-300 pl-6 list-disc list-outside leading-relaxed">
              <li>Zwiększanie ciężaru kosztem prawidłowej techniki</li>
              <li>Pomijanie rozgrzewki przed seriami roboczymi</li>
              <li>Dodawanie własnych ćwiczeń do gotowej, zbalansowanej struktury</li>
              <li>Zbyt szybkie podnoszenie obciążenia z treningu na trening</li>
            </ul>
          </div>

          {/* Przeciwwskazania */}
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/60">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white mb-2">
              <ShieldAlert className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />
              <span>Przeciwwskazania i ostrożność</span>
            </div>
            <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-300 pl-6 list-disc list-outside leading-relaxed">
              <li>Brak opanowanej techniki podstawowych ruchów (zacznij od mniejszych obciążeń)</li>
              <li>Przeciążenie innymi intensywnymi aktywnościami fizycznymi</li>
              <li>Niedostateczna regeneracja i chroniczny brak snu</li>
              <li>Ograniczona mobilność bioder, barków lub tułowia (core)</li>
            </ul>
          </div>

          {/* Kluczowe wnioski */}
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/60">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white mb-2">
              <Lightbulb className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>Kluczowe wnioski</span>
            </div>
            <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-300 pl-6 list-disc list-outside leading-relaxed">
              <li>Prosty schemat oparty na sprawdzonych ćwiczeniach wielostawowych</li>
              <li>Progresja liniowa (dokładanie ciężaru co trening) działa tylko na początku — potem priorytetem jest jakość i systematyczność</li>
            </ul>
          </div>
        </div>

        {/* Footer close button */}
        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-3 rounded-xl font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition shadow-xs text-xs sm:text-sm"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}
