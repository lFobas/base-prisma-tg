"use client";

import { useUserStore } from "../lib/store";


export default function UserInfo() {
  const [initUser, user] = useUserStore((state) => [
    state.initUser,
    state.user,
  ]);

  const resetUser = () =>{
    initUser(null)
  }
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{user?.name}</span>
        </div>
        <div>
          TelegramId: <span className="font-bold">{user?.telegramId}</span>
        </div>
        <div>
          Role: <span className="font-bold">{user?.role}</span>
        </div>
        <button onClick={resetUser} className="bg-red-500 text-white font-bold px-6 py-2 mt-3">
          Log Out
        </button>
      </div>
    </div>
  );
}
