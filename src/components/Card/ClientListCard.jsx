import Link from 'next/link'
import React from 'react'

const ClientListCard = ({client, summa}) => {
  return (
    <Link href={`/client/${client.id}`} className="flex flex-wrap items-center justify-between border border-gray-300 rounded-md px-1 py-3 my-3 shadow-sm bg-white w-full">
      <div className="font-semibold text-gray-800 flex-grow-0">
        {client.bill}
      </div>
      <div className="text-gray-800 flex-grow mx-1">
       {client.name} - {client.street}, {client.home}
      </div>
      <div className={`font-semibold ${summa < -400 ? 'text-red-600' : 'text-emerald-600'} flex-grow-0 text-right`}>
        {summa}
      </div>
    </Link>
  )
}

export default ClientListCard