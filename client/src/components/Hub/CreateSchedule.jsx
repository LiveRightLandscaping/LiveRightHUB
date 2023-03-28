import React, { useState, useEffect } from "react";
import axios from "axios";


const CreateSchedule = () => {
  const [day, setDay] = useState("");
  const [employees, setEmployees] = useState([]);
  const [availableEmployees, setAvailableEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get(`${window.API_URL}/api/employees`);
      setAvailableEmployees(response.data);
    };
    fetchEmployees();
  }, []);

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleEmployeeChange = (event) => {
    const employeeId = event.target.value;
    if (event.target.checked) {
      setEmployees([...employees, employeeId]);
    } else {
      setEmployees(employees.filter((id) => id !== employeeId));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${window.API_URL}/api/schedules`, {
        day,
        employees,
      });
      alert("Schedule created!");
    } catch (error) {
      alert(`Error creating schedule: ${error.message}`);
    }
  };

  const handleClear = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(`${window.API_URL}/schedules/clear`);
      alert("Schedule cleared!");
    } catch (error) {
      alert(`Error clearing schedule: ${error.message}`);
    }
  };

  return (
    <div class="bg-[#313131] p-4 rounded-lg border border-green-700 mx-6 mt-4">
      <h1 class="text-white text-3xl font-bold mb-4">Create Schedule</h1>
      <form class="text-white" onSubmit={handleSubmit}>
        <label class="block mb-2">
          Day:
          <select
            class="bg-white text-black rounded-md px-2 py-1 ml-2"
            value={day}
            onChange={handleDayChange}
          >
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </label>
        <label class="block mb-2">
          Employees:
          {availableEmployees.map((employee) => (
            <div key={employee._id}>
              <label class="flex items-center">
                <input
                  className="mr-2 h-5 w-5"
                  type="checkbox"
                  value={employee._id}
                  onChange={handleEmployeeChange}
                  checked={employees.includes(employee._id)}
                />

                {employee.name}
              </label>
            </div>
          ))}
        </label>
        <div className="flex h-16">
          <button
            class="bg-green-700 text-white rounded-md px-2  mr-2 hover:bg-green-500 "
            type="submit"
          >
            Create Schedule
          </button>
          <button
            class="border border-green-700 text-green-700 rounded-md px-2  hover:bg-[#212121] "
            type="button"
            onClick={handleClear}
          >
            Clear Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSchedule;
