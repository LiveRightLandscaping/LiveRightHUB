import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteJob = () => {
  const [jobId, setJobId] = useState("");
  const [jobs, setJobs] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${window.API_URL}/api/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  const handleJobIdChange = (event) => {
    setJobId(event.target.value);
  };

  const handleJobSelect = (id) => {
    setJobId(id);
    setDropdownOpen(false);
  };

  const handleDeleteJob = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.delete(
        `${window.API_URL}/api/jobs/${jobId}`
      );
      console.log(response.data.message);
      setJobId("");

      // Update the jobs state variable by fetching the updated list of jobs
      const updatedJobs = await axios.get(`${window.API_URL}/api/jobs`);
      setJobs(updatedJobs.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="mx-6 bg-[#2c2c2c] px-6 py-4 rounded-lg border border-green-700 mt-4">
      <h2 class="text-xl font-bold mb-4 text-white text-center">Delete Job</h2>
      <div class="relative inline-block w-full">
        <button
          class="w-full md:w-auto bg-gray-100 text-gray-800 py-2 px-4 rounded-md font-medium border border-gray-300 hover:bg-gray-200 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Select Job
        </button>
        {dropdownOpen && (
          <ul
            class="absolute right-0 z-10 bg-white border border-gray-300 rounded-md w-full md:w-72 py-2 mt-1"
            aria-labelledby="dropdownMenuButton1"
          >
            {jobs.map((job) => (
              <li key={job._id}>
                <button
                  class="block px-4 py-2 w-full text-left font-medium text-gray-800 hover:bg-gray-200 transition duration-300"
                  type="button"
                  onClick={() => handleJobSelect(job._id)}
                >
                  {job.name} ({`${job._id.slice(0, 4)}...${job._id.slice(-4)}`})
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={handleDeleteJob} class="mt-4 space-y-4">
        <div>
          <label htmlFor="jobId" class="block text-white font-medium mb-1">
            Job ID:
          </label>
          <input
            id="jobId"
            type="text"
            value={jobId}
            onChange={handleJobIdChange}
            class="w-full bg-[#252525] text-white rounded border border-green-700 focus:outline-none focus:border-green-400 shadow-md shadow-black py-2 px-4"
          />
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-green-700 text-white py-2 px-4 rounded-md font-medium hover:bg-green-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-900"
          >
            Delete Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteJob;
