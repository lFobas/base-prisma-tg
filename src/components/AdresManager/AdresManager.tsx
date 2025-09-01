"use client";

import React, { useEffect, useState } from "react";
import {
  addAdres,
  getAdresiWithStreets,
} from "../../lib/adresAcrions";
import AdresCard from "./AdresCard";

// Типи
interface Street {
  id: string;
  name: string | null;
}

interface Adres {
  id: string;
  name: string;
  streets: Street[];
}

const AdresManager = () => {
  const [adresi, setAdresi] = useState<Adres[]>([]);
  const [newAdresName, setNewAdresName] = useState("");
  
  const loadData = async () => {
    const res = await getAdresiWithStreets();
    setAdresi(res); 
  };

  const handleAddAdres = async () => {
    const name = newAdresName.trim();
    if (!name) return;

    const result = await addAdres(name);
    if (result?.id) {
      setNewAdresName("");
      await loadData();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="lg:w-2/3 sm:container mx-auto p-4 space-y-2">
      <h2 className="text-2xl font-bold">Адреси та Вулиці</h2>
      <div className="flex gap-2 w-full">
        <input
          value={newAdresName}
          onChange={(e) => setNewAdresName(e.target.value)}
          placeholder="Нова адреса"
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={handleAddAdres}
          className="bg-teal-600 text-white py-2 rounded"
        >
          +
        </button>
      </div>
      {adresi.map((adres) => (
        <AdresCard key={adres.id} adres={adres} loadData={loadData} />
      ))}
    </div>
  );
};

export default AdresManager;
