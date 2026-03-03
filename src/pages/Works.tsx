import { ColorMode } from '../App';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

type SliderVideo = { key: string; url: string; thumb: string; alt?: string };

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const driveThumb = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w640`;

const PRODUCTION_VIDEOS: SliderVideo[] = [
  { key: 'yt-4mtjLr5kH5E', url: 'https://youtu.be/4mtjLr5kH5E', thumb: ytThumb('4mtjLr5kH5E') },
  { key: 'yt-sGdFyTPj2fk', url: 'https://youtu.be/sGdFyTPj2fk', thumb: ytThumb('sGdFyTPj2fk') },
  { key: 'yt-QH1E6UWgr5U', url: 'https://youtu.be/QH1E6UWgr5U', thumb: ytThumb('QH1E6UWgr5U') },
  { key: 'yt-sy2q_I9hlpI', url: 'https://youtu.be/sy2q_I9hlpI', thumb: ytThumb('sy2q_I9hlpI') },
  { key: 'yt-3BjxPnTwLvQ', url: 'https://youtu.be/3BjxPnTwLvQ', thumb: ytThumb('3BjxPnTwLvQ') },
  { key: 'yt-yPIXXIB8wVk', url: 'https://youtu.be/yPIXXIB8wVk', thumb: ytThumb('yPIXXIB8wVk') },
];

const DIGITAL_PR_VIDEOS: SliderVideo[] = [
  {
    key: 'gd-1X_Tc9CnX8EMfUopIaJ4ob_JK2zih9nTh',
    url: 'https://drive.google.com/file/d/1X_Tc9CnX8EMfUopIaJ4ob_JK2zih9nTh/view?usp=sharing',
    thumb: driveThumb('1X_Tc9CnX8EMfUopIaJ4ob_JK2zih9nTh'),
  },
  {
    key: 'gd-1PPneUqwEiVwHMsDkQE7MTnSrFZCWhfP-',
    url: 'https://drive.google.com/file/d/1PPneUqwEiVwHMsDkQE7MTnSrFZCWhfP-/view?usp=sharing',
    thumb: driveThumb('1PPneUqwEiVwHMsDkQE7MTnSrFZCWhfP-'),
  },
  {
    key: 'gd-1pNmr1Gd37s2plEM7pO3_YElKjOlEh3zK',
    url: 'https://drive.google.com/file/d/1pNmr1Gd37s2plEM7pO3_YElKjOlEh3zK/view?usp=sharing',
    thumb: driveThumb('1pNmr1Gd37s2plEM7pO3_YElKjOlEh3zK'),
  },
  {
    key: 'gd-1Y17v--ifeVPubkuE-7XUGgRrRog21-5t',
    url: 'https://drive.google.com/file/d/1Y17v--ifeVPubkuE-7XUGgRrRog21-5t/view?usp=sharing',
    thumb: driveThumb('1Y17v--ifeVPubkuE-7XUGgRrRog21-5t'),
  },
  {
    key: 'gd-18WGAQkpzAT3rbqTvqWyx5Wg4SJ50Qrus',
    url: 'https://drive.google.com/file/d/18WGAQkpzAT3rbqTvqWyx5Wg4SJ50Qrus/view?usp=sharing',
    thumb: driveThumb('18WGAQkpzAT3rbqTvqWyx5Wg4SJ50Qrus'),
  },
  {
    key: 'gd-1KP1FhjCgyrADdJHIs-VFSqsyNPguYHJf',
    url: 'https://drive.google.com/file/d/1KP1FhjCgyrADdJHIs-VFSqsyNPguYHJf/view?usp=sharing',
    thumb: driveThumb('1KP1FhjCgyrADdJHIs-VFSqsyNPguYHJf'),
  },
];

const MOTION_VIDEOS: SliderVideo[] = [
  {
    key: 'gd-1Qe43imJZA0DjqJp7zmB3JAAgrwZK_oB2',
    url: 'https://drive.google.com/file/d/1Qe43imJZA0DjqJp7zmB3JAAgrwZK_oB2/view?usp=sharing',
    thumb: driveThumb('1Qe43imJZA0DjqJp7zmB3JAAgrwZK_oB2'),
  },
  {
    key: 'gd-1vkzoqm6oWWf3pw63-lnwgjLPFmYDHLn1',
    url: 'https://drive.google.com/file/d/1vkzoqm6oWWf3pw63-lnwgjLPFmYDHLn1/view?usp=sharing',
    thumb: driveThumb('1vkzoqm6oWWf3pw63-lnwgjLPFmYDHLn1'),
  },
  {
    key: 'gd-1WDTeuGW13JjHROf94wJOSRSDKirx0pP6',
    url: 'https://drive.google.com/file/d/1WDTeuGW13JjHROf94wJOSRSDKirx0pP6/view?usp=sharing',
    thumb: driveThumb('1WDTeuGW13JjHROf94wJOSRSDKirx0pP6'),
  },
  {
    key: 'gd-1EHsFK4ysby_BXNOkUgyMmj8MRERYX1wK',
    url: 'https://drive.google.com/file/d/1EHsFK4ysby_BXNOkUgyMmj8MRERYX1wK/view?usp=sharing',
    thumb: driveThumb('1EHsFK4ysby_BXNOkUgyMmj8MRERYX1wK'),
  },
  {
    key: 'gd-1NKOX-UZMrsFElCG-r7-haxY76IjNv44e',
    url: 'https://drive.google.com/file/d/1NKOX-UZMrsFElCG-r7-haxY76IjNv44e/view?usp=sharing',
    thumb: driveThumb('1NKOX-UZMrsFElCG-r7-haxY76IjNv44e'),
  },
  {
    key: 'gd-1Yrv46tjhps6Jg0QDNEBVfbaGSc_ODwf7',
    url: 'https://drive.google.com/file/d/1Yrv46tjhps6Jg0QDNEBVfbaGSc_ODwf7/view?usp=sharing',
    thumb: driveThumb('1Yrv46tjhps6Jg0QDNEBVfbaGSc_ODwf7'),
  },
];

export default function Works({ colorMode }: { colorMode: ColorMode }) {
  return (
    <div className="min-h-full flex flex-col lg:flex-row gap-12 pb-24 lg:pb-0">
      <div className="flex-[2] flex flex-col justify-center gap-10 z-10 w-full min-w-0">
        <VideoSlider title="PRODUCTION" videos={PRODUCTION_VIDEOS} />
        <VideoSlider title="DIGITAL / PR" videos={DIGITAL_PR_VIDEOS} />
        <VideoSlider title="MOTION" videos={MOTION_VIDEOS} />
      </div>
      
      <div className="flex-1 flex flex-col justify-center lg:pl-12 z-10 mt-8 lg:mt-0 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-white tracking-wide">Thanks =)</h2>
        <p className="text-white/80 leading-relaxed mb-12 text-base md:text-lg font-medium">
          I'm always eager to learn new things and put them into practice. 
          For me, design is not just about creating visuals — it's about 
          optimizing processes to achieve faster and higher-quality results. 
          I'm always open to new collaborations and creative projects that 
          push ideas forward.
        </p>
        
        <a
          href="https://t.me/cringearchitect"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2 rounded-full font-bold text-xs tracking-wider transition-transform hover:scale-105 active:scale-95 w-max shadow-xl flex flex-col items-center justify-center cursor-pointer"
          style={{ backgroundColor: 'var(--theme-color)', color: '#fff' }}
        >
          <span>CONTACT ME</span>
          <span className="text-[8px] font-normal opacity-80 mt-0.5">FOR MORE INFORMATION</span>
        </a>
      </div>
    </div>
  );
}

function VideoSlider({ title, count, videos }: { title: string; count?: number; videos?: SliderVideo[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth * 0.8; 
      
      container.scrollTo({
        left: container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  const placeholderVideos = Array.from({ length: count ?? 0 }).map((_, i) => i);
  const hasVideos = Array.isArray(videos) && videos.length > 0;

  return (
    <div className="w-full relative">
      <h3 className="text-sm md:text-base font-bold tracking-[0.2em] mb-4 uppercase" style={{ color: 'var(--theme-color)' }}>
        {title}
      </h3>
      <div className="relative group/slider -mx-4 md:mx-0">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-50 p-2 md:p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 hover:text-white hover:scale-110 transition-all flex items-center justify-center shadow-xl cursor-pointer"
          style={{ color: 'var(--theme-color)' }}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="w-full [mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)] relative z-10">
          <div 
            ref={scrollRef}
            className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4 md:px-6"
          >
            <div className="min-w-[10px] md:min-w-[20px] shrink-0" />
            {hasVideos
              ? videos!.map((video) => (
                  <a
                    key={video.key}
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                    className="min-w-[220px] md:min-w-[260px] aspect-video bg-white/5 border border-white/10 rounded-2xl snap-center flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer relative overflow-hidden group/video shadow-lg"
                  >
                    <img
                      src={video.thumb}
                      alt={video.alt ?? `${title} video`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  </a>
                ))
              : placeholderVideos.map((v) => (
                  <div
                    key={v}
                    className="min-w-[220px] md:min-w-[260px] aspect-video bg-white/5 border border-white/10 rounded-2xl snap-center flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer relative overflow-hidden group/video shadow-lg"
                  >
                    <span className="text-white/30 text-[10px] font-medium uppercase tracking-widest">Video Slot</span>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  </div>
                ))}
            <div className="min-w-[10px] md:min-w-[20px] shrink-0" />
          </div>
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-50 p-2 md:p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 hover:text-white hover:scale-110 transition-all flex items-center justify-center shadow-xl cursor-pointer"
          style={{ color: 'var(--theme-color)' }}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}