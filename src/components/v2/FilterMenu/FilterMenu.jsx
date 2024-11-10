"use client";
import React, { useState } from "react";
import "./style.css";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useFilterStore } from "@/lib/store";
import { getClientsByAdres } from "@/lib/actions";
import ClientListCard from "@/components/Card/ClientListCard";

const FilterMenu = ({ adr }) => {
  const [adres, setAdres] = useState(false);
  const [search, setSearch] = useState(false);
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

  const adresChange = async (e) => {
    const data = await getClientsByAdres(e.target.value);
    selectDataCl(data);
    console.log("action");
    console.log(dataCl);

    setAdres(!adres);
  };

  const searcChange = (e) => {};

  return (
    <>
      <div className="fixed top-0 w-full h-12 flex justify-between items-center gap-3 px-4 bg-black rounded-xl z-50">
        {!search ? (
          <div className="flex transition-all duration-300">
            <input
              type="checkbox"
              checked={checkedActive}
              onChange={() => changeActive(!checkedActive)}
              className="my-auto w-5 h-5 p-2.5 text-blue-600 transition duration-150 ease-in-out"
            />
            <label className="mx-2 my-auto secondary-text">Закриті</label>
            <input
              type="checkbox"
              checked={checkedUsilok}
              onChange={() => changeUsilok(!changeUsilok)}
              className="my-auto w-5 h-5 p-2.5 text-blue-600 transition duration-150 ease-in-out"
            />
            <label className="flex mx-2 my-auto secondary-text justify-center">
              Підсилювачі
            </label>
          </div>
        ) : (
          <input
            type="text"
            defaultValue={""}
            onChange={searcChange}
            className="h-8 transition-transform duration-500"
            placeholder="Знайти по імені"
          />
        )}
        <div className="flex gap-2">
          <div className="flex items-center transition-all duration-300">
            <MagnifyingGlassIcon
              onClick={() => setSearch(!search)}
              className="w-8 h-8 cursor-pointer"
            />
          </div>
          <div onClick={() => setAdres(!adres)}>
            <HomeIcon className="w-8 h-8 cursor-pointer" />
          </div>
        </div>
        {adres && (
          <select
            name="adres"
            defaultValue={selectedAdres}
            onChange={adresChange}
            className="absolute -bottom-12 w-11/12 "
          >
            <option value="">Виберіть Село</option>
            {adr.map((a) => (
              <option key={a.name} value={a?.name}>
                {a?.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};

export default FilterMenu;
