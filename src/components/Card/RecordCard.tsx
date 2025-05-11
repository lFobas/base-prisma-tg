"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { editeRecordById } from "../../lib/actions";

const RecordCard = ({ record, changeable }) => {
  const [edited, setEdited] = useState(record);
  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
    setIsChanged(true);
  };

  const handleEditRecord = async () => {
    const res = await editeRecordById(edited.id, edited);
    if (res?.id === edited.id) {
      toast.success("Збережено!", {
        autoClose: 1000,
        theme: "dark",
      });
      setIsChanged(false);
    } else {
      toast.error("Помилка при збереженні");
      console.error(res);
    }
  };

  return (
    <div
      className={`p-1 rounded-lg border-2 flex flex-wrap gap-2 transition-all duration-200
        ${
          edited.summa < 0
            ? "border-rose-600 bg-red-100"
            : "border-teal-600 bg-green-100"
        }`}
    >
      <input
        name="date"
        type="date"
        disabled={!changeable}
        value={new Date(edited.date).toISOString().split("T")[0]}
        onChange={handleChange}
        className="border h-9 border-emerald-400 rounded-md p-1 min-w-[140px]"
      />

      <input
        name="summa"
        type="number"
        disabled={!changeable}
        value={edited.summa}
        onChange={handleChange}
        className="border h-9 border-orange-600 rounded-md p-1 min-w-[100px] text-right flex-1"
      />
      <input
        name="authorId"
        type="text"
        disabled={!changeable}
        value={edited.authorId}
        onChange={handleChange}
        className="border h-9 border-cyan-400 rounded-md p-2 min-w-[150px] flex-1"
      />
      {edited.description !== null ? (
        <textarea
          name="description"
          disabled={!changeable}
          value={edited.description}
          onChange={handleChange}
          rows={2}
          className="border h-9 border-gray-400 rounded-md p-2 min-w-[180px] flex-1 resize-none"
        />
      ) : (
        <div className="text-gray-600 italic flex-1">Нарахування</div>
      )}
      {changeable && isChanged && (
        <button
          onClick={handleEditRecord}
          className="bg-orange-500 text-white px-4 py-2 rounded-md border-2 border-orange-700"
        >
          Зберегти
        </button>
      )}
    </div>
  );
};

export default RecordCard;
