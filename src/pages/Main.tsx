import { ArrowRight, Mail, Send, Phone, MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { Tab } from '../App';
import { useI18n } from '../i18n';

export const TELEGRAM_URL = 'https://t.me/cringearchitect';

export default function Main({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);

  // React doesn't always render the `muted` attribute, which can make browsers block autoplay: force it and start playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;

    // Browsers may defer autoplay (e.g. while the tab is in the background): retry once the video can play / the tab is shown
    const tryPlay = () => {
      if (video.paused) video.play().catch(() => {});
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };

    tryPlay();
    video.addEventListener('canplay', tryPlay);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      video.removeEventListener('canplay', tryPlay);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="min-h-full flex flex-col md:flex-row items-center justify-between gap-8 pb-24 md:pb-0">
      <div className="flex-1 flex flex-col justify-center max-w-2xl z-10 w-full">
        <h2 className="text-sm md:text-base font-bold uppercase mb-4 tracking-[0.25em]" style={{ color: 'var(--theme-color)' }}>
          {t.main.eyebrow}
        </h2>
        <h1 className="text-6xl sm:text-8xl lg:text-[132px] font-extrabold tracking-[-0.02em] mb-5 text-white leading-[0.95]">
          I.Kirill
        </h1>
        <p className="text-lg md:text-xl font-semibold text-white/90 mb-3">{t.main.role}</p>
        <p className="text-base md:text-lg leading-relaxed text-white/65 max-w-xl mb-8">{t.main.pitch}</p>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary group inline-flex items-center gap-3 rounded-full pl-7 pr-2 py-2 text-base font-bold transition-[transform,background-color] hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.main.contactMe}
            <span className="w-10 h-10 rounded-full bg-black/15 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <Send size={18} aria-hidden="true" />
            </span>
          </a>
          <button
            type="button"
            onClick={() => onNavigate('works')}
            className="group inline-flex items-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors cursor-pointer"
          >
            {t.main.viewWorks}
            <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
          <ContactItem icon={<Mail size={20} />} text="kllproduc7ion@gmail.com" href="mailto:kllproduc7ion@gmail.com" />
          <ContactItem icon={<Send size={20} />} text="@cringearchitect" href={TELEGRAM_URL} />
          <ContactItem icon={<Phone size={20} />} text="+998 93 504 15 37" href="tel:+998935041537" />
          <ContactItem icon={<MapPin size={20} />} text={t.main.location} />
        </div>
      </div>

      <div className="flex-1 h-full flex items-center justify-center md:justify-end relative w-full mt-8 md:mt-0">
        <div className="w-full max-w-[320px] md:max-w-[400px] aspect-[3/4] rounded-[2rem] overflow-hidden relative group shadow-2xl bg-white/5">
          <video
            ref={videoRef}
            src="/portfolio/photo/AI_generation_video.mp4"
            className="w-full h-full object-cover object-top"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label={t.main.videoLabel}
          />
          <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[2rem] transition-colors group-hover:border-white/20" />
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, text, href }: { icon: ReactNode; text: string; href?: string }) {
  const content = (
    <>
      <span className="transition-transform group-hover:scale-110" style={{ color: 'var(--theme-color)' }}>
        {icon}
      </span>
      <span className="text-sm md:text-base font-medium">{text}</span>
    </>
  );
  const className = 'flex items-center gap-3 text-white/75 transition-colors group';

  if (!href) return <div className={className}>{content}</div>;
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className={`${className} hover:text-white`}
    >
      {content}
    </a>
  );
}
