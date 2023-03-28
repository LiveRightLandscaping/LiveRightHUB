import React, { useState, useEffect } from "react";
import axios from "axios";


const ClockedIn = () => {
  const [clockedInEmployees, setClockedInEmployees] = useState([]);

  const fetchClockedInEmployees = async () => {
    try {
      const response = await axios.get(`${window.API_URL}/api/employees`);
      const employees = response.data;
      const clockedIn = employees.filter(
        (employee) =>
          employee.hoursWorked.length &&
          !employee.hoursWorked[employee.hoursWorked.length - 1].clockOut
      );
      setClockedInEmployees(clockedIn);
    } catch (error) {
      console.error("Error fetching clocked-in employees:", error);
    }
  };

  useEffect(() => {
    fetchClockedInEmployees();
    const intervalId = setInterval(fetchClockedInEmployees, 5000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId); // Clear the interval on unmount
  }, []);

  const handleClockOut = async (employeeNumber) => {
    const employeeNumberInput = prompt(
      "Please enter your employee number to clock out"
    );
    if (!employeeNumberInput) {
      return;
    }
    try {
      await axios.post(`${window.API_URL}/api/clock_out`, {
        employeeNumber,
        employeeNumberInput, // Pass the employeeNumberInput to the backend
      });
      alert("Employee clocked out successfully!");
    } catch (error) {
      alert("Error clocking out employee. Please try again.");
    }
  };

  return (
    <div className="items-center justify-center text-center">
      <h2 className="text-2xl mb-6 shadow-black mt-10 ">
        Clocked In Employees
      </h2>
      <ul className="space-y-4 mx-2 md:mx-4 lg:mx-8 xl:mx-16">
        {clockedInEmployees.map((employee) => {
          const clockInTime = new Date(
            employee.hoursWorked[employee.hoursWorked.length - 1].clockIn
          );
          return (
            <div key={employee.employeeNumber} className="flex text-white">
              <li className="employee-card">
                <span className="employee-name">{employee.name}</span>
                <span className="employee-clockin-time">
                  (Clocked In: {clockInTime.toLocaleString()})
                </span>
                <button
                  className="clockout-btn bg-green-700 hover:bg-green-400 mt-2 text-white p-2 rounded ml-4"
                  onClick={() => handleClockOut(employee.employeeNumber)}
                >
                  Clock Out
                </button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ClockedIn;

