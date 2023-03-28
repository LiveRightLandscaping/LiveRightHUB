import React, { useState } from "react";
import axios from "axios";


const CreateJob = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignments, setAssignments] = useState([]);

  const handleAssignmentChange = (day, employees) => {
    setAssignments((prevAssignments) => {
      const newAssignments = [...prevAssignments];
      const index = newAssignments.findIndex(
        (assignment) => assignment.day === day
      );
      if (index === -1 && employees !== "") {
        newAssignments.push({ day, employees });
      } else if (index !== -1 && employees !== "") {
        newAssignments[index].employees = employees;
      } else if (index !== -1 && employees === "") {
        newAssignments.splice(index, 1);
      }
      return newAssignments;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${window.API_URL}/api/jobs`, {
        name,
        description,
        startDate,
        endDate,
        assignments,
      });
      // Clear the form
      setName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setAssignments([]);
      alert("Job created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating job!");
    }
  };

  return (
    <div className=" max-w-auto border mx-6 p-4 px-10 border-green-700 rounded-lg bg-[#2c2c2c] mt-4">
      <h2 className="text-xl font-bold mb-6 text-white">Create Job</h2>
      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-bold mb-2 text-white "
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full p-2 bg-[#252525] text-white rounded border border-green-700 focus:outline-none focus:border-green-400 shadow-md shadow-black"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-bold mb-2 text-white"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            className="w-full p-2 bg-[#252525] text-white rounded border border-green-700 focus:outline-none focus:border-green-400 shadow-md shadow-black"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="end_date"
            className="block text-sm font-bold mb-2 text-white"
          >
            start Date:
          </label>
          <input
            type="date"
            id="start_date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            required
            className="w-full p-2 bg-[#252525] text-white rounded border border-green-700 focus:outline-none focus:border-green-400 shadow-md shadow-black"
            min={new Date().toISOString().split("T")[0]} // Set the minimum date to the current date
          />
        </div>
        <div>
          <label
            htmlFor="end_date"
            className="block text-sm font-bold mb-2 text-white"
          >
            End Date:
          </label>
          <input
            type="date"
            id="end_date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            required
            className="w-full p-2 bg-[#252525] text-white rounded border border-green-700 focus:outline-none focus:border-green-400 shadow-md shadow-black"
            min={new Date().toISOString().split("T")[0]} // Set the minimum date to the current date
          />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 text-white">Assignments:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="monday"
                className="block text-sm font-bold mb-2 text-white"
              >
                Monday:
              </label>
              <input
                type="text"
                id="monday"
                value={
                  assignments.find((a) => a.day === "Monday")?.employees || ""
                }
                onChange={(event) =>
                  handleAssignmentChange("Monday", event.target.value)
                }
                className="w-full p-2 bg-[#252525] text-white rounded border border-green-700 focus:outline-none focus:border-green-400 shadow-md shadow-black"
              />
            </div>
            <div>
              <label
                htmlFor="tuesday"
                class="block text-sm font-bold mb-2 text-white"
              >
                Tuesday:
              </label>
              <input
                type="text"
                id="tuesday"
                value={
                  assignments.find((a) => a.day === "Tuesday")?.employees || ""
                }
                onChange={(event) =>
                  handleAssignmentChange("Tuesday", event.target.value)
                }
                className="w-full p-2 bg-[#252525] text-white rounded border border-green-700 focus:outline-none focus:border-green-400 shadow-md shadow-black"
              />
            </div>
            <div>
              <label
                htmlFor="wednesday"
                className="block text-sm font-bold mb-2 text-white"
              >
                Wednesday:
              </label>
              <input
                type="text"
                id="wednesday"
                value={
                  assignments.find((a) => a.day === "Wednesday")?.employees ||
                  ""
                }
                onChange={(event) =>
                  handleAssignmentChange("Wednesday", event.target.value)
                }
                className="w-full p-2 bg-[#252525] text-white rounded border border-green-700 focus:outline-none focus:border-green-400 shadow-md shadow-black"
              />
            </div>
            <div>
              <label
                htmlFor="thursday"
                className="block text-sm font-bold mb-2 text-white"
              >
                Thursday:
              </label>
              <input
                type="text"
                id="thursday"
                value={
                  assignments.find((a) => a.day === "Thursday")?.employees || ""
                }
                onChange={(event) =>
                  handleAssignmentChange("Thursday", event.target.value)
                }
                className="w-full p-2 bg-[#252525] text-white rounded border border-green-700 focus:outline-none focus:border-green-400 shadow-md shadow-black"
              />
            </div>
            <div>
              <label
                htmlFor="friday"
                className="block text-sm font-bold mb-2 text-white"
              >
                Friday:
              </label>
              <input
                type="text"
                id="friday"
                value={
                  assignments.find((a) => a.day === "Friday")?.employees || ""
                }
                onChange={(event) =>
                  handleAssignmentChange("Friday", event.target.value)
                }
                className="w-full p-2 bg-[#252525] text-white rounded border border-green-700 focus:outline-none focus:border-green-400 shadow-md shadow-black"
              />
            </div>
            <div>
              <label
                htmlFor="saturday"
                className="block text-sm font-bold mb-2 text-white"
              >
                Saturday:
              </label>
              <input
                type="text"
                id="saturday"
                value={
                  assignments.find((a) => a.day === "Saturday")?.employees || ""
                }
                onChange={(event) =>
                  handleAssignmentChange("Saturday", event.target.value)
                }
                className="w-full p-2 bg-[#252525] text-white rounded border border-green-700 focus:outline-none focus:border-green-400 shadow-md shadow-black"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-2 bg-green-700 text-white font-bold hover:bg-green-500 focus:outline-none focus:bg-gray-700 rounded-lg p-2 px-4"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
