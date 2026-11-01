import { Check, ChevronLeft, ChevronRight, Clapperboard, ExternalLink, Megaphone, Play, Send, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from '../i18n';
import { TELEGRAM_URL } from './Main';

type SliderVideo = { key: string; url: string; thumb: string; alt?: string };

// keys are `yt-<videoId>`
const ytId = (video: SliderVideo) => video.key.replace(/^yt-/, '');
const ytEmbedSrc = (video: SliderVideo) =>
  `https://www.youtube-nocookie.com/embed/${ytId(video)}?autoplay=1&rel=0&modestbranding=1`;

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

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

// Order matches t.works.categories (titles, taglines and service lists live in i18n.tsx)
type Category = { videos: SliderVideo[]; isVertical: boolean; icon: ReactNode };

const CATEGORIES: Category[] = [
  { videos: PRODUCTION_VIDEOS, isVertical: false, icon: <Clapperboard size={18} aria-hidden="true" /> },
  { videos: DIGITAL_PR_VIDEOS, isVertical: true, icon: <Megaphone size={18} aria-hidden="true" /> },
  { videos: MOTION_VIDEOS, isVertical: false, icon: <Sparkles size={18} aria-hidden="true" /> },
];

export default function Works() {
  const { t } = useI18n();
  const [open, setOpen] = useState<{ category: number; index: number } | null>(null);
  const openCategory = open ? CATEGORIES[open.category] : null;

  return (
    <div className="min-h-full pb-24 md:pb-0">
      <div className="w-full z-10 relative flex flex-col gap-4 xl:gap-5">
        {CATEGORIES.map((category, categoryIndex) => {
          const copy = t.works.categories[categoryIndex];
          return (
            <section key={copy.title} className="glass-card rounded-3xl p-5 md:p-7">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 mb-6">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2.5 mb-3" style={{ color: 'var(--theme-color)' }}>
                    {category.icon}
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">
                      {String(categoryIndex + 1).padStart(2, '0')} · {t.works.videos(category.videos.length)}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">{copy.title}</h2>
                  <p className="text-base md:text-lg leading-relaxed text-white/70">{copy.tagline}</p>
                </div>

                <div className="lg:col-span-7 rounded-2xl bg-black/20 border border-white/[0.06] p-4 md:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-3">{t.works.whatIDo}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
                    {copy.services.map((service) => (
                      <li key={service} className="flex items-start gap-2.5 text-sm md:text-[15px] leading-snug text-white/85">
                        <Check size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--theme-color)' }} aria-hidden="true" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={`grid gap-3 ${category.isVertical ? 'grid-cols-4 lg:grid-cols-8' : 'grid-cols-2 md:grid-cols-3'}`}>
                {category.videos.map((video, index) => (
                  <button
                    key={video.key}
                    type="button"
                    onClick={() => setOpen({ category: categoryIndex, index })}
                    aria-haspopup="dialog"
                    aria-label={t.works.play(copy.title, index + 1)}
                    className={`group/video relative block w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-white/30 transition-colors cursor-pointer ${
                      category.isVertical ? 'aspect-[9/16]' : 'aspect-video'
                    }`}
                  >
                    <img src={video.thumb} alt="" className="w-full h-full object-cover" loading="lazy" draggable={false} />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/video:opacity-100 group-focus-visible/video:opacity-100 transition-opacity">
                      <div className="btn-primary w-11 h-11 rounded-full flex items-center justify-center">
                        <Play size={18} className="ml-0.5" fill="currentColor" aria-hidden="true" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          );
        })}

        <section className="glass-card rounded-3xl p-5 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-1">{t.works.ctaTitle}</h2>
            <p className="text-base text-white/70">{t.works.ctaText}</p>
          </div>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary shrink-0 self-start md:self-auto inline-flex items-center gap-3 rounded-full pl-7 pr-2 py-2 text-base font-bold transition-[transform,background-color] hover:-translate-y-0.5"
          >
            {t.works.ctaButton}
            <span className="w-10 h-10 rounded-full bg-black/15 flex items-center justify-center">
              <Send size={18} aria-hidden="true" />
            </span>
          </a>
        </section>
      </div>

      {/* Rendered into <body>: the animated page wrapper has a transform, which would break `fixed` positioning */}
      {createPortal(
        <AnimatePresence>
          {open && openCategory && (
            <VideoLightbox
              title={t.works.categories[open.category].title}
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
  const { t } = useI18n();
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
          aria-label={`${title} — ${index + 1}`}
          tabIndex={-1}
          className="outline-none"
        >
          <div className="flex items-center justify-between gap-4 mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--theme-color)' }}>
              {title}
            </p>
            <button type="button" onClick={onClose} className={`${iconButton} shrink-0`} aria-label={t.works.close}>
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
              title={`${title} — ${index + 1}`}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => onNavigate(-1)} className={iconButton} aria-label={t.works.prev}>
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <span className="text-sm text-white/70 tabular-nums" aria-live="polite">
                {index + 1} / {videos.length}
              </span>
              <button type="button" onClick={() => onNavigate(1)} className={iconButton} aria-label={t.works.next}>
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
            <a
              href={video.url}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-transform hover:scale-105 active:scale-95"
            >
              {t.works.youtube}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
