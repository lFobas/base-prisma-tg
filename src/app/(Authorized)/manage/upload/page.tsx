"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { createManyClients, createRecords } from "../../../../lib/actions";

// Тип для рядка таблиці
type ExcelRow = Record<string, any>;

const UploadPage = () => {
  const [data, setData] = useState<ExcelRow[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      if (typeof binaryStr !== "string") return;

      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const keys = jsonData[0] as string[];
      const dataObjects = jsonData.slice(1).map((row: any[]) => {
        const obj: ExcelRow = {};
        keys.forEach((key, index) => {
          let value = row[index];
          if (!isNaN(value) && key.toLowerCase().includes("date")) {
            const date = XLSX.SSF.parse_date_code(value);
            if (date) {
              value = new Date(
                Date.UTC(date.y, date.m - 1, date.d)
              ).toISOString();
            }
          }
          obj[key] = value;
        });
        return obj;
      });

      setData(dataObjects);
    };

    reader.readAsBinaryString(file);
  };

  const handleUploadRecords = async () => {
    try {
      await createRecords(data);
      toast.success("Успішно завантажено виписки!", {
        autoClose: 1000,
        theme: "dark",
        draggable: true,
      });
    } catch (error) {
      toast.error("Помилка при завантаженні виписок.", {
        autoClose: 1000,
        theme: "dark",
        draggable: true,
      });
      console.error("Error:", error);
    }
  };

  const handleUploadUsers = async () => {
    try {
      await createManyClients(data);
      toast.success("Успішно завантажено клієнтів!", {
        autoClose: 1000,
        theme: "dark",
        draggable: true,
      });
    } catch (error) {
      toast.error("Помилка при завантаженні клієнтів.", {
        autoClose: 1000,
        theme: "dark",
        draggable: true,
      });
    }
  };

  return (
    <div className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor="fileUpload"
          className="cursor-pointer inline-block bg-gray-800 text-white text-sm px-4 py-3 rounded hover:bg-gray-700 transition"
        >
          Обрати Excel файл
        </label>
        <input
          id="fileUpload"
          type="file"
          accept=".xls,.xlsx"
          onChange={handleFileUpload}
          className="hidden"
        />
        {data.length > 0 && (
          <button
            className="flex justify-center items-center px-4 py-2  bg-red-800 text-white rounded text-lg"
            onClick={() => setData([])}
          >
            ✕
          </button>
        )}
      </div>

      {data.length > 0 && (
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mb-2">
          <button
            className="bg-green-600 px-4 py-2 rounded text-white text-sm w-full sm:w-auto"
            onClick={handleUploadRecords}
          >
            Завантажити Виписки
          </button>
          <button
            className="bg-blue-600 px-4 py-2 rounded text-white text-sm w-full sm:w-auto"
            onClick={handleUploadUsers}
          >
            Завантажити Клієнтів
          </button>
        </div>
      )}

      <div className="overflow-x-auto max-h-[60vh] border rounded">
        <table className="min-w-[600px] w-full text-xs sm:text-sm border-collapse border">
          <thead className="sticky top-0 bg-gray-200 z-10">
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key, index) => (
                  <th
                    key={index}
                    className="border px-2 py-1 whitespace-nowrap"
                  >
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border px-2 py-1 whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadPage;
