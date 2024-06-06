import prisma from '@/lib/prisma'
import Link from 'next/link'

const ClientDetailPage = async (params) => {
    const id = params.params.id
    const initData = await prisma.client.findUnique({
        where: {
          id,
        },
        include: {
            records: true,
          },
      })
      const clientRecordsSorted = initData.records.sort((a, b)=>{
        const streetA = a.date; 
        const streetB = b.date;
      
        if (streetA < streetB) {
          return -1; 
        }
        if (streetA > streetB) {
          return 1; 
        }})
        

  return (
    <div>
        <Link className='text-2xl text-lime-500 border-lime-500 p-1 border-2 m-2 rounded-md' href={'/'}>	⇐ Назад До Списку</Link>
        <h1 className='p-3 text-2xl'>{initData.name}</h1>
        {clientRecordsSorted.map((r, idx)=> {
            const sum = Number(r.summa)
            const formattedDate = new Date(r?.date).toLocaleDateString();
            return<div key={idx} className={`flex m-2 p-2 border-4 rounded-md ${sum < 0 ? 'border-rose-800' : 'border-teal-700'}`}>
            <p>{formattedDate}</p> |  |
            <p className=''>{sum}</p>|  |
            <p>{r.description}</p>
        </div>})}
    </div>
  )
}

export default ClientDetailPage