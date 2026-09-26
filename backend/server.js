const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const employeeRoutes = require("./routes/employeeRoutes")

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully")
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message)
  })

app.use("/api/employees", employeeRoutes)

app.get("/", (req, res) => {
  res.send("Employee Management Backend is running")
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})