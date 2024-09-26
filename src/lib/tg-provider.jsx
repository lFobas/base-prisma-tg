"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "./store";
import { tgUsersAnalitik } from "./actions";
import NotAuthorized from "@/components/NotAuthorized";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";

export default function Telegram({ children }) {
  const [themeParams, setThemeParams] = useState({});
  const [initUser, user] = useUserStore((state) => [
    state.initUser,
    state.user,
  ]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  const addUser = async (data) => {
    const visitor = JSON.stringify(data);
    const res = await tgUsersAnalitik(visitor);
    initUser(res);

    if (res.role === "ADMIN") {
      setIsAuthorized(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const theme = window.Telegram.WebApp.themeParams;
        const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
        if (tgUser) {
          addUser(tgUser);
          router.push("/borg");
        } else {
          if (!user) {
            setLoading(false);
            router.push("/");
          }else{
            if(user.role === "ADMIN"){
              setIsAuthorized(true)
              setLoading(false)
            }
            setLoading(false)
          }
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

  if (loading) {
    return <Loader />;
  }

  if (!isAuthorized) {
    return <NotAuthorized />;
  }

  return <div>{children}</div>;
}
