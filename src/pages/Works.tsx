import { ChevronLeft, ChevronRight, ExternalLink, Play, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

type SliderVideo = { key: string; url: string; thumb: string; alt?: string };

// keys are `yt-<videoId>`
const ytId = (video: SliderVideo) => video.key.replace(/^yt-/, '');
const ytEmbedSrc = (video: SliderVideo) =>
  `https://www.youtube-nocookie.com/embed/${ytId(video)}?autoplay=1&rel=0&modestbranding=1`;

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const driveThumb = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w640`;

const PRODUCTION_VIDEOS: SliderVideo[] = [
  { key: 'yt-4mtjLr5kH5E', url: 'https://youtu.be/4mtjLr5kH5E', thumb: ytThumb('4mtjLr5kH5E') },
  { key: 'yt-sGdFyTPj2fk', url: 'https://youtu.be/sGdFyTPj2fk', thumb: ytThumb('sGdFyTPj2fk') },
  { key: 'yt-QH1E6UWgr5U', url: 'https://youtu.be/QH1E6UWgr5U', thumb: ytThumb('QH1E6UWgr5U') },
  { key: 'yt-sy2q_I9hlpI', url: 'https://youtu.be/sy2q_I9hlpI', thumb: ytThumb('sy2q_I9hlpI') },
  { key: 'yt-3BjxPnTwLvQ', url: 'https://youtu.be/3BjxPnTwLvQ', thumb: ytThumb('3BjxPnTwLvQ') },
  { key: 'yt-yPIXXIB8wVk', url: 'https://youtu.be/yPIXXIB8wVk', thumb: ytThumb('yPIXXIB8wVk') },
];

const DIGITAL_PR_VIDEOS: SliderVideo[] = [
  { key: 'yt-7x0NW1qSjDg', url: 'https://youtu.be/7x0NW1qSjDg', thumb: ytThumb('7x0NW1qSjDg') },
  { key: 'yt-lW-juLVFA3Y', url: 'https://youtu.be/lW-juLVFA3Y', thumb: ytThumb('lW-juLVFA3Y') },
  { key: 'yt-q6x2mmlzuXo', url: 'https://youtu.be/q6x2mmlzuXo', thumb: ytThumb('q6x2mmlzuXo') },
  { key: 'yt-hDQq59VbcNM', url: 'https://youtu.be/hDQq59VbcNM', thumb: ytThumb('hDQq59VbcNM') },
  { key: 'yt-JGG5Lryi0Hg', url: 'https://youtu.be/JGG5Lryi0Hg', thumb: ytThumb('JGG5Lryi0Hg') },
  { key: 'yt-moCImK_W5II', url: 'https://youtu.be/moCImK_W5II', thumb: ytThumb('moCImK_W5II') },
  { key: 'yt-b6gZbmceT7s', url: 'https://youtu.be/b6gZbmceT7s', thumb: ytThumb('b6gZbmceT7s') },
  { key: 'yt-ZnDBqPRPWos', url: 'https://youtu.be/ZnDBqPRPWos', thumb: ytThumb('ZnDBqPRPWos') },
];

const MOTION_VIDEOS: SliderVideo[] = [
  { key: 'yt-1KHMN-cxAQc', url: 'https://youtu.be/1KHMN-cxAQc', thumb: ytThumb('1KHMN-cxAQc') },
  { key: 'yt-6KNkt1Lk5_o', url: 'https://youtu.be/6KNkt1Lk5_o', thumb: ytThumb('6KNkt1Lk5_o') },
  { key: 'yt-_wfHC5LTrqU', url: 'https://youtu.be/_wfHC5LTrqU', thumb: ytThumb('_wfHC5LTrqU') },
  { key: 'yt-jaZas0ZlTaA', url: 'https://youtu.be/jaZas0ZlTaA', thumb: ytThumb('jaZas0ZlTaA') },
  { key: 'yt-M1SN7xeCzYw', url: 'https://youtu.be/M1SN7xeCzYw', thumb: ytThumb('M1SN7xeCzYw') },
  { key: 'yt-HqX4QeXxXcI', url: 'https://youtu.be/HqX4QeXxXcI', thumb: ytThumb('HqX4QeXxXcI') },
];

type Category = { title: string; videos: SliderVideo[]; isVertical: boolean };

const CATEGORIES: Category[] = [
  { title: 'PRODUCTION', videos: PRODUCTION_VIDEOS, isVertical: false },
  { title: 'DIGITAL / PR', videos: DIGITAL_PR_VIDEOS, isVertical: true },
  { title: 'MOTION', videos: MOTION_VIDEOS, isVertical: false },
];

type Work = { category: number; index: number; video: SliderVideo };

// Spread the categories evenly through one list so neighbours on the page are rarely from the same category
const WORKS: Work[] = CATEGORIES.flatMap((category, categoryIndex) =>
  category.videos.map((video, index) => ({
    category: categoryIndex,
    index,
    video,
    position: (index + 0.5) / category.videos.length,
  })),
)
  .sort((a, b) => a.position - b.position || a.category - b.category)
  .map(({ category, index, video }) => ({ category, index, video }));

// Hand-picked "scattered but tidy" look. Each list is cycled with a different length so the pattern never visibly repeats.
// Tailwind needs full class names, so the widths are written out: % on phones, px from `md`.
const LANDSCAPE_WIDTHS = ['w-[46%] md:w-[250px]', 'w-[56%] md:w-[330px]', 'w-[40%] md:w-[200px]', 'w-[50%] md:w-[285px]'];
const PORTRAIT_WIDTHS = ['w-[27%] md:w-[135px]', 'w-[32%] md:w-[165px]', 'w-[24%] md:w-[120px]', 'w-[30%] md:w-[150px]'];
const OFFSETS_Y = [0, 22, -10, 30, 8, -16, 26, 2, 14, -6];
const OFFSETS_X = [0, 6, -4, 8, -2, 4, -6];
const TILTS = [-2, 1.5, 0, -1, 2.5, -1.5, 1, 0.5];
const FLOAT_AMPLITUDES = [7, 11, 9, 13, 8];
const FLOAT_DURATIONS = [5.2, 6.4, 4.6, 7.1, 5.8, 6.9];

export default function Works() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<{ category: number; index: number } | null>(null);
  const openCategory = open ? CATEGORIES[open.category] : null;

  return (
    <div className="min-h-full flex items-center justify-center pb-24 md:pb-0">
      <div className="w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-6 md:gap-x-7 md:gap-y-10 px-1 py-4 z-10">
        {WORKS.map((work, i) => {
          const category = CATEGORIES[work.category];
          const widths = category.isVertical ? PORTRAIT_WIDTHS : LANDSCAPE_WIDTHS;
          return (
            <div
              key={work.video.key}
              className={`relative hover:z-20 ${widths[i % widths.length]}`}
              style={{
                marginTop: OFFSETS_Y[i % OFFSETS_Y.length],
                marginLeft: OFFSETS_X[i % OFFSETS_X.length],
                transform: `rotate(${TILTS[i % TILTS.length]}deg)`,
              }}
            >
              {/* Levitation: pure CSS (see .work-float), so it runs on the GPU and ignores the "reduce motion" system flag on purpose */}
              <div
                className="work-float"
                style={
                  {
                    '--float-y': `${FLOAT_AMPLITUDES[i % FLOAT_AMPLITUDES.length]}px`,
                    '--float-duration': `${FLOAT_DURATIONS[i % FLOAT_DURATIONS.length]}s`,
                    // negative delay = every card starts mid-cycle, so they are out of phase from the first frame
                    '--float-delay': `-${((i * 1.7) % FLOAT_DURATIONS[i % FLOAT_DURATIONS.length]).toFixed(2)}s`,
                  } as CSSProperties
                }
              >
                <motion.button
                  type="button"
                  onClick={() => setOpen({ category: work.category, index: work.index })}
                  aria-label={`Play ${category.title} video ${work.index + 1}`}
                  whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className={`group/video relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_24px_40px_-20px_rgba(0,0,0,0.8)] hover:border-white/30 transition-colors cursor-pointer ${
                    category.isVertical ? 'aspect-[9/16]' : 'aspect-video'
                  }`}
                >
                  <img
                    src={work.video.thumb}
                    alt={work.video.alt ?? `${category.title} video`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 via-black/30 to-black/30 opacity-0 group-hover/video:opacity-100 group-focus-visible/video:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
                      <Play size={18} className="text-white ml-0.5" fill="currentColor" aria-hidden="true" />
                    </div>
                    <span
                      className="absolute bottom-2 left-3 text-[10px] font-bold tracking-[0.18em]"
                      style={{ color: 'var(--theme-color)' }}
                    >
                      {category.title}
                    </span>
                  </div>
                </motion.button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rendered into <body>: the animated page wrapper has a transform, which would break `fixed` positioning */}
      {createPortal(
        <AnimatePresence>
          {open && openCategory && (
            <VideoLightbox
              title={openCategory.title}
              videos={openCategory.videos}
              index={open.index}
              isVertical={openCategory.isVertical}
              onClose={() => setOpen(null)}
              onNavigate={(delta) =>
                setOpen((current) =>
                  current === null
                    ? null
                    : {
                        category: current.category,
                        index:
                          (current.index + delta + CATEGORIES[current.category].videos.length) %
                          CATEGORIES[current.category].videos.length,
                      },
                )
              }
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}

function VideoLightbox({
  title,
  videos,
  index,
  isVertical,
  onClose,
  onNavigate,
}: {
  title: string;
  videos: SliderVideo[];
  index: number;
  isVertical: boolean;
  onClose: () => void;
  onNavigate: (delta: number) => void;
}) {
  const video = videos[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const handlers = useRef({ onClose, onNavigate });
  handlers.current = { onClose, onNavigate };

  useEffect(() => {
    // Remember the trigger so focus goes back to it when the dialog closes
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handlers.current.onClose();
      } else if (event.key === 'ArrowLeft') {
        handlers.current.onNavigate(-1);
      } else if (event.key === 'ArrowRight') {
        handlers.current.onNavigate(1);
      } else if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || active === dialogRef.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, []);

  const iconButton =
    'w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center transition-colors hover:bg-white/20 cursor-pointer';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black/85"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onMouseDown={onClose}
      />

      <motion.div
        className={`relative w-full ${isVertical ? 'max-w-md' : 'max-w-4xl'}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.15 }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} video ${index + 1}`}
          tabIndex={-1}
          className="outline-none"
        >
          <div className="flex items-center justify-between gap-4 mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--theme-color)' }}>
              {title}
            </p>
            <button type="button" onClick={onClose} className={`${iconButton} shrink-0`} aria-label="Close video">
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Fixed aspect-ratio box sized by viewport height so the player never overflows the screen */}
          <div
            className={`mx-auto w-full rounded-xl overflow-hidden bg-black shadow-2xl ${
              isVertical
                ? 'aspect-[9/16] max-w-[min(100%,calc(68dvh*0.5625))]'
                : 'aspect-video max-w-[min(100%,calc(68dvh*1.7778))]'
            }`}
          >
            <iframe
              key={video.key}
              src={ytEmbedSrc(video)}
              title={`${title} video ${index + 1}`}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => onNavigate(-1)} className={iconButton} aria-label="Previous video">
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <span className="text-sm text-white/70 tabular-nums" aria-live="polite">
                {index + 1} / {videos.length}
              </span>
              <button type="button" onClick={() => onNavigate(1)} className={iconButton} aria-label="Next video">
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
            <a
              href={video.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: 'var(--theme-color)', color: '#fff' }}
            >
              Watch on YouTube
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
