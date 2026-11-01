import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Lang = 'en' | 'ru';

const en = {
  meta: {
    title: 'I.Kirill — Portfolio',
  },
  nav: {
    label: 'Main navigation',
    main: 'Main',
    skills: 'Skills',
    works: 'Works',
    language: 'Page language',
  },
  main: {
    eyebrow: 'Portfolio',
    role: '2D / 3D graphic & motion designer',
    pitch: 'From idea to the final frame: concept, SFX, VFX, animation, static visuals and every resize you need.',
    contactMe: 'Contact me',
    viewWorks: 'View works',
    location: 'Uzbekistan, Tashkent',
    videoLabel: 'Kirill',
  },
  skills: {
    education: 'Education',
    mkkt: 'MKKT College',
    mkktDetail: 'Major in Computer Maintenance',
    puchon: 'Puchon University',
    puchonDetail: 'Majoring in the Internet of Things',
    puchonNote: 'Currently continuing my studies',
    softSkills: 'Soft Skills',
    softSkillsList: ['Cross-functional Communication', 'Coordination', 'Project Thinking', 'Self-directed Learning'],
    mindset: 'Mindset',
    mindsetList: ['Analytical Thinking', 'Systems Thinking', 'Pragmatism', 'Tech-Savvy + Creativity'],
    hardSkills: 'Hard Skills',
    groups: { video: '3D & Video', dev: 'Dev & Office', design: 'Design', ai: 'AI' },
    certificates: 'Certificates',
    contactTitle: 'Contact me',
    contactSubtitle: 'Let’s discuss your project',
    viewCertificate: 'View certificate',
    closeCertificate: 'Close certificate',
    prevCertificate: 'Previous certificate',
    nextCertificate: 'Next certificate',
    verify: 'Verify on Coursera',
  },
  works: {
    categories: [
      {
        title: 'Production',
        tagline: 'Commercials from the first idea to the final frame.',
        services: [
          'Concept and creative idea development',
          'Casting, wardrobe and music / sound approvals',
          'Packshot and logo animation for the closing shots — done by me',
          'On-set involvement during the shoot',
          'Production budgeting and estimates',
        ],
      },
      {
        title: 'Digital / PR',
        tagline: 'Content that builds brand awareness and keeps you on screen.',
        services: [
          '2D and 3D animation',
          '3D modeling to brief',
          'Resizing for every placement per the digital brief and budget',
          'Awareness campaigns — reach and recognition, not hard selling',
        ],
      },
      {
        title: 'Motion / VFX',
        tagline: 'Complex animation and effects for product-driven stories.',
        services: [
          'Advanced 2D / 3D animation',
          'Sound design',
          '3D modeling',
          'AI-assisted scripts that speed up the pipeline',
          'Product shots and product visualization',
        ],
      },
      {
        title: 'Lottie / Telegram',
        tagline: 'Lightweight animations for apps and Telegram that make a brand recognizable and a joy to use.',
        services: [
          'Lottie (JSON) animations for apps and interfaces',
          'Animated Telegram stickers and custom emoji',
          'Your brand in every chat — recognition through everyday use',
          'Small files that play smoothly on any device',
        ],
      },
    ],
    whatIDo: 'What I do',
    appAnimations: 'App animations · Lottie',
    telegramStickers: 'Telegram stickers & emoji',
    sticker: (name: string) => `Sticker: ${name}`,
    videos: (n: number) => `${n} videos`,
    animations: (n: number) => `${n} animations`,
    play: (category: string, n: number) => `Play ${category} video ${n}`,
    ctaTitle: 'Questions or proposals?',
    ctaText: 'Message me on Telegram — I’ll do my best to reply quickly.',
    ctaButton: 'Contact me',
    close: 'Close video',
    prev: 'Previous video',
    next: 'Next video',
    youtube: 'Watch on YouTube',
  },
};

type Dict = typeof en;

// 1 ролик, 2 ролика, 5 роликов
const ruPlural = (n: number, one: string, few: string, many: string) =>
  n % 10 === 1 && n % 100 !== 11 ? one : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? few : many;

