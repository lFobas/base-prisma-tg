"use client";
import ClientListCard from "@/components/Card/ClientListCard";
import { useFilterStore } from "@/lib/store";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import React, { useRef } from "react";

const ListPage = () => {
  const [checkedActive, checkedUsilok, dataCl] = useFilterStore((state) => [
    state.checkedActive,
    state.checkedUsilok,
    state.dataCl,
  ]);
  const scrollableDivRef = useRef(null);

  const scrollToTopA = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={scrollableDivRef} className="relative w-full px-2 h-screen overflow-auto">
      {dataCl
        ?.filter(
          (item) =>
            item.isNoActive === checkedActive && item.isUsilok === checkedUsilok
        )
        .map((item) => (
          <ClientListCard key={item.id} client={item} summa={item.records} />
        ))}
      <button
        onClick={scrollToTopA}
        className="fixed bottom-20 right-4 z-10 rounded-full shadow-md bg-yellow-600 text-gray-800 p-3"
      >
        <ArrowUpCircleIcon className="w-8 h-8 " />
      </button>
    </div>
  );
};

export default ListPage;
