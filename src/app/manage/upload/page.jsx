'use client'
import { createManyClients, createRecords } from '@/lib/actions';
import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

const UploadPage = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if(event.target.files.length >0){
      const reader = new FileReader();
      reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const keys = jsonData[0]; 
      const dataObjects = jsonData.slice(1).map(row => {
        let obj = {};
        keys.forEach((key, index) => {
          let value = row[index];
          if (!isNaN(value) && key.toLowerCase().includes('date')) {
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

  const handleUploadRecords = async () => {
    try {
      const res = await createRecords(data);
      toast.success('Successfully!', {
        autoClose: 1000,
        theme: "dark",
        draggable: true,
      });
    } catch (error) {
      toast.error('Error uploading records.', {
        autoClose: 1000,
        theme: "dark",
        draggable: true,
      });
      console.error('Error:', error);
    }
  };

  const handleUploadUsers = async ()=>{
    const res = await createManyClients(data)
    console.log(res);
  }

  return (
    <div className=''>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} className='m-1' />
      {data.length > 0 ?
        <div>
        <button className='button mx-1 text-white' onClick={handleUploadRecords}>Загрузити Виписки</button>
        <button disabled className='button mx-1 text-white' onClick={handleUploadUsers}>Загрузити Клієнтів</button>
        <button className='w-12 h-12 m-1 bg-red-800 rounded-md' onClick={((e)=> setData([]))}>x</button>
        </div>
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