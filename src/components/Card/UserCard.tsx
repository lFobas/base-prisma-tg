"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useUserStore } from "../../lib/store";
import { editUserById } from "../../lib/actions";

const UserCard = ({ user }) => {
  const [userData, setUserData] = useState(user);
  const { users, setUsers } = useUserStore();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const changeUser = async () => {
    try {
      const updatedUser = await editUserById(user.id, userData);
      const updatedUsers = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      );
      setUsers(updatedUsers);
      toast.info(`${updatedUser.name} Змінено!`, {
        autoClose: 1000,
        theme: "dark",
        draggable: true,
      });
    } catch (error) {
      toast.error("Помилка при зміні користувача. Спробуйте ще раз.", {
        autoClose: 3000,
        theme: "dark",
        draggable: true,
      });
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-3 p-3 border-2 rounded-lg m-2 border-teal-600 bg-white shadow-sm">
      {/* Інформація про користувача */}
      <div className="flex flex-col  gap-2">
        <h2 className="font-medium text-sm text-gray-800">
          {user?.telegramId}
        </h2>
        <h2 className="font-bold text-gray-700">{user?.name}</h2>
      </div>

      {/* Роль і кнопка збереження */}
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <select
          name="role"
          value={userData?.role}
          onChange={handleChange}
          className="border border-gray-300 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 p-2 min-w-[120px]"
        >
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
          <option value="GUEST">GUEST</option>
        </select>
        <button
          onClick={changeUser}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
        >
          Зберегти
        </button>
      </div>
    </div>
  );
};

export default UserCard;
