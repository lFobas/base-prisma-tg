"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../../lib/store";
import { getUsers } from "../../../../lib/actions";
import Spiner from "../../../../components/Spiner/Spiner";
import UserCard from "../../../../components/Card/UserCard";
import { iUser } from "../../../../lib/types/user";



const UsersPage = () => {
  const { users, setUsers } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUsers();
      setUsers(res as iUser[]);
      setIsLoading(false);
    };
  
    fetchData();
  }, [setUsers]);

  return (
    <div className="sm:w-1/2 mx-auto">
      <h1 className="font-semibold">Admins:</h1>
      {isLoading ? (
        <Spiner />
      ) : users.filter((u) => u.role === "ADMIN").length > 0 ? (
        users
          .filter((u) => u.role === "ADMIN")
          .map((u) => <UserCard key={u.id} user={u} />)
      ) : (
        <p className="mx-5">Немає Адміністраторів</p>
      )}

      <h1 className="font-semibold">Users:</h1>
      {isLoading ? (
        <Spiner />
      ) : users.filter((u) => u.role === "USER").length > 0 ? (
        users
          .filter((u) => u.role === "USER")
          .map((u) => <UserCard key={u.id} user={u} />)
      ) : (
        <p className="mx-5">Немає Користувачів</p>
      )}

      <h1 className="font-semibold">Unregister:</h1>
      {isLoading ? (
        <Spiner />
      ) : users.filter((u) => u.role === "GUEST").length > 0 ? (
        users
          .filter((u) => u.role === "GUEST")
          .map((u) => <UserCard key={u.id} user={u} />)
      ) : (
        <p className="mx-5">Немає Незареєстрованих Користувачів</p>
      )}
    </div>
  );
};

export default UsersPage;
