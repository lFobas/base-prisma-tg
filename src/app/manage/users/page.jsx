'use client'
import UserCard from '@/components/Card/UserCard';
import React, { useEffect } from 'react';
import { getUsers } from '@/lib/actions';
import { useUserStore } from '@/lib/store';


const UsersPage = () => {
    const { users, setUsers } = useUserStore();

    useEffect(() => {
      const fetchData = async () => {
        const res = await getUsers();
        setUsers(res);
      };

      fetchData();
    }, [setUsers]); // Оновлення користувачів при зміні

    return (
        <div className='sm:w-1/2 mx-auto'>
          <h1 className='font-semibold'>Admins</h1>
          {users.filter(u => u.role === 'ADMIN').length > 0 
            ? users
                .filter(u => u.role === 'ADMIN')
                .map((u) => <UserCard key={u.id} user={u} />)
            : <p className='mx-5'>Немає Адміністраторів</p>}

          <h1 className='font-semibold'>Users</h1>
          {users.filter(u => u.role === 'USER').length > 0 
            ? users
                .filter(u => u.role === 'USER')
                .map((u) => <UserCard key={u.id} user={u} />)
            : <p className='mx-5'>Немає Користувачів</p>}

          <h1 className='font-semibold'>Unregister</h1>
          {users.filter(u => u.role === 'GUEST').length > 0 
            ? users
                .filter(u => u.role === 'GUEST')
                .map((u) => <UserCard key={u.id} user={u} />)
            : <p className='mx-5'>Немає Незареєстрованих Користувачів</p>}
        </div>

    );
};

export default UsersPage;