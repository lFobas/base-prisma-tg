"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpTrayIcon,
  DocumentCurrencyDollarIcon,
  HomeIcon,
  MapIcon,
  TvIcon,
  UsersIcon,
  BanknotesIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SideBar2 = () => {
  const [isColapse, setIsColapse] = useState(false);
  const path = usePathname();

  return (
    <div
      className={`flex w-full absolute shadow-md shadow-black md:relative bottom-0 -translate-x-0 rounded-md md:rounded-none transition-all duration-300 bg-[#19191A] text-[#737373] ${
        isColapse ? "md:w-48" : "md:w-16"
      }`}
    >
      <div className="flex w-full md:flex-col gap-3 h-full p-3 ">
        <div className="flex py-2 justify-center relative">
          <button
            onClick={() => setIsColapse(!isColapse)}
            className="hidden p-1 md:block absolute -right-10 rounded-lg bg-[#FF971D] top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-300 z-50"
          >
            {isColapse ? (
              <ArrowLeftIcon className="w-5 h-5" />
            ) : (
              <ArrowRightIcon className="w-5 h-5" />
            )}
          </button>
          <TvIcon className="w-8 h-8 text-[#FF971D]" />
          <h1
            className={`${
              isColapse ? "!block" : "!hidden"
            } hidden md:flex transition-all duration-300 text-2xl px-2 text-white font-semibold`}
          >
            BeregTv
          </h1>
        </div>

        <div className="flex md:flex-col w-full justify-between gap-5 items-center">
          <Link
            className={`flex w-full gap-1 text-[#737373] ${
              isColapse ? "justify-start" : "justify-center"
            } ${path === "/v2" ? "text-[#FF971D] text-lg " : ""}`}
            href="/v2"
          >
            <HomeIcon className="w-6 h-6" />
            <p
              className={`hidden transition-all duration-300 md:block ${
                isColapse ? "!flex" : "!hidden"
              }`}
            >
              Home
            </p>
          </Link>
          <Link
            className={`flex w-full gap-1 text-[#737373] ${
              isColapse ? "!justify-start" : ""
            } justify-center ${
              path === "/v2/borg" ? "text-[#FF971D] text-lg " : ""
            }`}
            href="/v2/borg"
          >
            <BanknotesIcon className="w-6 h-6" />
            <p
              className={`hidden md:block transition-all duration-300 ${
                isColapse ? "!block" : "!hidden"
              }`}
            >
              Борги
            </p>
          </Link>
          <Link
            className={`flex w-full gap-1 text-[#737373] ${
              isColapse ? "!justify-start" : ""
            } justify-center`}
            href="/v2"
          >
            <UsersIcon className="w-6 h-6" />
            <p
              className={`hidden transition-all duration-300 md:block ${
                isColapse ? "!block" : "!hidden"
              }`}
            >
              Користувачі
            </p>
          </Link>
          <Link
            className={`flex w-full gap-1 text-[#737373] ${
              isColapse ? "!justify-start" : ""
            } justify-center`}
            href="/v2"
          >
            <MapIcon className="w-6 h-6" />
            <p
              className={`hidden transition-all duration-300 md:block ${
                isColapse ? "!block" : "!hidden"
              }`}
            >
              Адреси
            </p>
          </Link>
          <Link
            className={`flex w-full gap-1 text-[#737373] ${
              isColapse ? "!justify-start" : ""
            } justify-center`}
            href="/v2"
          >
            <DocumentCurrencyDollarIcon className="w-6 h-6" />
            <p
              className={`hidden md:block transition-all duration-300 ${
                isColapse ? "!block" : "!hidden"
              }`}
            >
              Виписки
            </p>
          </Link>
          <Link
            className={`flex w-full gap-1 text-[#737373] ${
              isColapse ? "!justify-start" : ""
            } justify-center`}
            href="/v2"
          >
            <ArrowUpTrayIcon className="w-6 h-6" />
            <p
              className={`hidden md:block transition-all duration-300 ${
                isColapse ? "!block" : "!hidden"
              }`}
            >
              Загрузки
            </p>
          </Link>
          <Link
            className={`flex w-full gap-1 text-[#737373] ${
              isColapse ? "!justify-start" : ""
            } justify-center`}
            href="/manage"
          >
            <CommandLineIcon className="w-6 h-6" />
            <p
              className={`hidden md:block transition-all duration-300 ${
                isColapse ? "!block" : "!hidden"
              }`}
            >
              Original
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar2;
