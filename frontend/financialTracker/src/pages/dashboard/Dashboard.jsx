import React, { useState, useEffect } from "react";
import FinancialService from "../../service/financial.service";
import Table from "../../component/Table";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecord } from "../../contexts/financial.context";
import Add from "./Add";
import FinancialTable from "./FinancialTable";
function Dashboard() {
  const { user } = useUser();
  const { financials } = useFinancialRecord();
  return (
    <>
      <div className="container flex flex-row flex-wrap mx-auto items-center justify-center">
        <div className="text-3xl font-bold mb-5 mt-5 ">
          Welcome {user?.firstName}
        </div>
      </div>
      <Add />
      <div className="container flex flex-row flex-wrap mx-auto items-center justify-center">
        <div className="text-xl font-bold mt-5 items-start">
          Total Monthly: 76676776฿
        </div>
        <FinancialTable financials={financials} />
      </div>
    </>
  );
}
export default Dashboard;
