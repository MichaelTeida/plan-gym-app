import { useSyncExternalStore } from 'react';

export interface AppSettings {
  theme: 'light' | 'dark';
  autoplay: boolean;
  showVideos: boolean;
  showSetTracking: boolean;
  fontSizePercent: number;
}

export type RoutineId = 'trening-a' | 'trening-b';

const EMPTY_SETS: Record<string, boolean[]> = {};

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  autoplay: true,
  showVideos: true,
  showSetTracking: true,
  fontSizePercent: 115
};

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('fbw_storage_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('fbw_storage_change', callback);
  };
}

function notifyStorageChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('fbw_storage_change'));
  }
}

let lastRawSets: string | null = null;
let cachedSets: Record<string, boolean[]> = EMPTY_SETS;

function getCompletedSetsSnapshot(): Record<string, boolean[]> {
  if (typeof window === 'undefined') return EMPTY_SETS;
  try {
    const raw = localStorage.getItem('fbw_completed_sets');
    if (raw !== lastRawSets) {
      lastRawSets = raw;
      cachedSets = raw ? JSON.parse(raw) : EMPTY_SETS;
    }
    return cachedSets;
  } catch {
    return EMPTY_SETS;
  }
}

export function useCompletedSets() {
  const completedSets = useSyncExternalStore(
    subscribe,
    getCompletedSetsSnapshot,
    () => EMPTY_SETS
  );

  const toggleSet = (exerciseId: string, setIndex: number) => {
    try {
      const current = getCompletedSetsSnapshot();
      const currentExerciseSets = current[exerciseId] || [];
      const updated = [...currentExerciseSets];
      updated[setIndex] = !updated[setIndex];

      const next = {
        ...current,
        [exerciseId]: updated
      };
      localStorage.setItem('fbw_completed_sets', JSON.stringify(next));
      lastRawSets = null;
      notifyStorageChange();
    } catch {}
  };

  const resetSets = () => {
    try {
      localStorage.removeItem('fbw_completed_sets');
      lastRawSets = null;
      notifyStorageChange();
    } catch {}
  };

  return { completedSets, toggleSet, resetSets };
}

let lastRawSettings: string | null = null;
let cachedSettings: AppSettings = DEFAULT_SETTINGS;

function getSettingsSnapshot(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem('fbw_app_settings');
    if (raw !== lastRawSettings) {
      lastRawSettings = raw;
      if (raw) {
        cachedSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
      } else {
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        cachedSettings = { ...DEFAULT_SETTINGS, theme: isSystemDark ? 'dark' : 'light' };
      }
    }
    return cachedSettings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function useAppSettings() {
  const settings = useSyncExternalStore(
    subscribe,
    getSettingsSnapshot,
    () => DEFAULT_SETTINGS
  );

  const updateSettings = (newPartial: Partial<AppSettings>) => {
    try {
      const current = getSettingsSnapshot();
      const updated = { ...current, ...newPartial };
      localStorage.setItem('fbw_app_settings', JSON.stringify(updated));
      lastRawSettings = null;
      notifyStorageChange();
    } catch {}
  };

  return { settings, updateSettings };
}

let lastRawRoutine: string | null = null;
let cachedRoutine: RoutineId = 'trening-a';

function getActiveRoutineSnapshot(): RoutineId {
  if (typeof window === 'undefined') return 'trening-a';
  try {
    const raw = localStorage.getItem('fbw_active_routine');
    if (raw !== lastRawRoutine) {
      lastRawRoutine = raw;
      cachedRoutine = raw === 'trening-b' ? 'trening-b' : 'trening-a';
    }
    return cachedRoutine;
  } catch {
    return 'trening-a';
  }
}

export function useActiveRoutine() {
  const activeRoutineId = useSyncExternalStore(
    subscribe,
    getActiveRoutineSnapshot,
    () => 'trening-a' as RoutineId
  );

  const setActiveRoutineId = (id: RoutineId) => {
    try {
      localStorage.setItem('fbw_active_routine', id);
      lastRawRoutine = null;
      notifyStorageChange();
    } catch {}
  };

  return { activeRoutineId, setActiveRoutineId };
}
