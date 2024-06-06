import Table from "@/components/Table";
import prisma from "@/lib/prisma";


export default async function Home() {
  

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
  newData.sort((a, b) => {
    const streetA = a.street?.toLowerCase(); 
    const streetB = b.street?.toLowerCase();
  
    if (streetA < streetB) {
      return -1; 
    }
    if (streetA > streetB) {
      return 1; 
    }
    const homeA = parseInt(a?.home, 10);
    const homeB = parseInt(b?.home, 10);
  
    if (homeA < homeB) {
      return -1;
    }
    if (homeA > homeB) {
      return 1;
    }
    return 0; 
  })

  return (
    <main className="min-h-screen flex">  
      <div className="min-w-full max-w-screen-sm mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Борги</h1>
        <Table data={newData} adr={adreses} />
      </div>
    </main>
  );
}