const ru: Dict = {
  meta: {
    title: 'I.Kirill — портфолио',
  },
  nav: {
    label: 'Основная навигация',
    main: 'Главная',
    skills: 'Навыки',
    works: 'Работы',
    language: 'Язык страницы',
  },
  main: {
    eyebrow: 'Портфолио',
    role: '2D-3D графический и моушен‑дизайнер',
    pitch: 'От идеи до финального кадра: концепция, SFX, VFX, анимация, статика и все необходимые ресайзы.',
    contactMe: 'Связаться',
    viewWorks: 'Смотреть работы',
    location: 'Узбекистан, Ташкент',
    videoLabel: 'Кирилл',
  },
  skills: {
    education: 'Образование',
    mkkt: 'Колледж MKKT',
    mkktDetail: 'Специальность: обслуживание компьютерной техники',
    puchon: 'Университет Пучон',
    puchonDetail: 'Направление: Интернет вещей',
    puchonNote: 'Продолжаю обучение',
    softSkills: 'Soft Skills',
    softSkillsList: ['Межкомандная коммуникация', 'Координация', 'Проектное мышление', 'Самообучение'],
    mindset: 'Мышление',
    mindsetList: ['Аналитическое мышление', 'Системное мышление', 'Прагматизм', 'Технологичность + креатив'],
    hardSkills: 'Hard Skills',
    groups: { video: '3D и видео', dev: 'Разработка и офис', design: 'Дизайн', ai: 'ИИ' },
    certificates: 'Сертификаты',
    contactTitle: 'Связаться со мной',
    contactSubtitle: 'Обсудим ваш проект',
    viewCertificate: 'Открыть сертификат',
    closeCertificate: 'Закрыть сертификат',
    prevCertificate: 'Предыдущий сертификат',
    nextCertificate: 'Следующий сертификат',
    verify: 'Проверить на Coursera',
  },
  works: {
    categories: [
      {
        title: 'Production',
        tagline: 'Рекламные ролики от первой идеи до финального кадра.',
        services: [
          'Разработка концепции и креативной идеи',
          'Согласование актёров, костюмов и звуковой темы',
          'Анимация пэкшота и логошота в финале роликов — делал сам',
          'Участие в съёмочном процессе',
          'Составление сметы',
        ],
      },
      {
        title: 'Digital / PR',
        tagline: 'Контент, который работает на узнаваемость бренда.',
        services: [
          'Анимация 2D и 3D',
          '3D-моделирование по брифу',
          'Ресайзы под все площадки согласно диджитал-брифу и бюджету',
          'Имиджевое продвижение — охват и узнаваемость без прямых продаж',
        ],
      },
      {
        title: 'Motion / VFX',
        tagline: 'Сложная анимация и эффекты для продуктовых историй.',
        services: [
          'Сложная 2D / 3D-анимация',
          'Саунд-дизайн',
          '3D-моделирование',
          'Скрипты с помощью ИИ для ускорения пайплайна',
          'Продуктовая часть: пэкшоты и визуализация продукта',
        ],
      },
      {
        title: 'Lottie / Telegram',
        tagline: 'Лёгкие анимации для приложений и Telegram — для узнаваемости бренда и удобства пользователей.',
        services: [
          'Lottie (JSON) анимации для приложений и интерфейсов',
          'Анимированные стикеры и эмодзи для Telegram',
          'Бренд в каждом чате — узнаваемость через ежедневное использование',
          'Лёгкие файлы с плавным воспроизведением на любом устройстве',
        ],
      },
    ],
    whatIDo: 'Что я делаю',
    appAnimations: 'Анимации для приложений · Lottie',
    telegramStickers: 'Стикеры и эмодзи для Telegram',
    sticker: (name: string) => `Стикер: ${name}`,
    videos: (n: number) => `${n} ${ruPlural(n, 'ролик', 'ролика', 'роликов')}`,
    animations: (n: number) => `${n} ${ruPlural(n, 'анимация', 'анимации', 'анимаций')}`,
    play: (category: string, n: number) => `Смотреть ${category}, ролик ${n}`,
    ctaTitle: 'Есть вопросы или предложения?',
    ctaText: 'Пишите мне в Telegram — постараюсь оперативно ответить.',
    ctaButton: 'Связаться',
    close: 'Закрыть видео',
    prev: 'Предыдущее видео',
    next: 'Следующее видео',
    youtube: 'Смотреть на YouTube',
  },
};

const dictionaries: Record<Lang, Dict> = { en, ru };

const STORAGE_KEY = 'lang';

const initialLang = (): Lang => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'ru') return saved;
  } catch {
    // storage can be blocked (private mode): fall back to the browser language
  }
  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
};

const I18nContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void; t: Dict } | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang].meta.title;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // not critical: the choice just won't be remembered
    }
  }, [lang]);

  return <I18nContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}
