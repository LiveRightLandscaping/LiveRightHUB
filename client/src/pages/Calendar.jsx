import React from "react";
import { Header, JobSites, Schedule } from "../components";

const Calendar = () => {
  return (
    <div className="max-h-auto">
      <Header />
      <div className="mt-20">
        <Schedule/>
      </div>
      <div className="mt-10">
        <JobSites />
      </div>
    </div>
  );
};

export default Calendar;
