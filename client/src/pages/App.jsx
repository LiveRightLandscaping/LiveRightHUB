import React, { useState, useEffect } from "react";
import { NumPad, ClockedIn, Header, EmployeeLogin } from "../components";

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lastShownTimeStr = localStorage.getItem("lastShownTime");
    if (lastShownTimeStr) {
      const lastShownTime = new Date(lastShownTimeStr);
      const now = new Date();
      if ((now - lastShownTime) / 1000 >= 120) {
        setShowModal(true);
        localStorage.setItem("lastShownTime", now.toISOString());
      }
    } else {
      setShowModal(true);
      localStorage.setItem("lastShownTime", new Date().toISOString());
    }
  }, []);

  return (
    <div className="app-container min-h-screen text-white">
      <Header />
      <h1 className="app-title text-4xl mb-6 mt-10">Liveright Landscaping</h1>
      <div className="border p-2 px-8 rounded-lg shadow-md shadow-black">
        <p className="text-sm mb-4 mt-3">
          Current Time: {currentTime.toLocaleTimeString()}
          <br />
          Current Date: {currentTime.toLocaleDateString()}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NumPad />
        <ClockedIn />
      </div>
      {showModal && (
        <EmployeeLogin
          showModal={showModal}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;
