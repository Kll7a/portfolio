import { Tab } from '../App';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';

interface Props {
  current: Tab;
  onChange: (tab: Tab) => void;
}

export default function Navigation({ current, onChange }: Props) {
  const { t } = useI18n();
  const tabs: { id: Tab; label: string }[] = [
    { id: 'main', label: t.nav.main },
    { id: 'skills', label: t.nav.skills },
    { id: 'works', label: t.nav.works },
  ];

  return (
    <nav aria-label={t.nav.label} className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-1.5 flex items-center shadow-xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          aria-current={current === tab.id ? 'page' : undefined}
          className="relative px-5 py-2.5 sm:px-6 md:px-10 md:py-3 rounded-full text-sm md:text-base font-semibold transition-colors z-10 cursor-pointer whitespace-nowrap"
          style={{ color: current === tab.id ? 'var(--theme-ink)' : 'rgba(243,241,236,0.6)' }}
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
    </nav>
  );
}
