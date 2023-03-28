import React, { useState } from "react";
import axios from "axios";


const NumPad = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");

  const handleClick = (value) => {
    setEmployeeNumber((prev) => prev + value);
  };

  const handleClockIn = async () => {
    try {
      const response = await axios.post(`${window.API_URL}/api/clock_in`, {
        employeeNumber: parseInt(employeeNumber),
      });
      alert(response.data.message); // Display success or error message returned by the backend
      setEmployeeNumber("");
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message); // Display error message returned by the backend
    }
  };


  const clearInput = () => {
    setEmployeeNumber("");
  };

  return (
    <div className="numpad-container mx-10 ">
      <h2 className="numpad-title">Employee Clock In</h2>
      <input
        type="text"
        value={employeeNumber}
        readOnly
        className="numpad-input"
      />
      <div className="numpad-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "Enter"].map((num) => (
          <button
            key={num}
            className={`numpad-button${
              num === "C" || num === "Enter" ? " numpad-special" : ""
            }`}
            onClick={() => {
              if (num === "C") {
                clearInput();
              } else if (num === "Enter") {
                handleClockIn();
              } else {
                handleClick(num);
              }
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumPad;
