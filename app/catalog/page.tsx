"use client";

import { useState, useEffect, type ReactNode, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Lang = "ru" | "en" | "ar";
type ProductType = "scarves" | "coats";

interface Product {
  id: string;
  image: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
}

const products: Record<ProductType, Product[]> = {
  scarves: [
    {
      id: "scarf1",
      image: "/products/scarf1.jpg",
      name: {
        ru: "Шарф из норки Classic",
        en: "Classic Mink Scarf",
        ar: "وشاح من فرو المنك الكلاسيكي",
      },
      description: {
        ru: "Классический шарф из натуральной норки. Мягкая фактура, вневременной дизайн.",
        en: "Classic scarf made from natural mink. Soft texture, timeless design.",
        ar: "وشاح كلاسيكي من فرو المنك الطبيعي. نسيج ناعم وتصميم خالد.",
      },
    },
    {
      id: "scarf2",
      image: "/products/scarf2.jpg",
      name: {
        ru: "Шарф из норки Luxe",
        en: "Luxe Mink Scarf",
        ar: "وشاح من فرو المنك الفاخر",
      },
      description: {
        ru: "Премиальный шарф с удлинённой формой. Идеален для элегантного образа.",
        en: "Premium scarf with elongated shape. Perfect for an elegant look.",
        ar: "وشاح فاخر بتصميم ممدود. مثالي للمظهر الأنيق.",
      },
    },
    {
      id: "scarf3",
      image: "/products/scarf3.jpg",
      name: {
        ru: "Шарф из норки Minimal",
        en: "Minimal Mink Scarf",
        ar: "وشاح من فرو المنك البسيط",
      },
      description: {
        ru: "Минималистичный дизайн, акцент на фактуре. Для ценителей лаконичности.",
        en: "Minimalist design, focus on texture. For lovers of simplicity.",
        ar: "تصميم بسيط، التركيز على النسيج. لعشاق البساطة.",
      },
    },
  ],
  coats: [
    {
      id: "coat1",
      image: "/products/coat1.jpg",
      name: {
        ru: "Шуба из норки Classic",
        en: "Classic Mink Coat",
        ar: "معطف من فرو المنك الكلاسيكي",
      },
      description: {
        ru: "Классическая шуба прямого кроя. Ручная выделка, премиальная фактура.",
        en: "Classic straight-cut coat. Handcrafted finishing, premium texture.",
        ar: "معطف كلاسيكي بقصة مستقيمة. تشطيب يدوي ونسيج فاخر.",
      },
    },
    {
      id: "coat2",
      image: "/products/coat2.jpg",
      name: {
        ru: "Шуба из норки Elegant",
        en: "Elegant Mink Coat",
        ar: "معطف من فرو المنك الأنيق",
      },
      description: {
        ru: "Элегантный силуэт с акцентом на линию плеч. Вневременная эстетика.",
        en: "Elegant silhouette with emphasis on shoulder line. Timeless aesthetics.",
        ar: "قصّة أنيقة مع التركيز على خط الكتف. جمالية خالدة.",
      },
    },
    {
      id: "coat3",
      image: "/products/coat3.jpg",
      name: {
        ru: "Шуба из норки Modern",
        en: "Modern Mink Coat",
        ar: "معطف من فرو المنك العصري",
      },
      description: {
        ru: "Современный крой, лаконичные детали. Максимум внимания к силуэту.",
        en: "Modern cut, minimal details. Maximum focus on silhouette.",
        ar: "قصّة عصرية، تفاصيل بسيطة. تركيز كبير على القصّة.",
      },
    },
    {
      id: "coat4",
      image: "/products/coat4.jpg",
      name: {
        ru: "Шуба из норки Premium",
        en: "Premium Mink Coat",
        ar: "معطف من فرو المنك الفاخر",
      },
      description: {
        ru: "Премиальная модель с удлинённым силуэтом. Ручная выделка высшего качества.",
        en: "Premium model with elongated silhouette. Highest quality handcrafted finishing.",
        ar: "موديل فاخر بقصّة ممدودة. تشطيب يدوي بأعلى جودة.",
      },
    },
    {
      id: "coat5",
      image: "/products/coat5.jpg",
      name: {
        ru: "Шуба из норки Timeless",
        en: "Timeless Mink Coat",
        ar: "معطف من فرو المنك الخالد",
      },
      description: {
        ru: "Вневременной дизайн, безупречная фактура. Для тех, кто выбирает вечность.",
        en: "Timeless design, impeccable texture. For those who choose eternity.",
        ar: "تصميم خالد، نسيج لا تشوبه شائبة. لمن يختارون الخلود.",
      },
    },
  ],
};

const catalogContent: Record<
  Lang,
  {
    title: string;
    back: string;
    order: string;
  }
> = {
  ru: {
    title: "Каталог",
    back: "Назад",
    order: "Заказать",
  },
  en: {
    title: "Catalog",
    back: "Back",
    order: "Order",
  },
  ar: {
    title: "الكتالوج",
    back: "رجوع",
    order: "اطلب",
  },
};

const TELEGRAM_LINK = "https://t.me/llamamemariaa";

function CatalogContent() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<Lang>("ru");
  const [productType, setProductType] = useState<ProductType>("coats");

  useEffect(() => {
    const langParam = searchParams.get("lang") as Lang;
    const typeParam = searchParams.get("type") as ProductType;
    if (langParam && ["ru", "en", "ar"].includes(langParam)) {
      setLang(langParam);
    }
    if (typeParam && ["scarves", "coats"].includes(typeParam)) {
      setProductType(typeParam);
    }
  }, [searchParams]);

  const t = catalogContent[lang];
  const isArabic = lang === "ar";
  const currentProducts = products[productType];

  return (
    <main
      className="min-h-screen bg-black text-white fade-in"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header
          className={`flex items-center justify-between mb-8 sm:mb-12 ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <Link
            href={`/?lang=${lang}`}
            className="text-sm sm:text-base text-white/60 hover:text-white transition-colors font-inter"
          >
            ← {t.back}
          </Link>

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

        {/* Title */}
        <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-12 font-normal">
          {t.title}
        </h1>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {currentProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white/60 font-inter">Loading...</div>
      </main>
    }>
      <CatalogContent />
    </Suspense>
  );
}

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

type ProductCardProps = {
  product: Product;
  lang: Lang;
  index: number;
};

function ProductCard({ product, lang, index }: ProductCardProps) {
  const t = catalogContent[lang];
  const orderText =
    lang === "ru"
      ? `Здравствуйте! Интересует товар: ${product.name[lang]}`
      : lang === "en"
      ? `Hello! I'm interested in: ${product.name[lang]}`
      : `مرحباً! أنا مهتم بـ: ${product.name[lang]}`;
  const telegramLink = `${TELEGRAM_LINK}?text=${encodeURIComponent(orderText)}`;

  return (
    <div
      className="group flex flex-col fade-in opacity-0"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
    >
      <div className="relative w-full aspect-[3/4] mb-4 sm:mb-6 overflow-hidden rounded-lg bg-white/5 border border-white/5">
        <Image
          src={product.image}
          alt={product.name[lang]}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <h3 className="font-cormorant text-lg sm:text-xl mb-2 sm:mb-3 font-semibold leading-tight">
        {product.name[lang]}
      </h3>
      <p className="font-inter text-sm sm:text-base text-white/70 mb-4 sm:mb-6 leading-relaxed font-light flex-grow">
        {product.description[lang]}
      </p>
      <a
        href={telegramLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full rounded-lg px-4 py-3 sm:py-4 text-sm sm:text-base text-center font-inter border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
      >
        {t.order}
      </a>
    </div>
  );
}
