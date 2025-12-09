/**
 * Telegram WebApp API Utilities
 * Safe wrapper for Telegram WebApp API with fallback support
 */

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id?: string;
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      is_premium?: boolean;
      photo_url?: string;
    };
    auth_date: number;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  sendData: (data: string) => void;
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
  BackButton: {
    isVisible: boolean;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive: boolean) => void;
    hideProgress: () => void;
    setParams: (params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
    notificationOccurred: (type: "error" | "success" | "warning") => void;
    selectionChanged: () => void;
  };
}

/**
 * Check if Telegram WebApp is available
 */
export function isTelegramWebApp(): boolean {
  if (typeof window === "undefined") return false;
  return !!window.Telegram?.WebApp;
}

/**
 * Get Telegram WebApp instance safely
 */
export function getTelegramWebApp(): TelegramWebApp | null {
  if (!isTelegramWebApp()) return null;
  return window.Telegram!.WebApp as TelegramWebApp;
}

/**
 * Initialize Telegram WebApp
 */
export function initTelegramWebApp(): void {
  const webApp = getTelegramWebApp();
  if (!webApp) return;

  // Notify Telegram that the app is ready
  webApp.ready();

  // Expand the app to full height
  webApp.expand();
}

/**
 * Get current theme from Telegram
 */
export function getTelegramTheme(): "light" | "dark" {
  const webApp = getTelegramWebApp();
  if (!webApp) return "dark"; // Default fallback
  return webApp.colorScheme;
}

/**
 * Get user data from Telegram
 */
export function getTelegramUser() {
  const webApp = getTelegramWebApp();
  if (!webApp) return null;
  return webApp.initDataUnsafe.user || null;
}

/**
 * Get initData for verification
 */
export function getTelegramInitData(): string | null {
  const webApp = getTelegramWebApp();
  if (!webApp) return null;
  return webApp.initData || null;
}

