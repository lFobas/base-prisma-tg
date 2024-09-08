import { UsersIcon, HomeModernIcon, MapIcon, CommandLineIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';

export default function MenegeMenu({ children }) {

  return (
    <div className="flex h-screen">
      <div className="w-10/12 p-2 justify-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        { children }
      </div>
      <div
        className='sm:w-2/12 w-16 bg-gray-800 text-white h-full transition-all duration-300 ease-in-out flex flex-col absolute right-0 top-0'
      >
        <div className='flex item-center justify-center p-3'>
          <Link href={'/'} className="flex w-full p-1 button justify-end">
            <HomeModernIcon className='h-5 w-5' />
          </Link>
        </div>
        <nav className="flex-1 p-3 mt-4">
          <ul>
            <li className="mb-4">
              <Link href={'/manage'} className="flex w-full p-1 button justify-end">
                <CommandLineIcon className='h-5 w-5' />
                <span className='ml-3 hidden md:block'>Menu</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link href={'/manage/users'} className="flex w-full p-1 justify-end">
                <UsersIcon className="h-5 w-5" />
                <span className='ml-3 hidden md:block'>Користувачі</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link href={'/manage'} className="flex w-full p-1 button justify-end">
                <MapIcon className='h-5 w-5' />
                <span className='ml-3 hidden md:block'>Адреси</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
