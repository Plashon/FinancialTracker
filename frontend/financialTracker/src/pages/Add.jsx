import { useEffect, useState } from "react";
import FinancialService from "../service/financial.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();
  const [financial, setFinancials] = useState({
    userId: "",
    description: "",
    date: "",
    amount: "",
    category: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancials({ ...financial, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await FinancialService.addFinancial(financial);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Financial record inserted",
          text: response.data.message,
          timer: 1500,
        }).then(() => {
          setFinancials({
            userId: "",
            description: "",
            date: "",
            amount: "",
            category: "",
            paymentMethod: "",
          });
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to insert financial record",
        text: error?.response?.data?.message || error.message,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-4 mb-5 p-6 bg-white rounded-md shadow-md">
        <div className="font-bold text-3xl justify-items-start mt-5 ml-20">
          <span className="text-cyan-400">Add</span> New Financial
        </div>
        <label className="input input-bordered flex items-center gap-2 my-5">
          UserId
          <input
            type="text"
            className="grow"
            placeholder="UserId"
            name="userId"
            onChange={handleChange}
            value={financial.userId}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-5">
          Description
          <input
            type="text"
            className="grow"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={financial.description}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-5">
          Date
          <input
            type="date"
            className="grow"
            name="date"
            onChange={handleChange}
            value={financial.date}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-5">
          Amount
          <input
            type="number"
            className="grow"
            placeholder="Amount"
            name="amount"
            onChange={handleChange}
            value={financial.amount}
          />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Category
        </label>
        <select
          id="category"
          name="category"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" selected disabled>Choose a Category</option>
          <option value="Food">Food</option>
          <option value="Drink">Drink</option>
          <option value="Supplies">Supplies</option>
        </select>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Payment Method
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" selected disabled>Choose a Method</option>
          <option value="Cash">Cash</option>
          <option value="CreditCard">Credit Card</option>
          <option value="Prompay">Prompay</option>
        </select>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
        >
          Add new financial
        </button>
      </div>
    </>
  );
}

export default Add;
