import Table from "@/components/Table";
import { getAdreses, getClients } from "@/lib/actions";
import Link from "next/link";


export const dynamic = 'force-dynamic';

export default async function Home() {

  // const data = await getClients();
  const adreses = await getAdreses();

  return (
    <main className="min-h-screen flex">  
      <div className="min-w-full max-w-screen-sm mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4"><Link href={"/"}>Борги</Link></h1>
        <Table
         adr={adreses} 
         />
      </div>
    </main>
  );
}
