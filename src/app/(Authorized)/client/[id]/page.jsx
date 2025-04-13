"use client";
import RecordCard from "@/components/Card/RecordCard";
import Spiner from "@/components/Spiner/Spiner";
import { editeClientById, getClientById } from "@/lib/actions";
import { sendTelegramMessage } from "@/lib/telegramBot";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ClientDetailPage = (params) => {
  const id = params.params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const res = await getClientById(id);
    console.log(res);
    setClient(res);
    setRecords(
      res?.records?.sort((a, b) => {
        const recordA = a.date;
        const recordB = b.date;

        if (recordA < recordB) {
          return 1;
        }
        if (recordA > recordB) {
          return -1;
        }
      })
    );
  };

  const handleCloseOpen = async () => {
    const data = { isNoActive: !client.isNoActive };
    setIsLoading(true);
    await editeClientById(id, data);
    await initData();
    const message = `Клієнт ${client.bill} | ${client.name} - ${
      client.adresId
    }: ${client.street}, ${client.home} ${
      data.isNoActive ? "деактивовано" : "активовано"
    }.`;
    try {
      await sendTelegramMessage(message);
    } catch (err) {
      console.error("Telegram error:", err);
    }
    toast.info("Змінено!", {
      autoClose: 1000,
      theme: "dark",
      draggable: true,
    });
    setIsLoading(false);
  };

  const handleChangeUsilok = async () => {
    const data = { isUsilok: !client.isUsilok };
    setIsLoading(true);
    await editeClientById(id, data);
    await initData();
    const message = `Клієнту ${client.bill} | ${client.name} - ${
      client.adresId
    }: ${client.street},${client.home} ${
      data.isUsilok ? "поставили усілок" : "зняли усілок"
    }.`;
    try {
      await sendTelegramMessage(message);
    } catch (err) {
      console.error("Telegram error:", err);
    }
    toast.info("Змінено!", {
      autoClose: 1000,
      theme: "dark",
      draggable: true,
    });
    setIsLoading(false);
  };

  return (
    <div className="py-4">
      <Link
        className="text-2xl text-lime-500 border-lime-500 p-2 border-2 m-2 rounded-md"
        href={"/borg"}
      >
        {" "}
        ⇐ Назад До Списку
      </Link>
      <div className="px-3">
        <h1 className="pt-3 text-2xl">{client?.name}</h1>
        <div className="flex px-3 justify-end secondary-text">
          {client?.adresId} {client?.street},{client?.home}
        </div>
      </div>
      {client ? (
        <div className="flex justify-between">
          <button
            className={`p-2 m-2 flex justify-center items-center rounded-md  h-10 ${
              isLoading
                ? "bg-yellow-300"
                : !client?.isNoActive
                ? "bg-red-600"
                : "bg-green-600"
            }`}
            onClick={handleCloseOpen}
          >
            {isLoading ? (
              <Spiner />
            ) : !client?.isNoActive ? (
              "Відключити Клієнта"
            ) : (
              "Поновити Клієнта"
            )}
          </button>
          <button
            className={`p-2 m-2 flex justify-center items-center rounded-md  h-10 ${
              isLoading
                ? "bg-yellow-300"
                : !client?.isUsilok
                ? "bg-green-600"
                : "bg-red-600"
            }`}
            onClick={handleChangeUsilok}
          >
            {isLoading ? (
              <Spiner />
            ) : !client?.isUsilok ? (
              "Поставити Усілок"
            ) : (
              "Забрати Усілок"
            )}
          </button>
        </div>
      ) : (
        <></>
      )}
      {records?.map((r, idx) => {
        return <RecordCard key={idx} record={r} changeable={false} />;
      })}
    </div>
  );
};

export default ClientDetailPage;
