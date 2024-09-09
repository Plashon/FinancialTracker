import React from "react";
import FinancialService from "../../service/financial.service";

const FinancialTable = ({ financials }) => {
  const handleDelete = async (id) => {
    try {
      const response = await FinancialService.deleteFinancial(id);
      if (response.status === 200) {
        alert("Financial record has been deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container flex flex-row flex-wrap mx-auto items-center justify-center">
      <div className="mt-3 mb-10 mx-auto h-30 w-5/6 text-center">
        <h1 className="mx-auto mt-5 text-xl font-bold">Financial Detail</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Id</th>
              <th>UserId</th>
              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {financials &&
              financials.map((financial) => (
                <tr key={financial.id}>
                  <td>{financial.id}</td>
                  <td>{financial.userId}</td>
                  <td>{financial.description}</td>
                  <td>{financial.date}</td>
                  <td>{financial.amount}</td>
                  <td>{financial.category}</td>
                  <td>{financial.paymentMethod}</td>
                  <td>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-error"
                        onClick={() => handleDelete(financial.id)}
                      >
                        Delete
                      </button>
                      <a className="btn btn-primary" href={`edit/${financial.id}`}>
                        Edit
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Id</th>
              <th>UserId</th>
              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default FinancialTable;
