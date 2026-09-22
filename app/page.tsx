'use client';

import React, { useState, useEffect } from 'react';
import { WORKOUT_ROUTINES } from '@/lib/workout-data';
import { useAppSettings, useCompletedSets } from '@/lib/storage-store';
import { WorkoutNav } from '@/components/WorkoutNav';
import { ExerciseCard } from '@/components/ExerciseCard';
import { SettingsModal } from '@/components/SettingsModal';
import { CelebrationModal } from '@/components/CelebrationModal';
import { WorkoutInfoModal } from '@/components/WorkoutInfoModal';
import { Info } from 'lucide-react';

export default function Home() {
  const [activeRoutineId, setActiveRoutineId] = useState<'trening-a' | 'trening-b'>('trening-a');
  const { settings, updateSettings } = useAppSettings();
  const { completedSets, toggleSet, resetSets } = useCompletedSets();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [celebrationRoutineTitle, setCelebrationRoutineTitle] = useState('');

  // Synchronize theme with html and body classes
  useEffect(() => {
    const isDark = settings.theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  }, [settings.theme]);

  // Synchronize user font scale preference
  useEffect(() => {
    const fs = settings.fontSizePercent || 115;
    document.documentElement.style.fontSize = `${fs}%`;
  }, [settings.fontSizePercent]);

  const currentRoutine =
    WORKOUT_ROUTINES.find((r) => r.id === activeRoutineId) || WORKOUT_ROUTINES[0];

  const handleToggleSet = (exerciseId: string, setIndex: number) => {
    try {
      const exercise = currentRoutine.exercises.find((e) => e.id === exerciseId);
      const targetSets = exercise?.setsCount || 5;

      const currentExSets = completedSets[exerciseId] || [];
      const isCurrentlyChecked = !!currentExSets[setIndex];

      // Update state in store
      toggleSet(exerciseId, setIndex);

      // Check if this action will complete the entire workout
      if (!isCurrentlyChecked) {
        let allCompleted = true;

        for (const ex of currentRoutine.exercises) {
          const expected = ex.setsCount || 5;
          const exSets = ex.id === exerciseId ? [...currentExSets] : [...(completedSets[ex.id] || [])];
          if (ex.id === exerciseId) {
            exSets[setIndex] = true;
          }

          let done = 0;
          for (let i = 0; i < expected; i++) {
            if (exSets[i]) done++;
          }

          if (done < expected) {
            allCompleted = false;
            break;
          }
        }

        if (allCompleted) {
          setCelebrationRoutineTitle(currentRoutine.title);
          setIsCelebrationOpen(true);
        }
      }
    } catch {}
  };

  const isDark = settings.theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-neutral-200/80 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col antialiased transition-colors duration-200`}>
      {/* Minimal Top Bar with Cog Settings Icon */}
      <WorkoutNav
        routines={WORKOUT_ROUTINES}
        activeRoutineId={activeRoutineId}
        onSelectRoutine={setActiveRoutineId}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Grid: Clean, Spaced & Responsive */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {currentRoutine.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              autoplayEnabled={settings.autoplay}
              showVideos={settings.showVideos}
              showSetTracking={settings.showSetTracking}
              completedSets={completedSets[exercise.id] || []}
              onToggleSet={handleToggleSet}
            />
          ))}
        </div>
      </main>

      {/* Split Footer: Left: Info/Uwagi o treningu, Right: Made by Author */}
      <footer className="py-6 sm:py-8 border-t border-neutral-300/80 dark:border-neutral-800 mt-auto bg-white/50 dark:bg-neutral-950/50 backdrop-blur-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Left: Info o treningu / uwagi */}
          <button
            type="button"
            onClick={() => setIsInfoOpen(true)}
            className="inline-flex items-center gap-1.5 font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition py-1 px-2.5 rounded-lg hover:bg-neutral-300/50 dark:hover:bg-neutral-800"
          >
            <Info className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            <span>Zasady & uwagi do treningu</span>
          </button>

          {/* Right: Made by */}
          <div className="font-medium text-neutral-600 dark:text-neutral-400">
            Made by <span className="font-semibold text-neutral-800 dark:text-neutral-200">Michał Głuch (MichaelTeida)</span>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetSets={resetSets}
      />

      {/* Workout Info & Guidelines Modal */}
      <WorkoutInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />

      {/* Fanfare Celebration Modal */}
      <CelebrationModal
        isOpen={isCelebrationOpen}
        onClose={() => setIsCelebrationOpen(false)}
        routineTitle={celebrationRoutineTitle}
      />
    </div>
  );
}
