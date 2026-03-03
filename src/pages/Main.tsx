import { Mail, Send, Phone, MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import { ColorMode } from '../App';

export default function Main({ colorMode }: { colorMode: ColorMode }) {
  return (
    <div className="min-h-full flex flex-col md:flex-row items-center justify-between gap-8 pb-24 md:pb-0">
      <div className="flex-1 flex flex-col justify-center max-w-2xl z-10 w-full">
        <h2 className="text-xl md:text-2xl font-medium mb-4 tracking-wide" style={{ color: 'var(--theme-color)' }}>
          Digital Designer
        </h2>
        <h1 className="text-6xl sm:text-8xl lg:text-[140px] font-bold tracking-[0.1em] mb-12 text-white leading-none">
          I.Kirill
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
          <ContactItem icon={<Mail size={24} />} text="kllproduc7ion@gmail.com" />
          <ContactItem icon={<Send size={24} />} text="@cringearchitect" />
          <ContactItem icon={<Phone size={24} />} text="+998 93 504 15 37" />
          <ContactItem icon={<MapPin size={24} />} text="Uzbekistan/Tashkent" />
        </div>
      </div>
      
      <div className="flex-1 h-full flex items-center justify-center md:justify-end relative w-full mt-8 md:mt-0">
        <div className="w-full max-w-[320px] md:max-w-[400px] aspect-[3/4] rounded-[2rem] overflow-hidden relative group shadow-2xl opacity-90">
          <img
            src="/portfolio/photo/photo_black.jpg"
            alt="Kirill"
            className="w-full h-full object-cover"
            loading="eager"
            draggable={false}
          />
          <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[2rem] transition-colors group-hover:border-white/20" />
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-4 text-white/80 hover:text-white transition-colors cursor-pointer group">
      <div className="transition-transform group-hover:scale-110" style={{ color: 'var(--theme-color)' }}>
        {icon}
      </div>
      <span className="text-sm md:text-base font-medium">{text}</span>
    </div>
  );
}
