"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "./store";
import { tgUsersAnalitik } from "./actions";
import NotAuthorized from "@/components/NotAuthorized";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import Auth from "@/components/Auth";

export default function Telegram({ children }) {
  const [initUser, user] = useUserStore((state) => [
    state.initUser,
    state.user,
  ]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [guest, setGuest] = useState(false);
  const router = useRouter();

  const addUser = async (data) => {
    const visitor = JSON.stringify(data);
    const res = await tgUsersAnalitik(visitor);
    initUser(res);
    if (res.role === "ADMIN") {
      setIsAuthorized(true);
      setGuest(false);
      router.push("/borg");
    } else {
      setIsAuthorized(true);
      setGuest(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
        if (tgUser) {
          addUser(tgUser);
        } else {
          setLoading(false);
        }
        if (user?.role === "ADMIN") {
          setIsAuthorized(true);
          router.push("/borg");
        } else {
          setGuest(true);
        }
        window.Telegram.WebApp.expand();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthorized) {
    return <Auth login={setIsAuthorized} block={setGuest} />;
  }
  if (guest) {
    return <NotAuthorized />;
  }

  return <div>{children}</div>;
}
