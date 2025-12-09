import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { TelegramProvider } from "@/components/TelegramProvider";

// Cormorant Garamond — для заголовков (high-fashion)
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

// Inter — для основного текста
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lux Fur — Mink Collection",
  description: "Luxury mink coats & accessories",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased bg-black text-white`}
      >
        {/* Telegram WebApp SDK */}
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <TelegramProvider>
          {children}
        </TelegramProvider>
      </body>
    </html>
  );
}
