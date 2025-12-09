"use client";

import { useEffect, useState, useCallback } from "react";
import {
  isTelegramWebApp,
  getTelegramWebApp,
  getTelegramTheme,
  getTelegramUser,
  getTelegramInitData,
  type TelegramWebApp,
} from "@/lib/telegram";

export interface UseTelegramReturn {
  webApp: TelegramWebApp | null;
  isReady: boolean;
  theme: "light" | "dark";
  user: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
  } | null;
  initData: string | null;
  isTelegram: boolean;
}

/**
 * React hook for Telegram WebApp
 */
export function useTelegram(): UseTelegramReturn {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [user, setUser] = useState<UseTelegramReturn["user"]>(null);
  const [initData, setInitData] = useState<string | null>(null);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    // Check if running in Telegram
    const telegramAvailable = isTelegramWebApp();
    setIsTelegram(telegramAvailable);

    if (!telegramAvailable) {
      setIsReady(true);
      return;
    }

    // Get WebApp instance
    const app = getTelegramWebApp();
    if (!app) {
      setIsReady(true);
      return;
    }

    setWebApp(app);
    setTheme(getTelegramTheme());
    setUser(getTelegramUser());
    setInitData(getTelegramInitData());

    // Initialize WebApp
    app.ready();
    app.expand();

    // Listen for theme changes
    const handleThemeChange = () => {
      setTheme(getTelegramTheme());
    };

    // Telegram WebApp events
    if (app.onEvent) {
      app.onEvent("themeChanged", handleThemeChange);
      app.onEvent("viewportChanged", () => {
        app.expand();
      });
    }

    setIsReady(true);

    // Cleanup
    return () => {
      if (app.offEvent) {
        app.offEvent("themeChanged", handleThemeChange);
      }
    };
  }, []);

  return {
    webApp,
    isReady,
    theme,
    user,
    initData,
    isTelegram,
  };
}

