import { useState, useEffect } from "react";
import Table from "./Table";

const Financial = ({ financials }) => {
  return (
    <>
      {financials &&
        financials.map((financial) => {
          return (
            <Table
              key={financial.id}
              id={financial.id}
              userId={financial.userId}
              description={financial.description}
              date={financial.date}
              amount={financial.amount}
              category={financial.category}
              paymentMethod={financial.paymentMethod}
            />
          );
        })}
    </>
  );
};

export default Financial;
