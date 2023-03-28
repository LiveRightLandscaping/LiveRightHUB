import React, { useState } from "react";
import { EmployeeHub, AddEmployee, DeleteEmployee, Header, CreateJob, DeleteJob, CreateSchedule } from "../components";

const Hub = () => {
  const [showModal, setShowModal] = useState(true);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "1234" || password === "4321") {
      setShowModal(false);
    } else {
      alert("Invalid employee number. Redirecting to the home page.");
      // Replace this with the path of your home page
      window.location.href = "/";
    }
  };

  return (
    <div>
      <Header />
      {showModal && (
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-95">
          <div class="bg-[#252525] p-6 rounded-lg border border-green-700">
            <div class="mb-5">
              <p class="text-2xl font-bold text-white">Owner Hub</p>
            </div>
            <input
              type="password"
              class="w-full border border-green-700 p-2 mb-4 rounded-lg text-white bg-[#1e1e1e]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              class="bg-green-700 text-white py-2 px-6 rounded-lg"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      )}
      <div class="container mx-auto py-6 px-6 mt-16">
        <h1 class="text-4xl font-bold mb-10 text-center">
          LiveRight Central Hub
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          <div class="border border-green-700 py-1 px-4 rounded-lg text-center hover:bg-green-700 hover:text-white transition duration-300 md:col-span-2">
            <EmployeeHub />
            <p class="text-xl font-bold mt-4 mb-2">Employee Hub</p>
            <p class="text-gray-500 text-sm">View and manage employees</p>
          </div>
          <div class="border border-green-700 py-1 px-4 rounded-lg text-center hover:bg-green-700 hover:text-white transition duration-300">
            <AddEmployee />
            <p class="text-xl font-bold mt-4 mb-2">Add Employee</p>
            <p class="text-gray-500 text-sm">
              Add a new employee
            </p>
          </div>
          <div class="border border-green-700 py-1 px-4 rounded-lg text-center hover:bg-green-700 hover:text-white transition duration-300">
            <DeleteEmployee />
            <p class="text-xl font-bold mt-4 mb-2">Delete Employee</p>
            <p class="text-gray-500 text-sm">
              Remove an employee
            </p>
          </div>
          <div class="border border-green-700 py-1 px-4 rounded-lg text-center hover:bg-green-700 hover:text-white transition duration-300 md:col-span-2">
            <CreateJob />
            <p class="text-xl font-bold mt-4 mb-2">Create Job</p>
            <p class="text-gray-500 text-sm">
              Create a new job 
            </p>
          </div>
          <div class="border border-green-700 py-1 px-4 rounded-lg text-center hover:bg-green-700 hover:text-white transition duration-300">
            <DeleteJob />
            <p class="text-xl font-bold mt-4 mb-2">Delete Job</p>
            <p class="text-gray-500 text-sm">Remove a job</p>
          </div>
          <div class="border border-green-700 py-1 px-4 rounded-lg text-center hover:bg-green-700 hover:text-white transition duration-300">
            <CreateSchedule />
            <p class="text-xl font-bold mt-4 mb-2">Create Schedule</p>
            <p class="text-gray-500 text-sm">
              Create a new schedule
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hub
