"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

type Lang = "ru" | "en" | "ar";

const content: Record<
  Lang,
  {
    title: string;
    lines: string[];
    scarves: string;
    coats: string;
  }
> = {
  ru: {
    title: "Lux Fur — шубы и аксессуары из натуральной норки",
    lines: [
      "Лаконичные силуэты, ручная выделка и вневременная эстетика.",
      "Для тех, кто выбирает безупречность.",
      "Минимум лишних деталей, максимум внимания к силуэту и фактуре."
    ],
    scarves: "Шарфы",
    coats: "Шубы",
  },
  en: {
    title: "Lux Fur — natural mink coats & accessories",
    lines: [
      "Clean silhouettes, handcrafted finishing, timeless aesthetics.",
      "For those who choose perfection.",
      "Minimal details, maximum focus on shape and texture.",
    ],
    scarves: "Scarves",
    coats: "Coats",
  },
  ar: {
    title: "Lux Fur — معاطف وأكسسوارات من فرو المنك الطبيعي",
    lines: [
      "قصّات نقية، تشطيب يدوي وأناقة لا تتأثر بالزمن.",
      "لمن يختارون الكمال.",
      "تفاصيل قليلة، تركيز كبير على القصّة والخطوط.",
    ],
    scarves: "أوشحة",
    coats: "معاطف",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("ru");
  const t = content[lang];
  const isArabic = lang === "ar";

  return (
    <main
      className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12 sm:py-16 fade-in"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-3xl space-y-16 sm:space-y-20">
        {/* Верх: логотип + языки */}
        <header
          className={`flex items-center justify-between ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/20 flex items-center justify-center text-sm sm:text-base tracking-[0.3em] uppercase font-cormorant font-semibold">
            LF
          </div>

          <div className="flex gap-2">
            <LangButton lang="ru" current={lang} onClick={setLang}>
              RU
            </LangButton>
            <LangButton lang="en" current={lang} onClick={setLang}>
              EN
            </LangButton>
            <LangButton lang="ar" current={lang} onClick={setLang}>
              عربي
            </LangButton>
          </div>
        </header>

        {/* Основной контент */}
        <div className="space-y-10 sm:space-y-12">
          {/* Текст */}
          <section
            className={`space-y-6 sm:space-y-8 ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl leading-tight font-normal">
              {t.title}
            </h1>

            <div className="space-y-4 font-inter text-base sm:text-lg text-white/70 leading-relaxed font-light max-w-2xl">
              {t.lines.map((l, i) => (
                <p key={i} className="opacity-90">{l}</p>
              ))}
            </div>
          </section>

          {/* Кнопки */}
          <section
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 ${
              isArabic ? "sm:flex-row-reverse" : ""
            }`}
          >
            <CatalogButton
              href={`/catalog?lang=${lang}&type=scarves`}
              label={t.scarves}
            />
            <CatalogButton
              href={`/catalog?lang=${lang}&type=coats`}
              label={t.coats}
              primary
            />
          </section>
        </div>
      </div>
    </main>
  );
}

/* Компоненты */

type LangButtonProps = {
  lang: Lang;
  current: Lang;
  onClick: (l: Lang) => void;
  children: ReactNode;
};

function LangButton({ lang, current, onClick, children }: LangButtonProps) {
  const active = lang === current;
  return (
    <button
      onClick={() => onClick(lang)}
      className={`h-9 px-4 rounded-full text-xs tracking-[0.15em] uppercase font-inter transition-all
      ${
        active
          ? "bg-white text-black"
          : "border border-white/20 text-white/60 hover:text-white hover:border-white/40"
      }`}
    >
      {children}
    </button>
  );
}

type CatalogButtonProps = {
  href: string;
  label: string;
  primary?: boolean;
};

function CatalogButton({ href, label, primary }: CatalogButtonProps) {
  return (
    <Link
      href={href}
      className={`w-full rounded-lg px-8 py-4 sm:py-5 text-base sm:text-lg tracking-wide font-inter transition-all text-center
      ${
        primary
          ? "bg-white text-black hover:bg-white/90"
          : "border border-white/20 text-white hover:border-white/40 hover:bg-white/5"
      }`}
    >
      {label}
    </Link>
  );
}
