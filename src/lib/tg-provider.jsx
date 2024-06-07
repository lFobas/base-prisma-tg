'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Telegram({ children }) {
  const [themeParams, setThemeParams] = useState({});
  const router = useRouter()

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    router.refresh()
    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const theme = window.Telegram.WebApp.themeParams;
        setThemeParams(theme);
        window.Telegram.WebApp.expand()

        // Застосування кольорів до root елемента
        document.documentElement.style.setProperty('--bg-color', theme.bg_color || '#ffffff');
        document.documentElement.style.setProperty('--text-color', theme.text_color || '#000000');
        document.documentElement.style.setProperty('--button-color', theme.button_color || '#0088cc');
        document.documentElement.style.setProperty('--button-text-color', theme.button_text_color || '#ffffff');
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
        {children}
    </div>
  );
}
