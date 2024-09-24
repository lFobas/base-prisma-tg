import Table from "@/components/Table";
import { getAdreses } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const adreses = await getAdreses();

  return (
    <main className="min-h-screen flex">
      <div className="w-full md:w-9/12 lg:w-9/12 mx-auto px-4">
        <Table adr={adreses} />
      </div>
    </main>
  );
}
