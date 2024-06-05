'use client'

import { useState } from "react";

const Table = ({ data, adr }) => {

    const [displayClient, setDisplayClient] = useState(data)

    const getTotal = (items = []) => {
        return items.reduce((acc, item) => {
            return acc += parseFloat(item.summa)
        }, 0)
    }

    const adresChange = (e) =>{ 
        const d = data.filter((c) => c.adres?.name === e.target.value)
        if(data.length>0){
          setDisplayClient(d)
        }else{
          setDisplayClient(data)
        }        
      }
      const searcChange =(e)=>{
        if(e.target.value){
          const filte = displayClient.filter((c) => c.name.toLowerCase().includes(e.target.value.toLowerCase()))
          if(filte.length >0 ){
            setDisplayClient(filte)
          }else{
            setDisplayClient([])
          }
        }else{
            setDisplayClient(data)
        }
      }

    return (
        <div className="mx-0 p-1">
                <select name="adres" defaultValue='' onChange={adresChange} className="border border-gray-300  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                  <option disabled value=''>Всі Села</option>
                  {adr.map((a)=>(<option key={a.name} value={a?.name}>{a?.name}</option>))}
                </select>
                <input type="text" defaultValue={''} onChange={searcChange} name="search" className="border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Знайти" />

        <table className="w-full mx-3">
          <thead className="">
            <tr className=""> 
              <th className="text-left font-bold py-4">О\Р</th>
              <th className="text-left font-bold py-4">Імя</th>
              <th className="text-left font-bold py-4">Адреса</th>
              <th className="text-left font-bold py-4">Борг</th>
            </tr>
          </thead>
          <tbody>
            {displayClient.length >0 ? displayClient?.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="text-left px-0 py-4">{item.bill}</td>
                <td className="text-left px-0 py-4">{item.name}</td>
                <td className="text-left px-0 py-4">{item.adres?.name} {item.street},{item.home}</td>
                <td className="text-left px-0 py-4">{getTotal(item.records)}</td>
              </tr>
            )) : <h1>No Result</h1>}
          </tbody>
        </table>
        </div>
      );
    };
    
    export default Table;
