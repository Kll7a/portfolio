import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Main from './pages/Main';
import Skills from './pages/Skills';
import Works from './pages/Works';
import Navigation from './components/Navigation';
import ColorSwitcher from './components/ColorSwitcher';

export type Tab = 'main' | 'skills' | 'works';
export type ColorMode = 'violet' | 'orange' | 'aqua';

const tabs: Tab[] = ['main', 'skills', 'works'];

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('main');
  const [colorMode, setColorMode] = useState<ColorMode>('violet');
  const [direction, setDirection] = useState(1);

  const handleTabChange = (newTab: Tab) => {
    const currentIndex = tabs.indexOf(currentTab);
    const newIndex = tabs.indexOf(newTab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentTab(newTab);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
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
          <ColorSwitcher current={colorMode} onChange={setColorMode} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentTab}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute inset-0 w-full h-full p-6 pt-24 sm:p-8 sm:pt-28 md:p-16 overflow-y-auto overflow-x-hidden scrollbar-hide"
            >
              {currentTab === 'main' && <Main colorMode={colorMode} />}
              {currentTab === 'skills' && <Skills colorMode={colorMode} />}
              {currentTab === 'works' && <Works colorMode={colorMode} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50">
          <Navigation current={currentTab} onChange={handleTabChange} />
        </div>
      </div>
    </div>
  );
}
