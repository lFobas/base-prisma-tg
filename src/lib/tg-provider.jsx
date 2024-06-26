'use client'
import { useEffect, useState } from 'react';


export default function Telegram({ children }) {
  const [themeParams, setThemeParams] = useState({});

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
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
        document.documentElement.style.setProperty('--input-bg-color', theme.input_bg_color || '#ffffff');
        document.documentElement.style.setProperty('--input-text-color', theme.input_text_color || '#000000');
        document.documentElement.style.setProperty('--checkbox-bg-color', theme.checkbox_bg_color || '#ffffff');
        document.documentElement.style.setProperty('--checkbox-border-color', theme.checkbox_border_color || '#000000');
        document.documentElement.style.setProperty('--checkbox-check-color', theme.checkbox_check_color || '#000000');
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        {children}
    </div>
  );
}
