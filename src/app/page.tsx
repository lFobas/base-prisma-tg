"use client";

import Link from "next/link";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../lib/store";

export default function Home() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user?.role === "ADMIN") {
      router.push("/borg");
    }
  }, []);

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-9/12 lg:w-9/12 mx-auto my-auto px-4">
        <h1 className="flex font-semibold items-center justify-center">
          <Link className="button" href={"/borg"}>
            Борги
          </Link>
        </h1>
        {/* <Auth /> */}
      </div>
    </div>
  );
}
