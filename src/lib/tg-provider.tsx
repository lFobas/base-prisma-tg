"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUserStore } from "./store";
import { tgUsersAnalitik } from "./actions";

import Loader from "../components/Loader/Loader";
import Auth from "../components/Auth";
import NotAuthorized from "../components/NotAuthorized";
import { iUser } from "./types/user";

export default function Telegram({ children }: { children: React.ReactNode }) {
  const [initUser] = useUserStore((state) => [state.initUser]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [guest, setGuest] = useState(false);
  const router = useRouter();

  const addUser = async (data: iUser) => {
    try {
      const res = await tgUsersAnalitik(data);
      initUser(res);

      if (res.role === "GUEST") {
        setIsAuthorized(true);
        setGuest(true);
      } else {
        setIsAuthorized(true);
        setGuest(false);
        router.push("/borg");
      }
    } catch (err) {
      console.error("Authorization error:", err);
      setIsAuthorized(false);
      setGuest(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;

    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
        window.Telegram.WebApp.expand();

        if (tgUser) {
          addUser(tgUser as unknown as iUser);
        } else {
          setLoading(false);
          setIsAuthorized(false);
          setGuest(true);
        }
      } else {
        setGuest(true);
        setIsAuthorized(false);
        setLoading(false);
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
    return <Auth login={setIsAuthorized} block={setGuest} />;
  }

  if (guest) {
    return <NotAuthorized />;
  }

  return <div>{children}</div>;
}
