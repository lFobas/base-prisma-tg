"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Cog6ToothIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";
import Spiner from "./Spiner/Spiner";
import ClientListCard from "./Card/ClientListCard";
import { useFilterStore, useUserStore } from "../lib/store";
import { getClients, getClientsByAdres } from "../lib/actions";

const Table = ({ adr }) => {
  const [
    checkedActive,
    checkedUsilok,
    selectedAdres,
    dataCl,
    changeActive,
    changeUsilok,
    selectAdres,
    selectDataCl,
  ] = useFilterStore((state) => [
    state.checkedActive,
    state.checkedUsilok,
    state.selectedAdres,
    state.dataCl,
    state.changeActive,
    state.changeUsilok,
    state.selectAdres,
    state.selectDataCl,
  ]);

  const [user, initUser] = useUserStore((state) => [
    state.user,
    state.initUser,
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [displayClient, setDisplayClient] = useState(dataCl);
  const [isLoading, setIsLoading] = useState(false);
  const [baner, setBaner] = useState("");

  const [searchName, setSearchName] = useState("");
  const [minBorg, setMinBorg] = useState("");

  useEffect(() => {
    setDisplayClient(dataCl);
    setBaner("Виберіть Село");
  }, [dataCl]);

  const handleAdresChange = async (e) => {
    const newAdres = e.target.value;
    selectAdres(newAdres);
    setIsLoading(true);
    setBaner("");

    let clients = newAdres
      ? await getClientsByAdres(newAdres)
      : await getClients();
    clients = clients || [];
    selectDataCl(clients);
    setDisplayClient(clients);
    setIsLoading(false);
  };

  // Уніфікована фільтрація
  const filteredClients = useMemo(() => {
    return displayClient
      .filter(
        (c) => c.isNoActive === checkedActive && c.isUsilok === checkedUsilok
      )
      .filter((c) =>
        searchName
          ? c.name.toLowerCase().includes(searchName.toLowerCase())
          : true
      )
      .filter((c) => (minBorg ? c.recordsSuma <= -Number(minBorg) : true));
  }, [displayClient, checkedActive, checkedUsilok, searchName, minBorg]);

  const totalBorg = useMemo(
    () => filteredClients.reduce((acc, c) => acc + c.recordsSuma, 0),
    [filteredClients]
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">
          <Link href="/borg">Борги</Link>
        </h1>
        <div className="flex items-center gap-2">
          {user && <span>{user.name}</span>}
          {user?.role === "ADMIN" ? (
            <Link href="/manage" className="px-2 py-1 rounded-sm my-bg">
              <Cog6ToothIcon className="h-5 w-5" />
            </Link>
          ) : (
            <button
              className="px-2 py-1 rounded-sm my-bg"
              onClick={() => initUser(null)}
            >
              <ArrowLeftCircleIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Фільтри */}
      <div className="flex justify-between gap-3 mb-1">
        <div className="flex flex-col">
          <label className="secondary-text mb-1">Населений пункт:</label>
          <select
            className="border border-gray-300 bg-[var(--tg-theme-secondary-bg-color)] rounded-lg p-2"
            value={selectedAdres || ""}
            onChange={handleAdresChange}
          >
            <option value="">Всі Села</option>
            {adr.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="secondary-text mb-1">Загальний Борг:</label>
          <div className="border border-gray-300 rounded-lg p-2 text-right">
            {filteredClients.length ? totalBorg : 0} грн.
          </div>
        </div>
      </div>
      {/* Пошук та інші фільтри */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex w-full items-center justify-between gap-4 border-b border-t border-teal-600 py-1">
          {isOpen ? (
            <input
              type="text"
              autoFocus
              placeholder="Пошук по імені"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onBlur={() => setIsOpen(false)} // закривається при втраті фокусу
              className="flex w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <div className="flex sm:justify-start justify-between w-full items-center gap-3">
              <button
                onClick={() => setIsOpen(true)}
                className="border border-gray-300 rounded-lg p-2 bg-gray-100 hover:bg-gray-200"
              >
                🔍
              </button>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checkedActive}
                  onChange={changeActive}
                  className="w-5 h-5"
                />
                Закриті
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checkedUsilok}
                  onChange={changeUsilok}
                  className="w-5 h-5"
                />
                Усілок
              </label>
              <input
                type="number"
                placeholder="Борг більше"
                className="border border-gray-300 rounded-lg p-2 w-32"
                value={minBorg}
                onChange={(e) => setMinBorg(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Клієнти */}
      {isLoading ? (
        <Spiner />
      ) : filteredClients.length ? (
        filteredClients.map((item) => (
          <ClientListCard
            key={item.id}
            client={item}
            summa={item.recordsSuma}
          />
        ))
      ) : (
        <h1 className="text-center">{baner || "Немає збігів"}</h1>
      )}

      <div className="my-9"></div>
    </div>
  );
};

export default Table;
