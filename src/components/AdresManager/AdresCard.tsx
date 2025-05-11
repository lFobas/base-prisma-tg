import React, { useState } from "react";
import { addStreet, deleteAdres, deleteStreet } from "../../lib/adresAcrions";
import StreetList from "./StreetList";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const AdresCard = ({ adres, loadData }) => {
  const [newStreets, setNewStreets] = useState<Record<string, string>>({});
  const [isExpandet, setIsExpandet] = useState(false);

  const handleDeleteAdres = async (id: string) => {
    await deleteAdres(id);
    await loadData();
  };

  const handleAddStreet = async (adresId: string) => {
    const name = newStreets[adresId]?.trim();
    if (!name) return;

    const result = await addStreet(adresId, name);
    if (result?.id) {
      setNewStreets((prev) => ({ ...prev, [adresId]: "" }));
      await loadData();
    }
  };
  return (
    <div
      key={adres.id}
      className="border rounded p-2 space-y-3 bg-white shadow-md "
    >
      <div className="flex justify-between items-center">
        <h3
          onClick={() => setIsExpandet((prev) => !prev)}
          className="text-lg font-semibold cursor-pointer"
        >
          {adres.name}
        </h3>
        <button
          onClick={() => handleDeleteAdres(adres.id)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      {isExpandet && (
        <>
          <div className="space-y-1">
            {adres.streets.length > 0 ? (
              adres.streets.map((street) => (
                <StreetList
                  street={street}
                  key={street.id}
                  loadData={loadData}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">Вулиць ще немає.</p>
            )}
          </div>

          <div className="flex gap-2 mt-2 w-full">
            <input
              value={newStreets[adres.id] || ""}
              onChange={(e) =>
                setNewStreets((prev) => ({
                  ...prev,
                  [adres.id]: e.target.value,
                }))
              }
              placeholder="Нова вулиця"
              className="border rounded w-full py-1 flex-1"
            />
            <button
              onClick={() => handleAddStreet(adres.id)}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
            >
              <PlusIcon className="h-5 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdresCard;
