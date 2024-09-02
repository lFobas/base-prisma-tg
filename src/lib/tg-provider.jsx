'use client';
import { useEffect, useState } from 'react';
import { useUserStore } from './store';
import { tgUsersAnalitik } from './actions';
import { useRouter } from 'next/navigation';
import NotAuthorized from '@/components/NotAuthorized';


export default function Telegram({ children }) {
  const [themeParams, setThemeParams] = useState({});
  const [user, initUser] = useUserStore((state) => [state.user, state.initUser]);
  const router = useRouter();
  const [showNotAuthorized, setShowNotAuthorized] = useState(false); // Додаємо стан для показу заглушки

  const addUser = async (data) => {
    const visitor = JSON.stringify(data);
    const res = await tgUsersAnalitik(visitor);

    if (res.role !== 'ADMIN') {
      setShowNotAuthorized(true); // Встановлюємо стан для показу заглушки
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;
    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const theme = window.Telegram.WebApp.themeParams;
        const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
        if (tgUser) {
          addUser(tgUser);
          initUser(tgUser);
        }else{
          setShowNotAuthorized(true)
        }
        setThemeParams(theme);
        window.Telegram.WebApp.expand();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (showNotAuthorized) {
    return <NotAuthorized />; // Повертаємо заглушку, якщо користувач не авторизований
  }

  return <div>{children}</div>;
}
