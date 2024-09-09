import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import FinancialService from "../../service/financial.service";

function EditDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [financial, setFinancials] = useState({
    userId: "",
    description: "",
    date: "",
    amount: "",
    category: "",
    paymentMethod: "",
  });

  // Utility function to format the date for input type="datetime-local"
  const formatDateForInput = (dateString) => {
    if (!dateString) return ""; // Handle empty date
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Formats to "YYYY-MM-DDTHH:MM" for datetime-local
  };

  // Utility function to format the date for submission to the server
  const formatDateForSubmission = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace("T", " "); // Formats to "YYYY-MM-DD HH:MM:SS"
  };

  const categories = ["Food", "Fruit", "Snack", "Drink", "Supplies"];
  const paymentMethods = ["Cash", "Credit Card", "Bank Transfer", "PayPal"];

  useEffect(() => {
    FinancialService.getFinancialById(id).then((response) => {
      if (response.status === 200) {
        const fetchedData = response.data;
        setFinancials({
          ...fetchedData,
          date: formatDateForInput(fetchedData.date), // Format date for input
        });
      }
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancials({ ...financial, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedDate = formatDateForSubmission(financial.date); // Format date for submission
      const response = await FinancialService.editFinancial(id, {
        ...financial,
        date: formattedDate,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Financial record updated",
          text: "Updated successfully",
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update financial record",
        text: error?.response?.data?.message || error.message,
        timer: 1500,
      });
    }
  };
  return (
    <div className="flex  items-center justify-center h-full mb-5">
      <div className="w-96 bg-base-100 text-center shadow-xl m-2 p-4 rounded-lg border-2 border-[#c493ff]">
        <span className="text-[#c493ff] font-bold text-3xl">Edit Record</span>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold items-start">Description:</label>
            <input
              type="text"
              value={financial.description}
              onChange={handleChange}
              className="input input-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
              required
            />
          </div>
          <div>
            <label className="block font-bold">Date:</label>
            <input
              type="datetime-local"
              value={financial.date}
              onChange={handleChange}
              className="input input-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
              required
            />
          </div>
          <div>
            <label className="block font-bold">Amount:</label>
            <input
              type="number"
              onChange={handleChange}
              value={financial.amount}
              className="input input-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
              required
            />
          </div>
          <div>
            <label className="block font-bold">Category:</label>
            <select
              onChange={handleChange}
              value={financial.category}
              className="select select-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-bold">Payment Method:</label>
            <select
              onChange={handleChange}
              value={financial.paymentMethod}
              className="select select-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
              required
            >
              <option value="" disabled>
                Select a payment method
              </option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn bg-[#c493ff] text-black border-none hover:bg-[#a970e8]"
            >
              Update Financial Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDashboard;
