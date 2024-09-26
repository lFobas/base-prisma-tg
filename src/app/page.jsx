import Auth from "@/components/Auth";

export default async function Home() {
  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-9/12 lg:w-9/12 mx-auto my-auto px-4">
        <h1 className="flex font-semibold items-center justify-center">
          Введіть Свій телеграм ID для продовження:
        </h1>
        <Auth />
      </div>
    </div>
  );
}
