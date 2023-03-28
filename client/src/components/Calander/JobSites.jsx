import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";


const JobSites = () => {
  const [jobs, setJobs] = useState([]);
  const [timeZone, setTimeZone] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${window.API_URL}/api/jobs`);
      const sortedJobs = response.data.sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate);
      });
      setJobs(sortedJobs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
    const intervalId = setInterval(fetchJobs, 5000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId); // Clear the interval on unmount
  }, []);

  const getLocalDate = (dateString) => {
    const date = parseISO(dateString);
    const zonedDate = utcToZonedTime(date, timeZone); // Convert the date to the user's timezone
    const formattedDate = format(zonedDate, "PPPP");
    return formattedDate;
  };

  if (jobs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-2xl font-bold mb-4 text-center">Job Sites</h2>
        <p className="text-center text-4xl font-bold underline text-green-700 mb-5">
          No Jobs This Week
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 bg-[#262626] rounded-lg p-3">
      <h2 className="text-white text-2xl font-bold mb-4">Job Sites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-[#101010] text-white p-4 mb-4 rounded-lg shadow-lg shadow-black border-green-700 border transform transition-all duration-500 hover:scale-105"
          >
            <h3 className="text-green-700 font-bold text-lg mb-2">
              {job.name}
            </h3>
            <p className="text-gray-400">{job.description}</p>
            <p className="text-green-400 mt-4">
              Start: {getLocalDate(job.startDate)}
            </p>
            <p className="text-green-400">End: {getLocalDate(job.endDate)}</p>
            <h4 className="text-md font-bold mb-2 mt-4">Assignments:</h4>
            <ul className="list-disc list-inside">
              {job.assignments.map((assignment) => (
                <li key={assignment.id} className="text-gray-400">
                  {assignment.day}: {assignment.employees}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSites;
