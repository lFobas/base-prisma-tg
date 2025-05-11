
import React from "react";
import { getAdreses } from "../../../lib/actions";
import FilterMenu from "../../../components/v2/FilterMenu/FilterMenu";
import ListPage from "../../../components/v2/FilterMenu/ListPage";

const page = async () => {
  const adreses = await getAdreses();
  return (
    <div className="relative">
      <FilterMenu adr={adreses} />
      <div className="pt-14 pb-24">
        <ListPage />
      </div>
    </div>
  );
};

export default page;
