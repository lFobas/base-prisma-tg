'use client'
import { editUserById } from '@/lib/actions'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const UserCard = ({user}) => {
    const [userData, setUserData] = useState(user)

    const Change = (e) =>{
        setUserData({
          ...userData,
          [e.target.name]: e.target.value
        })
      }

    const changeUser = async () => {
      try {
        const updatedUser = await editUserById(user.id, userData);
        
        toast.info("Змінено!", { 
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
    <div className='flex flex-col lg:flex-row lg:space-x-4 p-2 border-2 rounded-lg m-1 border-teal-600'>
        <div className='flex justify-between items-center'>
            <div className='flex'>
                <h2>
                    {user?.telegramId}
                </h2>
                <h2 className='mx-2'>
                    {user?.name}
                </h2>
            </div>
            <button className='m-1' onClick={changeUser}>Save</button>
        </div>
        <select name="role" defaultValue={user?.role} onChange={Change} className="mb-2 border border-gray-300  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
          <option value='ADMIN'>ADMIN</option>
          <option value='USER'>USER</option>
          <option value='GUEST'>GUEST</option>
        </select>
    </div>
  )
}

export default UserCard