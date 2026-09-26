const express = require("express")
const Employee = require("../models/Employee")

const router = express.Router()

// Add employee
router.post("/", async (req, res) => {
  try {
    const { name, email, department } = req.body

    const employee = new Employee({
      name,
      email,
      department
    })

    const savedEmployee = await employee.save()

    res.status(201).json(savedEmployee)

  } catch (error) {
    console.log("Employee error:", error)

    res.status(500).json({
      message: "Failed to add employee",
      error: error.message
    })
  }
})

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find()

    res.status(200).json(employees)

  } catch (error) {
    console.log("Fetch employee error:", error)

    res.status(500).json({
      message: "Failed to fetch employees",
      error: error.message
    })
  }
})

// Update employee
router.put("/:id", async (req, res) => {
  try {
    const { name, email, department } = req.body

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        department
      },
      {
        new: true,
        runValidators: true
      }
    )

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found"
      })
    }

    res.status(200).json(updatedEmployee)

  } catch (error) {
    console.log("Update employee error:", error)

    res.status(500).json({
      message: "Failed to update employee",
      error: error.message
    })
  }
})

// Delete employee
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(
      req.params.id
    )

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found"
      })
    }

    res.status(200).json({
      message: "Employee deleted successfully"
    })

  } catch (error) {
    console.log("Delete employee error:", error)

    res.status(500).json({
      message: "Failed to delete employee",
      error: error.message
    })
  }
})

module.exports = router