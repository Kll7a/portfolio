import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { Award, Brain, ChevronLeft, ChevronRight, ExternalLink, GraduationCap, Layers, Send, Users, X, ZoomIn } from 'lucide-react';

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

const hardSkillRows: { title: string; skills: HardSkill[] }[][] = [
  [
    { title: '3D & Video', skills: [blender, afterEffects, premiere, unreal] },
    { title: 'Dev & Office', skills: [vscode, github, cursor, m365] },
  ],
  [
    { title: 'Design', skills: [photoshop, illustrator, corel, figma, gwd] },
    { title: 'AI', skills: [chatgpt, claude, gemini] },
  ],
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

export default function Skills() {
  const [openCertificate, setOpenCertificate] = useState<number | null>(null);

  return (
    <div className="min-h-full flex items-center pb-24 md:pb-0">
      {/* Mobile/tablet: one flow (order-* sets the reading order). xl: two columns, the wrappers below become flex columns */}
      <div className="w-full z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 xl:gap-5">
        <div className="contents xl:flex xl:flex-col xl:gap-5 xl:col-span-4">
          <GlassCard className="order-1 md:col-span-2 xl:order-none">
            <CardTitle icon={<GraduationCap size={16} aria-hidden="true" />}>Education</CardTitle>
            <ul className="space-y-5">
              <EducationItem school="MKKT College" detail="Major in Computer Maintenance" />
              <EducationItem
                school="Puchon University"
                detail="Majoring in the Internet of Things"
                note="Currently continuing my studies"
              />
            </ul>
          </GlassCard>

          <GlassCard className="order-3 xl:order-none xl:flex-1">
            <CardTitle icon={<Users size={16} aria-hidden="true" />}>Soft Skills</CardTitle>
            <ChipList items={softSkills} />
          </GlassCard>

          <GlassCard className="order-4 xl:order-none xl:flex-1">
            <CardTitle icon={<Brain size={16} aria-hidden="true" />}>Mindset</CardTitle>
            <ChipList items={mindset} />
          </GlassCard>

          <a
            href="https://t.me/cringearchitect"
            target="_blank"
            rel="noreferrer"
            className="order-6 md:col-span-2 xl:order-none group flex items-center justify-between gap-4 rounded-3xl px-6 py-4 shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{ backgroundColor: 'var(--theme-color)', color: '#fff' }}
          >
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-bold tracking-wider">CONTACT ME</span>
              <span className="text-xs font-normal opacity-90 mt-0.5">FOR MORE INFORMATION</span>
            </span>
            <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <Send size={18} aria-hidden="true" />
            </span>
          </a>
        </div>

        <div className="contents xl:flex xl:flex-col xl:gap-5 xl:col-span-8">
          <GlassCard className="order-2 md:col-span-2 xl:order-none">
            <CardTitle icon={<Layers size={16} aria-hidden="true" />}>Hard Skills</CardTitle>
            <div className="space-y-3">
              {hardSkillRows.map((row) => (
                <div key={row[0].title} className="flex flex-col @xl:flex-row gap-3">
                  {row.map((group) => (
                    <div
                      key={group.title}
                      style={{ flexGrow: group.skills.length }}
                      className="basis-0 min-w-0 rounded-2xl bg-black/20 border border-white/[0.06] p-3"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50 mb-3">{group.title}</p>
                      <div className="flex flex-wrap gap-y-3">
                        {group.skills.map((skill) => (
                          <HardSkillTile key={skill.id} skill={skill} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="order-5 md:col-span-2 xl:order-none xl:flex-1">
            <CardTitle icon={<Award size={16} aria-hidden="true" />}>Certificates</CardTitle>
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
                  <div className="relative w-full aspect-[1198/928] rounded-xl overflow-hidden bg-white/5 border border-white/15 transition-all duration-300 group-hover:border-white/30 group-hover:-translate-y-1">
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
                    <span className="block text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--theme-color)' }}>
                      {cert.issuer}
                    </span>
                    <span className="block text-xs text-white/70 font-medium mt-0.5 group-hover:text-white transition-colors">
                      {cert.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Rendered into <body>: the animated page wrapper has a transform, which would break `fixed` positioning */}
      {createPortal(
        <AnimatePresence>
          {openCertificate !== null && (
            <CertificateLightbox
              index={openCertificate}
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

function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`glass-card @container rounded-3xl p-5 md:p-6 ${className}`}>{children}</section>;
}

function CardTitle({ icon, children }: { icon: ReactNode; children: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4" style={{ color: 'var(--theme-color)' }}>
      {icon}
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap">{children}</h3>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function EducationItem({ school, detail, note }: { school: string; detail: string; note?: string }) {
  return (
    <li>
      <h4 className="text-lg md:text-xl font-bold tracking-wide text-white">{school}</h4>
      <p className="text-white/75 text-sm md:text-base font-medium leading-snug mt-0.5">{detail}</p>
      {note && (
        <span
          className="inline-block mt-2 px-2.5 py-1 rounded-full text-[11px] font-medium text-white/80 border"
          style={{ borderColor: 'var(--theme-color)', backgroundColor: 'var(--theme-bg-glow)' }}
        >
          {note}
        </span>
      )}
    </li>
  );
}

function HardSkillTile({ skill }: { skill: HardSkill; key?: string }) {
  return (
    <div className="w-14 sm:w-16 flex flex-col items-center gap-1.5 group cursor-pointer">
      <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:-translate-y-1">
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
      <span className="text-[10px] sm:text-[11px] leading-tight text-white/70 group-hover:text-white transition-colors text-center">
        {skill.name}
      </span>
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
  onClose,
  onNavigate,
}: {
  index: number;
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
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
