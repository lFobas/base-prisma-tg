'use client'
import RecordCard from '@/components/Card/RecordCard';
import Spiner from '@/components/Spiner/Spiner';
import { getRecordsByDate } from '@/lib/actions';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const RecordsPage = () => {
    const [records, setRecords] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Форматування дати в формат YYYY-MM-DD
      });

    const changeDate = (event) =>{
        const newDate = event.target.value
        setSelectedDate(newDate)
    }

    const handleLoadRecords = async()=>{
        setIsLoading(true)
        const rec = await getRecordsByDate(selectedDate)
        if(rec.length >0){
          setRecords(rec)
          setIsLoading(false)
        }else{
          toast.info("Не знайдено виписок :(", { 
            autoClose: 1000,
            theme: "dark",
            draggable: true,
          });
          setRecords(rec)
          setIsLoading(false)
        }
        
    }

  return (
    <>
        <div className='w-full flex p-2'>
            <input type='date' value={selectedDate} onChange={changeDate} className='border-2 rounded-md p-1'/>
            <button className='bg-teal-500 p-1 rounded-md border-teal-800 border-2 ml-2' onClick={handleLoadRecords}>Загрузити</button>
            {isLoading ? <div className='p-1 m-1 flex justify-center items-center'><Spiner/></div> : null}
        </div>
        {records.length > 0 ? records.map((r)=> <RecordCard key={r.id} record={r} changeable={true} />) : null}
    </>
  )
}

export default RecordsPage