import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Main from './pages/Main';
import Skills from './pages/Skills';
import Works from './pages/Works';
import Navigation from './components/Navigation';
import ColorSwitcher from './components/ColorSwitcher';

export type Tab = 'main' | 'skills' | 'works';
export type ColorMode = 'violet' | 'orange' | 'aqua';

const tabs: Tab[] = ['main', 'skills', 'works'];
const colorModes: ColorMode[] = ['violet', 'orange', 'aqua'];
const COLOR_STORAGE_KEY = 'portfolio-color-mode';

// Tabs live in the URL hash (#/skills), which works on GitHub Pages without any server config
const tabFromHash = (): Tab => {
  const value = window.location.hash.replace(/^#\/?/, '') as Tab;
  return tabs.includes(value) ? value : 'main';
};

const loadColorMode = (): ColorMode => {
  try {
    const saved = window.localStorage.getItem(COLOR_STORAGE_KEY) as ColorMode | null;
    if (saved && colorModes.includes(saved)) return saved;
  } catch {
    // storage can be unavailable (private mode, blocked cookies)
  }
  return 'violet';
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>(tabFromHash);
  const [colorMode, setColorMode] = useState<ColorMode>(loadColorMode);
  const [direction, setDirection] = useState(1);
  const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null);
  const [hasMoreBelow, setHasMoreBelow] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleTabChange = (newTab: Tab) => {
    if (newTab === currentTab) return;
    const currentIndex = tabs.indexOf(currentTab);
    const newIndex = tabs.indexOf(newTab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentTab(newTab);
    if (tabFromHash() !== newTab) {
      window.history.pushState(null, '', `#/${newTab}`);
    }
  };

  // Browser back/forward and manual hash edits
  useEffect(() => {
    const onHashChange = () => handleTabChange(tabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [currentTab]);

  const handleColorChange = (mode: ColorMode) => {
    setColorMode(mode);
    try {
      window.localStorage.setItem(COLOR_STORAGE_KEY, mode);
    } catch {
      // ignore: the choice just won't persist
    }
  };

  // "More content below" cue for the scrollable page area
  useEffect(() => {
    if (!scrollEl) return;
    const update = () =>
      setHasMoreBelow(scrollEl.scrollTop + scrollEl.clientHeight < scrollEl.scrollHeight - 8);
    update();
    scrollEl.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(scrollEl);
    if (scrollEl.firstElementChild) observer.observe(scrollEl.firstElementChild);
    return () => {
      scrollEl.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [scrollEl]);

  const variants = {
    enter: (direction: number) => ({
      x: reduceMotion ? 0 : direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: reduceMotion ? 0 : direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className={`min-h-[100dvh] w-full flex items-center justify-center p-2 sm:p-4 md:p-8 theme-${colorMode} transition-colors duration-500`}>
      <div className="relative w-full max-w-[1400px] h-[95dvh] md:h-[800px] bg-[#121214] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col">
        {/* Glowing background */}
        <div
          className="absolute top-0 right-0 w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full blur-[80px] md:blur-[120px] opacity-50 pointer-events-none transition-colors duration-700"
          style={{
            background: `radial-gradient(circle, var(--theme-bg-glow) 0%, transparent 70%)`,
            transform: 'translate(20%, -20%)'
          }}
        />

        {/* Header / Color Switcher */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 z-50">
          <ColorSwitcher current={colorMode} onChange={handleColorChange} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentTab}
              ref={(el: HTMLDivElement | null) => {
                if (el) setScrollEl(el);
              }}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={reduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute inset-0 w-full h-full p-6 pt-24 sm:p-8 sm:pt-28 md:p-16 md:pb-28 overflow-y-auto overflow-x-hidden scrollbar-subtle"
            >
              {currentTab === 'main' && <Main colorMode={colorMode} />}
              {currentTab === 'skills' && <Skills colorMode={colorMode} />}
              {currentTab === 'works' && <Works colorMode={colorMode} />}
            </motion.div>
          </AnimatePresence>

          {/* Fade at the bottom edge while there is more content to scroll to */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 z-20 bg-gradient-to-t from-[#121214] via-[#121214]/70 to-transparent transition-opacity duration-300 ${hasMoreBelow ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* Navigation */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50">
          <Navigation current={currentTab} onChange={handleTabChange} />
        </div>
      </div>
    </div>
  );
}
