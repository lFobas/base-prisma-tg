import Table from "@/components/Table";
import prisma from "@/lib/prisma";
import Script from 'next/script'


export default async function Home() {
  <Script src="https://telegram.org/js/telegram-web-app.js" />

  const tg = window.Telegram.WebApp

  tg.expand()

  const data = await prisma.client.findMany({include: {
    records: true,
    adres: true,
  },})
  const adreses = await prisma.adres.findMany({  })

  const newData = data.map(item => ({
    ...item,
    records: item.records.map(record => ({
      ...record,
      summa: Number(record.summa)
    }))
  }));

  return (
    <main className="">
      
      <>
      <h1 className="text-2xl font-bold mb-4">Simple Table Example</h1>
        <Table data={newData} adr={adreses} />
      </>
    </main>
  );
}
