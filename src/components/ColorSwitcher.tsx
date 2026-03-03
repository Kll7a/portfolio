import { ColorMode } from '../App';
import { motion } from 'motion/react';

interface Props {
  current: ColorMode;
  onChange: (mode: ColorMode) => void;
}

export default function ColorSwitcher({ current, onChange }: Props) {
  const modes: { id: ColorMode; color: string } = [
    { id: 'violet', color: '#8b5cf6' },
    { id: 'orange', color: '#f97316' },
    { id: 'aqua', color: '#2dd4bf' },
  ];

  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1.5 flex items-center gap-2 shadow-xl">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          className="relative w-6 h-6 md:w-8 md:h-8 rounded-full transition-transform hover:scale-110 flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: mode.color }}
          aria-label={`Switch to ${mode.id} theme`}
        >
          {current === mode.id && (
            <motion.div
              layoutId="activeColor"
              className="absolute inset-0 rounded-full border-2 border-white/80"
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
