"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { editeRecordById } from "../../lib/actions";

const inputBase =
  "border h-9 rounded-md p-1 flex-1 transition-colors focus:ring-2 focus:outline-none disabled:bg-gray-100";

const RecordCard = ({ record, changeable }) => {
  const [edited, setEdited] = useState(record);
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsChanged(JSON.stringify(edited) !== JSON.stringify(record));
  }, [edited, record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditRecord = async () => {
    setLoading(true);
    try {
      const res = await editeRecordById(edited.id, edited);
      if (res?.id === edited.id) {
        toast.success("Збережено!", { autoClose: 1000, theme: "dark" });
        setIsChanged(false);
      } else {
        toast.error("Помилка при збереженні");
        console.error(res);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-2 rounded-lg border-2 flex flex-wrap gap-2 transition-all duration-200
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
        className={`${inputBase} border-emerald-400 min-w-[140px]`}
      />

      <input
        name="summa"
        type="number"
        disabled={!changeable}
        value={edited.summa}
        onChange={handleChange}
        className={`${inputBase} border-orange-600 text-right min-w-[100px]`}
      />

      <input
        name="authorId"
        type="text"
        disabled={!changeable}
        value={edited.authorId}
        onChange={handleChange}
        className={`${inputBase} border-cyan-400 p-2 min-w-[150px]`}
      />

      <textarea
        name="description"
        disabled={!changeable}
        value={edited.description ?? "Нарахування"}
        onChange={handleChange}
        rows={2}
        className={`${inputBase} border-gray-400 p-2 min-w-[180px] resize-none`}
      />

      {changeable && isChanged && (
        <button
          disabled={loading}
          onClick={handleEditRecord}
          className={`px-4 py-2 rounded-md border-2 transition-colors
            ${
              loading
                ? "bg-gray-400 border-gray-600 cursor-wait"
                : "bg-orange-500 border-orange-700 text-white hover:bg-orange-600"
            }`}
        >
          {loading ? "Збереження..." : "Зберегти"}
        </button>
      )}
    </div>
  );
};

export default RecordCard;
