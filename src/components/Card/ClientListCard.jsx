import Link from 'next/link'
import React from 'react'

const ClientListCard = ({client, summa}) => {
  return (
    <Link href={`/client/${client.id}`} className="secondary-text flex-wrap grid grid-cols-8 items-center justify-between border border-gray-300 rounded-md px-1 py-3 my-3 shadow-sm secondary-background w-full">
      <div className="col-span-1 font-semibold text-gray-800 text-center flex-grow-0">
        {client.bill}
      </div>
      <div className="text-gray-800 col-span-6 grid grid-cols-5 border-r-2 border-l-2 mx-1">
       <div className='col-span-2 border-r-2 px-1 text-start'>
        {client.name}
      </div>
      <p className='col-span-3 px-1 text-start'>
        {client.adresId} - {client.street}, {client.home}
      </p>
      </div>
      <div className={`font-semibold col-span-1 ${summa < -400 ? 'text-red-600' : 'text-emerald-600'} flex-grow-0 text-center`}>
        {summa}
      </div>
    </Link>
  )
}

export default ClientListCard