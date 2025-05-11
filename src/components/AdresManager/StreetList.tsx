import React from "react";
import { deleteStreet } from "../../lib/adresAcrions";

const StreetList = ({ street, loadData }) => {
  const handleDeleteStreet = async (id: string) => {
    await deleteStreet(id);
    await loadData();
  };
  return (
    <div className="flex justify-between items-center border px-1 py-1 rounded">
      <span>{street.name || "Без назви"}</span>
      <button
        onClick={() => handleDeleteStreet(street.id)}
        className="text-sm bg-red-500 text-white px-3 py-1 rounded"
      >
        -
      </button>
    </div>
  );
};

export default StreetList;
