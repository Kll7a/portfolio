import { ColorMode } from '../App';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';

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

export default function Works({ colorMode }: { colorMode: ColorMode }) {
  return (
    <div className="min-h-full flex flex-col lg:flex-row gap-12 pb-24 lg:pb-0">
      <div className="flex-[2] flex flex-col justify-center gap-10 z-10 w-full min-w-0">
        <VideoSlider title="PRODUCTION" videos={PRODUCTION_VIDEOS} colorMode={colorMode} />
        {/* Добавлен проп isVertical={true} для блока DIGITAL / PR */}
        <VideoSlider title="DIGITAL / PR" videos={DIGITAL_PR_VIDEOS} isVertical={true} colorMode={colorMode} />
        <VideoSlider title="MOTION" videos={MOTION_VIDEOS} colorMode={colorMode} />
      </div>
      
      <div className="flex-1 flex flex-col justify-center lg:pl-12 z-10 mt-8 lg:mt-0 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-white tracking-wide">Thanks =)</h2>
        <p className="text-white/80 leading-relaxed mb-12 text-base md:text-lg font-medium">
          I'm always eager to learn new things and put them into practice. 
          For me, design is not just about creating visuals — it's about 
          optimizing processes to achieve faster and higher-quality results. 
          I'm always open to new collaborations and creative projects that 
          push ideas forward.
        </p>
        
        <a
          href="https://t.me/cringearchitect"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2.5 rounded-full font-bold text-sm tracking-wider transition-transform hover:scale-105 active:scale-95 w-max shadow-xl flex flex-col items-center justify-center cursor-pointer"
          style={{ backgroundColor: 'var(--theme-color)', color: '#fff' }}
        >
          <span>CONTACT ME</span>
          <span className="text-xs font-normal opacity-90 mt-0.5">FOR MORE INFORMATION</span>
        </a>
      </div>
    </div>
  );
}

// Добавлен isVertical в типизацию и параметры
function VideoSlider({
  title,
  count,
  videos,
  isVertical = false,
  colorMode,
}: {
  title: string;
  count?: number;
  videos?: SliderVideo[];
  isVertical?: boolean;
  colorMode: ColorMode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth * 0.8; 
      
      container.scrollTo({
        left: container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  const placeholderVideos = Array.from({ length: count ?? 0 }).map((_, i) => i);
  const hasVideos = Array.isArray(videos) && videos.length > 0;

  // Динамические классы для карточки видео
  const cardClasses = `bg-white/5 border border-white/10 rounded-2xl snap-center flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer relative overflow-hidden group/video shadow-lg ${
    isVertical 
      ? 'aspect-[9/16] min-w-[90px] md:min-w-[110px]' // Вертикальный формат + уменьшенная ширина
      : 'aspect-video min-w-[220px] md:min-w-[260px]' // Стандартный 16:9
  }`;

  return (
    <div className="w-full relative">
      <h3 className="text-sm md:text-base font-bold tracking-[0.2em] mb-4 uppercase" style={{ color: 'var(--theme-color)' }}>
        {title}
      </h3>
      <div className="relative group/slider -mx-4 md:mx-0">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-50 p-2 md:p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 hover:text-white hover:scale-110 transition-all flex items-center justify-center shadow-xl cursor-pointer"
          style={{ color: 'var(--theme-color)' }}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="w-full [mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)] relative z-10">
          <div 
            ref={scrollRef}
            className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4 md:px-6"
          >
            <div className="min-w-[10px] md:min-w-[20px] shrink-0" />
            {hasVideos
              ? videos!.map((video, index) => (
                  <button
                    type="button"
                    key={video.key}
                    onClick={() => setOpenIndex(index)}
                    aria-label={`Play ${title} video ${index + 1}`}
                    className={cardClasses}
                  >
                    <img
                      src={video.thumb}
                      alt={video.alt ?? `${title} video`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  </button>
                ))
              : placeholderVideos.map((v) => (
                  <div
                    key={v}
                    className={cardClasses}
                  >
                    <span className="text-white/30 text-[10px] font-medium uppercase tracking-widest">Video Slot</span>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  </div>
                ))}
            <div className="min-w-[10px] md:min-w-[20px] shrink-0" />
          </div>
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-50 p-2 md:p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 hover:text-white hover:scale-110 transition-all flex items-center justify-center shadow-xl cursor-pointer"
          style={{ color: 'var(--theme-color)' }}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Rendered into <body>: the animated page wrapper has a transform, which would break `fixed` positioning */}
      {hasVideos &&
        createPortal(
          <AnimatePresence>
            {openIndex !== null && (
              <VideoLightbox
                title={title}
                videos={videos!}
                index={openIndex}
                isVertical={isVertical}
                colorMode={colorMode}
                onClose={() => setOpenIndex(null)}
                onNavigate={(delta) =>
                  setOpenIndex((current) =>
                    current === null ? null : (current + delta + videos!.length) % videos!.length,
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
  colorMode,
  onClose,
  onNavigate,
}: {
  title: string;
  videos: SliderVideo[];
  index: number;
  isVertical: boolean;
  colorMode: ColorMode;
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
    <div className={`theme-${colorMode} fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8`}>
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
