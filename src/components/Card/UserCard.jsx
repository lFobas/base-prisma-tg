"use client";
import { editUserById } from "@/lib/actions";
import { useUserStore } from "@/lib/store";
import React, { useState } from "react";
import { toast } from "react-toastify";

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
    <div className="flex flex-col sm:flex-row sm:justify-between  lg:space-x-4 p-2 border-2 rounded-lg m-1 border-teal-600">
      <div className="flex justify-between items-center">
        <div className="md:flex">
          <h2 className="font-bold ml-1">{user?.telegramId}</h2>
          <h2 className="font-semibold ml-1">{user?.name}</h2>
        </div>
      </div>
      <div className="flex content-center justify-end">
        <select
          name="role"
          value={userData.role}
          onChange={handleChange}
          className="border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5"
        >
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
          <option value="GUEST">GUEST</option>
        </select>
        <button className="mx-1" onClick={changeUser}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UserCard;
