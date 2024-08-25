'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClients, getClientsByAdres } from "@/lib/actions";
import { useFilterStore } from "@/lib/store";
import Spiner from "./Spiner/Spiner";


const Table = ({ adr }) => {

  const [
    checkedActive, 
    checkedUsilok, 
    selectedAdres, 
    dataCl, 
    changeActive, 
    changeUsilok, 
    selectAdres, 
    selectDataCl
  ] = useFilterStore((state) => [
    state.checkedActive, 
    state.checkedUsilok,
    state.selectedAdres,
    state.dataCl,
    state.changeActive,
    state.changeUsilok,
    state.selectAdres,
    state.selectDataCl
  ]);

  const [displayClient, setDisplayClient] = useState(dataCl)
  const [isLoading, setIsLoading] = useState(false)
  const [baner, setBaner] = useState('')

  
  useEffect(()=>{
    setIsLoading(true)
    setBaner('Виберіть Село')
    setIsLoading(false)
  },[])


  const getTotal = (items = []) => {
      return items.reduce((acc, item) => {
          return acc += parseFloat(item.summa)
      }, 0)
  }

  const adresChange = async(e) => {
    setIsLoading(true)
    setBaner(null)
    const newAdres = e.target.value;
    selectAdres(newAdres);
    if(newAdres === ''){
      setIsLoading(true)
      const newData = await getClients()
      setDisplayClient(newData)
      selectDataCl(newData)
      setIsLoading(false)
    }else{
      const data = await getClientsByAdres(newAdres)
      const filteredData = data.filter((c) => c.adres?.name === newAdres);
      selectDataCl(filteredData)
      if(filteredData.length > 0){
        setDisplayClient(filteredData);
      }else{
        setDisplayClient(data);
      }
    }
    setIsLoading(false)
  };

  const searcChange = (e)=>{  
    setBaner(null)
    if(e.target.value){
      if(selectedAdres){
        const filte = dataCl.filter((c) => c.name.toLowerCase().includes(e.target.value.toLowerCase()))
        if(filte.length >0 ){
          setDisplayClient(filte)
        }else{
          setDisplayClient([])
          setBaner("Нема збігів")
        }
      }else{
        const filte = dataCl.filter((c) => c.name.toLowerCase().includes(e.target.value.toLowerCase()) )
        setDisplayClient(filte)
      }
    }else{
        setDisplayClient(dataCl)
    }
  }

  const borgChange =(e)=>{
    if(e.target.value){
      if(selectedAdres){
        const filte = dataCl.filter((c) => getTotal(c.records) <= -e.target.value && c.adres?.name === selectedAdres )
        if(filte.length >0 ){
          setDisplayClient(filte)
        }else{
          setDisplayClient([])
        }
      }else{
        const filte = dataCl.filter((c) => getTotal(c.records) <= e.target.value )
        setDisplayClient(filte)
      }
    }else{
      if(selectedAdres){
        setDisplayClient(dataCl)
      }
    }
  }
    return (
      <div className="w-full max-w-screen-sm">
        <label className="mx-2 text-gray-700">
          Населений пункт:
        </label>
        <select name="adres" defaultValue={selectedAdres} onChange={adresChange} className="mb-2 border border-gray-300  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" style={{ backgroundColor: 'var(--input-bg-color)', color: 'var(--input-text-color)' }}>
          <option value=''>Всі Села</option>
          {adr.map((a)=>(<option key={a.name} value={a?.name}>{a?.name}</option>))}
        </select>
        <label className="mx-2 text-gray-700">
          Пошук по імені абонента:
        </label>
        <input type="text" defaultValue={''} onChange={searcChange} name="search" className="mb-2 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" style={{ backgroundColor: 'var(--input-bg-color)', color: 'var(--input-text-color)' }} placeholder="Знайти по імені" />
        <div className="flex justify-between text-center ">
          <div className="flex w-2/3">
          <input
          type="checkbox"
          checked={checkedActive}
          onChange={()=> changeActive(!checkedActive)}
          className="my-auto w-5 h-5 p-2.5 text-blue-600 transition duration-150 ease-in-out"
          />
          <label className="mx-2 my-auto text-gray-700">
            Закриті
          </label>
          <input
            type="checkbox"
            checked={checkedUsilok}
            onChange={()=>changeUsilok(!changeUsilok)}
            className="my-auto w-5 h-5 p-2.5 text-blue-600 transition duration-150 ease-in-out"
            />
          <label className="flex mx-2 my-auto text-gray-700 justify-center">
            Підсилювачі
          </label>
          </div>
          <input type="text" defaultValue={''} onChange={borgChange} name="search" className="border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5" style={{ backgroundColor: 'var(--input-bg-color)', color: 'var(--input-text-color)' }} placeholder="Борг Більше" />
        </div>
        {!isLoading ? 
        <table className="block w-full">
          <thead className="">
            <tr className=""> 
              <th className="text-left font-bold py-4">О\Р</th>
              <th className="text-left font-bold py-4">Абонент</th>
              <th className="text-left font-bold py-4">Адреса</th>
              <th className="text-left font-bold py-4">Баланс</th>
            </tr>
          </thead>
          <tbody>
          {displayClient.length > 0 ? displayClient.filter(item => item.isNoActive === checkedActive && item.isUsilok === checkedUsilok).map((item) => (
            <tr key={item.id} className={`border-b`}>
              <td className={`text-left px-0 py-4 ${!item.isNoActive ? "text-emerald-600" : 'text-red-600'}`}>{item.bill}</td>
              <td className="text-left px-0 py-4 underline">
                <Link href={`/client/${item.id}`}>{item.name}</Link>
              </td>
              <td className="text-left px-0 py-4">{item.adres?.name} - {item.street}, {item.home}</td>
              <td className={`text-left px-0 py-4 ${getTotal(item.records) < -350 ? "text-red-600" : 'text-emerald-600'}`}>
                {getTotal(item.records)}
              </td>
            </tr>
            )) : (
            <tr>
              <td>
                <h1>{baner}</h1>
              </td>
            </tr>
          )}
          </tbody>
        </table> : <Spiner/>}
      </div>
      )};
        
    export default Table;
