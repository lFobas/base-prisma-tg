"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { getRecordsByDate } from "../../../../lib/actions";
import Spiner from "../../../../components/Spiner/Spiner";
import RecordCard from "../../../../components/Card/RecordCard";
import { Button } from "@/components/ui/button"; // ✅ shadcn button

const DateInput = ({ value, onChange, min, max }) => (
  <input
    type="date"
    value={value}
    onChange={onChange}
    min={min}
    max={max}
    className="border rounded-md px-2 py-1 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-teal-400"
  />
);

const RecordsPage = () => {
  const getToday = () => new Date().toISOString().split("T")[0];

  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDateFrom, setSelectedDateFrom] = useState(getToday);
  const [selectedDateTo, setSelectedDateTo] = useState(getToday);

  const handleChangeDateFrom = (e) => {
    const newFrom = e.target.value;
    setSelectedDateFrom(newFrom);
    if (newFrom > selectedDateTo) {
      setSelectedDateTo(newFrom);
    }
  };

  const handleChangeDateTo = (e) => {
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
    try {
      const rec = await getRecordsByDate(selectedDateFrom, selectedDateTo);
      setRecords(rec);
      if (!rec.length) {
        toast.info("Не знайдено виписок :(", { autoClose: 1200, theme: "dark" });
      }
    } catch (err) {
      toast.error("Помилка при завантаженні записів", { autoClose: 1500 });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setRecords([]);
    const today = getToday();
    setSelectedDateFrom(today);
    setSelectedDateTo(today);
  };

  return (
    <div className="p-2">
      <div className="w-full flex flex-wrap gap-2 items-center mb-3">
        <DateInput
          value={selectedDateFrom}
          onChange={handleChangeDateFrom}
          max={selectedDateTo} min={undefined}        />
        <DateInput
          value={selectedDateTo}
          onChange={handleChangeDateTo}
          min={selectedDateFrom} max={undefined}        />

        <Button
          onClick={handleLoadRecords}
          disabled={isLoading}
          variant="default"
        >
          {isLoading ? <Spiner /> : "Завантажити"}
        </Button>

        <Button onClick={handleClear} variant="destructive">
          Очистити
        </Button>
      </div>

      {records.length > 0 ? (
        <div className="flex border border-teal-800 rounded-xl flex-col gap-4 p-2 overflow-y-auto overflow-x-hidden max-h-[85vh]">
          {records.map((r) => (
            <RecordCard key={r.id} record={r} changeable={true} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6 text-lg">
          📭 Немає записів для відображення
        </p>
      )}
    </div>
  );
};

export default RecordsPage;
