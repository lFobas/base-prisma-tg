'use client'
import { useEffect, useState } from 'react';
import { useUserStore } from './store';


export default function Telegram({ children }) {
  const [themeParams, setThemeParams] = useState({});
  const [user, initUser] = useUserStore((state)=> [state.user, state.initUser])

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const theme = window.Telegram.WebApp.themeParams;
        initUser(window.Telegram.WebApp.initDataUnsafe.user)
        setThemeParams(theme);
        window.Telegram.WebApp.expand()

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
