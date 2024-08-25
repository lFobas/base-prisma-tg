'use client'
import RecordCard from '@/components/Card/RecordCard'
import Spiner from '@/components/Spiner/Spiner'
import { editeClientById, getClientById } from '@/lib/actions'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ClientDetailPage = (params) => {

  const id = params.params.id
  const [isLoading, setIsLoading] = useState(false)
  const [client, setClient] = useState(null) 
  const [records, setRecords] = useState([]) 

  useEffect(()=>{
    initData()
  },[])

  const initData = async () =>{
    
    const res = await getClientById(id)
    
    setClient(res)
    setRecords(res?.records?.sort((a, b)=>{
      const recordA = a.date; 
      const recordB = b.date;
    
      if (recordA < recordB) {
        return 1; 
      }
      if (recordA > recordB) {
        return -1; 
      }}))
  }

  const handleCloseOpen = async()=>{
    const data = { isNoActive : !client.isNoActive }
    setIsLoading(true)
    await editeClientById(id, data)
    await initData()
    toast.info("Змінено!", { 
      autoClose: 1000,
      theme: "dark",
      draggable: true,
   });
    setIsLoading(false)
  }

        

  return (
    <div className='py-4'>
        <Link className='text-2xl text-lime-500 border-lime-500 p-2 border-2 m-2 rounded-md' href={'/'}>	⇐ Назад До Списку</Link>
        <h1 className='p-3 text-2xl'>{client?.name}</h1>
        {client ? 
          <button
            className={`p-2 m-2 flex justify-center items-center rounded-md  h-10 ${isLoading ? 'bg-yellow-300' : !client?.isNoActive ? "bg-red-600" : "bg-green-600" }`} 
            onClick={handleCloseOpen}
          >
          {isLoading ? <Spiner /> : 
            !client?.isNoActive ? 'Відключити Клієнта' : "Поновити Клієнта"}
          </button> : <></>
        }
        {records?.map((r, idx)=> {
            const sum = Number(r.summa)
            const formattedDate = new Date(r?.date).toLocaleDateString('uk-UA', {
                                                                                  day: '2-digit',
                                                                                  month: '2-digit',
                                                                                  year: 'numeric'
                                                                                });
        return <RecordCard key={idx} record={r} changeable={false} />
        })}
    </div>
  )
}

export default ClientDetailPage