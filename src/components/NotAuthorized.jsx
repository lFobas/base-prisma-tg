import React from 'react';

const NotAuthorized = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="text-center p-6 bg-white shadow-md rounded-lg max-w-md w-full">
      <h1 className="text-2xl font-semibold text-red-600 mb-4 md:text-3xl">Access Denied</h1>
      <p className="text-lg text-gray-700 md:text-xl">У Вас Немає Доступу до цієї сторінки.</p>
    </div>
  </div>
);

export default NotAuthorized;