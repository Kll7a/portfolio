import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink, X, ZoomIn } from 'lucide-react';
import { ColorMode } from '../App';

type HardSkill = { id: string; name: string; file: string; cover?: boolean };

const blender: HardSkill = { id: 'blender', name: 'Blender', file: 'Blender.png' };
const afterEffects: HardSkill = { id: 'ae', name: 'After Effects', file: 'After Effects.png' };
const premiere: HardSkill = { id: 'pr', name: 'Premiere Pro', file: 'Premiere Pro.png' };
const unreal: HardSkill = { id: 'unreal', name: 'Unreal Engine', file: 'Unreal Engine.png' };
const photoshop: HardSkill = { id: 'ps', name: 'Photoshop', file: 'Photoshop.png' };
const illustrator: HardSkill = { id: 'ai', name: 'Illustrator', file: 'Illustrator.png' };
const corel: HardSkill = { id: 'corel', name: 'Corel Draw', file: 'Corel Draw.png' };
const figma: HardSkill = { id: 'figma', name: 'Figma', file: 'Figma.png' };
const gwd: HardSkill = { id: 'gwd', name: 'Google Web Designer', file: 'Google Web Designer.png' };
const vscode: HardSkill = { id: 'vscode', name: 'VS Code', file: 'VS Code.png' };
const github: HardSkill = { id: 'github', name: 'GitHub', file: 'GitHub.png' };
const cursor: HardSkill = { id: 'cursor', name: 'Cursor', file: 'Cursor.svg' };
const m365: HardSkill = { id: 'm365', name: 'Microsoft 365', file: 'Microsoft 365.png' };
// ChatGPT.png is a 16:9 canvas with the logo in the middle: fill the square by height so the logo matches the other icons
const chatgpt: HardSkill = { id: 'chatgpt', name: 'ChatGPT', file: 'ChatGPT.png', cover: true };
const claude: HardSkill = { id: 'claude', name: 'Claude', file: 'Claude.png' };
const gemini: HardSkill = { id: 'gemini', name: 'Gemini', file: 'Gemini.svg' };

const hardSkillGroups: { title: string; skills: HardSkill[] }[] = [
  { title: '3D & Video', skills: [blender, afterEffects, premiere, unreal] },
  { title: 'Design', skills: [photoshop, illustrator, corel, figma, gwd] },
  { title: 'Dev & Office', skills: [vscode, github, cursor, m365] },
  { title: 'AI', skills: [chatgpt, claude, gemini] },
];

const softSkills = [
  'Cross-functional Communication',
  'Coordination',
  'Project Thinking',
  'Self-directed Learning',
];

const mindset = [
  'Analytical Thinking',
  'Systems Thinking',
  'Pragmatism',
  'Tech-Savvy + Creativity',
];

type Certificate = {
  id: string;
  issuer: string;
  title: string;
  file: string; // file name inside /certificates/cropped
  verifyUrl: string; // Coursera verification page printed on the certificate
};

const certificates: Certificate[] = [
  {
    id: 'google-data',
    issuer: 'Google',
    title: 'Foundations: Data, Data, Everywhere',
    file: 'Google - Foundations Data, Data, Everywhere.jpeg',
    verifyUrl: 'https://coursera.org/verify/B2LTWBTVUW9C',
  },
  {
    id: 'google-pm',
    issuer: 'Google',
    title: 'Foundations of Project Management',
    file: 'Google - Foundations of Project Management.jpeg',
    verifyUrl: 'https://coursera.org/verify/6T9U7GIXPS83',
  },
  {
    id: 'uva-design',
    issuer: 'University of Virginia',
    title: 'Design Thinking: Ideas to Action',
    file: 'University of Virginia - Design Thinking Ideas to Action.jpeg',
    verifyUrl: 'https://coursera.org/verify/CF55QMW6HK1U',
  },
  {
    id: 'vanderbilt-prompt',
    issuer: 'Vanderbilt University',
    title: 'Prompt Engineering',
    file: 'Vanderbilt University - Prompt Engineering.jpeg',
    verifyUrl: 'https://coursera.org/verify/specialization/9IS80BDEKYQ0',
  },
];

// encodeURI (not encodeURIComponent): the file names contain commas, which are valid in a path
const certificateSrc = (cert: Certificate) => `/portfolio/certificates/cropped/${encodeURI(cert.file)}`;

