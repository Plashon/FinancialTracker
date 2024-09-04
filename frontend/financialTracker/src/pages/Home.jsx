import React, { useState, useEffect } from "react";
import Search from "./../component/Search";
import Financial from "../component/Financial";
import FinancialService from "../service/financial.service";
import Table from "../component/Table";


function Home() {
  const [financials, setFinancials] = useState([]);
  useEffect(() => {
    const getFinancial = async () =>{
      try {
        const response = await FinancialService.getAllFinancial();
        if(response.status === 200){
          setFinancials(response.data);
        
        }
      } catch (error) {
        Swal.file({
          title:"Get All Restaurant",
          text:error?.response?.data?.message || error.message,
          icon:"error"
        })
      }
    }
    getFinancial()
  }, []);
//<Financial financials={financials}/>
  return (
    <>
      <div className="container flex flex-row flex-wrap mx-auto items-center justify-center">
        <Search/>
        <Table financials={financials}/>
      </div>
    </>
  );
}
 export default Home;
