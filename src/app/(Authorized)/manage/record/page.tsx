"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { getRecordsByDate } from "../../../../lib/actions";
import Spiner from "../../../../components/Spiner/Spiner";
import RecordCard from "../../../../components/Card/RecordCard";

const RecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getToday = () => new Date().toISOString().split("T")[0];

  const [selectedDateFrom, setSelectedDateFrom] = useState(getToday);
  const [selectedDateTo, setSelectedDateTo] = useState(getToday);

  const handleChangeDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrom = e.target.value;
    setSelectedDateFrom(newFrom);

    if (newFrom > selectedDateTo) {
      setSelectedDateTo(newFrom); // Автоматично підтягує другу дату, якщо менша
    }
  };

  const handleChangeDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTo = e.target.value;
    if (newTo >= selectedDateFrom) {
      setSelectedDateTo(newTo);
    } else {
      toast.warning("Дата 'до' не може бути меншою за дату 'з'", {
        autoClose: 1500,
        theme: "dark",
      });
    }
  };

  const handleLoadRecords = async () => {
    setIsLoading(true);
    const rec = await getRecordsByDate(selectedDateFrom, selectedDateTo);
    setIsLoading(false);

    if (rec.length > 0) {
      setRecords(rec);
    } else {
      setRecords([]);
      toast.info("Не знайдено виписок :(", {
        autoClose: 1000,
        theme: "dark",
        draggable: true,
      });
    }
  };

  const handleClear = () => {
    setRecords([]);
    const today = getToday();
    setSelectedDateFrom(today);
    setSelectedDateTo(today);
  };

  return (
    <div className="p-1">
      <div className="w-full flex flex-wrap gap-2 items-center mb-2">
        <input
          type="date"
          value={selectedDateFrom}
          onChange={handleChangeDateFrom}
          className="border rounded-md px-2 py-1 min-w-[140px]"
          max={selectedDateTo}
        />

        <input
          type="date"
          value={selectedDateTo}
          onChange={handleChangeDateTo}
          className="border rounded-md px-2 py-1 min-w-[140px]"
          min={selectedDateFrom}
        />

        <button
          onClick={handleLoadRecords}
          className="bg-teal-500 text-white px-4 py-1 rounded-md border border-teal-800"
        >
          Загрузити
        </button>
        <button
          onClick={handleClear}
          className="bg-red-600 text-white px-3 py-1 rounded-md border border-red-800"
        >
          Очистити
        </button>
        {isLoading && (
          <div className="flex justify-center items-center">
            <Spiner />
          </div>
        )}
      </div>

      {records.length > 0 ? (
        <div className="flex border border-teal-800 rounded-xl flex-col gap-4 p-2 overflow-y-auto max-h-[85vh]">
          {records.map((r) => (
            <RecordCard key={r.id} record={r} changeable={true} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          Немає записів для відображення
        </p>
      )}
    </div>
  );
};

export default RecordsPage;
