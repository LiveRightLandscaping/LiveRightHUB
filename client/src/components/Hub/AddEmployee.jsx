// src/components/AddEmployee.jsx
import React, { useState } from "react";
import axios from "axios";



const AddEmployee = () => {
  const [name, setName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${window.API_URL}/api/employees`, {
        name,
        employeeNumber: parseInt(employeeNumber),
        hourlyRate: parseFloat(hourlyRate),
      });
      alert("Employee added successfully!");
      setName("");
      setEmployeeNumber("");
      setHourlyRate("");
    } catch (error) {
      alert("Error adding employee. Please try again.");
    }
  };

  return (
    <div className="h-60 overflow-y-scroll bg-[#222222a1] flex-grow flex-col items-center text-center justify-center mt-6 mb-10 px-4 py-6 sm:px-6 md:px-10 lg:px-20 xl:px-40 rounded-xl border border-green-700 mx-4 sm:mx-6">
      <h2 className="app-title text-2xl mb-6 text-white">Add Employee</h2>
      <form onSubmit={handleSubmit} className="w-full sm:w-auto flex-grow">
        <div className="mb-4 w-full sm:w-auto">
          <label htmlFor="name" className="block mb-2 text-white font-bold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field w-full"
          />
        </div>
        <div className="mb-4 w-full sm:w-auto">
          <label
            htmlFor="employeeNumber"
            className="block mb-2 text-white font-bold"
          >
            Employee Number:
          </label>
          <input
            type="number"
            id="employeeNumber"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
            required
            className="input-field w-full"
          />
        </div>
        <div className="mb-4 w-full sm:w-auto">
          <label
            htmlFor="hourlyRate"
            className="block mb-2 text-white font-bold"
          >
            Hourly Rate:
          </label>
          <input
            type="number"
            id="hourlyRate"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            step=".5"
            required
            className="input-field w-full"
          />
        </div>
        <button type="submit" className="button-primary w-full sm:w-auto">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
