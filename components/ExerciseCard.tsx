'use client';

import React, { useState } from 'react';
import { WorkoutExercise } from '@/lib/workout-data';
import { VideoPlayer } from './VideoPlayer';
import { ArrowUpRight, Check } from 'lucide-react';

interface ExerciseCardProps {
  exercise: WorkoutExercise;
  autoplayEnabled: boolean;
  showVideos: boolean;
  showSetTracking: boolean;
  completedSets?: boolean[];
  onToggleSet?: (exerciseId: string, setIndex: number) => void;
}

export function ExerciseCard({
  exercise,
  autoplayEnabled,
  showVideos,
  showSetTracking,
  completedSets = [],
  onToggleSet
}: ExerciseCardProps) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const currentVariant = exercise.variants[activeVariantIndex] || exercise.variants[0];

  const setsCount = exercise.setsCount || 5;

  return (
    <article className="group bg-white dark:bg-neutral-900 border border-neutral-300/90 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all hover:border-neutral-400/80 dark:hover:border-neutral-700">
      <div>
        {/* Header: Number, Title, Sets in unified, balanced scale */}
        <div className="flex items-start justify-between gap-2.5 mb-3">
          <div className="flex items-baseline gap-2 flex-1 min-w-0">
            <span className="font-mono text-sm font-semibold text-neutral-400 dark:text-neutral-500 shrink-0 select-none">
              {exercise.number.toString().padStart(2, '0')}.
            </span>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug break-words">
              {exercise.variants.length > 1 ? currentVariant.name : exercise.title}
            </h3>
          </div>

          <span className="shrink-0 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/60 text-xs font-bold text-neutral-800 dark:text-neutral-200 self-start mt-0.5">
            {exercise.setsReps}
          </span>
        </div>

        {/* Variant switch (if multiple variants) */}
        {exercise.variants.length > 1 && (
          <div className="flex gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/50 rounded-xl mb-3">
            {exercise.variants.map((variant, idx) => {
              const isSelected = idx === activeVariantIndex;
              const displayName = variant.shortName || variant.name;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setActiveVariantIndex(idx)}
                  className={`flex-1 min-h-[36px] py-1.5 px-3 rounded-lg text-xs font-semibold transition-all text-center leading-tight flex items-center justify-center ${
                    isSelected
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs border border-neutral-200/70 dark:border-transparent'
                      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
                  }`}
                >
                  <span>{displayName}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Video demonstration */}
        {showVideos && (
          <div className="mb-3 overflow-hidden rounded-xl border border-neutral-200/80 dark:border-neutral-800">
            <VideoPlayer
              src={currentVariant.videoUrl}
              title={currentVariant.name}
              autoplayEnabled={autoplayEnabled}
            />
          </div>
        )}

        {/* Muscles & Guide Link: clean spacing and natural flow */}
        <div className="flex items-start justify-between gap-3 text-xs leading-relaxed pt-0.5">
          <div className="flex-1 text-neutral-600 dark:text-neutral-400">
            <span className="font-semibold text-neutral-900 dark:text-neutral-200">Mięśnie: </span>
            <span>{currentVariant.muscles.join(', ')}</span>
          </div>

          <a
            href={currentVariant.guideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 font-semibold text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors pt-0.5"
          >
            <span>Instrukcja</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Bottom: Symmetrical, responsive series buttons */}
      {showSetTracking && (
        <div className="mt-3.5 pt-3 flex items-center gap-2 border-t border-neutral-200/80 dark:border-neutral-800/60 flex-wrap">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-500 shrink-0 mr-1 select-none">
            Serie:
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {Array.from({ length: setsCount }).map((_, index) => {
              const isChecked = !!completedSets[index];
              return (
                <button
                  key={`${exercise.id}-set-${index}`}
                  type="button"
                  onClick={() => onToggleSet && onToggleSet(exercise.id, index)}
                  aria-label={`Seria ${index + 1}`}
                  title={`Kliknij aby oznaczyć serię ${index + 1}`}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center active:scale-95 ${
                    isChecked
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs border border-transparent'
                      : 'bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700/50 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  {isChecked ? <Check className="w-4 h-4 stroke-[2.5]" /> : index + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}