export default function Skills({ colorMode }: { colorMode: ColorMode }) {
  const [openCertificate, setOpenCertificate] = useState<number | null>(null);

  return (
    <div className="min-h-full flex flex-col md:flex-row gap-12 pb-24 md:pb-0">
      <div className="flex-1 flex flex-col justify-center max-w-md z-10 w-full">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-wide" style={{ color: 'var(--theme-color)' }}>
              MKKT College
            </h2>
            <p className="text-white/80 text-base md:text-lg font-medium leading-relaxed">
              Major in Computer<br/>Maintenance
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-wide" style={{ color: 'var(--theme-color)' }}>
              Puchon University
            </h2>
            <p className="text-white/80 text-base md:text-lg font-medium leading-relaxed">
              Majoring in the Internet of Things<br/>
              <span className="text-white/60 text-sm font-normal mt-1 block">(currently continuing my studies)</span>
            </p>
          </div>
        </div>

        <a
          href="https://t.me/cringearchitect"
          target="_blank"
          rel="noreferrer"
          className="mt-10 px-6 py-2.5 rounded-full font-bold text-sm tracking-wider transition-transform hover:scale-105 active:scale-95 w-max shadow-xl flex flex-col items-center justify-center cursor-pointer"
          style={{ backgroundColor: 'var(--theme-color)', color: '#fff' }}
        >
          <span>CONTACT ME</span>
          <span className="text-xs font-normal opacity-90 mt-0.5">FOR MORE INFORMATION</span>
        </a>
      </div>

      <div className="flex-[1.5] flex items-center justify-center md:justify-end z-10 w-full mt-8 md:mt-0">
        <div className="@container w-full max-w-3xl space-y-5">
          <section>
            <SectionTitle>Hard Skills</SectionTitle>
            <div className="grid grid-cols-1 @2xl:grid-cols-[1fr_1.1fr] gap-x-6 gap-y-3">
              {hardSkillGroups.map((group) => (
                <div key={group.title}>
                  <p className="text-xs font-medium text-white/60 mb-2">{group.title}</p>
                  <div className="flex flex-wrap gap-x-0.5 gap-y-3">
                    {group.skills.map((skill) => (
                      <div key={skill.id} className="w-[72px] flex flex-col items-center gap-1.5 group cursor-pointer">
                        <div
                          className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:-translate-y-1"
                          style={{ boxShadow: `0 8px 20px -10px var(--theme-bg-glow)` }}
                        >
                          <div className="w-7 h-7">
                            <img
                              src={`/portfolio/icons/${encodeURIComponent(skill.file)}`}
                              alt={skill.name}
                              className={`w-full h-full ${skill.cover ? 'object-cover' : 'object-contain'}`}
                              loading="lazy"
                              draggable={false}
                            />
                          </div>
                        </div>
                        <span className="text-xs leading-tight text-white/70 group-hover:text-white transition-colors text-center">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 @xl:grid-cols-2 gap-6">
            <section>
              <SectionTitle>Soft Skills</SectionTitle>
              <ChipList items={softSkills} />
            </section>
            <section>
              <SectionTitle>Mindset</SectionTitle>
              <ChipList items={mindset} />
            </section>
          </div>

          <section>
            <SectionTitle>Certificates</SectionTitle>
            <div className="grid grid-cols-2 @xl:grid-cols-4 gap-3">
              {certificates.map((cert, index) => (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => setOpenCertificate(index)}
                  aria-haspopup="dialog"
                  aria-label={`View certificate: ${cert.issuer} — ${cert.title}`}
                  className="flex flex-col gap-2 group text-left cursor-pointer"
                >
                  <div
                    className="relative w-full aspect-[1198/928] rounded-xl overflow-hidden bg-white/5 border border-white/15 transition-all duration-300 group-hover:border-white/30 group-hover:-translate-y-1"
                    style={{ boxShadow: `0 8px 20px -10px var(--theme-bg-glow)` }}
                  >
                    <img
                      src={certificateSrc(cert)}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <ZoomIn size={22} className="text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="leading-snug">
                    <span className="block text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--theme-color)' }}>
                      {cert.issuer}
                    </span>
                    <span className="block text-xs text-white/70 font-medium mt-0.5 group-hover:text-white transition-colors">
                      {cert.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Rendered into <body>: the animated page wrapper has a transform, which would break `fixed` positioning */}
      {createPortal(
        <AnimatePresence>
          {openCertificate !== null && (
            <CertificateLightbox
              index={openCertificate}
              colorMode={colorMode}
              onClose={() => setOpenCertificate(null)}
              onNavigate={(delta) =>
                setOpenCertificate((current) =>
                  current === null ? null : (current + delta + certificates.length) % certificates.length,
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

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-2.5">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: 'var(--theme-color)' }}>
        {children}
      </h3>
      <div className="h-px flex-1 bg-white/15" />
    </div>
  );
}

function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/15 text-[13px] leading-tight font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function CertificateLightbox({
  index,
  colorMode,
  onClose,
  onNavigate,
}: {
  index: number;
  colorMode: ColorMode;
  onClose: () => void;
  onNavigate: (delta: number) => void;
}) {
  const cert = certificates[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const handlers = useRef({ onClose, onNavigate });
  handlers.current = { onClose, onNavigate };

  useEffect(() => {
    // Remember the trigger so focus goes back to it when the dialog closes
    const previouslyFocused = document.activeElement as HTMLElement | null;
    // preventScroll: focusing must never scroll the page behind the dialog (that looked like a flicker)
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
        // Keep Tab focus inside the dialog
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
      {/* Plain dimmed layer: no backdrop-filter, it flickered over the blurred glow behind the page */}
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
        className="relative w-full max-w-4xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.15 }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${cert.issuer} — ${cert.title}`}
          tabIndex={-1}
          className="outline-none"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--theme-color)' }}>
                {cert.issuer}
              </p>
              <h2 className="text-lg sm:text-xl font-semibold text-white leading-snug">{cert.title}</h2>
            </div>
            <button type="button" onClick={onClose} className={`${iconButton} shrink-0`} aria-label="Close certificate">
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Fixed aspect-ratio box (same as the cropped files) so nothing resizes while the image loads or changes */}
          <div className="mx-auto w-full max-w-[min(100%,calc(68dvh*1.291))] aspect-[1198/928] rounded-xl overflow-hidden bg-white shadow-2xl">
            <img
              src={certificateSrc(cert)}
              alt={`Certificate: ${cert.issuer} — ${cert.title}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => onNavigate(-1)} className={iconButton} aria-label="Previous certificate">
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <span className="text-sm text-white/70 tabular-nums" aria-live="polite">
                {index + 1} / {certificates.length}
              </span>
              <button type="button" onClick={() => onNavigate(1)} className={iconButton} aria-label="Next certificate">
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: 'var(--theme-color)', color: '#fff' }}
            >
              Verify on Coursera
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
