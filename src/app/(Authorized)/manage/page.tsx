import React from "react";
import UserInfo from "../../../components/UserInfo";
import AddClient from "@/components/AddClient";

const ManagePage = () => {
  return (
    <div>
      <AddClient />
      <UserInfo />
    </div>
  );
};

export default ManagePage;
