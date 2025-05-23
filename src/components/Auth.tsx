"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUserStore } from "../lib/store";
import { getUser } from "../lib/actions";

const Auth = ({ login, block }) => {
  const router = useRouter();
  const [telegramIdForm, setTelegramIdForm] = useState("");
  const initUser = useUserStore((state) => state.initUser);

  const handleSubmit = async () => {
    try {
      const res = await getUser(telegramIdForm);
      console.log("res auth", res);
      
      initUser(res);
      if(!res?.role) {
        toast.error("Login failed", {
          autoClose: 1000,
          theme: "dark",
          draggable: true,
        });
        login(false)
        block(true);
        return;}
      if (res?.role !== "GUEST") {
        toast.success("Авторизовано!", {
          autoClose: 1000,
          theme: "dark",
          draggable: true,
        });
        login(true);
        block(false);
        router.push("/borg");
      } else {
        toast.error("Login failed", {
          autoClose: 1000,
          theme: "dark",
          draggable: true,
        });
        console.log("Login failed");
        login(true);
        block(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div>
          <div className="mb-4">
            <label
              htmlFor="telegramId"
              className="block text-sm font-medium text-gray-700"
            >
              Telegram ID
            </label>
            <input
              type="text"
              id="telegramId"
              value={telegramIdForm}
              onChange={(e) => setTelegramIdForm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your Telegram ID"
            />
          </div>
          <button onClick={handleSubmit} className="button w-full">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
