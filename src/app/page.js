import Table from "@/components/Table";
import { getAdreses, getData } from "@/lib/fetchData";




export default async function Home() {

  const data = await getData();
  const adreses = await getAdreses();

  return (
    <main className="min-h-screen flex">  
      <div className="min-w-full max-w-screen-sm mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Борги</h1>
        <Table data={data} adr={adreses} />
      </div>
    </main>
  );
}
