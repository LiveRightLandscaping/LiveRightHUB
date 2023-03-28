const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Import the cors package

dotenv.config();
const app = express();

app.use(cors()); // Add cors middleware to your app
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const employeeSchema = new mongoose.Schema({
  name: String,
  employeeNumber: Number,
  hourlyRate: Number,
  hoursWorked: [
    {
      clockIn: Date,
      clockOut: Date,
    },
  ],
  totalHours: Number,
  moneyOwed: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);
app.post("/api/employees", async (req, res) => {
  const { name, employeeNumber, hourlyRate } = req.body;

  if (!name || !employeeNumber || !hourlyRate) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const newEmployee = new Employee({
    name,
    employeeNumber,
    hourlyRate,
    hoursWorked: [],
    totalHours: 0,
    moneyOwed: 0,
  });

  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ message: "Error creating employee", error });
  }
});

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: "Error fetching employees", error });
  }
});

app.post("/api/clock_in", async (req, res) => {
  const { employeeNumber } = req.body;
  try {
    const employee = await Employee.findOne({ employeeNumber });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const clockedIn = employee.hoursWorked.some(
      (hours) => hours.clockOut === null
    );
    if (clockedIn) {
      return res
        .status(400)
        .json({ message: "Employee is already clocked in" });
    }
    await Employee.updateOne(
      { employeeNumber },
      { $push: { hoursWorked: { clockIn: new Date() } } }
    );
    res.status(200).json({ message: "Employee clocked in" });
  } catch (error) {
    res.status(400).json({ message: "Error clocking in employee", error });
  }
});

app.post("/api/clock_out", async (req, res) => {
  const { employeeNumber } = req.body;
  try {
    const employee = await Employee.findOne({ employeeNumber });
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    const currentShift = employee.hoursWorked[employee.hoursWorked.length - 1];
    if (!currentShift || currentShift.clockOut) {
      res.status(400).json({ message: "Employee has not clocked in yet" });
      return;
    }

    const clockOutTime = new Date();
    const clockInTime = new Date(currentShift.clockIn);
    const hoursWorked = (clockOutTime - clockInTime) / 1000 / 60 / 60;

    await Employee.updateOne(
      { employeeNumber },
      {
        $set: {
          "hoursWorked.$[element].clockOut": clockOutTime,
          totalHours: employee.totalHours + hoursWorked,
          moneyOwed: employee.moneyOwed + hoursWorked * employee.hourlyRate,
        },
      },
      { arrayFilters: [{ "element.clockIn": clockInTime }] }
    );
    res.status(200).json({ message: "Employee clocked out" });
  } catch (error) {
    res.status(400).json({ message: "Error clocking out employee", error });
  }
});

app.delete("/api/employees/:employeeNumber", async (req, res) => {
  const { employeeNumber } = req.params;

  try {
    const deletedEmployee = await Employee.findOneAndDelete({ employeeNumber });
    if (!deletedEmployee) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.status(200).json({ message: "Employee deleted", deletedEmployee });
    }
  } catch (error) {
    res.status(400).json({ message: "Error deleting employee", error });
  }
});

app.post("/api/reset_and_email", async (req, res) => {
  try {
    const employees = await Employee.find();

    const emailContent = employees
      .map(
        (employee) =>
          `
Name: ${employee.name}, 

Total Hours: ${employee.totalHours.toFixed(2)},

Money Owed: $ ${employee.moneyOwed.toFixed(2)}
-
-
`
      )
      .join("\n");

    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const endDate = new Date(currentDate.getTime() - 1 * 24 * 60 * 60 * 1000);

    const formatDate = (date) =>
      `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: "vnick8@hotmail.com",
      subject: `Payroll Week ${formatDate(startDate)}-${formatDate(endDate)}`,
      text: emailContent,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: "Error sending email", error });
      } else {
        console.log("Email sent: " + info.response);
        await Employee.updateMany(
          {},
          {
            $set: {
              hoursWorked: [],
              totalHours: 0,
              moneyOwed: 0,
            },
          }
        );
        res.status(200).json({ message: "Employees reset and email sent" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Error resetting employees", error });
  }
});

app.put("/api/employees/:employeeNumber/update_hours", async (req, res) => {
  const { employeeNumber } = req.params;
  const { updatedTotalHours } = req.body;

  try {
    const employee = await Employee.findOne({ employeeNumber });
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    const newTotalHours = updatedTotalHours + employee.totalHours;
    const newMoneyOwed = newTotalHours * employee.hourlyRate;

    await Employee.updateOne(
      { employeeNumber },
      {
        $set: {
          totalHours: newTotalHours,
          moneyOwed: newMoneyOwed,
        },
      }
    );
    res.status(200).json({ message: "Employee's total hours updated" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating employee's total hours", error });
  }
});

const jobSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  assignments: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
          "First",
        ],
        default: "Monday",
      },
      employees: [String],
    },
  ],
});

const Job = mongoose.model("Job", jobSchema);

// Create a new job
app.post("/api/jobs", async (req, res) => {
  const { name, description, startDate, endDate, assignments } = req.body;

  const newJob = new Job({
    name,
    description,
    startDate,
    endDate,
    assignments: assignments || [],
  });

  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: "Error creating job", error });
  }
});

// Get all jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    const timeZone = "America/Toronto"; // Replace with your time zone
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ message: "Error fetching jobs", error });
  }
});

// Get a specific job by ID
app.get("/api/jobs/:jobId", async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ message: "Job not found" });
    } else {
      res.status(200).json(job);
    }
  } catch (error) {
    res.status(400).json({ message: "Error fetching job", error });
  }
});

// Delete a job
app.delete("/api/jobs/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      res.status(404).json({ message: "Job not found" });
    } else {
      res.status(200).json({ message: "Job deleted", deletedJob });
    }
  } catch (error) {
    res.status(400).json({ message: "Error deleting job", error });
  }
});

// Update a job
app.put("/api/jobs/:jobId", async (req, res) => {
  const { jobId } = req.params;
  const { name, description, startDate, endDate, assignments } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        name: name || job.name,
        description: description || job.description,
        startDate: startDate || job.startDate,
        endDate: endDate || job.endDate,
        assignments: assignments || job.assignments,
      },
      { new: true, omitUndefined: true }
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: "Error updating job", error });
  }
});

// Schedule Schema
const scheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

app.post("/api/schedules", async (req, res) => {
  const { day, employees } = req.body;

  const newSchedule = new Schedule({
    day,
    employees,
  });

  try {
    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    res.status(400).json({ message: "Error creating schedule", error });
  }
});

app.get("/api/schedules", async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("employees");
    res.status(200).json(schedules);
  } catch (error) {
    res.status(400).json({ message: "Error fetching schedules", error });
  }
});

app.delete("/api/schedules/clear", async (req, res) => {
  try {
    await Schedule.deleteMany({});
    res.status(200).json({ message: "Cleared schedule for all days" });
  } catch (error) {
    res.status(400).json({ message: "Error clearing schedule", error });
  }
});

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });
