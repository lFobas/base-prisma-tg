import {
  UsersIcon,
  HomeModernIcon,
  MapIcon,
  CommandLineIcon,
  DocumentCurrencyDollarIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";

export default function MenegeMenu({ children }) {
  return (
    <div className="flex h-screen">
      <div className="w-10/12 p-2 justify-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        {children}
      </div>
      <div className="md:w-2/12 w-16 bg-gray-800 text-white h-full transition-all duration-300 ease-in-out flex flex-col fixed right-0 top-0">
        <div className="flex item-center justify-center p-3">
          <Link href={"/"} className="flex w-full p-1 button justify-end">
            <HomeModernIcon className="h-5 w-5" />
          </Link>
        </div>
        <nav className="flex-1 px-3 mt-1">
          <ul>
            <li className="mb-4">
              <Link
                href={"/manage"}
                className="flex w-full p-1 button justify-end md:justify-start"
              >
                <CommandLineIcon className="h-5 w-5" />
                <span className="ml-3 hidden md:block">Menu</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href={"/manage/users"}
                className="flex w-full p-1 justify-end md:justify-start"
              >
                <UsersIcon className="h-5 w-5" />
                <span className="ml-3 hidden md:block">Користувачі</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href={"/manage"}
                className="flex w-full p-1 button justify-end md:justify-start"
              >
                <MapIcon className="h-5 w-5" />
                <span className="ml-3 hidden md:block">Адреси</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href={"/manage/record"}
                className="flex w-full p-1 button justify-end md:justify-start"
              >
                <DocumentCurrencyDollarIcon className="h-5 w-5" />
                <span className="ml-3 hidden md:block">Виписки</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href={"/manage/upload"}
                className="flex w-full p-1 button justify-end md:justify-start"
              >
                <ArrowUpTrayIcon className="h-5 w-5" />
                <span className="ml-3 hidden md:block">Загрузка</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
