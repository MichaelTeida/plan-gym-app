import React, { useEffect, useState } from 'react';
import { X, Sun, Moon, RotateCcw, Check, Plus, Minus, Copy } from 'lucide-react';
import type { AppSettings } from '@/lib/storage-store';
import { getNotepadWorkoutSummary } from '@/lib/workout-data';

export type { AppSettings };

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onResetSets: () => void;
}

const MIN_FONT_SIZE = 90;
const MAX_FONT_SIZE = 150;
const FONT_STEP = 5;

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSets
}: SettingsModalProps) {
  const [resetSuccess, setResetSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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

  const currentFontSize = settings.fontSizePercent || 115;

  const handleDecreaseFont = () => {
    if (currentFontSize > MIN_FONT_SIZE) {
      onUpdateSettings({ fontSizePercent: currentFontSize - FONT_STEP });
    }
  };

  const handleIncreaseFont = () => {
    if (currentFontSize < MAX_FONT_SIZE) {
      onUpdateSettings({ fontSizePercent: currentFontSize + FONT_STEP });
    }
  };

  const handleReset = () => {
    onResetSets();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2000);
  };

  const handleCopyPlan = async () => {
    try {
      const summaryText = getNotepadWorkoutSummary();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summaryText);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = summaryText;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch {}
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 shadow-2xl transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <h2
            id="settings-dialog-title"
            className="text-base font-bold text-neutral-900 dark:text-white"
          >
            Ustawienia
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij ustawienia"
            className="w-8 h-8 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Motyw kolorystyczny
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/50 rounded-xl">
              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: 'light' })}
                className={`py-2 px-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  settings.theme === 'light'
                    ? 'bg-white text-neutral-950 shadow-xs border border-neutral-200/80 dark:border-neutral-700'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Jasny</span>
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: 'dark' })}
                className={`py-2 px-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  settings.theme === 'dark'
                    ? 'bg-neutral-900 text-white dark:bg-neutral-700 dark:text-white shadow-xs border border-transparent dark:border-neutral-600'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Ciemny</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-1 gap-2">
            <div>
              <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                Wielkość czcionki
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                Zakres od 90% do 150%
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/50 p-1 rounded-xl shrink-0">
              <button
                type="button"
                onClick={handleDecreaseFont}
                disabled={currentFontSize <= MIN_FONT_SIZE}
                aria-label="Zmniejsz czcionkę"
                title="Zmniejsz czcionkę"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 border border-neutral-200/80 dark:border-neutral-600 disabled:opacity-30 disabled:pointer-events-none transition shadow-2xs"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <span className="w-12 text-center font-mono font-bold text-neutral-900 dark:text-white select-none text-xs sm:text-sm">
                {currentFontSize}%
              </span>

              <button
                type="button"
                onClick={handleIncreaseFont}
                disabled={currentFontSize >= MAX_FONT_SIZE}
                aria-label="Zwiększ czcionkę"
                title="Zwiększ czcionkę"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 border border-neutral-200/80 dark:border-neutral-600 disabled:opacity-30 disabled:pointer-events-none transition shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-1 gap-2">
            <div>
              <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                Samoodtwarzanie filmów
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                Odtwarzaj wideo po przewinięciu
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.autoplay}
              onClick={() => onUpdateSettings({ autoplay: !settings.autoplay })}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none shrink-0 ${
                settings.autoplay ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full transition-transform transform ${
                  settings.autoplay
                    ? 'translate-x-6 bg-white dark:bg-neutral-900'
                    : 'translate-x-1 bg-white dark:bg-neutral-400'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-1 gap-2">
            <div>
              <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                Pokazywanie filmów
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                Wyświetlaj demonstracje wideo
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.showVideos}
              onClick={() => onUpdateSettings({ showVideos: !settings.showVideos })}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none shrink-0 ${
                settings.showVideos ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full transition-transform transform ${
                  settings.showVideos
                    ? 'translate-x-6 bg-white dark:bg-neutral-900'
                    : 'translate-x-1 bg-white dark:bg-neutral-400'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-1 gap-2">
            <div>
              <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                Odhaczanie wykonanych serii
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                Wyświetlaj wskaźniki serii (1, 2, 3...)
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.showSetTracking}
              onClick={() => onUpdateSettings({ showSetTracking: !settings.showSetTracking })}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none shrink-0 ${
                settings.showSetTracking ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full transition-transform transform ${
                  settings.showSetTracking
                    ? 'translate-x-6 bg-white dark:bg-neutral-900'
                    : 'translate-x-1 bg-white dark:bg-neutral-400'
                }`}
              />
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={handleReset}
              className={`w-full py-2.5 px-3 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all text-xs sm:text-sm ${
                resetSuccess
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-neutral-100 hover:bg-neutral-200/90 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {resetSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Serie zresetowane</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Zresetuj wykonane serie</span>
                </>
              )}
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={handleCopyPlan}
              className={`w-full py-2.5 px-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-xs sm:text-sm ${
                copySuccess
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-neutral-100 hover:bg-neutral-200/90 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700/60 text-neutral-800 dark:text-neutral-200'
              }`}
            >
              {copySuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Skopiowano plan do schowka!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Kopiuj cały plan (Trening A + B)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
