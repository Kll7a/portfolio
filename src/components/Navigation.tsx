import { Tab } from '../App';
import { motion } from 'motion/react';

interface Props {
  current: Tab;
  onChange: (tab: Tab) => void;
}

export default function Navigation({ current, onChange }: Props) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'main', label: 'Main' },
    { id: 'skills', label: 'Skills' },
    { id: 'works', label: 'Works' },
  ];

  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1.5 flex items-center shadow-xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="relative px-6 py-2.5 md:px-10 md:py-3 rounded-full text-sm md:text-base font-medium transition-colors z-10 cursor-pointer"
          style={{ color: current === tab.id ? '#fff' : 'rgba(255,255,255,0.5)' }}
        >
          {current === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-full z-[-1]"
              style={{ backgroundColor: 'var(--theme-color)' }}
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
