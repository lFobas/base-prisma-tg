"use client";
import { editeRecordById } from "@/lib/actions";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RecordCard = ({ record, changeable }) => {
  const [editedRecord, setEditedRecord] = useState(record);

  const Change = (e) => {
    setEditedRecord({
      ...editedRecord,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditRecord = async () => {
    const res = await editeRecordById(editedRecord.id, editedRecord);
    if (res.id == editedRecord.id) {
      toast.success(`${res.authorId} Змінено! `, {
        autoClose: 1000,
        theme: "dark",
        draggable: true,
      });
    } else {
      toast.error("Шось не так!");
      console.log(res);
    }
  };

  return (
    <div
      className={`flex flex-col lg:flex-row lg:space-x-4 p-2 border-2 rounded-lg m-1 ${
        editedRecord.summa < 0
          ? "border-rose-600 bg-red-500 bg-opacity-35"
          : "border-teal-600 bg-green-600 bg-opacity-35"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:space-x-4 w-full">
        <div className="flex flex-row">
          <input
            name="date"
            type="date"
            disabled={!changeable}
            defaultValue={editedRecord.date.toISOString().split("T")[0]}
            placeholder="date"
            onChange={Change}
            className="border border-emerald-400 rounded-md p-2 flex-1 min-w-[130px] mb-2 sm:mb-0 mr-1 h-full"
            style={{ width: "150px", maxWidth: "100px" }}
          />
          <input
            name="summa"
            disabled={!changeable}
            type="number"
            defaultValue={editedRecord.summa}
            placeholder="summa"
            onChange={Change}
            className="border border-orange-600 rounded-md p-2 flex-1 min-w-[75px] min-h-[44px] mb-2 sm:mb-0 mr-1 h-full text-end"
          />
          {changeable ? (
            <button
              onClick={handleEditRecord}
              className="bg-orange-400 border-orange-600 border-2 rounded-md p-2 min-w-[50px] min-h-[44px] self-start sm:self-auto"
            >
              Edit
            </button>
          ) : null}
        </div>
        <input
          name="authorId"
          disabled={!changeable}
          type="text"
          defaultValue={editedRecord.authorId}
          placeholder="name"
          className="border border-cyan-400 rounded-md p-2 flex-1 min-w-[150px] mb-1  sm:mb-0"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-4 w-full lg:w-auto">
        {editedRecord.description ? (
          <textarea
            name="description"
            disabled={!changeable}
            defaultValue={editedRecord.description}
            placeholder="Опис"
            className="border border-gray-300 rounded-md p-1 flex-1 min-w-[150px] h-16 resize-none mb-1 sm:mb-0"
          />
        ) : (
          <h1>Нарахування</h1>
        )}
      </div>
    </div>
  );
};

export default RecordCard;
