"use client";

import { useEffect, useState } from "react";
import { initTelegramWebApp, getTelegramTheme, isTelegramWebApp } from "@/lib/telegram";

interface TelegramProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component for Telegram WebApp initialization
 * Handles WebApp.ready() and WebApp.expand() automatically
 */
export function TelegramProvider({ children }: TelegramProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Wait for Telegram WebApp SDK to load
    const init = () => {
      // Check if Telegram WebApp is available
      if (isTelegramWebApp()) {
        // Initialize Telegram WebApp
        initTelegramWebApp();

        // Apply theme from Telegram
        const theme = getTelegramTheme();
        const html = document.documentElement;
        
        // Update HTML class for theme
        if (theme === "light") {
          html.classList.remove("dark");
        } else {
          html.classList.add("dark");
        }

        // Listen for theme changes
        const webApp = window.Telegram?.WebApp;
        if (webApp?.onEvent) {
          const handleThemeChange = () => {
            const newTheme = getTelegramTheme();
            if (newTheme === "light") {
              html.classList.remove("dark");
            } else {
              html.classList.add("dark");
            }
          };

          webApp.onEvent("themeChanged", handleThemeChange);

          // Listen for viewport changes to expand
          webApp.onEvent("viewportChanged", () => {
            if (webApp.expand) {
              webApp.expand();
            }
          });

          return () => {
            if (webApp.offEvent) {
              webApp.offEvent("themeChanged", handleThemeChange);
            }
          };
        }
      }
      setIsInitialized(true);
    };

    // Try to initialize immediately
    if (typeof window !== "undefined") {
      // Check if Telegram WebApp is already loaded
      if (window.Telegram?.WebApp) {
        init();
      } else {
        // Wait for script to load
        const checkInterval = setInterval(() => {
          if (window.Telegram?.WebApp) {
            clearInterval(checkInterval);
            init();
          }
        }, 50);

        // Timeout after 2 seconds
        setTimeout(() => {
          clearInterval(checkInterval);
          setIsInitialized(true);
        }, 2000);
      }
    }
  }, []);

  return <>{children}</>;
}

