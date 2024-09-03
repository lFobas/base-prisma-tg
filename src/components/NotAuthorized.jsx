import React from 'react';

const NotAuthorized = () => (
  <div className="flex h-screen w-screen items-center justify-center my-bg p-4 sm:p-8">
    <div className="my-bg-sec shadow-md rounded-lg p-6 sm:p-8 text-center max-w-sm sm:max-w-md md:max-w-lg mx-auto">
      <div className="mb-4">
        <svg
          className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.995-1.85L21 14V8a2 2 0 00-2-2h-1.414l-1.293-1.293a1 1 0 00-.707-.293H8.414a1 1 0 00-.707.293L6.414 6H5a2 2 0 00-2 2v6c0 1.054.816 1.918 1.85 1.995L5 18z"
          ></path>
        </svg>
      </div>
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">Access Denied</h1>
      <p className="text-gray-600 text-sm sm:text-base">
        У Вас Немає Доступу до цієї сторінки.
      </p>
    </div>
  </div>
  );

export default NotAuthorized;