'use client';

import React from 'react';
import { WorkoutRoutine } from '@/lib/workout-data';
import { Settings } from 'lucide-react';

interface WorkoutNavProps {
  routines: WorkoutRoutine[];
  activeRoutineId: 'trening-a' | 'trening-b';
  onSelectRoutine: (id: 'trening-a' | 'trening-b') => void;
  onOpenSettings: () => void;
}

export function WorkoutNav({
  routines,
  activeRoutineId,
  onSelectRoutine,
  onOpenSettings
}: WorkoutNavProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-300/80 dark:border-neutral-800/70 shadow-2xs transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2.5">
        {/* Brand */}
        <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-white shrink-0">
          Plan FBW
        </span>

        {/* Right side: Tabs + Settings cog */}
        <div className="flex items-center gap-2">
          {/* Minimal Tabs: Trening A / Trening B */}
          <div className="flex items-center p-0.5 rounded-xl bg-neutral-200/90 dark:bg-neutral-800/80 border border-neutral-300/50 dark:border-neutral-700/40">
            {routines.map((routine) => {
              const isActive = routine.id === activeRoutineId;
              return (
                <button
                  key={routine.id}
                  type="button"
                  onClick={() => onSelectRoutine(routine.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs border border-neutral-200/60 dark:border-transparent'
                      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  Trening {routine.code}
                </button>
              );
            })}
          </div>

          {/* Settings cog button */}
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Otwórz ustawienia"
            title="Ustawienia"
            className="w-8 h-8 rounded-xl text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white bg-neutral-200/80 hover:bg-neutral-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-800 border border-neutral-300/40 dark:border-neutral-700/40 transition flex items-center justify-center shrink-0"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
