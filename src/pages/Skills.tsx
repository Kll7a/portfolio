import { ColorMode } from '../App';

export default function Skills({ colorMode }: { colorMode: ColorMode }) {
  const icons = [
    { id: 'blender', name: 'Blender', file: 'Blender.png' },
    { id: 'ae', name: 'After Effects', file: 'After Effects.png' },
    { id: 'pr', name: 'Premiere Pro', file: 'Premiere Pro.png' },
    { id: 'gwd', name: 'Google Web Designer', file: 'Google Web Designer.png' },
    { id: 'figma', name: 'Figma', file: 'Figma.png' },
    { id: 'ai', name: 'Illustrator', file: 'Illustrator.png' },
    { id: 'ps', name: 'Photoshop', file: 'Photoshop.png' },
    { id: 'corel', name: 'Corel Draw', file: 'Corel Draw.png' },
    { id: 'gemini', name: 'Gemini', file: 'Gemini.svg' },
    { id: 'vscode', name: 'VS Code', file: 'VS Code.png' },
    { id: 'github', name: 'GitHub', file: 'GitHub.png' },
    { id: 'cursor', name: 'Cursor', file: 'Cursor.svg' },
  ];

  return (
    <div className="min-h-full flex flex-col md:flex-row gap-12 pb-24 md:pb-0">
      <div className="flex-1 flex flex-col justify-center max-w-md z-10 w-full">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-wide" style={{ color: 'var(--theme-color)' }}>
              MKKT College
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed">
              Major in Computer<br/>Maintenance
            </p>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-wide" style={{ color: 'var(--theme-color)' }}>
              Puchon University
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed">
              Majoring in the Internet of Things<br/>
              <span className="text-white/50 text-base font-normal mt-1 block">(currently continuing my studies)</span>
            </p>
          </div>
        </div>

        <a
          href="https://t.me/cringearchitect"
          target="_blank"
          rel="noreferrer"
          className="mt-12 px-6 py-2 rounded-full font-bold text-xs tracking-wider transition-transform hover:scale-105 active:scale-95 w-max shadow-xl flex flex-col items-center justify-center cursor-pointer"
          style={{ backgroundColor: 'var(--theme-color)', color: '#fff' }}
        >
          <span>CONTACT ME</span>
          <span className="text-[8px] font-normal opacity-80 mt-0.5">FOR MORE INFORMATION</span>
        </a>
      </div>
      
      <div className="flex-[1.5] flex items-center justify-center md:justify-end z-10 w-full mt-8 md:mt-0">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-5 w-full max-w-lg">
          {icons.map((icon) => (
            <div key={icon.id} className="flex flex-col items-center gap-2 group cursor-pointer">
              <div 
                className="w-full aspect-square rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:-translate-y-1.5" 
                style={{ boxShadow: `0 8px 20px -10px var(--theme-bg-glow)` }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12">
                  <img
                    src={`/portfolio/icons/${encodeURIComponent(icon.file)}`}
                    alt={icon.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </div>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-medium group-hover:text-white/90 transition-colors text-center">
                {icon.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
