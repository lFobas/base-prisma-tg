"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { editeClientById, getClientById } from "@/lib/actions";
import { sendTelegramMessage } from "@/lib/telegramBot";
import Spiner from "@/components/Spiner/Spiner";
import RecordCard from "@/components/Card/RecordCard";

const ClientDetailPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);

  const initData = useCallback(async () => {
    try {
      const res = await getClientById(id);
      setClient(res);
      setRecords(
        res?.records
          ?.slice()
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          ) || []
      );
    } catch (err) {
      console.error("Помилка завантаження клієнта:", err);
    }
  }, [id]);

  useEffect(() => {
    initData();
  }, [initData]);

  const toggleClientField = async (
    field: "isNoActive" | "isUsilok",
    messages: [string, string]
  ) => {
    if (!client) return;
    const newValue = !client[field];
    setIsLoading(true);

    try {
      await editeClientById(id, { [field]: newValue });
      await initData();

      const message =
        field === "isNoActive"
          ? `Клієнт ${client.bill}|${client.name} - ${client.adresId}: ${
              client.street
            }, ${client.home} ${newValue ? "деактивовано" : "активовано"}.`
          : `Клієнту ${client.bill}|${client.name} - ${client.adresId}: ${
              client.street
            }, ${client.home} ${newValue ? messages[0] : messages[1]}.`;

      await sendTelegramMessage(message);

      toast.info("Змінено!", {
        autoClose: 1000,
        theme: "dark",
        draggable: true,
      });
    } catch (err) {
      console.error(err);
      toast.error("Помилка!", { autoClose: 1500, theme: "dark" });
    } finally {
      setIsLoading(false);
    }
  };

  if (!client) return <Spiner />;

  return (
    <div className="py-4 px-3">
      <Link
        href="/borg"
        className="text-2xl text-lime-500 border-lime-500 p-2 border-2 rounded-md inline-block mb-4"
      >
        ⇐ Назад До Списку
      </Link>

      <h1 className="text-2xl mb-1">{client.name}</h1>
      <div className="flex justify-end text-gray-400 mb-4">
        {[client.adresId, client.street, client.home]
          .filter(Boolean)
          .join(", ")}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`flex justify-center items-center p-2 rounded-md h-10 ${
            isLoading
              ? "bg-yellow-300"
              : !client.isNoActive
              ? "bg-red-600"
              : "bg-green-600"
          }`}
          onClick={() => toggleClientField("isNoActive", ["", ""])}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spiner />
          ) : !client.isNoActive ? (
            "Відключити Клієнта"
          ) : (
            "Поновити Клієнта"
          )}
        </button>

        <button
          className={`flex justify-center items-center p-2 rounded-md h-10 ${
            isLoading
              ? "bg-yellow-300"
              : !client.isUsilok
              ? "bg-green-600"
              : "bg-red-600"
          }`}
          onClick={() =>
            toggleClientField("isUsilok", ["поставили усілок", "зняли усілок"])
          }
          disabled={isLoading}
        >
          {isLoading ? (
            <Spiner />
          ) : !client.isUsilok ? (
            "Поставити Усілок"
          ) : (
            "Забрати Усілок"
          )}
        </button>
      </div>

      <div className="grid gap-4">
        {records.map((r, idx) => (
          <RecordCard key={idx} record={r} changeable={false} />
        ))}
      </div>
    </div>
  );
};

export default ClientDetailPage;
