import React, { useState, useEffect } from "react";
import axios from "axios";


const Schedule = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
    const interval = setInterval(() => {
      fetchSchedules();
    }, 5000); // call fetchSchedules every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${window.API_URL}/api/schedules`);
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  return (
    <div className="p-4 rounded-lg bg-[#262626]">
      <h2 className="text-white text-2xl font-bold mb-4">Schedule</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {schedules.map((schedule) => (
          <div className="bg-[#111] rounded-md shadow-lg shadow-black border-green-700 border p-4" key={schedule._id}>
            <h3 className="text-green-700 font-bold text-lg mb-2">
              {schedule.day}
            </h3>
            <p className="text-gray-400 font-medium">
              {schedule.employees.map((employee, index) => (
                <span key={employee._id}>
                  {employee.name}
                  {index < schedule.employees.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
