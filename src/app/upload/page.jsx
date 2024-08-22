'use client'
import { createRecords } from '@/lib/actions';
import React, { useState } from 'react'
import * as XLSX from 'xlsx';

const UploadPage = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if(event.target.files.length >0){
      const reader = new FileReader();
      reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      
      // Читання першого аркуша
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Конвертація аркуша в масив об'єктів
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Перетворення масиву з заголовком в масив об'єктів
      const keys = jsonData[0]; // Перший рядок - ключі
      const dataObjects = jsonData.slice(1).map(row => {
        let obj = {};
        keys.forEach((key, index) => {
          let value = row[index];
          
          // Перевірка, чи є значення числом і чи є ключ "дата"
          if (!isNaN(value) && key.toLowerCase().includes('date')) {
            // Конвертація Excel серійного номеру дати в об'єкт Date
            const date = XLSX.SSF.parse_date_code(value);
            value = new Date(Date.UTC(date.y, date.m - 1, date.d, date.H, date.M, date.S));
            value = value.toISOString();
          }
          
          obj[key] = value;
        });
        return obj;
      });
      
      setData(dataObjects);
      
    }
 
    reader.readAsBinaryString(file);
  }else{
    setData([])
  };


  };

  const handleUpload = async ()=>{
    const res = await createRecords(data)
    console.log(res);
  }

  return (
    <div className=''>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} className='m-1' />
      {data.length > 0 ?
        <>
        <button className='w-24 h-12 bg-sky-800 rounded-md text-white' onClick={handleUpload}>Загрузити</button>
        <button className='w-12 h-12 m-1 bg-red-800 rounded-md' onClick={((e)=> setData([]))}>x</button>
        </>
         : null
      }
      <table>
        <thead>
          <tr>
            {data.length > 0 && Object.keys(data[0]).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      </div>
  );
};
export default UploadPage