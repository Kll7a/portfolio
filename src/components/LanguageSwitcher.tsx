import { useI18n } from '../i18n';
import type { Lang } from '../i18n';

const langs: Lang[] = ['ru', 'en'];

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-1 flex items-center shadow-xl"
    >
      {langs.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          lang={code}
          className="px-3 py-1.5 rounded-full text-xs font-bold tracking-wider transition-colors cursor-pointer"
          style={
            lang === code
              ? { backgroundColor: 'var(--theme-color)', color: 'var(--theme-ink)' }
              : { color: 'rgba(243,241,236,0.6)' }
          }
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
