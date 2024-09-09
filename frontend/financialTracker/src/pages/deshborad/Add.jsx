import React, { useState } from "react";
import Swal from "sweetalert2";
import { useFinancialRecord } from "../../contexts/financial.context"; // ใช้ path ที่ถูกต้อง
import { useUser } from "@clerk/clerk-react";

const Add = () => {
  const { addFinancial } = useFinancialRecord(); // ใช้ context
  const { user } = useUser(); // ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่

  // State variables
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // Example category and paymentMethod arrays
  const categories = ["Food", "Fruit", "Snack", "Drink","Supplies"];
  const paymentMethods = ["Cash", "Credit Card", "Bank Transfer", "PayPal"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("Error!", "User not logged in.", "error");
      return;
    }

    const financial = {
      userId: user.id, // ใช้ userId จาก context
      description,
      date,
      amount,
      category,
      paymentMethod,
    };

    try {
      await addFinancial(financial); // ใช้ฟังก์ชัน addFinancial จาก context
      Swal.fire("Success!", "Financial record added successfully!", "success");
      // Reset the form fields
      setDescription("");
      setDate("");
      setAmount("");
      setCategory("");
      setPaymentMethod("");
    } catch (error) {
      console.error("Error adding financial record:", error);
      Swal.fire(
        "Error!",
        "There was an error adding the financial record.",
        "error"
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-96 bg-base-100 shadow-xl m-2 p-4 rounded-lg border-2 border-[#c493ff]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold">Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input input-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
              required
            />
          </div>
          <div>
            <label className="block font-bold">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
              required
            />
          </div>
          <div>
            <label className="block font-bold">Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
              required
            />
          </div>
          <div>
            <label className="block font-bold">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
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
              Add Financial Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
