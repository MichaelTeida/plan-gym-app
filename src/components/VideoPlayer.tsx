import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Maximize2, Minimize2, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title: string;
  autoplayEnabled?: boolean;
}

interface TouchState {
  type: 'pinch' | 'pan' | null;
  initialDist: number;
  initialScale: number;
  startX: number;
  startY: number;
  initialPanX: number;
  initialPanY: number;
}

export function VideoPlayer({ src, title, autoplayEnabled = true }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isGesturing, setIsGesturing] = useState(false);

  const touchStateRef = useRef<TouchState>({
    type: null,
    initialDist: 0,
    initialScale: 1,
    startX: 0,
    startY: 0,
    initialPanX: 0,
    initialPanY: 0
  });

  const lastTapRef = useRef<number>(0);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      {
        threshold: 0.25,
        rootMargin: '50px 0px 50px 0px'
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (!active) {
        resetZoom();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [resetZoom]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
        resetZoom();
      }
    };

    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen, resetZoom]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (autoplayEnabled && isInViewport) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isInViewport, autoplayEnabled, src]);

  const togglePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (isFullscreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
      resetZoom();
    } else {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
      resetZoom();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isFullscreen) return;

    const now = Date.now();
    if (e.touches.length === 1 && now - lastTapRef.current < 300) {
      e.preventDefault();
      if (scale > 1.2) {
        resetZoom();
      } else {
        setScale(2.2);
        setPan({ x: 0, y: 0 });
      }
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;

    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStateRef.current = {
        type: 'pinch',
        initialDist: dist,
        initialScale: scale,
        startX: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        startY: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        initialPanX: pan.x,
        initialPanY: pan.y
      };
      setIsGesturing(true);
    } else if (e.touches.length === 1) {
      touchStateRef.current = {
        type: 'pan',
        initialDist: 0,
        initialScale: scale,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        initialPanX: pan.x,
        initialPanY: pan.y
      };
      setIsGesturing(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isFullscreen || !touchStateRef.current.type) return;

    if (e.touches.length === 2 && touchStateRef.current.type === 'pinch') {
      e.preventDefault();
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = currentDist / (touchStateRef.current.initialDist || 1);
      const targetScale = Math.min(Math.max(touchStateRef.current.initialScale * ratio, 1), 4);
      setScale(targetScale);
    } else if (e.touches.length === 1 && touchStateRef.current.type === 'pan') {
      e.preventDefault();
      const dx = e.touches[0].clientX - touchStateRef.current.startX;
      const dy = e.touches[0].clientY - touchStateRef.current.startY;

      const container = containerRef.current;
      const w = container ? container.clientWidth : window.innerWidth;
      const h = container ? container.clientHeight : window.innerHeight;
      const maxPanX = Math.max(0, ((scale - 1) * w) / 2);
      const maxPanY = Math.max(0, ((scale - 1) * h) / 2);

      const nextX = touchStateRef.current.initialPanX + dx;
      const nextY = touchStateRef.current.initialPanY + dy;

      setPan({
        x: Math.min(Math.max(nextX, -maxPanX - 40), maxPanX + 40),
        y: Math.min(Math.max(nextY, -maxPanY - 40), maxPanY + 40)
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isFullscreen) return;

    if (e.touches.length === 0) {
      setIsGesturing(false);
      touchStateRef.current.type = null;

      if (scale < 1.05) {
        resetZoom();
      } else {
        const container = containerRef.current;
        const w = container ? container.clientWidth : window.innerWidth;
        const h = container ? container.clientHeight : window.innerHeight;
        const maxPanX = Math.max(0, ((scale - 1) * w) / 2);
        const maxPanY = Math.max(0, ((scale - 1) * h) / 2);

        setPan((prev) => ({
          x: Math.min(Math.max(prev.x, -maxPanX), maxPanX),
          y: Math.min(Math.max(prev.y, -maxPanY), maxPanY)
        }));
      }
    } else if (e.touches.length === 1) {
      touchStateRef.current = {
        type: 'pan',
        initialDist: 0,
        initialScale: scale,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        initialPanX: pan.x,
        initialPanY: pan.y
      };
    }
  };

  return (
    <div
      ref={containerRef}
      className={
        isFullscreen
          ? 'fixed inset-0 z-50 w-screen h-screen bg-black flex items-center justify-center select-none touch-none overflow-hidden'
          : 'relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 select-none cursor-pointer group'
      }
      onClick={!isFullscreen ? () => togglePlayPause() : undefined}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div
        className="w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          transform: isFullscreen
            ? `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`
            : undefined,
          transition: isGesturing
            ? 'none'
            : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: isFullscreen ? 'transform' : undefined
        }}
      >
        <video
          ref={videoRef}
          src={src}
          title={title}
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className={
            isFullscreen
              ? 'max-w-full max-h-full object-contain pointer-events-auto'
              : 'w-full h-full object-cover pointer-events-auto'
          }
        />
      </div>

      <div className="absolute inset-0 pointer-events-none p-3 sm:p-4 flex flex-col justify-between z-10">
        <div className="flex items-center justify-between w-full">
          {isFullscreen && scale > 1.05 && (
            <button
              type="button"
              onClick={resetZoom}
              aria-label="Zresetuj przybliżenie"
              title="Resetuj zoom"
              className="pointer-events-auto px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{Math.round(scale * 100)}%</span>
            </button>
          )}

          {isFullscreen && (
            <div className="ml-auto pointer-events-auto">
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Zamknij pełny ekran"
                title="Zamknij"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all active:scale-95 shadow-xs"
              >
                <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Zatrzymaj wideo' : 'Odtwórz wideo'}
            title={isPlaying ? 'Zatrzymaj' : 'Odtwórz'}
            className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all active:scale-95 shadow-xs"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-0.5" />
            )}
          </button>

          {!isFullscreen && (
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Pełny ekran"
              title="Pełny ekran"
              className="pointer-events-auto w-8 h-8 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all active:scale-95 shadow-xs"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
