import { useState, useEffect } from 'react';
import { WORKOUT_ROUTINES } from '@/lib/workout-data';
import { useAppSettings, useCompletedSets, useActiveRoutine } from '@/lib/storage-store';
import { WorkoutNav } from '@/components/WorkoutNav';
import { ExerciseCard } from '@/components/ExerciseCard';
import { SettingsModal } from '@/components/SettingsModal';
import { CelebrationModal } from '@/components/CelebrationModal';
import { WorkoutInfoModal } from '@/components/WorkoutInfoModal';
import { Info } from 'lucide-react';

const CELEBRATION_COOLDOWN_MS = 12 * 60 * 60 * 1000;

export default function App() {
  const { activeRoutineId, setActiveRoutineId } = useActiveRoutine();
  const { settings, updateSettings } = useAppSettings();
  const { completedSets, toggleSet, resetSets } = useCompletedSets();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [celebrationRoutineTitle, setCelebrationRoutineTitle] = useState('');

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

      toggleSet(exerciseId, setIndex);

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
          const storageKey = `fbw_last_celebration_${activeRoutineId}`;
          const lastCelebration = Number(localStorage.getItem(storageKey) || 0);
          const now = Date.now();

          if (now - lastCelebration > CELEBRATION_COOLDOWN_MS) {
            localStorage.setItem(storageKey, String(now));
            setCelebrationRoutineTitle(currentRoutine.title);
            setIsCelebrationOpen(true);
          }
        }
      }
    } catch {}
  };

  const handleResetSetsWithCooldown = () => {
    resetSets();
    try {
      localStorage.removeItem(`fbw_last_celebration_trening-a`);
      localStorage.removeItem(`fbw_last_celebration_trening-b`);
    } catch {}
  };

  const isDark = settings.theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-neutral-200/80 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col antialiased transition-colors duration-200`}>
      <WorkoutNav
        routines={WORKOUT_ROUTINES}
        activeRoutineId={activeRoutineId}
        onSelectRoutine={setActiveRoutineId}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

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

      <footer className="py-6 sm:py-8 border-t border-neutral-300/80 dark:border-neutral-800 mt-auto bg-white/50 dark:bg-neutral-950/50 backdrop-blur-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => setIsInfoOpen(true)}
            className="inline-flex items-center gap-1.5 font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition py-1 px-2.5 rounded-lg hover:bg-neutral-300/50 dark:hover:bg-neutral-800"
          >
            <Info className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            <span>Zasady & uwagi do treningu</span>
          </button>

          <div className="font-medium text-neutral-600 dark:text-neutral-400">
            Made by <span className="font-semibold text-neutral-800 dark:text-neutral-200">Michał Głuch (MichaelTeida)</span>
          </div>
        </div>
      </footer>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetSets={handleResetSetsWithCooldown}
      />

      <WorkoutInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />

      <CelebrationModal
        isOpen={isCelebrationOpen}
        onClose={() => setIsCelebrationOpen(false)}
        routineTitle={celebrationRoutineTitle}
      />
    </div>
  );
}
