import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";


const EmployeeHub = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${window.API_URL}/api/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleUpdateHours = async (employeeNumber, updatedTotalHours) => {
    try {
      await axios.put(
        `${window.API_URL}/api/employees/${employeeNumber}/update_hours`,
        {
          updatedTotalHours,
        }
      );
      fetchEmployees();
      alert("Employee's total hours updated successfully!");
    } catch (error) {
      alert("Error updating employee's total hours. Please try again.");
    }
  };

  const handleResetAndEmail = async () => {
    setLoading(true);
    try {
      await axios.post(`${window.API_URL}/api/reset_and_email`);
      fetchEmployees();
      setLoading(false);
      alert("Employees reset and email sent successfully!");
    } catch (error) {
      alert("Error resetting employees and sending email. Please try again.");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchEmployees, 5000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="mt-8 sm:px-1 lg:px-8 relative">
      <div className="">
        <h1 className="text-lg text-[#a3a3a3] font-bold mb-2">
          LiveRight Landscaping
        </h1>
        <h2 className="text-2xl font-extrabold mb-2">Employee Hub</h2>
        <button
          className=" top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300 mb-4"
          onClick={() => setModalOpen(true)}
        >
          Employee List
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4 bg-[#0c0c0c] text-white font-bold border border-gray-700 p-2 rounded-lg shadow-md">
        <div className="py-2 text-center">Name</div>
        <div className="py-2 text-center">Rate</div>
        <div className="py-2 text-center">Hours</div>
        <div className="py-2 text-center">Money Owed</div>
      </div>
      {employees.map((employee) => (
        <div
          key={employee.employeeNumber}
          className="grid grid-cols-5 gap-4 py-2 bg-[#1f1f1f] text-white border border-green-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center">
            <div>
              <p className="text-sm font-bold pl-1">{employee.name}</p>
            </div>
          </div>
          <div className="text-center mt-4 text-xs">
            ${employee.hourlyRate.toFixed(2)}
          </div>
          <div className="text-center mt-4 text-sm">
            {employee.totalHours.toFixed(2)}
          </div>
          <div className="text-center mt-4 text-xs">
            ${employee.moneyOwed.toFixed(2)}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-green-500 text-white text-xs mr-4 py-1 px-2 rounded-xl hover:bg-green-600 transition-colors duration-300"
              onClick={() => {
                const updatedTotalHours = prompt("Enter updated total hours:");
                if (updatedTotalHours) {
                  handleUpdateHours(
                    employee.employeeNumber,
                    parseFloat(updatedTotalHours)
                  );
                }
              }}
            >
              Update Hours
            </button>
          </div>
        </div>
      ))}
      <button
        className="bg-green-600 text-white py-2 px-4 rounded-full mt-4 hover:bg-green-700 transition-colors duration-300 ml-6"
        onClick={handleResetAndEmail}
      >
        Reset All and Email Boss
      </button>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Employee List</h3>
            {employees.map((employee) => (
              <div key={employee.employeeNumber} className="mb-2">
                <p className="text-gray-800 font-bold">{employee.name}</p>
                <p className="text-gray-600 text-sm">
                  {employee.employeeNumber}
                </p>
              </div>
            ))}
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-lg text-center">
            <ClipLoader size={50} color={"#ffffff"} />
            <p className="mt-2">Sending email</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeHub;
