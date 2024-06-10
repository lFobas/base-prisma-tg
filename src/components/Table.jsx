'use client'

import { useState } from "react";
import Link from "next/link";


const Table = ({ data, adr }) => {

  const [checkedActive, setCheckedActive] = useState(false);
  const [checkedUsilok, setCheckedUsilok] = useState(false);
  const [selectedAdres, setSelectedAdres] = useState(null);
  const [displayClient, setDisplayClient] = useState(data.filter((c) => c?.isNoActive === false && c?.isUsilok === false))

    const getTotal = (items = []) => {
        return items.reduce((acc, item) => {
            return acc += parseFloat(item.summa)
        }, 0)
    }

    const handleChangeActive = () => {
      const newChecked = !checkedActive;
      setCheckedActive(newChecked);
      if(selectedAdres){
        const filte = data.filter((c) => c?.isNoActive === newChecked && c.adres?.name === selectedAdres && c?.isUsilok === checkedUsilok);
        setDisplayClient(filte);
      }else{
        const filte = data.filter((c) => c?.isNoActive === newChecked && c?.isUsilok === checkedUsilok);
        setDisplayClient(filte);
      }
    };
    const handleChangeUsilik = () => {
      const newChecked = !checkedUsilok;
      setCheckedUsilok(newChecked);
      if(selectedAdres){
        const filte = data.filter((c) => c?.isUsilok === newChecked && c.adres?.name === selectedAdres && c.isNoActive === checkedActive);
        setDisplayClient(filte);
      }else{
        const filte = data.filter((c) => c?.isUsilok === newChecked && c.isNoActive === checkedActive);
        setDisplayClient(filte);        
      }
    };

    const adresChange = (e) => {
      const newAdres = e.target.value;
      setSelectedAdres(newAdres);
      const filteredData = data.filter((c) => c.adres?.name === newAdres && c.isNoActive === checkedActive && c?.isUsilok === checkedUsilok);
      if(e.target.value === '')
        setDisplayClient(data.filter((c) => c.isNoActive === checkedActive && c?.isUsilok === checkedUsilok))
      if (filteredData.length > 0) {
        setDisplayClient(filteredData);
      } else {
        setDisplayClient(data);
      }
    };
      const searcChange =(e)=>{
        if(e.target.value){
          if(selectedAdres){
            const filte = data.filter((c) => c.name.toLowerCase().includes(e.target.value.toLowerCase()) && c.adres?.name === selectedAdres && c.isNoActive === checkedActive && c?.isUsilok === checkedUsilok)
            if(filte.length >0 ){
              setDisplayClient(filte)
            }else{
              setDisplayClient([])
            }
          }else{
            const filte = data.filter((c) => c.name.toLowerCase().includes(e.target.value.toLowerCase()) && c.isNoActive === checkedActive && c?.isUsilok === checkedUsilok)
            setDisplayClient(filte)
          }
        }else{
          if(selectedAdres){
            setDisplayClient(data.filter((c) => c?.isNoActive === checkedActive && c.adres?.name === selectedAdres && c?.isUsilok === checkedUsilok))
          }else{
            setDisplayClient(data.filter((c) => c?.isNoActive === checkedActive && c?.isUsilok === checkedUsilok))
          }
        }
      }
      const borgChange =(e)=>{
        if(e.target.value){
          if(selectedAdres){
            const filte = data.filter((c) => getTotal(c.records) <= -e.target.value && c.adres?.name === selectedAdres && c.isNoActive === checkedActive && c?.isUsilok === checkedUsilok)
            if(filte.length >0 ){
              setDisplayClient(filte)
            }else{
              setDisplayClient([])
            }
          }else{
            const filte = data.filter((c) => getTotal(c.records) <= e.target.value && c.isNoActive === checkedActive && c?.isUsilok === checkedUsilok)
            setDisplayClient(filte)
          }
        }else{
          if(selectedAdres){
            setDisplayClient(data.filter((c) => c?.isNoActive === checkedActive && c.adres?.name === selectedAdres && c?.isUsilok === checkedUsilok))
          }else{
            setDisplayClient(data.filter((c) => c?.isNoActive === checkedActive && c?.isUsilok === checkedUsilok))
          }
        }
      }

    return (
      <div className="w-full max-w-screen-sm">
        <label className="mx-2 text-gray-700">
          Населений пункт:
        </label>
        <select name="adres" defaultValue='' onChange={adresChange} className="mb-2 border border-gray-300  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" style={{ backgroundColor: 'var(--input-bg-color)', color: 'var(--input-text-color)' }}>
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
          onChange={handleChangeActive}
          className="my-auto w-5 h-5 p-2.5 text-blue-600 transition duration-150 ease-in-out"
          />
          <label className="mx-2 my-auto text-gray-700">
            Закриті
          </label>
          <input
            type="checkbox"
            checked={checkedUsilok}
            onChange={handleChangeUsilik}
            className="my-auto w-5 h-5 p-2.5 text-blue-600 transition duration-150 ease-in-out"
            />
          <label className="flex mx-2 my-auto text-gray-700 justify-center">
            Підсилювачі
          </label>
          </div>
          <input type="text" defaultValue={''} onChange={borgChange} name="search" className="border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/3 p-2.5" style={{ backgroundColor: 'var(--input-bg-color)', color: 'var(--input-text-color)' }} placeholder="Борг Більше" />
        </div>
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
            {displayClient.length >0 ? displayClient?.map((item) => (
              <tr key={item.id} className={`border-b`}>
                <td className={`text-left px-0 py-4 ${!item.isNoActive ? "text-emerald-600" : 'text-red-600'}`}>{item.bill}</td>
                <td className="text-left px-0 py-4 underline"><Link href={`/client/${item.id}`}>{item.name}</Link></td>
                <td className="text-left px-0 py-4">{item.adres?.name} {item.street},{item.home}</td>
                <td className={`text-left px-0 py-4 ${getTotal(item.records) < -350 ? "text-red-600" : 'text-emerald-600'}`}>{getTotal(item.records)}</td>
              </tr>
            )) : <h1>No Result</h1>}
          </tbody>
        </table>
      </div>
      );
    };
    
    export default Table;
