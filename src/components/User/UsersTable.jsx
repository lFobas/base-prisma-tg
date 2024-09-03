import React from 'react'
import UserCard from '../Card/UserCard';

export default function UsersTable ({data}) {

  return (
    <div>
      {data.length > 0 ? data.map((u)=> <UserCard key={u.id} user={u} />) : null}
    </div>
  )
}
