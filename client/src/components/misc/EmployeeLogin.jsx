import React, { useState, useEffect } from "react";
import axios from "axios";



const EmployeeLoginModal = ({ showModal, closeModal }) => {
  const [employees, setEmployees] = useState([]);
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${window.API_URL}/api/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  fetchEmployees();
}, []);

  const handleLogin = () => {
    if (
      employees.some(
        (employee) => employee.employeeNumber === parseInt(employeeNumber)
      )
    ) {
      closeModal();
    } else {
      setError("Invalid employee number");
    }
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-black bg-opacity-90 w-full h-full absolute"></div>
      <div className="bg-[#343434] p-6 rounded-lg w-96 z-10 border border-green-700">
        <h2 className="text-xl font-bold mb-4 text-green-700">
          Employee Login
        </h2>
        <div className="flex place-content-center">
          <img
            src="../icon.png"
            className="rounded-full bg-cover h-36 2-36 mb-6 "
          />
        </div>
        <input
          className="border-2 border-green-700 w-full p-2 rounded-lg mb-4 bg-[#1e1e1e]"
          type="password"
          placeholder="Enter Employee Number"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
        />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button
          className="bg-green-700 text-white w-full py-2 rounded-lg hover:bg-green-400"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default EmployeeLoginModal;
