import React, { useState } from "react";
import axios from "axios";


const DeleteEmployee = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");

  const handleDeleteEmployee = async () => {
    try {
      await axios.delete(`${window.API_URL}/api/employees/${employeeNumber}`);
      alert("Employee deleted successfully!");
      setEmployeeNumber("");
    } catch (error) {
      alert("Error deleting employee. Please try again.");
    }
  };

  return (
    <div class="bg-[#222222a1] mx-6 mb-10 py-4 px-6 rounded-xl mt-4">
      <h2 class="text-white text-lg font-bold mb-4 delete-employee-title">
        Delete Employee
      </h2>
      <form
        class="delete-employee-form flex flex-col space-y-4"
        onSubmit={handleDeleteEmployee}
      >
        <label
          htmlFor="employee-number"
          class="text-white block font-bold mb-2"
        >
          Employee Number:
        </label>
        <input
          type="text"
          id="employee-number"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
          required
          class="p-2 bg-[#252525] text-white rounded border border-green-700 focus:outline-none focus:border-green-400 shadow-md shadow-black"
        />
        <button
          type="submit"
          class="py-2 bg-green-700 text-white font-bold hover:bg-green-500 focus:outline-none focus:bg-gray-700 rounded-lg p-2 px-4 delete-employee-button"
        >
          Delete Employee
        </button>
      </form>
    </div>
  );
};

export default DeleteEmployee;
